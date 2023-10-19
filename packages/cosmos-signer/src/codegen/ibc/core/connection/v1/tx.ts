import { Any, AnyAmino } from "../../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { isSet, DeepPartial, bytesFromBase64, base64FromBytes } from "../../../../helpers";
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export interface MsgConnectionOpenInit {
  clientId: string;
  delayPeriod: bigint;
  signer: string;
}
export interface MsgConnectionOpenInitProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenInit";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export interface MsgConnectionOpenInitAmino {
  client_id: string;
  delay_period: string;
  signer: string;
}
export interface MsgConnectionOpenInitAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenInit";
  value: MsgConnectionOpenInitAmino;
}
/**
 * MsgConnectionOpenInitResponse defines the Msg/ConnectionOpenInit response
 * type.
 */
export interface MsgConnectionOpenInitResponse {}
export interface MsgConnectionOpenInitResponseProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenInitResponse";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenInitResponse defines the Msg/ConnectionOpenInit response
 * type.
 */
export interface MsgConnectionOpenInitResponseAmino {}
export interface MsgConnectionOpenInitResponseAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenInitResponse";
  value: MsgConnectionOpenInitResponseAmino;
}
/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export interface MsgConnectionOpenTry {
  clientId: string;
  /** Deprecated: this field is unused. Crossing hellos are no longer supported in core IBC. */
  /** @deprecated */
  previousConnectionId: string;
  clientState: Any;
  delayPeriod: bigint;
  /**
   * proof of the initialization the connection on Chain A: `UNITIALIZED ->
   * INIT`
   */
  proofInit: Uint8Array;
  /** proof of client state included in message */
  proofClient: Uint8Array;
  /** proof of client consensus state */
  proofConsensus: Uint8Array;
  signer: string;
  /** optional proof data for host state machines that are unable to introspect their own consensus state */
  hostConsensusStateProof: Uint8Array;
}
export interface MsgConnectionOpenTryProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenTry";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export interface MsgConnectionOpenTryAmino {
  client_id: string;
  /** Deprecated: this field is unused. Crossing hellos are no longer supported in core IBC. */
  /** @deprecated */
  previous_connection_id: string;
  client_state?: AnyAmino;
  delay_period: string;
  /**
   * proof of the initialization the connection on Chain A: `UNITIALIZED ->
   * INIT`
   */
  proof_init: Uint8Array;
  /** proof of client state included in message */
  proof_client: Uint8Array;
  /** proof of client consensus state */
  proof_consensus: Uint8Array;
  signer: string;
  /** optional proof data for host state machines that are unable to introspect their own consensus state */
  host_consensus_state_proof: Uint8Array;
}
export interface MsgConnectionOpenTryAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenTry";
  value: MsgConnectionOpenTryAmino;
}
/** MsgConnectionOpenTryResponse defines the Msg/ConnectionOpenTry response type. */
export interface MsgConnectionOpenTryResponse {}
export interface MsgConnectionOpenTryResponseProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenTryResponse";
  value: Uint8Array;
}
/** MsgConnectionOpenTryResponse defines the Msg/ConnectionOpenTry response type. */
export interface MsgConnectionOpenTryResponseAmino {}
export interface MsgConnectionOpenTryResponseAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenTryResponse";
  value: MsgConnectionOpenTryResponseAmino;
}
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export interface MsgConnectionOpenAck {
  connectionId: string;
  counterpartyConnectionId: string;
  clientState: Any;
  /**
   * proof of the initialization the connection on Chain B: `UNITIALIZED ->
   * TRYOPEN`
   */
  proofTry: Uint8Array;
  /** proof of client state included in message */
  proofClient: Uint8Array;
  /** proof of client consensus state */
  proofConsensus: Uint8Array;
  signer: string;
  /** optional proof data for host state machines that are unable to introspect their own consensus state */
  hostConsensusStateProof: Uint8Array;
}
export interface MsgConnectionOpenAckProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenAck";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export interface MsgConnectionOpenAckAmino {
  connection_id: string;
  counterparty_connection_id: string;
  client_state?: AnyAmino;
  /**
   * proof of the initialization the connection on Chain B: `UNITIALIZED ->
   * TRYOPEN`
   */
  proof_try: Uint8Array;
  /** proof of client state included in message */
  proof_client: Uint8Array;
  /** proof of client consensus state */
  proof_consensus: Uint8Array;
  signer: string;
  /** optional proof data for host state machines that are unable to introspect their own consensus state */
  host_consensus_state_proof: Uint8Array;
}
export interface MsgConnectionOpenAckAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenAck";
  value: MsgConnectionOpenAckAmino;
}
/** MsgConnectionOpenAckResponse defines the Msg/ConnectionOpenAck response type. */
export interface MsgConnectionOpenAckResponse {}
export interface MsgConnectionOpenAckResponseProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenAckResponse";
  value: Uint8Array;
}
/** MsgConnectionOpenAckResponse defines the Msg/ConnectionOpenAck response type. */
export interface MsgConnectionOpenAckResponseAmino {}
export interface MsgConnectionOpenAckResponseAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenAckResponse";
  value: MsgConnectionOpenAckResponseAmino;
}
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export interface MsgConnectionOpenConfirm {
  connectionId: string;
  /** proof for the change of the connection state on Chain A: `INIT -> OPEN` */
  proofAck: Uint8Array;
  signer: string;
}
export interface MsgConnectionOpenConfirmProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenConfirm";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export interface MsgConnectionOpenConfirmAmino {
  connection_id: string;
  /** proof for the change of the connection state on Chain A: `INIT -> OPEN` */
  proof_ack: Uint8Array;
  signer: string;
}
export interface MsgConnectionOpenConfirmAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenConfirm";
  value: MsgConnectionOpenConfirmAmino;
}
/**
 * MsgConnectionOpenConfirmResponse defines the Msg/ConnectionOpenConfirm
 * response type.
 */
export interface MsgConnectionOpenConfirmResponse {}
export interface MsgConnectionOpenConfirmResponseProtoMsg {
  typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenConfirmResponse";
  value: Uint8Array;
}
/**
 * MsgConnectionOpenConfirmResponse defines the Msg/ConnectionOpenConfirm
 * response type.
 */
export interface MsgConnectionOpenConfirmResponseAmino {}
export interface MsgConnectionOpenConfirmResponseAminoMsg {
  type: "cosmos-sdk/MsgConnectionOpenConfirmResponse";
  value: MsgConnectionOpenConfirmResponseAmino;
}
function createBaseMsgConnectionOpenInit(): MsgConnectionOpenInit {
  return {
    clientId: "",
    delayPeriod: BigInt(0),
    signer: ""
  };
}
export const MsgConnectionOpenInit = {
  encode(message: MsgConnectionOpenInit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.delayPeriod !== BigInt(0)) {
      writer.uint32(32).uint64(message.delayPeriod);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenInit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 4:
          message.delayPeriod = reader.uint64();
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConnectionOpenInit {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      delayPeriod: isSet(object.delayPeriod) ? BigInt(object.delayPeriod.toString()) : BigInt(0),
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgConnectionOpenInit): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || BigInt(0)).toString());
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConnectionOpenInit>): MsgConnectionOpenInit {
    const message = createBaseMsgConnectionOpenInit();
    message.clientId = object.clientId ?? "";
    message.delayPeriod = object.delayPeriod !== undefined && object.delayPeriod !== null ? BigInt(object.delayPeriod.toString()) : BigInt(0);
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgConnectionOpenInitAmino): MsgConnectionOpenInit {
    return {
      clientId: object.client_id,
      delayPeriod: BigInt(object.delay_period),
      signer: object.signer
    };
  },
  toAmino(message: MsgConnectionOpenInit): MsgConnectionOpenInitAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.delay_period = message.delayPeriod ? message.delayPeriod.toString() : undefined;
    obj.signer = message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenInitAminoMsg): MsgConnectionOpenInit {
    return MsgConnectionOpenInit.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenInit): MsgConnectionOpenInitAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenInit",
      value: MsgConnectionOpenInit.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenInitProtoMsg): MsgConnectionOpenInit {
    return MsgConnectionOpenInit.decode(message.value);
  },
  toProto(message: MsgConnectionOpenInit): Uint8Array {
    return MsgConnectionOpenInit.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenInit): MsgConnectionOpenInitProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenInit",
      value: MsgConnectionOpenInit.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenInitResponse(): MsgConnectionOpenInitResponse {
  return {};
}
export const MsgConnectionOpenInitResponse = {
  encode(_: MsgConnectionOpenInitResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenInitResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConnectionOpenInitResponse {
    return {};
  },
  toJSON(_: MsgConnectionOpenInitResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgConnectionOpenInitResponse>): MsgConnectionOpenInitResponse {
    const message = createBaseMsgConnectionOpenInitResponse();
    return message;
  },
  fromAmino(_: MsgConnectionOpenInitResponseAmino): MsgConnectionOpenInitResponse {
    return {};
  },
  toAmino(_: MsgConnectionOpenInitResponse): MsgConnectionOpenInitResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenInitResponseAminoMsg): MsgConnectionOpenInitResponse {
    return MsgConnectionOpenInitResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenInitResponse): MsgConnectionOpenInitResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenInitResponse",
      value: MsgConnectionOpenInitResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenInitResponseProtoMsg): MsgConnectionOpenInitResponse {
    return MsgConnectionOpenInitResponse.decode(message.value);
  },
  toProto(message: MsgConnectionOpenInitResponse): Uint8Array {
    return MsgConnectionOpenInitResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenInitResponse): MsgConnectionOpenInitResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenInitResponse",
      value: MsgConnectionOpenInitResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenTry(): MsgConnectionOpenTry {
  return {
    clientId: "",
    previousConnectionId: "",
    clientState: Any.fromPartial({}),
    delayPeriod: BigInt(0),
    proofInit: new Uint8Array(),
    proofClient: new Uint8Array(),
    proofConsensus: new Uint8Array(),
    signer: "",
    hostConsensusStateProof: new Uint8Array()
  };
}
export const MsgConnectionOpenTry = {
  encode(message: MsgConnectionOpenTry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.previousConnectionId !== "") {
      writer.uint32(18).string(message.previousConnectionId);
    }
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(26).fork()).ldelim();
    }
    if (message.delayPeriod !== BigInt(0)) {
      writer.uint32(40).uint64(message.delayPeriod);
    }
    if (message.proofInit.length !== 0) {
      writer.uint32(66).bytes(message.proofInit);
    }
    if (message.proofClient.length !== 0) {
      writer.uint32(74).bytes(message.proofClient);
    }
    if (message.proofConsensus.length !== 0) {
      writer.uint32(82).bytes(message.proofConsensus);
    }
    if (message.signer !== "") {
      writer.uint32(98).string(message.signer);
    }
    if (message.hostConsensusStateProof.length !== 0) {
      writer.uint32(106).bytes(message.hostConsensusStateProof);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenTry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.previousConnectionId = reader.string();
          break;
        case 3:
          message.clientState = Any.decode(reader, reader.uint32());
          break;
        case 5:
          message.delayPeriod = reader.uint64();
          break;
        case 8:
          message.proofInit = reader.bytes();
          break;
        case 9:
          message.proofClient = reader.bytes();
          break;
        case 10:
          message.proofConsensus = reader.bytes();
          break;
        case 12:
          message.signer = reader.string();
          break;
        case 13:
          message.hostConsensusStateProof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConnectionOpenTry {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      previousConnectionId: isSet(object.previousConnectionId) ? String(object.previousConnectionId) : "",
      clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
      delayPeriod: isSet(object.delayPeriod) ? BigInt(object.delayPeriod.toString()) : BigInt(0),
      proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(),
      proofClient: isSet(object.proofClient) ? bytesFromBase64(object.proofClient) : new Uint8Array(),
      proofConsensus: isSet(object.proofConsensus) ? bytesFromBase64(object.proofConsensus) : new Uint8Array(),
      signer: isSet(object.signer) ? String(object.signer) : "",
      hostConsensusStateProof: isSet(object.hostConsensusStateProof) ? bytesFromBase64(object.hostConsensusStateProof) : new Uint8Array()
    };
  },
  toJSON(message: MsgConnectionOpenTry): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.previousConnectionId !== undefined && (obj.previousConnectionId = message.previousConnectionId);
    message.clientState !== undefined && (obj.clientState = message.clientState ? Any.toJSON(message.clientState) : undefined);
    message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || BigInt(0)).toString());
    message.proofInit !== undefined && (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
    message.proofClient !== undefined && (obj.proofClient = base64FromBytes(message.proofClient !== undefined ? message.proofClient : new Uint8Array()));
    message.proofConsensus !== undefined && (obj.proofConsensus = base64FromBytes(message.proofConsensus !== undefined ? message.proofConsensus : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer);
    message.hostConsensusStateProof !== undefined && (obj.hostConsensusStateProof = base64FromBytes(message.hostConsensusStateProof !== undefined ? message.hostConsensusStateProof : new Uint8Array()));
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConnectionOpenTry>): MsgConnectionOpenTry {
    const message = createBaseMsgConnectionOpenTry();
    message.clientId = object.clientId ?? "";
    message.previousConnectionId = object.previousConnectionId ?? "";
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.delayPeriod = object.delayPeriod !== undefined && object.delayPeriod !== null ? BigInt(object.delayPeriod.toString()) : BigInt(0);
    message.proofInit = object.proofInit ?? new Uint8Array();
    message.proofClient = object.proofClient ?? new Uint8Array();
    message.proofConsensus = object.proofConsensus ?? new Uint8Array();
    message.signer = object.signer ?? "";
    message.hostConsensusStateProof = object.hostConsensusStateProof ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgConnectionOpenTryAmino): MsgConnectionOpenTry {
    return {
      clientId: object.client_id,
      previousConnectionId: object.previous_connection_id,
      clientState: object?.client_state ? Any.fromAmino(object.client_state) : undefined,
      delayPeriod: BigInt(object.delay_period),
      proofInit: object.proof_init,
      proofClient: object.proof_client,
      proofConsensus: object.proof_consensus,
      signer: object.signer,
      hostConsensusStateProof: object.host_consensus_state_proof
    };
  },
  toAmino(message: MsgConnectionOpenTry): MsgConnectionOpenTryAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.previous_connection_id = message.previousConnectionId;
    obj.client_state = message.clientState ? Any.toAmino(message.clientState) : undefined;
    obj.delay_period = message.delayPeriod ? message.delayPeriod.toString() : undefined;
    obj.proof_init = message.proofInit;
    obj.proof_client = message.proofClient;
    obj.proof_consensus = message.proofConsensus;
    obj.signer = message.signer;
    obj.host_consensus_state_proof = message.hostConsensusStateProof;
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenTryAminoMsg): MsgConnectionOpenTry {
    return MsgConnectionOpenTry.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenTry): MsgConnectionOpenTryAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenTry",
      value: MsgConnectionOpenTry.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenTryProtoMsg): MsgConnectionOpenTry {
    return MsgConnectionOpenTry.decode(message.value);
  },
  toProto(message: MsgConnectionOpenTry): Uint8Array {
    return MsgConnectionOpenTry.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenTry): MsgConnectionOpenTryProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenTry",
      value: MsgConnectionOpenTry.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenTryResponse(): MsgConnectionOpenTryResponse {
  return {};
}
export const MsgConnectionOpenTryResponse = {
  encode(_: MsgConnectionOpenTryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenTryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConnectionOpenTryResponse {
    return {};
  },
  toJSON(_: MsgConnectionOpenTryResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgConnectionOpenTryResponse>): MsgConnectionOpenTryResponse {
    const message = createBaseMsgConnectionOpenTryResponse();
    return message;
  },
  fromAmino(_: MsgConnectionOpenTryResponseAmino): MsgConnectionOpenTryResponse {
    return {};
  },
  toAmino(_: MsgConnectionOpenTryResponse): MsgConnectionOpenTryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenTryResponseAminoMsg): MsgConnectionOpenTryResponse {
    return MsgConnectionOpenTryResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenTryResponse): MsgConnectionOpenTryResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenTryResponse",
      value: MsgConnectionOpenTryResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenTryResponseProtoMsg): MsgConnectionOpenTryResponse {
    return MsgConnectionOpenTryResponse.decode(message.value);
  },
  toProto(message: MsgConnectionOpenTryResponse): Uint8Array {
    return MsgConnectionOpenTryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenTryResponse): MsgConnectionOpenTryResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenTryResponse",
      value: MsgConnectionOpenTryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenAck(): MsgConnectionOpenAck {
  return {
    connectionId: "",
    counterpartyConnectionId: "",
    clientState: Any.fromPartial({}),
    proofTry: new Uint8Array(),
    proofClient: new Uint8Array(),
    proofConsensus: new Uint8Array(),
    signer: "",
    hostConsensusStateProof: new Uint8Array()
  };
}
export const MsgConnectionOpenAck = {
  encode(message: MsgConnectionOpenAck, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.counterpartyConnectionId !== "") {
      writer.uint32(18).string(message.counterpartyConnectionId);
    }
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(34).fork()).ldelim();
    }
    if (message.proofTry.length !== 0) {
      writer.uint32(50).bytes(message.proofTry);
    }
    if (message.proofClient.length !== 0) {
      writer.uint32(58).bytes(message.proofClient);
    }
    if (message.proofConsensus.length !== 0) {
      writer.uint32(66).bytes(message.proofConsensus);
    }
    if (message.signer !== "") {
      writer.uint32(82).string(message.signer);
    }
    if (message.hostConsensusStateProof.length !== 0) {
      writer.uint32(90).bytes(message.hostConsensusStateProof);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenAck {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.counterpartyConnectionId = reader.string();
          break;
        case 4:
          message.clientState = Any.decode(reader, reader.uint32());
          break;
        case 6:
          message.proofTry = reader.bytes();
          break;
        case 7:
          message.proofClient = reader.bytes();
          break;
        case 8:
          message.proofConsensus = reader.bytes();
          break;
        case 10:
          message.signer = reader.string();
          break;
        case 11:
          message.hostConsensusStateProof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConnectionOpenAck {
    return {
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      counterpartyConnectionId: isSet(object.counterpartyConnectionId) ? String(object.counterpartyConnectionId) : "",
      clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
      proofTry: isSet(object.proofTry) ? bytesFromBase64(object.proofTry) : new Uint8Array(),
      proofClient: isSet(object.proofClient) ? bytesFromBase64(object.proofClient) : new Uint8Array(),
      proofConsensus: isSet(object.proofConsensus) ? bytesFromBase64(object.proofConsensus) : new Uint8Array(),
      signer: isSet(object.signer) ? String(object.signer) : "",
      hostConsensusStateProof: isSet(object.hostConsensusStateProof) ? bytesFromBase64(object.hostConsensusStateProof) : new Uint8Array()
    };
  },
  toJSON(message: MsgConnectionOpenAck): unknown {
    const obj: any = {};
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    message.counterpartyConnectionId !== undefined && (obj.counterpartyConnectionId = message.counterpartyConnectionId);
    message.clientState !== undefined && (obj.clientState = message.clientState ? Any.toJSON(message.clientState) : undefined);
    message.proofTry !== undefined && (obj.proofTry = base64FromBytes(message.proofTry !== undefined ? message.proofTry : new Uint8Array()));
    message.proofClient !== undefined && (obj.proofClient = base64FromBytes(message.proofClient !== undefined ? message.proofClient : new Uint8Array()));
    message.proofConsensus !== undefined && (obj.proofConsensus = base64FromBytes(message.proofConsensus !== undefined ? message.proofConsensus : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer);
    message.hostConsensusStateProof !== undefined && (obj.hostConsensusStateProof = base64FromBytes(message.hostConsensusStateProof !== undefined ? message.hostConsensusStateProof : new Uint8Array()));
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConnectionOpenAck>): MsgConnectionOpenAck {
    const message = createBaseMsgConnectionOpenAck();
    message.connectionId = object.connectionId ?? "";
    message.counterpartyConnectionId = object.counterpartyConnectionId ?? "";
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.proofTry = object.proofTry ?? new Uint8Array();
    message.proofClient = object.proofClient ?? new Uint8Array();
    message.proofConsensus = object.proofConsensus ?? new Uint8Array();
    message.signer = object.signer ?? "";
    message.hostConsensusStateProof = object.hostConsensusStateProof ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgConnectionOpenAckAmino): MsgConnectionOpenAck {
    return {
      connectionId: object.connection_id,
      counterpartyConnectionId: object.counterparty_connection_id,
      clientState: object?.client_state ? Any.fromAmino(object.client_state) : undefined,
      proofTry: object.proof_try,
      proofClient: object.proof_client,
      proofConsensus: object.proof_consensus,
      signer: object.signer,
      hostConsensusStateProof: object.host_consensus_state_proof
    };
  },
  toAmino(message: MsgConnectionOpenAck): MsgConnectionOpenAckAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId;
    obj.counterparty_connection_id = message.counterpartyConnectionId;
    obj.client_state = message.clientState ? Any.toAmino(message.clientState) : undefined;
    obj.proof_try = message.proofTry;
    obj.proof_client = message.proofClient;
    obj.proof_consensus = message.proofConsensus;
    obj.signer = message.signer;
    obj.host_consensus_state_proof = message.hostConsensusStateProof;
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenAckAminoMsg): MsgConnectionOpenAck {
    return MsgConnectionOpenAck.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenAck): MsgConnectionOpenAckAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenAck",
      value: MsgConnectionOpenAck.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenAckProtoMsg): MsgConnectionOpenAck {
    return MsgConnectionOpenAck.decode(message.value);
  },
  toProto(message: MsgConnectionOpenAck): Uint8Array {
    return MsgConnectionOpenAck.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenAck): MsgConnectionOpenAckProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenAck",
      value: MsgConnectionOpenAck.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenAckResponse(): MsgConnectionOpenAckResponse {
  return {};
}
export const MsgConnectionOpenAckResponse = {
  encode(_: MsgConnectionOpenAckResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenAckResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConnectionOpenAckResponse {
    return {};
  },
  toJSON(_: MsgConnectionOpenAckResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgConnectionOpenAckResponse>): MsgConnectionOpenAckResponse {
    const message = createBaseMsgConnectionOpenAckResponse();
    return message;
  },
  fromAmino(_: MsgConnectionOpenAckResponseAmino): MsgConnectionOpenAckResponse {
    return {};
  },
  toAmino(_: MsgConnectionOpenAckResponse): MsgConnectionOpenAckResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenAckResponseAminoMsg): MsgConnectionOpenAckResponse {
    return MsgConnectionOpenAckResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenAckResponse): MsgConnectionOpenAckResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenAckResponse",
      value: MsgConnectionOpenAckResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenAckResponseProtoMsg): MsgConnectionOpenAckResponse {
    return MsgConnectionOpenAckResponse.decode(message.value);
  },
  toProto(message: MsgConnectionOpenAckResponse): Uint8Array {
    return MsgConnectionOpenAckResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenAckResponse): MsgConnectionOpenAckResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenAckResponse",
      value: MsgConnectionOpenAckResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenConfirm(): MsgConnectionOpenConfirm {
  return {
    connectionId: "",
    proofAck: new Uint8Array(),
    signer: ""
  };
}
export const MsgConnectionOpenConfirm = {
  encode(message: MsgConnectionOpenConfirm, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.proofAck.length !== 0) {
      writer.uint32(18).bytes(message.proofAck);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenConfirm {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.proofAck = reader.bytes();
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConnectionOpenConfirm {
    return {
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      proofAck: isSet(object.proofAck) ? bytesFromBase64(object.proofAck) : new Uint8Array(),
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgConnectionOpenConfirm): unknown {
    const obj: any = {};
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    message.proofAck !== undefined && (obj.proofAck = base64FromBytes(message.proofAck !== undefined ? message.proofAck : new Uint8Array()));
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConnectionOpenConfirm>): MsgConnectionOpenConfirm {
    const message = createBaseMsgConnectionOpenConfirm();
    message.connectionId = object.connectionId ?? "";
    message.proofAck = object.proofAck ?? new Uint8Array();
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgConnectionOpenConfirmAmino): MsgConnectionOpenConfirm {
    return {
      connectionId: object.connection_id,
      proofAck: object.proof_ack,
      signer: object.signer
    };
  },
  toAmino(message: MsgConnectionOpenConfirm): MsgConnectionOpenConfirmAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId;
    obj.proof_ack = message.proofAck;
    obj.signer = message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenConfirmAminoMsg): MsgConnectionOpenConfirm {
    return MsgConnectionOpenConfirm.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenConfirm): MsgConnectionOpenConfirmAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenConfirm",
      value: MsgConnectionOpenConfirm.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenConfirmProtoMsg): MsgConnectionOpenConfirm {
    return MsgConnectionOpenConfirm.decode(message.value);
  },
  toProto(message: MsgConnectionOpenConfirm): Uint8Array {
    return MsgConnectionOpenConfirm.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenConfirm): MsgConnectionOpenConfirmProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
      value: MsgConnectionOpenConfirm.encode(message).finish()
    };
  }
};
function createBaseMsgConnectionOpenConfirmResponse(): MsgConnectionOpenConfirmResponse {
  return {};
}
export const MsgConnectionOpenConfirmResponse = {
  encode(_: MsgConnectionOpenConfirmResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConnectionOpenConfirmResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConnectionOpenConfirmResponse {
    return {};
  },
  toJSON(_: MsgConnectionOpenConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgConnectionOpenConfirmResponse>): MsgConnectionOpenConfirmResponse {
    const message = createBaseMsgConnectionOpenConfirmResponse();
    return message;
  },
  fromAmino(_: MsgConnectionOpenConfirmResponseAmino): MsgConnectionOpenConfirmResponse {
    return {};
  },
  toAmino(_: MsgConnectionOpenConfirmResponse): MsgConnectionOpenConfirmResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConnectionOpenConfirmResponseAminoMsg): MsgConnectionOpenConfirmResponse {
    return MsgConnectionOpenConfirmResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConnectionOpenConfirmResponse): MsgConnectionOpenConfirmResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgConnectionOpenConfirmResponse",
      value: MsgConnectionOpenConfirmResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgConnectionOpenConfirmResponseProtoMsg): MsgConnectionOpenConfirmResponse {
    return MsgConnectionOpenConfirmResponse.decode(message.value);
  },
  toProto(message: MsgConnectionOpenConfirmResponse): Uint8Array {
    return MsgConnectionOpenConfirmResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConnectionOpenConfirmResponse): MsgConnectionOpenConfirmResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.connection.v1.MsgConnectionOpenConfirmResponse",
      value: MsgConnectionOpenConfirmResponse.encode(message).finish()
    };
  }
};