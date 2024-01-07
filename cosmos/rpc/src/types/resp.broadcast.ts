import {
  ResponseCheckTxAmino,
  ResponseDeliverTxAmino,
} from "../codegen/tendermint/abci/types";

export interface BroadcastNoCommitResponse {
  hash: string;
  code?: number;
  data?: string;
  log?: string;
  codespace?: string;
}

export interface BroadcastCommitResponse {
  hash: string;
  check_tx: ResponseCheckTxAmino;
  deliver_tx: ResponseDeliverTxAmino;
  height: string;
}

export interface BroadcastResponse {
  hash: string;
  add_tx?: {
    code?: number;
    data?: string;
    log?: string;
    codespace?: string;
  };
  check_tx?: ResponseCheckTxAmino;
  deliver_tx?: ResponseDeliverTxAmino & { height: string };
}
