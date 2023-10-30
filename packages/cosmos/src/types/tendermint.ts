import { Event } from "../codegen/tendermint/abci/types";

interface CommonResponse {
  readonly code: number;
  /** base64 encoded */
  readonly data: string | null;
  readonly log: string;
  readonly codespace?: string;
}

interface DeliverTxData extends CommonResponse {
  readonly info?: string;
  readonly gas_wanted?: string;
  readonly gas_used?: string;
  readonly events?: readonly Event[];
}

interface CheckTxData extends DeliverTxData {
  readonly sender?: string;
  readonly priority?: string;
  readonly mempoolError?: string;
}

export interface BroadcastTxResponse extends CommonResponse {
  readonly hash: string;
}

export interface BroadcastTxCommitResponse {
  readonly check_tx: CheckTxData;
  readonly deliver_tx: DeliverTxData;
  readonly hash: string;
  readonly height: string;
}

export type TxResponse = BroadcastTxResponse & Partial<DeliverTxData>;
