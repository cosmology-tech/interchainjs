import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/** MsgInit defines the Create request type for the Msg/Create RPC method. */
export interface MsgInit {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** account_type is the type of the account to be created. */
  accountType: string;
  /**
   * message is the message to be sent to the account, it's up to the account
   * implementation to decide what encoding format should be used to interpret
   * this message.
   */
  message: Uint8Array;
}
export interface MsgInitProtoMsg {
  typeUrl: "/cosmos.accounts.v1.MsgInit";
  value: Uint8Array;
}
/** MsgInit defines the Create request type for the Msg/Create RPC method. */
export interface MsgInitAmino {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** account_type is the type of the account to be created. */
  account_type: string;
  /**
   * message is the message to be sent to the account, it's up to the account
   * implementation to decide what encoding format should be used to interpret
   * this message.
   */
  message: Uint8Array;
}
export interface MsgInitAminoMsg {
  type: "cosmos-sdk/MsgInit";
  value: MsgInitAmino;
}
/** MsgInit defines the Create request type for the Msg/Create RPC method. */
export interface MsgInitSDKType {
  sender: string;
  account_type: string;
  message: Uint8Array;
}
/** MsgInitResponse defines the Create response type for the Msg/Create RPC method. */
export interface MsgInitResponse {
  /** account_address is the address of the newly created account. */
  accountAddress: string;
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}
export interface MsgInitResponseProtoMsg {
  typeUrl: "/cosmos.accounts.v1.MsgInitResponse";
  value: Uint8Array;
}
/** MsgInitResponse defines the Create response type for the Msg/Create RPC method. */
export interface MsgInitResponseAmino {
  /** account_address is the address of the newly created account. */
  account_address: string;
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}
export interface MsgInitResponseAminoMsg {
  type: "cosmos-sdk/MsgInitResponse";
  value: MsgInitResponseAmino;
}
/** MsgInitResponse defines the Create response type for the Msg/Create RPC method. */
export interface MsgInitResponseSDKType {
  account_address: string;
  response: Uint8Array;
}
/** MsgExecute defines the Execute request type for the Msg/Execute RPC method. */
export interface MsgExecute {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** target is the address of the account to be executed. */
  target: string;
  /** message is the message to be sent to the account, it's up to the account */
  message: Uint8Array;
}
export interface MsgExecuteProtoMsg {
  typeUrl: "/cosmos.accounts.v1.MsgExecute";
  value: Uint8Array;
}
/** MsgExecute defines the Execute request type for the Msg/Execute RPC method. */
export interface MsgExecuteAmino {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** target is the address of the account to be executed. */
  target: string;
  /** message is the message to be sent to the account, it's up to the account */
  message: Uint8Array;
}
export interface MsgExecuteAminoMsg {
  type: "cosmos-sdk/MsgExecute";
  value: MsgExecuteAmino;
}
/** MsgExecute defines the Execute request type for the Msg/Execute RPC method. */
export interface MsgExecuteSDKType {
  sender: string;
  target: string;
  message: Uint8Array;
}
/** MsgExecuteResponse defines the Execute response type for the Msg/Execute RPC method. */
export interface MsgExecuteResponse {
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}
export interface MsgExecuteResponseProtoMsg {
  typeUrl: "/cosmos.accounts.v1.MsgExecuteResponse";
  value: Uint8Array;
}
/** MsgExecuteResponse defines the Execute response type for the Msg/Execute RPC method. */
export interface MsgExecuteResponseAmino {
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}
export interface MsgExecuteResponseAminoMsg {
  type: "cosmos-sdk/MsgExecuteResponse";
  value: MsgExecuteResponseAmino;
}
/** MsgExecuteResponse defines the Execute response type for the Msg/Execute RPC method. */
export interface MsgExecuteResponseSDKType {
  response: Uint8Array;
}
function createBaseMsgInit(): MsgInit {
  return {
    sender: "",
    accountType: "",
    message: new Uint8Array()
  };
}
export const MsgInit = {
  typeUrl: "/cosmos.accounts.v1.MsgInit",
  aminoType: "cosmos-sdk/MsgInit",
  encode(message: MsgInit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.accountType !== "") {
      writer.uint32(18).string(message.accountType);
    }
    if (message.message.length !== 0) {
      writer.uint32(26).bytes(message.message);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgInit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.accountType = reader.string();
          break;
        case 3:
          message.message = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgInit>): MsgInit {
    const message = createBaseMsgInit();
    message.sender = object.sender ?? "";
    message.accountType = object.accountType ?? "";
    message.message = object.message ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgInitAmino): MsgInit {
    return {
      sender: object.sender,
      accountType: object.account_type,
      message: object.message
    };
  },
  toAmino(message: MsgInit): MsgInitAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.account_type = message.accountType;
    obj.message = message.message;
    return obj;
  },
  fromAminoMsg(object: MsgInitAminoMsg): MsgInit {
    return MsgInit.fromAmino(object.value);
  },
  toAminoMsg(message: MsgInit): MsgInitAminoMsg {
    return {
      type: "cosmos-sdk/MsgInit",
      value: MsgInit.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgInitProtoMsg): MsgInit {
    return MsgInit.decode(message.value);
  },
  toProto(message: MsgInit): Uint8Array {
    return MsgInit.encode(message).finish();
  },
  toProtoMsg(message: MsgInit): MsgInitProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.MsgInit",
      value: MsgInit.encode(message).finish()
    };
  }
};
function createBaseMsgInitResponse(): MsgInitResponse {
  return {
    accountAddress: "",
    response: new Uint8Array()
  };
}
export const MsgInitResponse = {
  typeUrl: "/cosmos.accounts.v1.MsgInitResponse",
  aminoType: "cosmos-sdk/MsgInitResponse",
  encode(message: MsgInitResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.response.length !== 0) {
      writer.uint32(18).bytes(message.response);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgInitResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        case 2:
          message.response = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgInitResponse>): MsgInitResponse {
    const message = createBaseMsgInitResponse();
    message.accountAddress = object.accountAddress ?? "";
    message.response = object.response ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgInitResponseAmino): MsgInitResponse {
    return {
      accountAddress: object.account_address,
      response: object.response
    };
  },
  toAmino(message: MsgInitResponse): MsgInitResponseAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress;
    obj.response = message.response;
    return obj;
  },
  fromAminoMsg(object: MsgInitResponseAminoMsg): MsgInitResponse {
    return MsgInitResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgInitResponse): MsgInitResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgInitResponse",
      value: MsgInitResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgInitResponseProtoMsg): MsgInitResponse {
    return MsgInitResponse.decode(message.value);
  },
  toProto(message: MsgInitResponse): Uint8Array {
    return MsgInitResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgInitResponse): MsgInitResponseProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.MsgInitResponse",
      value: MsgInitResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExecute(): MsgExecute {
  return {
    sender: "",
    target: "",
    message: new Uint8Array()
  };
}
export const MsgExecute = {
  typeUrl: "/cosmos.accounts.v1.MsgExecute",
  aminoType: "cosmos-sdk/MsgExecute",
  encode(message: MsgExecute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.target !== "") {
      writer.uint32(18).string(message.target);
    }
    if (message.message.length !== 0) {
      writer.uint32(26).bytes(message.message);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExecute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.target = reader.string();
          break;
        case 3:
          message.message = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgExecute>): MsgExecute {
    const message = createBaseMsgExecute();
    message.sender = object.sender ?? "";
    message.target = object.target ?? "";
    message.message = object.message ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgExecuteAmino): MsgExecute {
    return {
      sender: object.sender,
      target: object.target,
      message: object.message
    };
  },
  toAmino(message: MsgExecute): MsgExecuteAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.target = message.target;
    obj.message = message.message;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteAminoMsg): MsgExecute {
    return MsgExecute.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExecute): MsgExecuteAminoMsg {
    return {
      type: "cosmos-sdk/MsgExecute",
      value: MsgExecute.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgExecuteProtoMsg): MsgExecute {
    return MsgExecute.decode(message.value);
  },
  toProto(message: MsgExecute): Uint8Array {
    return MsgExecute.encode(message).finish();
  },
  toProtoMsg(message: MsgExecute): MsgExecuteProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.MsgExecute",
      value: MsgExecute.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteResponse(): MsgExecuteResponse {
  return {
    response: new Uint8Array()
  };
}
export const MsgExecuteResponse = {
  typeUrl: "/cosmos.accounts.v1.MsgExecuteResponse",
  aminoType: "cosmos-sdk/MsgExecuteResponse",
  encode(message: MsgExecuteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.response.length !== 0) {
      writer.uint32(10).bytes(message.response);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExecuteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.response = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<MsgExecuteResponse>): MsgExecuteResponse {
    const message = createBaseMsgExecuteResponse();
    message.response = object.response ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgExecuteResponseAmino): MsgExecuteResponse {
    return {
      response: object.response
    };
  },
  toAmino(message: MsgExecuteResponse): MsgExecuteResponseAmino {
    const obj: any = {};
    obj.response = message.response;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteResponseAminoMsg): MsgExecuteResponse {
    return MsgExecuteResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExecuteResponse): MsgExecuteResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgExecuteResponse",
      value: MsgExecuteResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgExecuteResponseProtoMsg): MsgExecuteResponse {
    return MsgExecuteResponse.decode(message.value);
  },
  toProto(message: MsgExecuteResponse): Uint8Array {
    return MsgExecuteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteResponse): MsgExecuteResponseProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.MsgExecuteResponse",
      value: MsgExecuteResponse.encode(message).finish()
    };
  }
};