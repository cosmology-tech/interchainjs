import { HttpEndpoint, Price } from "@cosmonauts/types";
import { Fee, SignerInfo, TxBody } from "../codegen/cosmos/tx/v1beta1/tx";
import { Event } from "../codegen/tendermint/abci/types";

export interface Message {
  typeUrl: string;
  value: any;
}

export interface BroadcastOptions {
  checkTx: boolean;
  deliverTx: boolean;
}

export interface FeeOptions {
  multiplier?: number;
  gasPrice?: Price | string | "average" | "high" | "low";
}

export interface SignerOptions {
  chainId?: string;
  accountNumber?: bigint;
  sequence?: bigint;
}

export interface EncodedMessage {
  typeUrl: string;
  value: Uint8Array;
}

export interface Encoder {
  typeUrl: string;
  encode: (data: any) => Uint8Array;
}

export type BroadcastMode =
  | "broadcast_tx_async"
  | "broadcast_tx_sync"
  | "broadcast_tx_commit";

export interface RequestClient {
  readonly endpoint: HttpEndpoint;
  getChainId: () => Promise<string>;
  getAccountNumber: () => Promise<bigint>;
  getSequence: () => Promise<bigint>;
  estimateFee: (
    txBody: TxBody,
    signerInfos: SignerInfo[],
    options?: FeeOptions
  ) => Promise<Fee>;
  broadcast: (
    txBytes: Uint8Array,
    mode: BroadcastMode
  ) => Promise<BroadcastResult>;
}

export interface CheckTxResult {
  code: number;
  data: string;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
  codespace: string;
  sender: string;
  priority: string;
  /**
   * mempool_error is set by CometBFT.
   * ABCI applictions creating a ResponseCheckTX should not set mempool_error.
   */
  mempool_error: string;
}

export interface DeliverTxResult {
  code: number;
  data: string;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
  codespace: string;
}

export interface BroadcastResult {
  hash: string;
  add_tx?: {
    code?: number;
    data?: string;
    log?: string;
    codespace?: string;
  };
  check_tx?: CheckTxResult;
  deliver_tx?: DeliverTxResult & { height: string };
}
