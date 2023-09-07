import {
  AccessListEIP2930TxData,
  BlobEIP4844TxData,
  FeeMarketEIP1559TxData,
  LegacyTxData,
} from "@ethereumjs/tx";
import { GeneralSigned } from "@sign/core";
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

export type TxData =
  | LegacyTxData
  | FeeMarketEIP1559TxData
  | AccessListEIP2930TxData
  | BlobEIP4844TxData;

export interface Signed<T> extends GeneralSigned<T> {
  broadcast: () => Promise<TransactionReceipt>;
}
