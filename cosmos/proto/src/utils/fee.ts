import { Decimal } from "@cosmonauts/core";
import { Fee } from "@cosmonauts/cosmos-proto";

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
   */
  public static fromString(gasPrice: string): GasPrice {
    // Use Decimal.fromUserInput and checkDenom for detailed checks and helpful error messages
    const matchResult = gasPrice.match(/^([0-9.]+)([a-z][a-z0-9]*)$/i);
    if (!matchResult) {
      throw new Error("Invalid gas price string");
    }
    const [, amount, denom] = matchResult;
    checkDenom(denom);
    const decimalAmount = Decimal.fromString(amount);
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

export function calculateFee(
  gasLimit: bigint,
  gasPrice: GasPrice | string
): Fee {
  const processedGasPrice =
    typeof gasPrice === "string" ? GasPrice.fromString(gasPrice) : gasPrice;
  const { denom, amount: gasPriceAmount } = processedGasPrice;
  const amount = gasPriceAmount.multiply(gasLimit).ceil().toString();
  return Fee.fromPartial({
    amount: [{ amount, denom }],
    gasLimit,
  });
}

export function getAvgGasPrice(chainId: string) {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.average_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return GasPrice.fromString(`${feeToken.average_gas_price}${feeToken.denom}`);
}

export function getLowGasPrice(chainId: string) {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.low_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return GasPrice.fromString(`${feeToken.low_gas_price}${feeToken.denom}`);
}

export function getHighGasPrice(chainId: string) {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.high_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return GasPrice.fromString(`${feeToken.high_gas_price}${feeToken.denom}`);
}
