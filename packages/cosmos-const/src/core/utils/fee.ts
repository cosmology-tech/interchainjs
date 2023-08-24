import { Decimal, Uint53 } from "@cosmjs/math";
import { Fee } from "interchain-query/cosmos/tx/v1beta1/tx";

import { FeeParser } from "../../const";
import { Coin, StdFee } from "../../types";
import feeTokensJson from "../config/fee-tokens.json";

/**
 * Denom checker for the Cosmos SDK 0.42 denom pattern
 * (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
 *
 * This is like a regexp but with helpful error messages.
 */
function checkDenom(denom: string): void {
  if (denom.length < 3 || denom.length > 128) {
    throw new Error("Denom must be between 3 and 128 characters");
  }
}

/**
 * A gas price, i.e. the price of a single unit of gas. This is typically a fraction of
 * the smallest fee token unit, such as 0.012utoken.
 */
export class GasPrice {
  public readonly amount: Decimal;
  public readonly denom: string;

  public constructor(amount: Decimal, denom: string) {
    this.amount = amount;
    this.denom = denom;
  }

  /**
   * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
   *
   * The denom must match the Cosmos SDK 0.42 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
   * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
   *
   * Separators are not yet supported.
   */
  public static fromString(gasPrice: string): GasPrice {
    // Use Decimal.fromUserInput and checkDenom for detailed checks and helpful error messages
    const matchResult = gasPrice.match(/^([0-9.]+)([a-z][a-z0-9]*)$/i);
    if (!matchResult) {
      throw new Error("Invalid gas price string");
    }
    const [_, amount, denom] = matchResult;
    checkDenom(denom);
    const fractionalDigits = 18;
    const decimalAmount = Decimal.fromUserInput(amount, fractionalDigits);
    return new GasPrice(decimalAmount, denom);
  }

  /**
   * Returns a string representation of this gas price, e.g. "0.025uatom".
   * This can be used as an input to `GasPrice.fromString`.
   */
  public toString(): string {
    return this.amount.toString() + this.denom;
  }
}

function coin(amount: number | string, denom: string): Coin {
  let outAmount: string;
  if (typeof amount === "number") {
    try {
      outAmount = new Uint53(amount).toString();
    } catch (_err) {
      throw new Error(
        "Given amount is not a safe integer. Consider using a string instead to overcome the limitations of JS numbers."
      );
    }
  } else {
    if (!amount.match(/^[0-9]+$/)) {
      throw new Error("Invalid unsigned integer string format");
    }
    outAmount = amount.replace(/^0*/, "") || "0";
  }
  return {
    amount: outAmount,
    denom: denom,
  };
}

export function calculateFee(
  gasLimit: number,
  gasPrice: GasPrice | string
): Fee {
  const processedGasPrice =
    typeof gasPrice === "string" ? GasPrice.fromString(gasPrice) : gasPrice;
  const { denom, amount: gasPriceAmount } = processedGasPrice;
  const amount = gasPriceAmount
    .multiply(new Uint53(gasLimit))
    .ceil()
    .toString();
  return FeeParser.createProtoData({
    amount: [coin(amount, denom)],
    gasLimit: BigInt(gasLimit.toString()),
  }) as Fee;
}

export function getAvgGasPrice(chainId: string) {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.average_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return GasPrice.fromString(`${feeToken.average_gas_price}${feeToken.denom}`);
}

export function standardizeFee(fee: Fee): StdFee {
  const { gasLimit, payer, granter, ...rest } = fee;
  const stdFee: StdFee = { gas: gasLimit.toString(), ...rest };
  if (payer !== "") stdFee["payer"] = payer;
  if (granter !== "") stdFee["granter"] = granter;
  return stdFee;
}
