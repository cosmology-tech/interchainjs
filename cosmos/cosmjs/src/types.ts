import { Bech32Address, HdPath } from "@sign/core";
import { AminoConverters, StdSignDoc } from "@sign/cosmos-amino";
import { GasPrice, Registry, SignDoc } from "@sign/cosmos-proto";

export interface SequenceResponse {
  accountNumber: bigint;
  sequence: bigint;
}

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  address: Bech32Address;
  algo: Algo;
  pubkey: Uint8Array;
}

export interface Pubkey {
  type: string;
  value: any;
}

export interface StdSignature {
  pub_key: Pubkey;
  signature: string;
}

export interface AminoSignResponse {
  signed: StdSignDoc;
  signature: StdSignature;
}

export interface OfflineAminoSigner {
  getAccounts: () => Promise<AccountData[]>;
  signAmino: (
    signerAddress: string,
    signDoc: StdSignDoc
  ) => Promise<AminoSignResponse>;
}

export interface DirectSignResponse {
  signed: SignDoc;
  signature: StdSignature;
}

export interface OfflineDirectSigner {
  getAccounts: () => Promise<AccountData[]>;
  signDirect: (
    signerAddress: string,
    signDoc: SignDoc
  ) => Promise<DirectSignResponse>;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;

export interface SignerOptions {
  registry?: Registry;
  aminoConverters?: AminoConverters;
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
  gasPrice?: GasPrice;
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

export interface Attribute {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: Attribute[];
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

export interface Wallet {
  getAccounts: () => AccountData[];
  signAmino: (signerAddress: string, signDoc: StdSignDoc) => AminoSignResponse;
  signDirect: (signerAddress: string, signDoc: SignDoc) => DirectSignResponse;
}

export interface WalletOptions {
  bip39Password?: string;
  hdPaths?: HdPath[];
  prefix?: string;
}
