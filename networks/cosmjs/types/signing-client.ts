import { Price } from "@cosmonauts/types";
import { Event } from "../codegen/tendermint/abci/types";
import { AminoConverter, Message } from "@cosmonauts/cosmos/types";
import { TelescopeGeneratedType } from "../codegen/types";

export type EncodeObject = Message;

export type TypeUrl = string;

export type Registry = Array<[TypeUrl, TelescopeGeneratedType<any, any, any>]>;

export interface SignerOptions {
  registry?: Registry;
  aminoConverters?: Record<TypeUrl, AminoConverter>;
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
  gasPrice?: Price | string;
}

export interface SignerData {
  accountNumber: bigint;
  sequence: bigint;
  chainId: string;
}

export interface MsgData {
  msgType: string;
  data: Uint8Array;
}

/**
 * The response after successfully broadcasting a transaction.
 * Success or failure refer to the execution result.
 */
export interface DeliverTxResponse {
  height: number;
  /** The position of the transaction within the block. This is a 0-based index. */
  txIndex: number;
  /** Error code. The transaction suceeded if and only if code is 0. */
  code: number;
  transactionHash: string;
  events: Event[];
  /**
   * A string-based log document.
   *
   * This currently seems to merge attributes of multiple events into one event per type
   * (https://github.com/tendermint/tendermint/issues/9595). You might want to use the `events`
   * field instead.
   */
  rawLog?: string;
  /** @deprecated Use `msgResponses` instead. */
  data?: MsgData[];
  /**
   * The message responses of the [TxMsgData](https://github.com/cosmos/cosmos-sdk/blob/v0.46.3/proto/cosmos/base/abci/v1beta1/abci.proto#L128-L140)
   * as `Any`s.
   * This field is an empty list for chains running Cosmos SDK < 0.46.
   */
  msgResponses: Array<{
    typeUrl: string;
    value: Uint8Array;
  }>;
  gasUsed: bigint;
  gasWanted: bigint;
}

/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
  height: number;
  /** The position of the transaction within the block. This is a 0-based index. */
  txIndex: number;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  hash: string;
  /** Transaction execution error code. 0 on success. */
  code: number;
  events: Event[];
  /**
   * A string-based log document.
   *
   * This currently seems to merge attributes of multiple events into one event per type
   * (https://github.com/tendermint/tendermint/issues/9595). You might want to use the `events`
   * field instead.
   */
  rawLog: string;
  /**
   * Raw transaction bytes stored in Tendermint.
   *
   * If you hash this, you get the transaction hash (= transaction ID):
   *
   * ```js
   * import { sha256 } from "@cosmjs/crypto";
   * import { toHex } from "@cosmjs/encoding";
   *
   * const transactionId = toHex(sha256(indexTx.tx)).toUpperCase();
   * ```
   *
   * Use `decodeTxRaw` from @cosmjs/proto-signing to decode this.
   */
  tx: Uint8Array;
  /**
   * The message responses of the [TxMsgData](https://github.com/cosmos/cosmos-sdk/blob/v0.46.3/proto/cosmos/base/abci/v1beta1/abci.proto#L128-L140)
   * as `Any`s.
   * This field is an empty list for chains running Cosmos SDK < 0.46.
   */
  msgResponses: Array<{
    typeUrl: string;
    value: Uint8Array;
  }>;
  gasUsed: bigint;
  gasWanted: bigint;
}

export interface BlockHeader {
  version: {
    block: string;
    app: string;
  };
  height: number;
  chainId: string;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  time: string;
}

export interface Block {
  /** The ID is a hash of the block header (uppercase hex) */
  id: string;
  header: BlockHeader;
  /** Array of raw transactions */
  txs: Uint8Array[];
}

export interface SequenceResponse {
  accountNumber: bigint;
  sequence: bigint;
}
