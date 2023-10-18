import { Any, AnyAmino } from "../any";
import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial, isSet, signModeFromJSON } from "../helpers";
import { SignMode } from "../types";
import { Coin, CoinAmino } from "./base";
import { CompactBitArray, CompactBitArrayAmino } from "./crypto.multisig";
/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
  /** body is the processable content of the transaction */
  body: TxBody | undefined;
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   */
  authInfo: AuthInfo | undefined;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/** Tx is the standard type used for broadcasting transactions. */
export interface TxAmino {
  /** body is the processable content of the transaction */
  body?: TxBodyAmino | undefined;
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   */
  auth_info?: AuthInfoAmino | undefined;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  bodyBytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  authInfoBytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRawAmino {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  auth_info_bytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}
/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  bodyBytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  authInfoBytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chainId: string;
  /** account_number is the account number of the account in state */
  accountNumber: bigint;
}
/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDocAmino {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  auth_info_bytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chain_id: string;
  /** account_number is the account number of the account in state */
  account_number: string;
}
/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: Any[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeoutHeight: bigint;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extensionOptions: Any[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  nonCriticalExtensionOptions: Any[];
}
/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBodyAmino {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: AnyAmino[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeout_height: string;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options: AnyAmino[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options: AnyAmino[];
}
/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signerInfos: SignerInfo[];
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee: Fee | undefined;
}
/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfoAmino {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos: SignerInfoAmino[];
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee?: FeeAmino | undefined;
}
/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  publicKey: Any | undefined;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  modeInfo: ModeInfo | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: bigint;
}
/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfoAmino {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key?: AnyAmino | undefined;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  mode_info?: ModeInfoAmino | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: string;
}
/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
  /** single represents a single signer */
  single?: ModeInfo_Single | undefined;
  /** multi represents a nested multisig signer */
  multi?: ModeInfo_Multi | undefined;
}
/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfoAmino {
  /** single represents a single signer */
  single?: ModeInfo_SingleAmino | undefined;
  /** multi represents a nested multisig signer */
  multi?: ModeInfo_MultiAmino | undefined;
}
/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}
/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_SingleAmino {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}
/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray: CompactBitArray | undefined;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  modeInfos: ModeInfo[];
}
/** Multi is the mode info for a multisig public key */
export interface ModeInfo_MultiAmino {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray?: CompactBitArrayAmino | undefined;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos: ModeInfoAmino[];
}
/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount: Coin[];
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   */
  gasLimit: bigint;
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter: string;
}
/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface FeeAmino {
  /** amount is the amount of coins to be paid as a fee */
  amount: CoinAmino[];
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   */
  gas_limit: string;
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter: string;
}
function createBaseTx(): Tx {
  return {
    body: TxBody.fromPartial({}),
    authInfo: AuthInfo.fromPartial({}),
    signatures: [],
  };
}
export const Tx = {
  typeUrl: "/cosmos.tx.v1beta1.Tx",
  aminoType: "cosmos-sdk/Tx",
  encode(
    message: Tx,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.body !== undefined) {
      TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    if (message.authInfo !== undefined) {
      AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Tx {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body = TxBody.decode(reader, reader.uint32());
          break;
        case 2:
          message.authInfo = AuthInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tx>): Tx {
    const message = createBaseTx();
    message.body =
      object.body !== undefined && object.body !== null
        ? TxBody.fromPartial(object.body)
        : undefined;
    message.authInfo =
      object.authInfo !== undefined && object.authInfo !== null
        ? AuthInfo.fromPartial(object.authInfo)
        : undefined;
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
  fromAmino(object: TxAmino): Tx {
    return {
      body: object?.body ? TxBody.fromAmino(object.body) : undefined,
      authInfo: object?.auth_info
        ? AuthInfo.fromAmino(object.auth_info)
        : undefined,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => e)
        : [],
    };
  },
  toAmino(message: Tx): TxAmino {
    const obj: any = {};
    obj.body = message.body ? TxBody.toAmino(message.body) : undefined;
    obj.auth_info = message.authInfo
      ? AuthInfo.toAmino(message.authInfo)
      : undefined;
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e);
    } else {
      obj.signatures = [];
    }
    return obj;
  },
};
function createBaseTxRaw(): TxRaw {
  return {
    bodyBytes: new Uint8Array(),
    authInfoBytes: new Uint8Array(),
    signatures: [],
  };
}
export const TxRaw = {
  typeUrl: "/cosmos.tx.v1beta1.TxRaw",
  aminoType: "cosmos-sdk/TxRaw",
  encode(
    message: TxRaw,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.bodyBytes.length !== 0) {
      writer.uint32(10).bytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      writer.uint32(18).bytes(message.authInfoBytes);
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TxRaw {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxRaw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bodyBytes = reader.bytes();
          break;
        case 2:
          message.authInfoBytes = reader.bytes();
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxRaw>): TxRaw {
    const message = createBaseTxRaw();
    message.bodyBytes = object.bodyBytes ?? new Uint8Array();
    message.authInfoBytes = object.authInfoBytes ?? new Uint8Array();
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
  fromAmino(object: TxRawAmino): TxRaw {
    return {
      bodyBytes: object.body_bytes,
      authInfoBytes: object.auth_info_bytes,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => e)
        : [],
    };
  },
  toAmino(message: TxRaw): TxRawAmino {
    const obj: any = {};
    obj.body_bytes = message.bodyBytes;
    obj.auth_info_bytes = message.authInfoBytes;
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) => e);
    } else {
      obj.signatures = [];
    }
    return obj;
  },
};
function createBaseSignDoc(): SignDoc {
  return {
    bodyBytes: new Uint8Array(),
    authInfoBytes: new Uint8Array(),
    chainId: "",
    accountNumber: BigInt(0),
  };
}
export const SignDoc = {
  typeUrl: "/cosmos.tx.v1beta1.SignDoc",
  aminoType: "cosmos-sdk/SignDoc",
  encode(
    message: SignDoc,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.bodyBytes.length !== 0) {
      writer.uint32(10).bytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      writer.uint32(18).bytes(message.authInfoBytes);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.accountNumber !== BigInt(0)) {
      writer.uint32(32).uint64(message.accountNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignDoc {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bodyBytes = reader.bytes();
          break;
        case 2:
          message.authInfoBytes = reader.bytes();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.accountNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignDoc>): SignDoc {
    const message = createBaseSignDoc();
    message.bodyBytes = object.bodyBytes ?? new Uint8Array();
    message.authInfoBytes = object.authInfoBytes ?? new Uint8Array();
    message.chainId = object.chainId ?? "";
    message.accountNumber =
      object.accountNumber !== undefined && object.accountNumber !== null
        ? BigInt(object.accountNumber.toString())
        : BigInt(0);
    return message;
  },
  fromAmino(object: SignDocAmino): SignDoc {
    return {
      bodyBytes: object.body_bytes,
      authInfoBytes: object.auth_info_bytes,
      chainId: object.chain_id,
      accountNumber: BigInt(object.account_number),
    };
  },
  toAmino(message: SignDoc): SignDocAmino {
    const obj: any = {};
    obj.body_bytes = message.bodyBytes;
    obj.auth_info_bytes = message.authInfoBytes;
    obj.chain_id = message.chainId;
    obj.account_number = message.accountNumber
      ? message.accountNumber.toString()
      : undefined;
    return obj;
  },
};
function createBaseTxBody(): TxBody {
  return {
    messages: [],
    memo: "",
    timeoutHeight: BigInt(0),
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
  };
}
export const TxBody = {
  typeUrl: "/cosmos.tx.v1beta1.TxBody",
  aminoType: "cosmos-sdk/TxBody",
  encode(
    message: TxBody,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.timeoutHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.timeoutHeight);
    }
    for (const v of message.extensionOptions) {
      Any.encode(v!, writer.uint32(8186).fork()).ldelim();
    }
    for (const v of message.nonCriticalExtensionOptions) {
      Any.encode(v!, writer.uint32(16378).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TxBody {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 2:
          message.memo = reader.string();
          break;
        case 3:
          message.timeoutHeight = reader.uint64();
          break;
        case 1023:
          message.extensionOptions.push(Any.decode(reader, reader.uint32()));
          break;
        case 2047:
          message.nonCriticalExtensionOptions.push(
            Any.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxBody>): TxBody {
    const message = createBaseTxBody();
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.memo = object.memo ?? "";
    message.timeoutHeight =
      object.timeoutHeight !== undefined && object.timeoutHeight !== null
        ? BigInt(object.timeoutHeight.toString())
        : BigInt(0);
    message.extensionOptions =
      object.extensionOptions?.map((e) => Any.fromPartial(e)) || [];
    message.nonCriticalExtensionOptions =
      object.nonCriticalExtensionOptions?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TxBodyAmino): TxBody {
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Any.fromAmino(e))
        : [],
      memo: object.memo,
      timeoutHeight: BigInt(object.timeout_height),
      extensionOptions: Array.isArray(object?.extension_options)
        ? object.extension_options.map((e: any) => Any.fromAmino(e))
        : [],
      nonCriticalExtensionOptions: Array.isArray(
        object?.non_critical_extension_options
      )
        ? object.non_critical_extension_options.map((e: any) =>
            Any.fromAmino(e)
          )
        : [],
    };
  },
  toAmino(message: TxBody): TxBodyAmino {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toAmino(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    obj.memo = message.memo;
    obj.timeout_height = message.timeoutHeight
      ? message.timeoutHeight.toString()
      : undefined;
    if (message.extensionOptions) {
      obj.extension_options = message.extensionOptions.map((e) =>
        e ? Any.toAmino(e) : undefined
      );
    } else {
      obj.extension_options = [];
    }
    if (message.nonCriticalExtensionOptions) {
      obj.non_critical_extension_options =
        message.nonCriticalExtensionOptions.map((e) =>
          e ? Any.toAmino(e) : undefined
        );
    } else {
      obj.non_critical_extension_options = [];
    }
    return obj;
  },
};
function createBaseAuthInfo(): AuthInfo {
  return {
    signerInfos: [],
    fee: Fee.fromPartial({}),
  };
}
export const AuthInfo = {
  typeUrl: "/cosmos.tx.v1beta1.AuthInfo",
  aminoType: "cosmos-sdk/AuthInfo",
  encode(
    message: AuthInfo,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    for (const v of message.signerInfos) {
      SignerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AuthInfo {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signerInfos.push(SignerInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AuthInfo>): AuthInfo {
    const message = createBaseAuthInfo();
    message.signerInfos =
      object.signerInfos?.map((e) => SignerInfo.fromPartial(e)) || [];
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    return message;
  },
  fromAmino(object: AuthInfoAmino): AuthInfo {
    return {
      signerInfos: Array.isArray(object?.signer_infos)
        ? object.signer_infos.map((e: any) => SignerInfo.fromAmino(e))
        : [],
      fee: object?.fee ? Fee.fromAmino(object.fee) : undefined,
    };
  },
  toAmino(message: AuthInfo): AuthInfoAmino {
    const obj: any = {};
    if (message.signerInfos) {
      obj.signer_infos = message.signerInfos.map((e) =>
        e ? SignerInfo.toAmino(e) : undefined
      );
    } else {
      obj.signer_infos = [];
    }
    obj.fee = message.fee ? Fee.toAmino(message.fee) : undefined;
    return obj;
  },
};
function createBaseSignerInfo(): SignerInfo {
  return {
    publicKey: undefined,
    modeInfo: ModeInfo.fromPartial({}),
    sequence: BigInt(0),
  };
}
export const SignerInfo = {
  typeUrl: "/cosmos.tx.v1beta1.SignerInfo",
  aminoType: "cosmos-sdk/SignerInfo",
  encode(
    message: SignerInfo,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.modeInfo !== undefined) {
      ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SignerInfo {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.publicKey = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.modeInfo = ModeInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignerInfo>): SignerInfo {
    const message = createBaseSignerInfo();
    message.publicKey =
      object.publicKey !== undefined && object.publicKey !== null
        ? Any.fromPartial(object.publicKey)
        : undefined;
    message.modeInfo =
      object.modeInfo !== undefined && object.modeInfo !== null
        ? ModeInfo.fromPartial(object.modeInfo)
        : undefined;
    message.sequence =
      object.sequence !== undefined && object.sequence !== null
        ? BigInt(object.sequence.toString())
        : BigInt(0);
    return message;
  },
  fromAmino(object: SignerInfoAmino): SignerInfo {
    return {
      publicKey: object?.public_key
        ? Any.fromAmino(object.public_key)
        : undefined,
      modeInfo: object?.mode_info
        ? ModeInfo.fromAmino(object.mode_info)
        : undefined,
      sequence: BigInt(object.sequence),
    };
  },
  toAmino(message: SignerInfo): SignerInfoAmino {
    const obj: any = {};
    obj.public_key = message.publicKey
      ? Any.toAmino(message.publicKey)
      : undefined;
    obj.mode_info = message.modeInfo
      ? ModeInfo.toAmino(message.modeInfo)
      : undefined;
    obj.sequence = message.sequence ? message.sequence.toString() : undefined;
    return obj;
  },
};
function createBaseModeInfo(): ModeInfo {
  return {
    single: undefined,
    multi: undefined,
  };
}
export const ModeInfo = {
  typeUrl: "/cosmos.tx.v1beta1.ModeInfo",
  aminoType: "cosmos-sdk/ModeInfo",
  encode(
    message: ModeInfo,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.single !== undefined) {
      ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ModeInfo {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.single = ModeInfo_Single.decode(reader, reader.uint32());
          break;
        case 2:
          message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ModeInfo>): ModeInfo {
    const message = createBaseModeInfo();
    message.single =
      object.single !== undefined && object.single !== null
        ? ModeInfo_Single.fromPartial(object.single)
        : undefined;
    message.multi =
      object.multi !== undefined && object.multi !== null
        ? ModeInfo_Multi.fromPartial(object.multi)
        : undefined;
    return message;
  },
  fromAmino(object: ModeInfoAmino): ModeInfo {
    return {
      single: object?.single
        ? ModeInfo_Single.fromAmino(object.single)
        : undefined,
      multi: object?.multi ? ModeInfo_Multi.fromAmino(object.multi) : undefined,
    };
  },
  toAmino(message: ModeInfo): ModeInfoAmino {
    const obj: any = {};
    obj.single = message.single
      ? ModeInfo_Single.toAmino(message.single)
      : undefined;
    obj.multi = message.multi
      ? ModeInfo_Multi.toAmino(message.multi)
      : undefined;
    return obj;
  },
};
function createBaseModeInfo_Single(): ModeInfo_Single {
  return {
    mode: 0,
  };
}
export const ModeInfo_Single = {
  typeUrl: "/cosmos.tx.v1beta1.Single",
  aminoType: "cosmos-sdk/Single",
  encode(
    message: ModeInfo_Single,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ModeInfo_Single {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Single();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ModeInfo_Single>): ModeInfo_Single {
    const message = createBaseModeInfo_Single();
    message.mode = object.mode ?? 0;
    return message;
  },
  fromAmino(object: ModeInfo_SingleAmino): ModeInfo_Single {
    return {
      mode: isSet(object.mode) ? signModeFromJSON(object.mode) : -1,
    };
  },
  toAmino(message: ModeInfo_Single): ModeInfo_SingleAmino {
    const obj: any = {};
    obj.mode = message.mode;
    return obj;
  },
};
function createBaseModeInfo_Multi(): ModeInfo_Multi {
  return {
    bitarray: CompactBitArray.fromPartial({}),
    modeInfos: [],
  };
}
export const ModeInfo_Multi = {
  typeUrl: "/cosmos.tx.v1beta1.Multi",
  aminoType: "cosmos-sdk/Multi",
  encode(
    message: ModeInfo_Multi,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(
        message.bitarray,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.modeInfos) {
      ModeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ModeInfo_Multi {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Multi();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          break;
        case 2:
          message.modeInfos.push(ModeInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ModeInfo_Multi>): ModeInfo_Multi {
    const message = createBaseModeInfo_Multi();
    message.bitarray =
      object.bitarray !== undefined && object.bitarray !== null
        ? CompactBitArray.fromPartial(object.bitarray)
        : undefined;
    message.modeInfos =
      object.modeInfos?.map((e) => ModeInfo.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ModeInfo_MultiAmino): ModeInfo_Multi {
    return {
      bitarray: object?.bitarray
        ? CompactBitArray.fromAmino(object.bitarray)
        : undefined,
      modeInfos: Array.isArray(object?.mode_infos)
        ? object.mode_infos.map((e: any) => ModeInfo.fromAmino(e))
        : [],
    };
  },
  toAmino(message: ModeInfo_Multi): ModeInfo_MultiAmino {
    const obj: any = {};
    obj.bitarray = message.bitarray
      ? CompactBitArray.toAmino(message.bitarray)
      : undefined;
    if (message.modeInfos) {
      obj.mode_infos = message.modeInfos.map((e) =>
        e ? ModeInfo.toAmino(e) : undefined
      );
    } else {
      obj.mode_infos = [];
    }
    return obj;
  },
};
function createBaseFee(): Fee {
  return {
    amount: [],
    gasLimit: BigInt(0),
    payer: "",
    granter: "",
  };
}
export const Fee = {
  typeUrl: "/cosmos.tx.v1beta1.Fee",
  aminoType: "cosmos-sdk/Fee",
  encode(
    message: Fee,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.gasLimit !== BigInt(0)) {
      writer.uint32(16).uint64(message.gasLimit);
    }
    if (message.payer !== "") {
      writer.uint32(26).string(message.payer);
    }
    if (message.granter !== "") {
      writer.uint32(34).string(message.granter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Fee {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.gasLimit = reader.uint64();
          break;
        case 3:
          message.payer = reader.string();
          break;
        case 4:
          message.granter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Fee>): Fee {
    const message = createBaseFee();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.gasLimit =
      object.gasLimit !== undefined && object.gasLimit !== null
        ? BigInt(object.gasLimit.toString())
        : BigInt(0);
    message.payer = object.payer ?? "";
    message.granter = object.granter ?? "";
    return message;
  },
  fromAmino(object: FeeAmino): Fee {
    return {
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromAmino(e))
        : [],
      gasLimit: BigInt(object.gas_limit),
      payer: object.payer,
      granter: object.granter,
    };
  },
  toAmino(message: Fee): FeeAmino {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toAmino(e) : undefined));
    } else {
      obj.amount = [];
    }
    obj.gas_limit = message.gasLimit ? message.gasLimit.toString() : undefined;
    obj.payer = message.payer;
    obj.granter = message.granter;
    return obj;
  },
};
