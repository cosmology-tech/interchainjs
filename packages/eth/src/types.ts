import { TransactionReceipt } from "web3-types";

type PrefixedHexString = string;

export interface LegacyTx {
  to: Uint8Array | PrefixedHexString;
  value: bigint;
  gasLimit: bigint;
  gasPrice: bigint;
  nonce: bigint;
  code?: string;
}

export interface Signed<T> {
  signed: T;
  broadcast: () => Promise<TransactionReceipt>;
}
