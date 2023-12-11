import { Event } from "../codegen/tendermint/abci/types";

interface DeliverTxData {
  code: number;
  data: string | null; // base64 encoded
  log: string;
  codespace: string;
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
}

interface CheckTxData {
  code: number;
  data: string | null; // base64 encoded
  log: string;
  codespace: string;
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
  sender: string;
  priority: string;
  mempoolError: string;
}

export interface BroadcastTxResponse {
  hash: string;
  code: number;
  data: string | null; // base64 encoded
  log: string;
  codespace?: string;
}

export interface BroadcastTxCommitResponse {
  hash: string;
  check_tx: CheckTxData;
  deliver_tx: DeliverTxData;
  height: string;
}

interface GeneralResult {
  code: number;
  data: string | null; // base64 encoded
  log: string;
  codespace?: string;
}

interface OperationResult {
  info?: string;
  gas_wanted?: string;
  gas_used?: string;
  events?: Event[];
}

export interface TxResponse {
  hash: string;
  add_tx?: GeneralResult;
  check_tx?: GeneralResult &
    OperationResult & {
      sender?: string;
      priority?: string;
      mempoolError?: string;
    };
  deliver_tx?: GeneralResult &
    OperationResult & {
      height: string;
    };
}

/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  hash: string;
  height: number;
  /** The position of the transaction within the block. This is a 0-based index. */
  index: number;
  tx: string; // base64 encoded
  tx_result: DeliverTxData;
}
