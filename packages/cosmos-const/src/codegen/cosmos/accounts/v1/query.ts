import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
/** AccountQueryRequest is the request type for the Query/AccountQuery RPC */
export interface AccountQueryRequest {
  /** target defines the account to be queried. */
  target: string;
  /** request defines the query message being sent to the account. */
  request: Uint8Array;
}
export interface AccountQueryRequestProtoMsg {
  typeUrl: "/cosmos.accounts.v1.AccountQueryRequest";
  value: Uint8Array;
}
/** AccountQueryRequest is the request type for the Query/AccountQuery RPC */
export interface AccountQueryRequestAmino {
  /** target defines the account to be queried. */
  target: string;
  /** request defines the query message being sent to the account. */
  request: Uint8Array;
}
export interface AccountQueryRequestAminoMsg {
  type: "cosmos-sdk/AccountQueryRequest";
  value: AccountQueryRequestAmino;
}
/** AccountQueryRequest is the request type for the Query/AccountQuery RPC */
export interface AccountQueryRequestSDKType {
  target: string;
  request: Uint8Array;
}
/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface AccountQueryResponse {
  /** response defines the query response of the account. */
  response: Uint8Array;
}
export interface AccountQueryResponseProtoMsg {
  typeUrl: "/cosmos.accounts.v1.AccountQueryResponse";
  value: Uint8Array;
}
/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface AccountQueryResponseAmino {
  /** response defines the query response of the account. */
  response: Uint8Array;
}
export interface AccountQueryResponseAminoMsg {
  type: "cosmos-sdk/AccountQueryResponse";
  value: AccountQueryResponseAmino;
}
/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface AccountQueryResponseSDKType {
  response: Uint8Array;
}
function createBaseAccountQueryRequest(): AccountQueryRequest {
  return {
    target: "",
    request: new Uint8Array()
  };
}
export const AccountQueryRequest = {
  typeUrl: "/cosmos.accounts.v1.AccountQueryRequest",
  aminoType: "cosmos-sdk/AccountQueryRequest",
  encode(message: AccountQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.target !== "") {
      writer.uint32(10).string(message.target);
    }
    if (message.request.length !== 0) {
      writer.uint32(18).bytes(message.request);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccountQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.target = reader.string();
          break;
        case 2:
          message.request = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AccountQueryRequest>): AccountQueryRequest {
    const message = createBaseAccountQueryRequest();
    message.target = object.target ?? "";
    message.request = object.request ?? new Uint8Array();
    return message;
  },
  fromAmino(object: AccountQueryRequestAmino): AccountQueryRequest {
    return {
      target: object.target,
      request: object.request
    };
  },
  toAmino(message: AccountQueryRequest): AccountQueryRequestAmino {
    const obj: any = {};
    obj.target = message.target;
    obj.request = message.request;
    return obj;
  },
  fromAminoMsg(object: AccountQueryRequestAminoMsg): AccountQueryRequest {
    return AccountQueryRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AccountQueryRequest): AccountQueryRequestAminoMsg {
    return {
      type: "cosmos-sdk/AccountQueryRequest",
      value: AccountQueryRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: AccountQueryRequestProtoMsg): AccountQueryRequest {
    return AccountQueryRequest.decode(message.value);
  },
  toProto(message: AccountQueryRequest): Uint8Array {
    return AccountQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: AccountQueryRequest): AccountQueryRequestProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.AccountQueryRequest",
      value: AccountQueryRequest.encode(message).finish()
    };
  }
};
function createBaseAccountQueryResponse(): AccountQueryResponse {
  return {
    response: new Uint8Array()
  };
}
export const AccountQueryResponse = {
  typeUrl: "/cosmos.accounts.v1.AccountQueryResponse",
  aminoType: "cosmos-sdk/AccountQueryResponse",
  encode(message: AccountQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.response.length !== 0) {
      writer.uint32(10).bytes(message.response);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccountQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryResponse();
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
  fromPartial(object: DeepPartial<AccountQueryResponse>): AccountQueryResponse {
    const message = createBaseAccountQueryResponse();
    message.response = object.response ?? new Uint8Array();
    return message;
  },
  fromAmino(object: AccountQueryResponseAmino): AccountQueryResponse {
    return {
      response: object.response
    };
  },
  toAmino(message: AccountQueryResponse): AccountQueryResponseAmino {
    const obj: any = {};
    obj.response = message.response;
    return obj;
  },
  fromAminoMsg(object: AccountQueryResponseAminoMsg): AccountQueryResponse {
    return AccountQueryResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AccountQueryResponse): AccountQueryResponseAminoMsg {
    return {
      type: "cosmos-sdk/AccountQueryResponse",
      value: AccountQueryResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: AccountQueryResponseProtoMsg): AccountQueryResponse {
    return AccountQueryResponse.decode(message.value);
  },
  toProto(message: AccountQueryResponse): Uint8Array {
    return AccountQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: AccountQueryResponse): AccountQueryResponseProtoMsg {
    return {
      typeUrl: "/cosmos.accounts.v1.AccountQueryResponse",
      value: AccountQueryResponse.encode(message).finish()
    };
  }
};