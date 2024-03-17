import { HttpEndpoint, Price } from "@cosmonauts/types";
import { SignerInfo, TxBody } from "../codegen/cosmos/tx/v1beta1/tx";
import { BroadcastResult } from "./direct";
import { StdFee } from "./amino";

export interface FeeOptions {
  multiplier?: number;
  gasPrice?: Price | string | "average" | "high" | "low";
}

export interface SignerOptions {
  chainId?: string;
  accountNumber?: bigint;
  sequence?: bigint;
}

export type TxBodyOptions = Partial<
  Pick<
    TxBody,
    "timeoutHeight" | "extensionOptions" | "nonCriticalExtensionOptions"
  >
>;

export interface BroadcastOptions {
  checkTx?: boolean;
  deliverTx?: boolean;
}

export interface QueryClient {
  readonly endpoint: HttpEndpoint;
  getChainId: () => Promise<string>;
  getAccountNumber: () => Promise<bigint>;
  getSequence: () => Promise<bigint>;
  estimateFee: (
    txBody: TxBody,
    signerInfos: SignerInfo[],
    options?: FeeOptions
  ) => Promise<StdFee>;
  broadcast: (
    txBytes: Uint8Array,
    options?: BroadcastOptions
  ) => Promise<BroadcastResult>;
}
