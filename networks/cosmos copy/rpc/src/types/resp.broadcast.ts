/* eslint-disable @typescript-eslint/no-namespace */
import {
  ResponseCheckTxAmino,
  ResponseDeliverTxAmino,
} from "../codegen/tendermint/abci/types";

export namespace TendermintBroadcastTxResponse {
  export interface Async {
    hash: string;
    code: number;
    data: string;
    log: string;
    codespace: string;
  }
  export type Sync = {
    hash: string;
  } & ResponseCheckTxAmino;
  export interface Commit {
    hash: string;
    check_tx: ResponseCheckTxAmino;
    deliver_tx: ResponseDeliverTxAmino;
    height: string;
  }
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
