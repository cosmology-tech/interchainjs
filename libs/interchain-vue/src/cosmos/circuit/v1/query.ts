import { PageRequest, PageRequestAmino, PageResponse, PageResponseAmino } from "../../base/query/v1beta1/pagination";
import { Permissions, PermissionsAmino, GenesisAccountPermissions, GenesisAccountPermissionsAmino } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
import { ComputedRef } from "vue";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  address: string;
}
export interface ReactiveQueryAccountRequest {
  address: ComputedRef<string>;
}
export interface QueryAccountRequestProtoMsg {
  typeUrl: "/cosmos.circuit.v1.QueryAccountRequest";
  value: Uint8Array;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequestAmino {
  address: string;
}
export interface QueryAccountRequestAminoMsg {
  type: "cosmos-sdk/QueryAccountRequest";
  value: QueryAccountRequestAmino;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponse {
  permission?: Permissions;
}
export interface ReactiveAccountResponse {
  permission?: ComputedRef<Permissions>;
}
export interface AccountResponseProtoMsg {
  typeUrl: "/cosmos.circuit.v1.AccountResponse";
  value: Uint8Array;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponseAmino {
  permission?: PermissionsAmino;
}
export interface AccountResponseAminoMsg {
  type: "cosmos-sdk/AccountResponse";
  value: AccountResponseAmino;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
export interface ReactiveQueryAccountsRequest {
  pagination?: ComputedRef<PageRequest>;
}
export interface QueryAccountsRequestProtoMsg {
  typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest";
  value: Uint8Array;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
}
export interface QueryAccountsRequestAminoMsg {
  type: "cosmos-sdk/QueryAccountsRequest";
  value: QueryAccountsRequestAmino;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponse {
  accounts: GenesisAccountPermissions[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface ReactiveAccountsResponse {
  accounts: ComputedRef<GenesisAccountPermissions[]>;
  pagination?: ComputedRef<PageResponse>;
}
export interface AccountsResponseProtoMsg {
  typeUrl: "/cosmos.circuit.v1.AccountsResponse";
  value: Uint8Array;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponseAmino {
  accounts: GenesisAccountPermissionsAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface AccountsResponseAminoMsg {
  type: "cosmos-sdk/AccountsResponse";
  value: AccountsResponseAmino;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequest {}
export interface ReactiveQueryDisabledListRequest {}
export interface QueryDisabledListRequestProtoMsg {
  typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest";
  value: Uint8Array;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequestAmino {}
export interface QueryDisabledListRequestAminoMsg {
  type: "cosmos-sdk/QueryDisabledListRequest";
  value: QueryDisabledListRequestAmino;
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponse {
  disabledList: string[];
}
export interface ReactiveDisabledListResponse {
  disabledList: ComputedRef<string[]>;
}
export interface DisabledListResponseProtoMsg {
  typeUrl: "/cosmos.circuit.v1.DisabledListResponse";
  value: Uint8Array;
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponseAmino {
  disabled_list: string[];
}
export interface DisabledListResponseAminoMsg {
  type: "cosmos-sdk/DisabledListResponse";
  value: DisabledListResponseAmino;
}
function createBaseQueryAccountRequest(): QueryAccountRequest {
  return {
    address: ""
  };
}
export const QueryAccountRequest = {
  typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
  aminoType: "cosmos-sdk/QueryAccountRequest",
  is(o: any): o is QueryAccountRequest {
    return o && (o.$typeUrl === QueryAccountRequest.typeUrl || typeof o.address === "string");
  },
  isAmino(o: any): o is QueryAccountRequestAmino {
    return o && (o.$typeUrl === QueryAccountRequest.typeUrl || typeof o.address === "string");
  },
  encode(message: QueryAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountRequestAmino): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryAccountRequest): QueryAccountRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryAccountRequestAminoMsg): QueryAccountRequest {
    return QueryAccountRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAccountRequest): QueryAccountRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryAccountRequest",
      value: QueryAccountRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryAccountRequestProtoMsg): QueryAccountRequest {
    return QueryAccountRequest.decode(message.value);
  },
  toProto(message: QueryAccountRequest): Uint8Array {
    return QueryAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountRequest): QueryAccountRequestProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.QueryAccountRequest",
      value: QueryAccountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountRequest.typeUrl, QueryAccountRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountRequest.aminoType, QueryAccountRequest.typeUrl);
function createBaseAccountResponse(): AccountResponse {
  return {
    permission: undefined
  };
}
export const AccountResponse = {
  typeUrl: "/cosmos.circuit.v1.AccountResponse",
  aminoType: "cosmos-sdk/AccountResponse",
  is(o: any): o is AccountResponse {
    return o && o.$typeUrl === AccountResponse.typeUrl;
  },
  isAmino(o: any): o is AccountResponseAmino {
    return o && o.$typeUrl === AccountResponse.typeUrl;
  },
  encode(message: AccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.permission !== undefined) {
      Permissions.encode(message.permission, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permission = Permissions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AccountResponse>): AccountResponse {
    const message = createBaseAccountResponse();
    message.permission = object.permission !== undefined && object.permission !== null ? Permissions.fromPartial(object.permission) : undefined;
    return message;
  },
  fromAmino(object: AccountResponseAmino): AccountResponse {
    const message = createBaseAccountResponse();
    if (object.permission !== undefined && object.permission !== null) {
      message.permission = Permissions.fromAmino(object.permission);
    }
    return message;
  },
  toAmino(message: AccountResponse): AccountResponseAmino {
    const obj: any = {};
    obj.permission = message.permission ? Permissions.toAmino(message.permission) : undefined;
    return obj;
  },
  fromAminoMsg(object: AccountResponseAminoMsg): AccountResponse {
    return AccountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AccountResponse): AccountResponseAminoMsg {
    return {
      type: "cosmos-sdk/AccountResponse",
      value: AccountResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: AccountResponseProtoMsg): AccountResponse {
    return AccountResponse.decode(message.value);
  },
  toProto(message: AccountResponse): Uint8Array {
    return AccountResponse.encode(message).finish();
  },
  toProtoMsg(message: AccountResponse): AccountResponseProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.AccountResponse",
      value: AccountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AccountResponse.typeUrl, AccountResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AccountResponse.aminoType, AccountResponse.typeUrl);
function createBaseQueryAccountsRequest(): QueryAccountsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAccountsRequest = {
  typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
  aminoType: "cosmos-sdk/QueryAccountsRequest",
  is(o: any): o is QueryAccountsRequest {
    return o && o.$typeUrl === QueryAccountsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryAccountsRequestAmino {
    return o && o.$typeUrl === QueryAccountsRequest.typeUrl;
  },
  encode(message: QueryAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAccountsRequest>): QueryAccountsRequest {
    const message = createBaseQueryAccountsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountsRequestAmino): QueryAccountsRequest {
    const message = createBaseQueryAccountsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAccountsRequest): QueryAccountsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountsRequestAminoMsg): QueryAccountsRequest {
    return QueryAccountsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAccountsRequest): QueryAccountsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryAccountsRequest",
      value: QueryAccountsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryAccountsRequestProtoMsg): QueryAccountsRequest {
    return QueryAccountsRequest.decode(message.value);
  },
  toProto(message: QueryAccountsRequest): Uint8Array {
    return QueryAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountsRequest): QueryAccountsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.QueryAccountsRequest",
      value: QueryAccountsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountsRequest.typeUrl, QueryAccountsRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryAccountsRequest.aminoType, QueryAccountsRequest.typeUrl);
function createBaseAccountsResponse(): AccountsResponse {
  return {
    accounts: [],
    pagination: undefined
  };
}
export const AccountsResponse = {
  typeUrl: "/cosmos.circuit.v1.AccountsResponse",
  aminoType: "cosmos-sdk/AccountsResponse",
  is(o: any): o is AccountsResponse {
    return o && (o.$typeUrl === AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || GenesisAccountPermissions.is(o.accounts[0])));
  },
  isAmino(o: any): o is AccountsResponseAmino {
    return o && (o.$typeUrl === AccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || GenesisAccountPermissions.isAmino(o.accounts[0])));
  },
  encode(message: AccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      GenesisAccountPermissions.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<AccountsResponse>): AccountsResponse {
    const message = createBaseAccountsResponse();
    message.accounts = object.accounts?.map(e => GenesisAccountPermissions.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: AccountsResponseAmino): AccountsResponse {
    const message = createBaseAccountsResponse();
    message.accounts = object.accounts?.map(e => GenesisAccountPermissions.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: AccountsResponse): AccountsResponseAmino {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GenesisAccountPermissions.toAmino(e) : undefined);
    } else {
      obj.accounts = message.accounts;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: AccountsResponseAminoMsg): AccountsResponse {
    return AccountsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AccountsResponse): AccountsResponseAminoMsg {
    return {
      type: "cosmos-sdk/AccountsResponse",
      value: AccountsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: AccountsResponseProtoMsg): AccountsResponse {
    return AccountsResponse.decode(message.value);
  },
  toProto(message: AccountsResponse): Uint8Array {
    return AccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: AccountsResponse): AccountsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.AccountsResponse",
      value: AccountsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AccountsResponse.typeUrl, AccountsResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(AccountsResponse.aminoType, AccountsResponse.typeUrl);
function createBaseQueryDisabledListRequest(): QueryDisabledListRequest {
  return {};
}
export const QueryDisabledListRequest = {
  typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
  aminoType: "cosmos-sdk/QueryDisabledListRequest",
  is(o: any): o is QueryDisabledListRequest {
    return o && o.$typeUrl === QueryDisabledListRequest.typeUrl;
  },
  isAmino(o: any): o is QueryDisabledListRequestAmino {
    return o && o.$typeUrl === QueryDisabledListRequest.typeUrl;
  },
  encode(_: QueryDisabledListRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDisabledListRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDisabledListRequest();
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
  fromPartial(_: DeepPartial<QueryDisabledListRequest>): QueryDisabledListRequest {
    const message = createBaseQueryDisabledListRequest();
    return message;
  },
  fromAmino(_: QueryDisabledListRequestAmino): QueryDisabledListRequest {
    const message = createBaseQueryDisabledListRequest();
    return message;
  },
  toAmino(_: QueryDisabledListRequest): QueryDisabledListRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDisabledListRequestAminoMsg): QueryDisabledListRequest {
    return QueryDisabledListRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDisabledListRequest): QueryDisabledListRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryDisabledListRequest",
      value: QueryDisabledListRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryDisabledListRequestProtoMsg): QueryDisabledListRequest {
    return QueryDisabledListRequest.decode(message.value);
  },
  toProto(message: QueryDisabledListRequest): Uint8Array {
    return QueryDisabledListRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDisabledListRequest): QueryDisabledListRequestProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.QueryDisabledListRequest",
      value: QueryDisabledListRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryDisabledListRequest.typeUrl, QueryDisabledListRequest);
GlobalDecoderRegistry.registerAminoProtoMapping(QueryDisabledListRequest.aminoType, QueryDisabledListRequest.typeUrl);
function createBaseDisabledListResponse(): DisabledListResponse {
  return {
    disabledList: []
  };
}
export const DisabledListResponse = {
  typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
  aminoType: "cosmos-sdk/DisabledListResponse",
  is(o: any): o is DisabledListResponse {
    return o && (o.$typeUrl === DisabledListResponse.typeUrl || Array.isArray(o.disabledList) && (!o.disabledList.length || typeof o.disabledList[0] === "string"));
  },
  isAmino(o: any): o is DisabledListResponseAmino {
    return o && (o.$typeUrl === DisabledListResponse.typeUrl || Array.isArray(o.disabled_list) && (!o.disabled_list.length || typeof o.disabled_list[0] === "string"));
  },
  encode(message: DisabledListResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.disabledList) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DisabledListResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisabledListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disabledList.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DisabledListResponse>): DisabledListResponse {
    const message = createBaseDisabledListResponse();
    message.disabledList = object.disabledList?.map(e => e) || [];
    return message;
  },
  fromAmino(object: DisabledListResponseAmino): DisabledListResponse {
    const message = createBaseDisabledListResponse();
    message.disabledList = object.disabled_list?.map(e => e) || [];
    return message;
  },
  toAmino(message: DisabledListResponse): DisabledListResponseAmino {
    const obj: any = {};
    if (message.disabledList) {
      obj.disabled_list = message.disabledList.map(e => e);
    } else {
      obj.disabled_list = message.disabledList;
    }
    return obj;
  },
  fromAminoMsg(object: DisabledListResponseAminoMsg): DisabledListResponse {
    return DisabledListResponse.fromAmino(object.value);
  },
  toAminoMsg(message: DisabledListResponse): DisabledListResponseAminoMsg {
    return {
      type: "cosmos-sdk/DisabledListResponse",
      value: DisabledListResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: DisabledListResponseProtoMsg): DisabledListResponse {
    return DisabledListResponse.decode(message.value);
  },
  toProto(message: DisabledListResponse): Uint8Array {
    return DisabledListResponse.encode(message).finish();
  },
  toProtoMsg(message: DisabledListResponse): DisabledListResponseProtoMsg {
    return {
      typeUrl: "/cosmos.circuit.v1.DisabledListResponse",
      value: DisabledListResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(DisabledListResponse.typeUrl, DisabledListResponse);
GlobalDecoderRegistry.registerAminoProtoMapping(DisabledListResponse.aminoType, DisabledListResponse.typeUrl);