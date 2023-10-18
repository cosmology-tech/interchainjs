import { Any, AnyAmino } from "../any";
import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial } from "../helpers";
import { Event, EventAmino } from "./tendermint";
/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponse {
  /** The block height */
  height: bigint;
  /** The transaction hash. */
  txhash: string;
  /** Namespace for the Code */
  codespace: string;
  /** Response code. */
  code: number;
  /** Result bytes, if any. */
  data: string;
  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  rawLog: string;
  /** The output of the application's logger (typed). May be non-deterministic. */
  logs: ABCIMessageLog[];
  /** Additional information. May be non-deterministic. */
  info: string;
  /** Amount of gas requested for transaction. */
  gasWanted: bigint;
  /** Amount of gas consumed by transaction. */
  gasUsed: bigint;
  /** The request transaction bytes. */
  tx: Any | undefined;
  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp: string;
  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante handler. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
   */
  events: Event[];
}
/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponseAmino {
  /** The block height */
  height: string;
  /** The transaction hash. */
  txhash: string;
  /** Namespace for the Code */
  codespace: string;
  /** Response code. */
  code: number;
  /** Result bytes, if any. */
  data: string;
  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  raw_log: string;
  /** The output of the application's logger (typed). May be non-deterministic. */
  logs: ABCIMessageLogAmino[];
  /** Additional information. May be non-deterministic. */
  info: string;
  /** Amount of gas requested for transaction. */
  gas_wanted: string;
  /** Amount of gas consumed by transaction. */
  gas_used: string;
  /** The request transaction bytes. */
  tx?: AnyAmino | undefined;
  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp: string;
  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante handler. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
   */
  events: EventAmino[];
}
/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLog {
  msgIndex: number;
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events: StringEvent[];
}
/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLogAmino {
  msg_index: number;
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events: StringEventAmino[];
}
/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEvent {
  type: string;
  attributes: Attribute[];
}
/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEventAmino {
  type: string;
  attributes: AttributeAmino[];
}
/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface Attribute {
  key: string;
  value: string;
}
/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface AttributeAmino {
  key: string;
  value: string;
}
/** GasInfo defines tx execution gas context. */
export interface GasInfo {
  /** GasWanted is the maximum units of work we allow this tx to perform. */
  gasWanted: bigint;
  /** GasUsed is the amount of gas actually consumed. */
  gasUsed: bigint;
}
/** GasInfo defines tx execution gas context. */
export interface GasInfoAmino {
  /** GasWanted is the maximum units of work we allow this tx to perform. */
  gas_wanted: string;
  /** GasUsed is the amount of gas actually consumed. */
  gas_used: string;
}
/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface Result {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   */
  data: Uint8Array;
  /** Log contains the log information from message or handler execution. */
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events: Event[];
}
/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface ResultAmino {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   */
  data: Uint8Array;
  /** Log contains the log information from message or handler execution. */
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events: EventAmino[];
}

function createBaseTxResponse(): TxResponse {
  return {
    height: BigInt(0),
    txhash: "",
    codespace: "",
    code: 0,
    data: "",
    rawLog: "",
    logs: [],
    info: "",
    gasWanted: BigInt(0),
    gasUsed: BigInt(0),
    tx: undefined,
    timestamp: "",
    events: [],
  };
}
export const TxResponse = {
  typeUrl: "/cosmos.base.abci.v1beta1.TxResponse",
  aminoType: "cosmos-sdk/TxResponse",
  encode(
    message: TxResponse,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    if (message.txhash !== "") {
      writer.uint32(18).string(message.txhash);
    }
    if (message.codespace !== "") {
      writer.uint32(26).string(message.codespace);
    }
    if (message.code !== 0) {
      writer.uint32(32).uint32(message.code);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.rawLog !== "") {
      writer.uint32(50).string(message.rawLog);
    }
    for (const v of message.logs) {
      ABCIMessageLog.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.info !== "") {
      writer.uint32(66).string(message.info);
    }
    if (message.gasWanted !== BigInt(0)) {
      writer.uint32(72).int64(message.gasWanted);
    }
    if (message.gasUsed !== BigInt(0)) {
      writer.uint32(80).int64(message.gasUsed);
    }
    if (message.tx !== undefined) {
      Any.encode(message.tx, writer.uint32(90).fork()).ldelim();
    }
    if (message.timestamp !== "") {
      writer.uint32(98).string(message.timestamp);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TxResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        case 2:
          message.txhash = reader.string();
          break;
        case 3:
          message.codespace = reader.string();
          break;
        case 4:
          message.code = reader.uint32();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.rawLog = reader.string();
          break;
        case 7:
          message.logs.push(ABCIMessageLog.decode(reader, reader.uint32()));
          break;
        case 8:
          message.info = reader.string();
          break;
        case 9:
          message.gasWanted = reader.int64();
          break;
        case 10:
          message.gasUsed = reader.int64();
          break;
        case 11:
          message.tx = Any.decode(reader, reader.uint32());
          break;
        case 12:
          message.timestamp = reader.string();
          break;
        case 13:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxResponse>): TxResponse {
    const message = createBaseTxResponse();
    message.height =
      object.height !== undefined && object.height !== null
        ? BigInt(object.height.toString())
        : BigInt(0);
    message.txhash = object.txhash ?? "";
    message.codespace = object.codespace ?? "";
    message.code = object.code ?? 0;
    message.data = object.data ?? "";
    message.rawLog = object.rawLog ?? "";
    message.logs = object.logs?.map((e) => ABCIMessageLog.fromPartial(e)) || [];
    message.info = object.info ?? "";
    message.gasWanted =
      object.gasWanted !== undefined && object.gasWanted !== null
        ? BigInt(object.gasWanted.toString())
        : BigInt(0);
    message.gasUsed =
      object.gasUsed !== undefined && object.gasUsed !== null
        ? BigInt(object.gasUsed.toString())
        : BigInt(0);
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Any.fromPartial(object.tx)
        : undefined;
    message.timestamp = object.timestamp ?? "";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TxResponseAmino): TxResponse {
    return {
      height: BigInt(object.height),
      txhash: object.txhash,
      codespace: object.codespace,
      code: object.code,
      data: object.data,
      rawLog: object.raw_log,
      logs: Array.isArray(object?.logs)
        ? object.logs.map((e: any) => ABCIMessageLog.fromAmino(e))
        : [],
      info: object.info,
      gasWanted: BigInt(object.gas_wanted),
      gasUsed: BigInt(object.gas_used),
      tx: object?.tx ? Any.fromAmino(object.tx) : undefined,
      timestamp: object.timestamp,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromAmino(e))
        : [],
    };
  },
  toAmino(message: TxResponse): TxResponseAmino {
    const obj: any = {};
    obj.height = message.height ? message.height.toString() : undefined;
    obj.txhash = message.txhash;
    obj.codespace = message.codespace;
    obj.code = message.code;
    obj.data = message.data;
    obj.raw_log = message.rawLog;
    if (message.logs) {
      obj.logs = message.logs.map((e) =>
        e ? ABCIMessageLog.toAmino(e) : undefined
      );
    } else {
      obj.logs = [];
    }
    obj.info = message.info;
    obj.gas_wanted = message.gasWanted
      ? message.gasWanted.toString()
      : undefined;
    obj.gas_used = message.gasUsed ? message.gasUsed.toString() : undefined;
    obj.tx = message.tx ? Any.toAmino(message.tx) : undefined;
    obj.timestamp = message.timestamp;
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? Event.toAmino(e) : undefined
      );
    } else {
      obj.events = [];
    }
    return obj;
  },
};
function createBaseGasInfo(): GasInfo {
  return {
    gasWanted: BigInt(0),
    gasUsed: BigInt(0),
  };
}
export const GasInfo = {
  typeUrl: "/cosmos.base.abci.v1beta1.GasInfo",
  aminoType: "cosmos-sdk/GasInfo",
  encode(
    message: GasInfo,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.gasWanted !== BigInt(0)) {
      writer.uint32(8).uint64(message.gasWanted);
    }
    if (message.gasUsed !== BigInt(0)) {
      writer.uint32(16).uint64(message.gasUsed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GasInfo {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gasWanted = reader.uint64();
          break;
        case 2:
          message.gasUsed = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GasInfo>): GasInfo {
    const message = createBaseGasInfo();
    message.gasWanted =
      object.gasWanted !== undefined && object.gasWanted !== null
        ? BigInt(object.gasWanted.toString())
        : BigInt(0);
    message.gasUsed =
      object.gasUsed !== undefined && object.gasUsed !== null
        ? BigInt(object.gasUsed.toString())
        : BigInt(0);
    return message;
  },
  fromAmino(object: GasInfoAmino): GasInfo {
    return {
      gasWanted: BigInt(object.gas_wanted),
      gasUsed: BigInt(object.gas_used),
    };
  },
  toAmino(message: GasInfo): GasInfoAmino {
    const obj: any = {};
    obj.gas_wanted = message.gasWanted
      ? message.gasWanted.toString()
      : undefined;
    obj.gas_used = message.gasUsed ? message.gasUsed.toString() : undefined;
    return obj;
  },
};
function createBaseResult(): Result {
  return {
    data: new Uint8Array(),
    log: "",
    events: [],
  };
}
export const Result = {
  typeUrl: "/cosmos.base.abci.v1beta1.Result",
  aminoType: "cosmos-sdk/Result",
  encode(
    message: Result,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(18).string(message.log);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Result {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.log = reader.string();
          break;
        case 3:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Result>): Result {
    const message = createBaseResult();
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ResultAmino): Result {
    return {
      data: object.data,
      log: object.log,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromAmino(e))
        : [],
    };
  },
  toAmino(message: Result): ResultAmino {
    const obj: any = {};
    obj.data = message.data;
    obj.log = message.log;
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? Event.toAmino(e) : undefined
      );
    } else {
      obj.events = [];
    }
    return obj;
  },
};
function createBaseABCIMessageLog(): ABCIMessageLog {
  return {
    msgIndex: 0,
    log: "",
    events: [],
  };
}
export const ABCIMessageLog = {
  typeUrl: "/cosmos.base.abci.v1beta1.ABCIMessageLog",
  aminoType: "cosmos-sdk/ABCIMessageLog",
  encode(
    message: ABCIMessageLog,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.msgIndex !== 0) {
      writer.uint32(8).uint32(message.msgIndex);
    }
    if (message.log !== "") {
      writer.uint32(18).string(message.log);
    }
    for (const v of message.events) {
      StringEvent.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ABCIMessageLog {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIMessageLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgIndex = reader.uint32();
          break;
        case 2:
          message.log = reader.string();
          break;
        case 3:
          message.events.push(StringEvent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ABCIMessageLog>): ABCIMessageLog {
    const message = createBaseABCIMessageLog();
    message.msgIndex = object.msgIndex ?? 0;
    message.log = object.log ?? "";
    message.events =
      object.events?.map((e) => StringEvent.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ABCIMessageLogAmino): ABCIMessageLog {
    return {
      msgIndex: object.msg_index,
      log: object.log,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => StringEvent.fromAmino(e))
        : [],
    };
  },
  toAmino(message: ABCIMessageLog): ABCIMessageLogAmino {
    const obj: any = {};
    obj.msg_index = message.msgIndex;
    obj.log = message.log;
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? StringEvent.toAmino(e) : undefined
      );
    } else {
      obj.events = [];
    }
    return obj;
  },
};
function createBaseStringEvent(): StringEvent {
  return {
    type: "",
    attributes: [],
  };
}
export const StringEvent = {
  typeUrl: "/cosmos.base.abci.v1beta1.StringEvent",
  aminoType: "cosmos-sdk/StringEvent",
  encode(
    message: StringEvent,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      Attribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StringEvent {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.attributes.push(Attribute.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<StringEvent>): StringEvent {
    const message = createBaseStringEvent();
    message.type = object.type ?? "";
    message.attributes =
      object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: StringEventAmino): StringEvent {
    return {
      type: object.type,
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => Attribute.fromAmino(e))
        : [],
    };
  },
  toAmino(message: StringEvent): StringEventAmino {
    const obj: any = {};
    obj.type = message.type;
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) =>
        e ? Attribute.toAmino(e) : undefined
      );
    } else {
      obj.attributes = [];
    }
    return obj;
  },
};

function createBaseAttribute(): Attribute {
  return {
    key: "",
    value: "",
  };
}
export const Attribute = {
  typeUrl: "/cosmos.base.abci.v1beta1.Attribute",
  aminoType: "cosmos-sdk/Attribute",
  encode(
    message: Attribute,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Attribute {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Attribute>): Attribute {
    const message = createBaseAttribute();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: AttributeAmino): Attribute {
    return {
      key: object.key,
      value: object.value,
    };
  },
  toAmino(message: Attribute): AttributeAmino {
    const obj: any = {};
    obj.key = message.key;
    obj.value = message.value;
    return obj;
  },
};
