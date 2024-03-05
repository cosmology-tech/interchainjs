import { Price } from "@cosmonauts/core";
import Decimal from "decimal.js";

import feeTokensJson from "../config/fee-tokens.json";

export function getAvgGasPrice(chainId: string): Price {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.average_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return {
    amount: new Decimal(feeToken.average_gas_price),
    denom: feeToken.denom,
  };
}

export function getLowGasPrice(chainId: string): Price {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.low_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return {
    amount: new Decimal(feeToken.low_gas_price),
    denom: feeToken.denom,
  };
}

export function getHighGasPrice(chainId: string): Price {
  const feeToken = (feeTokensJson as any)[chainId]?.[0];
  if (typeof feeToken?.high_gas_price === "undefined") {
    throw new Error(`No average_gas_price found for chain ${chainId}`);
  }
  return {
    amount: new Decimal(feeToken.high_gas_price),
    denom: feeToken.denom,
  };
}
