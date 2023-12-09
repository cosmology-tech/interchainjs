import { PageRequest, PageRequestAmino, PageResponse, PageResponseAmino } from "../../base/query/v1beta1/pagination";
import { Any, AnyProtoMsg, AnyAmino } from "../../../google/protobuf/any";
import { Params, ParamsAmino, BaseAccount, BaseAccountProtoMsg, BaseAccountAmino, ModuleAccount, ModuleAccountProtoMsg } from "./auth";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * QueryAccountsRequest is the request type for the Query/Accounts RPC method.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
export interface QueryAccountsRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountsRequest";
  value: Uint8Array;
}
/**
 * QueryAccountsRequest is the request type for the Query/Accounts RPC method.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
}
/**
 * QueryAccountsResponse is the response type for the Query/Accounts RPC method.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsResponse {
  /** accounts are the existing accounts */
  accounts: (BaseAccount | Any)[] | Any[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryAccountsResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountsResponse";
  value: Uint8Array;
}
export type QueryAccountsResponseEncoded = Omit<QueryAccountsResponse, "accounts"> & {
  /** accounts are the existing accounts */accounts: (BaseAccountProtoMsg | AnyProtoMsg)[];
};
/**
 * QueryAccountsResponse is the response type for the Query/Accounts RPC method.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsResponseAmino {
  /** accounts are the existing accounts */
  accounts: AnyAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  /** address defines the address to query for. */
  address: string;
}
export interface QueryAccountRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountRequest";
  value: Uint8Array;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequestAmino {
  /** address defines the address to query for. */
  address: string;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponse {
  /** account defines the account of the corresponding address. */
  account?: BaseAccount | Any | undefined;
}
export interface QueryAccountResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountResponse";
  value: Uint8Array;
}
export type QueryAccountResponseEncoded = Omit<QueryAccountResponse, "account"> & {
  /** account defines the account of the corresponding address. */account?: BaseAccountProtoMsg | AnyProtoMsg | undefined;
};
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponseAmino {
  /** account defines the account of the corresponding address. */
  account?: AnyAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params defines the parameters of the module. */
  params?: ParamsAmino;
}
/**
 * QueryModuleAccountsRequest is the request type for the Query/ModuleAccounts RPC method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsRequest {}
export interface QueryModuleAccountsRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsRequest";
  value: Uint8Array;
}
/**
 * QueryModuleAccountsRequest is the request type for the Query/ModuleAccounts RPC method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsRequestAmino {}
/**
 * QueryModuleAccountsResponse is the response type for the Query/ModuleAccounts RPC method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsResponse {
  accounts: (ModuleAccount | Any)[] | Any[];
}
export interface QueryModuleAccountsResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsResponse";
  value: Uint8Array;
}
export type QueryModuleAccountsResponseEncoded = Omit<QueryModuleAccountsResponse, "accounts"> & {
  accounts: (ModuleAccountProtoMsg | AnyProtoMsg)[];
};
/**
 * QueryModuleAccountsResponse is the response type for the Query/ModuleAccounts RPC method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsResponseAmino {
  accounts: AnyAmino[];
}
/** QueryModuleAccountByNameRequest is the request type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameRequest {
  name: string;
}
export interface QueryModuleAccountByNameRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameRequest";
  value: Uint8Array;
}
/** QueryModuleAccountByNameRequest is the request type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameRequestAmino {
  name: string;
}
/** QueryModuleAccountByNameResponse is the response type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameResponse {
  account?: ModuleAccount | Any | undefined;
}
export interface QueryModuleAccountByNameResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameResponse";
  value: Uint8Array;
}
export type QueryModuleAccountByNameResponseEncoded = Omit<QueryModuleAccountByNameResponse, "account"> & {
  account?: ModuleAccountProtoMsg | AnyProtoMsg | undefined;
};
/** QueryModuleAccountByNameResponse is the response type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameResponseAmino {
  account?: AnyAmino;
}
/**
 * Bech32PrefixRequest is the request type for Bech32Prefix rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixRequest {}
export interface Bech32PrefixRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixRequest";
  value: Uint8Array;
}
/**
 * Bech32PrefixRequest is the request type for Bech32Prefix rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixRequestAmino {}
/**
 * Bech32PrefixResponse is the response type for Bech32Prefix rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixResponse {
  bech32Prefix: string;
}
export interface Bech32PrefixResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixResponse";
  value: Uint8Array;
}
/**
 * Bech32PrefixResponse is the response type for Bech32Prefix rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixResponseAmino {
  bech32_prefix: string;
}
/**
 * AddressBytesToStringRequest is the request type for AddressString rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringRequest {
  addressBytes: Uint8Array;
}
export interface AddressBytesToStringRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringRequest";
  value: Uint8Array;
}
/**
 * AddressBytesToStringRequest is the request type for AddressString rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringRequestAmino {
  address_bytes: Uint8Array;
}
/**
 * AddressBytesToStringResponse is the response type for AddressString rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringResponse {
  addressString: string;
}
export interface AddressBytesToStringResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringResponse";
  value: Uint8Array;
}
/**
 * AddressBytesToStringResponse is the response type for AddressString rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringResponseAmino {
  address_string: string;
}
/**
 * AddressStringToBytesRequest is the request type for AccountBytes rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesRequest {
  addressString: string;
}
export interface AddressStringToBytesRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesRequest";
  value: Uint8Array;
}
/**
 * AddressStringToBytesRequest is the request type for AccountBytes rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesRequestAmino {
  address_string: string;
}
/**
 * AddressStringToBytesResponse is the response type for AddressBytes rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesResponse {
  addressBytes: Uint8Array;
}
export interface AddressStringToBytesResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesResponse";
  value: Uint8Array;
}
/**
 * AddressStringToBytesResponse is the response type for AddressBytes rpc method.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesResponseAmino {
  address_bytes: Uint8Array;
}
/**
 * QueryAccountAddressByIDRequest is the request type for AccountAddressByID rpc method
 * 
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDRequest {
  /**
   * Deprecated, use account_id instead
   * 
   * id is the account number of the address to be queried. This field
   * should have been an uint64 (like all account numbers), and will be
   * updated to uint64 in a future version of the auth query.
   */
  /** @deprecated */
  id: bigint;
  /**
   * account_id is the account number of the address to be queried.
   * 
   * Since: cosmos-sdk 0.47
   */
  accountId: bigint;
}
export interface QueryAccountAddressByIDRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDRequest";
  value: Uint8Array;
}
/**
 * QueryAccountAddressByIDRequest is the request type for AccountAddressByID rpc method
 * 
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDRequestAmino {
  /**
   * Deprecated, use account_id instead
   * 
   * id is the account number of the address to be queried. This field
   * should have been an uint64 (like all account numbers), and will be
   * updated to uint64 in a future version of the auth query.
   */
  /** @deprecated */
  id: string;
  /**
   * account_id is the account number of the address to be queried.
   * 
   * Since: cosmos-sdk 0.47
   */
  account_id: string;
}
/**
 * QueryAccountAddressByIDResponse is the response type for AccountAddressByID rpc method
 * 
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDResponse {
  accountAddress: string;
}
export interface QueryAccountAddressByIDResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDResponse";
  value: Uint8Array;
}
/**
 * QueryAccountAddressByIDResponse is the response type for AccountAddressByID rpc method
 * 
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDResponseAmino {
  account_address: string;
}
/**
 * QueryAccountInfoRequest is the Query/AccountInfo request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoRequest {
  /** address is the account address string. */
  address: string;
}
export interface QueryAccountInfoRequestProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoRequest";
  value: Uint8Array;
}
/**
 * QueryAccountInfoRequest is the Query/AccountInfo request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoRequestAmino {
  /** address is the account address string. */
  address: string;
}
/**
 * QueryAccountInfoResponse is the Query/AccountInfo response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoResponse {
  /** info is the account info which is represented by BaseAccount. */
  info?: BaseAccount;
}
export interface QueryAccountInfoResponseProtoMsg {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoResponse";
  value: Uint8Array;
}
/**
 * QueryAccountInfoResponse is the Query/AccountInfo response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoResponseAmino {
  /** info is the account info which is represented by BaseAccount. */
  info?: BaseAccountAmino;
}
function createBaseQueryAccountsRequest(): QueryAccountsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAccountsRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountsRequest",
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
  fromJSON(object: any): QueryAccountsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryAccountsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountsRequest>): QueryAccountsRequest {
    const message = createBaseQueryAccountsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountsRequestAmino): QueryAccountsRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryAccountsRequest): QueryAccountsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryAccountsRequestProtoMsg): QueryAccountsRequest {
    return QueryAccountsRequest.decode(message.value);
  },
  toProto(message: QueryAccountsRequest): Uint8Array {
    return QueryAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountsRequest): QueryAccountsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountsRequest",
      value: QueryAccountsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountsRequest.typeUrl, QueryAccountsRequest);
function createBaseQueryAccountsResponse(): QueryAccountsResponse {
  return {
    accounts: [],
    pagination: undefined
  };
}
export const QueryAccountsResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountsResponse",
  aminoType: "cosmos-sdk/QueryAccountsResponse",
  is(o: any): o is QueryAccountsResponse {
    return o && (o.$typeUrl === QueryAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || BaseAccount.is(o.accounts[0]) || Any.is(o.accounts[0])));
  },
  isAmino(o: any): o is QueryAccountsResponseAmino {
    return o && (o.$typeUrl === QueryAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || BaseAccount.isAmino(o.accounts[0]) || Any.isAmino(o.accounts[0])));
  },
  encode(message: QueryAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      Any.encode(GlobalDecoderRegistry.wrapAny(v!), writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(GlobalDecoderRegistry.unwrapAny(reader));
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
  fromJSON(object: any): QueryAccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => GlobalDecoderRegistry.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined
    };
  },
  toJSON(message: QueryAccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toJSON(e) : undefined);
    } else {
      obj.accounts = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountsResponse>): QueryAccountsResponse {
    const message = createBaseQueryAccountsResponse();
    message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountsResponseAmino): QueryAccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => GlobalDecoderRegistry.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryAccountsResponse): QueryAccountsResponseAmino {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toAmino(e) : undefined);
    } else {
      obj.accounts = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryAccountsResponseProtoMsg): QueryAccountsResponse {
    return QueryAccountsResponse.decode(message.value);
  },
  toProto(message: QueryAccountsResponse): Uint8Array {
    return QueryAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountsResponse): QueryAccountsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountsResponse",
      value: QueryAccountsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountsResponse.typeUrl, QueryAccountsResponse);
function createBaseQueryAccountRequest(): QueryAccountRequest {
  return {
    address: ""
  };
}
export const QueryAccountRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountRequest",
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
  fromJSON(object: any): QueryAccountRequest {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: QueryAccountRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountRequestAmino): QueryAccountRequest {
    return {
      address: object.address
    };
  },
  toAmino(message: QueryAccountRequest): QueryAccountRequestAmino {
    const obj: any = {};
    obj.address = message.address;
    return obj;
  },
  fromProtoMsg(message: QueryAccountRequestProtoMsg): QueryAccountRequest {
    return QueryAccountRequest.decode(message.value);
  },
  toProto(message: QueryAccountRequest): Uint8Array {
    return QueryAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountRequest): QueryAccountRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountRequest",
      value: QueryAccountRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountRequest.typeUrl, QueryAccountRequest);
function createBaseQueryAccountResponse(): QueryAccountResponse {
  return {
    account: undefined
  };
}
export const QueryAccountResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountResponse",
  aminoType: "cosmos-sdk/QueryAccountResponse",
  is(o: any): o is QueryAccountResponse {
    return o && o.$typeUrl === QueryAccountResponse.typeUrl;
  },
  isAmino(o: any): o is QueryAccountResponseAmino {
    return o && o.$typeUrl === QueryAccountResponse.typeUrl;
  },
  encode(message: QueryAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== undefined) {
      Any.encode(GlobalDecoderRegistry.wrapAny(message.account), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountResponse {
    return {
      account: isSet(object.account) ? GlobalDecoderRegistry.fromJSON(object.account) : undefined
    };
  },
  toJSON(message: QueryAccountResponse): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account ? GlobalDecoderRegistry.toJSON(message.account) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountResponse>): QueryAccountResponse {
    const message = createBaseQueryAccountResponse();
    message.account = object.account !== undefined && object.account !== null ? GlobalDecoderRegistry.fromPartial(object.account) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountResponseAmino): QueryAccountResponse {
    return {
      account: object?.account ? GlobalDecoderRegistry.fromAmino(object.account) : undefined
    };
  },
  toAmino(message: QueryAccountResponse): QueryAccountResponseAmino {
    const obj: any = {};
    obj.account = message.account ? GlobalDecoderRegistry.toAmino(message.account) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryAccountResponseProtoMsg): QueryAccountResponse {
    return QueryAccountResponse.decode(message.value);
  },
  toProto(message: QueryAccountResponse): Uint8Array {
    return QueryAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountResponse): QueryAccountResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountResponse",
      value: QueryAccountResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountResponse.typeUrl, QueryAccountResponse);
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryParamsRequest",
  aminoType: "cosmos-sdk/QueryParamsRequest",
  is(o: any): o is QueryParamsRequest {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryParamsRequestAmino {
    return o && o.$typeUrl === QueryParamsRequest.typeUrl;
  },
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromJSON(_: any): QueryParamsRequest {
    return {};
  },
  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    return {};
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsRequest.typeUrl, QueryParamsRequest);
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryParamsResponse",
  aminoType: "cosmos-sdk/QueryParamsResponse",
  is(o: any): o is QueryParamsResponse {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.is(o.params));
  },
  isAmino(o: any): o is QueryParamsResponseAmino {
    return o && (o.$typeUrl === QueryParamsResponse.typeUrl || Params.isAmino(o.params));
  },
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryParamsResponse.typeUrl, QueryParamsResponse);
function createBaseQueryModuleAccountsRequest(): QueryModuleAccountsRequest {
  return {};
}
export const QueryModuleAccountsRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsRequest",
  aminoType: "cosmos-sdk/QueryModuleAccountsRequest",
  is(o: any): o is QueryModuleAccountsRequest {
    return o && o.$typeUrl === QueryModuleAccountsRequest.typeUrl;
  },
  isAmino(o: any): o is QueryModuleAccountsRequestAmino {
    return o && o.$typeUrl === QueryModuleAccountsRequest.typeUrl;
  },
  encode(_: QueryModuleAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryModuleAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAccountsRequest();
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
  fromJSON(_: any): QueryModuleAccountsRequest {
    return {};
  },
  toJSON(_: QueryModuleAccountsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<QueryModuleAccountsRequest>): QueryModuleAccountsRequest {
    const message = createBaseQueryModuleAccountsRequest();
    return message;
  },
  fromAmino(_: QueryModuleAccountsRequestAmino): QueryModuleAccountsRequest {
    return {};
  },
  toAmino(_: QueryModuleAccountsRequest): QueryModuleAccountsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: QueryModuleAccountsRequestProtoMsg): QueryModuleAccountsRequest {
    return QueryModuleAccountsRequest.decode(message.value);
  },
  toProto(message: QueryModuleAccountsRequest): Uint8Array {
    return QueryModuleAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAccountsRequest): QueryModuleAccountsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsRequest",
      value: QueryModuleAccountsRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryModuleAccountsRequest.typeUrl, QueryModuleAccountsRequest);
function createBaseQueryModuleAccountsResponse(): QueryModuleAccountsResponse {
  return {
    accounts: []
  };
}
export const QueryModuleAccountsResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsResponse",
  aminoType: "cosmos-sdk/QueryModuleAccountsResponse",
  is(o: any): o is QueryModuleAccountsResponse {
    return o && (o.$typeUrl === QueryModuleAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || ModuleAccount.is(o.accounts[0]) || Any.is(o.accounts[0])));
  },
  isAmino(o: any): o is QueryModuleAccountsResponseAmino {
    return o && (o.$typeUrl === QueryModuleAccountsResponse.typeUrl || Array.isArray(o.accounts) && (!o.accounts.length || ModuleAccount.isAmino(o.accounts[0]) || Any.isAmino(o.accounts[0])));
  },
  encode(message: QueryModuleAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      Any.encode(GlobalDecoderRegistry.wrapAny(v!), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryModuleAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(GlobalDecoderRegistry.unwrapAny(reader));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryModuleAccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => GlobalDecoderRegistry.fromJSON(e)) : []
    };
  },
  toJSON(message: QueryModuleAccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toJSON(e) : undefined);
    } else {
      obj.accounts = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<QueryModuleAccountsResponse>): QueryModuleAccountsResponse {
    const message = createBaseQueryModuleAccountsResponse();
    message.accounts = object.accounts?.map(e => GlobalDecoderRegistry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryModuleAccountsResponseAmino): QueryModuleAccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts) ? object.accounts.map((e: any) => GlobalDecoderRegistry.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryModuleAccountsResponse): QueryModuleAccountsResponseAmino {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? GlobalDecoderRegistry.toAmino(e) : undefined);
    } else {
      obj.accounts = [];
    }
    return obj;
  },
  fromProtoMsg(message: QueryModuleAccountsResponseProtoMsg): QueryModuleAccountsResponse {
    return QueryModuleAccountsResponse.decode(message.value);
  },
  toProto(message: QueryModuleAccountsResponse): Uint8Array {
    return QueryModuleAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAccountsResponse): QueryModuleAccountsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountsResponse",
      value: QueryModuleAccountsResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryModuleAccountsResponse.typeUrl, QueryModuleAccountsResponse);
function createBaseQueryModuleAccountByNameRequest(): QueryModuleAccountByNameRequest {
  return {
    name: ""
  };
}
export const QueryModuleAccountByNameRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameRequest",
  aminoType: "cosmos-sdk/QueryModuleAccountByNameRequest",
  is(o: any): o is QueryModuleAccountByNameRequest {
    return o && (o.$typeUrl === QueryModuleAccountByNameRequest.typeUrl || typeof o.name === "string");
  },
  isAmino(o: any): o is QueryModuleAccountByNameRequestAmino {
    return o && (o.$typeUrl === QueryModuleAccountByNameRequest.typeUrl || typeof o.name === "string");
  },
  encode(message: QueryModuleAccountByNameRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryModuleAccountByNameRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAccountByNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryModuleAccountByNameRequest {
    return {
      name: isSet(object.name) ? String(object.name) : ""
    };
  },
  toJSON(message: QueryModuleAccountByNameRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryModuleAccountByNameRequest>): QueryModuleAccountByNameRequest {
    const message = createBaseQueryModuleAccountByNameRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryModuleAccountByNameRequestAmino): QueryModuleAccountByNameRequest {
    return {
      name: object.name
    };
  },
  toAmino(message: QueryModuleAccountByNameRequest): QueryModuleAccountByNameRequestAmino {
    const obj: any = {};
    obj.name = message.name;
    return obj;
  },
  fromProtoMsg(message: QueryModuleAccountByNameRequestProtoMsg): QueryModuleAccountByNameRequest {
    return QueryModuleAccountByNameRequest.decode(message.value);
  },
  toProto(message: QueryModuleAccountByNameRequest): Uint8Array {
    return QueryModuleAccountByNameRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAccountByNameRequest): QueryModuleAccountByNameRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameRequest",
      value: QueryModuleAccountByNameRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryModuleAccountByNameRequest.typeUrl, QueryModuleAccountByNameRequest);
function createBaseQueryModuleAccountByNameResponse(): QueryModuleAccountByNameResponse {
  return {
    account: undefined
  };
}
export const QueryModuleAccountByNameResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameResponse",
  aminoType: "cosmos-sdk/QueryModuleAccountByNameResponse",
  is(o: any): o is QueryModuleAccountByNameResponse {
    return o && o.$typeUrl === QueryModuleAccountByNameResponse.typeUrl;
  },
  isAmino(o: any): o is QueryModuleAccountByNameResponseAmino {
    return o && o.$typeUrl === QueryModuleAccountByNameResponse.typeUrl;
  },
  encode(message: QueryModuleAccountByNameResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== undefined) {
      Any.encode(GlobalDecoderRegistry.wrapAny(message.account), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryModuleAccountByNameResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleAccountByNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryModuleAccountByNameResponse {
    return {
      account: isSet(object.account) ? GlobalDecoderRegistry.fromJSON(object.account) : undefined
    };
  },
  toJSON(message: QueryModuleAccountByNameResponse): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account ? GlobalDecoderRegistry.toJSON(message.account) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryModuleAccountByNameResponse>): QueryModuleAccountByNameResponse {
    const message = createBaseQueryModuleAccountByNameResponse();
    message.account = object.account !== undefined && object.account !== null ? GlobalDecoderRegistry.fromPartial(object.account) : undefined;
    return message;
  },
  fromAmino(object: QueryModuleAccountByNameResponseAmino): QueryModuleAccountByNameResponse {
    return {
      account: object?.account ? GlobalDecoderRegistry.fromAmino(object.account) : undefined
    };
  },
  toAmino(message: QueryModuleAccountByNameResponse): QueryModuleAccountByNameResponseAmino {
    const obj: any = {};
    obj.account = message.account ? GlobalDecoderRegistry.toAmino(message.account) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryModuleAccountByNameResponseProtoMsg): QueryModuleAccountByNameResponse {
    return QueryModuleAccountByNameResponse.decode(message.value);
  },
  toProto(message: QueryModuleAccountByNameResponse): Uint8Array {
    return QueryModuleAccountByNameResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleAccountByNameResponse): QueryModuleAccountByNameResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryModuleAccountByNameResponse",
      value: QueryModuleAccountByNameResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryModuleAccountByNameResponse.typeUrl, QueryModuleAccountByNameResponse);
function createBaseBech32PrefixRequest(): Bech32PrefixRequest {
  return {};
}
export const Bech32PrefixRequest = {
  typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixRequest",
  aminoType: "cosmos-sdk/Bech32PrefixRequest",
  is(o: any): o is Bech32PrefixRequest {
    return o && o.$typeUrl === Bech32PrefixRequest.typeUrl;
  },
  isAmino(o: any): o is Bech32PrefixRequestAmino {
    return o && o.$typeUrl === Bech32PrefixRequest.typeUrl;
  },
  encode(_: Bech32PrefixRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Bech32PrefixRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBech32PrefixRequest();
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
  fromJSON(_: any): Bech32PrefixRequest {
    return {};
  },
  toJSON(_: Bech32PrefixRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<Bech32PrefixRequest>): Bech32PrefixRequest {
    const message = createBaseBech32PrefixRequest();
    return message;
  },
  fromAmino(_: Bech32PrefixRequestAmino): Bech32PrefixRequest {
    return {};
  },
  toAmino(_: Bech32PrefixRequest): Bech32PrefixRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: Bech32PrefixRequestProtoMsg): Bech32PrefixRequest {
    return Bech32PrefixRequest.decode(message.value);
  },
  toProto(message: Bech32PrefixRequest): Uint8Array {
    return Bech32PrefixRequest.encode(message).finish();
  },
  toProtoMsg(message: Bech32PrefixRequest): Bech32PrefixRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixRequest",
      value: Bech32PrefixRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Bech32PrefixRequest.typeUrl, Bech32PrefixRequest);
function createBaseBech32PrefixResponse(): Bech32PrefixResponse {
  return {
    bech32Prefix: ""
  };
}
export const Bech32PrefixResponse = {
  typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixResponse",
  aminoType: "cosmos-sdk/Bech32PrefixResponse",
  is(o: any): o is Bech32PrefixResponse {
    return o && (o.$typeUrl === Bech32PrefixResponse.typeUrl || typeof o.bech32Prefix === "string");
  },
  isAmino(o: any): o is Bech32PrefixResponseAmino {
    return o && (o.$typeUrl === Bech32PrefixResponse.typeUrl || typeof o.bech32_prefix === "string");
  },
  encode(message: Bech32PrefixResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bech32Prefix !== "") {
      writer.uint32(10).string(message.bech32Prefix);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Bech32PrefixResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBech32PrefixResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bech32Prefix = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Bech32PrefixResponse {
    return {
      bech32Prefix: isSet(object.bech32Prefix) ? String(object.bech32Prefix) : ""
    };
  },
  toJSON(message: Bech32PrefixResponse): unknown {
    const obj: any = {};
    message.bech32Prefix !== undefined && (obj.bech32Prefix = message.bech32Prefix);
    return obj;
  },
  fromPartial(object: DeepPartial<Bech32PrefixResponse>): Bech32PrefixResponse {
    const message = createBaseBech32PrefixResponse();
    message.bech32Prefix = object.bech32Prefix ?? "";
    return message;
  },
  fromAmino(object: Bech32PrefixResponseAmino): Bech32PrefixResponse {
    return {
      bech32Prefix: object.bech32_prefix
    };
  },
  toAmino(message: Bech32PrefixResponse): Bech32PrefixResponseAmino {
    const obj: any = {};
    obj.bech32_prefix = message.bech32Prefix;
    return obj;
  },
  fromProtoMsg(message: Bech32PrefixResponseProtoMsg): Bech32PrefixResponse {
    return Bech32PrefixResponse.decode(message.value);
  },
  toProto(message: Bech32PrefixResponse): Uint8Array {
    return Bech32PrefixResponse.encode(message).finish();
  },
  toProtoMsg(message: Bech32PrefixResponse): Bech32PrefixResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.Bech32PrefixResponse",
      value: Bech32PrefixResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(Bech32PrefixResponse.typeUrl, Bech32PrefixResponse);
function createBaseAddressBytesToStringRequest(): AddressBytesToStringRequest {
  return {
    addressBytes: new Uint8Array()
  };
}
export const AddressBytesToStringRequest = {
  typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringRequest",
  aminoType: "cosmos-sdk/AddressBytesToStringRequest",
  is(o: any): o is AddressBytesToStringRequest {
    return o && (o.$typeUrl === AddressBytesToStringRequest.typeUrl || o.addressBytes instanceof Uint8Array || typeof o.addressBytes === "string");
  },
  isAmino(o: any): o is AddressBytesToStringRequestAmino {
    return o && (o.$typeUrl === AddressBytesToStringRequest.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
  },
  encode(message: AddressBytesToStringRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressBytes.length !== 0) {
      writer.uint32(10).bytes(message.addressBytes);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressBytesToStringRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressBytesToStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddressBytesToStringRequest {
    return {
      addressBytes: isSet(object.addressBytes) ? bytesFromBase64(object.addressBytes) : new Uint8Array()
    };
  },
  toJSON(message: AddressBytesToStringRequest): unknown {
    const obj: any = {};
    message.addressBytes !== undefined && (obj.addressBytes = base64FromBytes(message.addressBytes !== undefined ? message.addressBytes : new Uint8Array()));
    return obj;
  },
  fromPartial(object: DeepPartial<AddressBytesToStringRequest>): AddressBytesToStringRequest {
    const message = createBaseAddressBytesToStringRequest();
    message.addressBytes = object.addressBytes ?? new Uint8Array();
    return message;
  },
  fromAmino(object: AddressBytesToStringRequestAmino): AddressBytesToStringRequest {
    return {
      addressBytes: object.address_bytes
    };
  },
  toAmino(message: AddressBytesToStringRequest): AddressBytesToStringRequestAmino {
    const obj: any = {};
    obj.address_bytes = message.addressBytes;
    return obj;
  },
  fromProtoMsg(message: AddressBytesToStringRequestProtoMsg): AddressBytesToStringRequest {
    return AddressBytesToStringRequest.decode(message.value);
  },
  toProto(message: AddressBytesToStringRequest): Uint8Array {
    return AddressBytesToStringRequest.encode(message).finish();
  },
  toProtoMsg(message: AddressBytesToStringRequest): AddressBytesToStringRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringRequest",
      value: AddressBytesToStringRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddressBytesToStringRequest.typeUrl, AddressBytesToStringRequest);
function createBaseAddressBytesToStringResponse(): AddressBytesToStringResponse {
  return {
    addressString: ""
  };
}
export const AddressBytesToStringResponse = {
  typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringResponse",
  aminoType: "cosmos-sdk/AddressBytesToStringResponse",
  is(o: any): o is AddressBytesToStringResponse {
    return o && (o.$typeUrl === AddressBytesToStringResponse.typeUrl || typeof o.addressString === "string");
  },
  isAmino(o: any): o is AddressBytesToStringResponseAmino {
    return o && (o.$typeUrl === AddressBytesToStringResponse.typeUrl || typeof o.address_string === "string");
  },
  encode(message: AddressBytesToStringResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressString !== "") {
      writer.uint32(10).string(message.addressString);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressBytesToStringResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressBytesToStringResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddressBytesToStringResponse {
    return {
      addressString: isSet(object.addressString) ? String(object.addressString) : ""
    };
  },
  toJSON(message: AddressBytesToStringResponse): unknown {
    const obj: any = {};
    message.addressString !== undefined && (obj.addressString = message.addressString);
    return obj;
  },
  fromPartial(object: DeepPartial<AddressBytesToStringResponse>): AddressBytesToStringResponse {
    const message = createBaseAddressBytesToStringResponse();
    message.addressString = object.addressString ?? "";
    return message;
  },
  fromAmino(object: AddressBytesToStringResponseAmino): AddressBytesToStringResponse {
    return {
      addressString: object.address_string
    };
  },
  toAmino(message: AddressBytesToStringResponse): AddressBytesToStringResponseAmino {
    const obj: any = {};
    obj.address_string = message.addressString;
    return obj;
  },
  fromProtoMsg(message: AddressBytesToStringResponseProtoMsg): AddressBytesToStringResponse {
    return AddressBytesToStringResponse.decode(message.value);
  },
  toProto(message: AddressBytesToStringResponse): Uint8Array {
    return AddressBytesToStringResponse.encode(message).finish();
  },
  toProtoMsg(message: AddressBytesToStringResponse): AddressBytesToStringResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.AddressBytesToStringResponse",
      value: AddressBytesToStringResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddressBytesToStringResponse.typeUrl, AddressBytesToStringResponse);
function createBaseAddressStringToBytesRequest(): AddressStringToBytesRequest {
  return {
    addressString: ""
  };
}
export const AddressStringToBytesRequest = {
  typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesRequest",
  aminoType: "cosmos-sdk/AddressStringToBytesRequest",
  is(o: any): o is AddressStringToBytesRequest {
    return o && (o.$typeUrl === AddressStringToBytesRequest.typeUrl || typeof o.addressString === "string");
  },
  isAmino(o: any): o is AddressStringToBytesRequestAmino {
    return o && (o.$typeUrl === AddressStringToBytesRequest.typeUrl || typeof o.address_string === "string");
  },
  encode(message: AddressStringToBytesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressString !== "") {
      writer.uint32(10).string(message.addressString);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressStringToBytesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressStringToBytesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddressStringToBytesRequest {
    return {
      addressString: isSet(object.addressString) ? String(object.addressString) : ""
    };
  },
  toJSON(message: AddressStringToBytesRequest): unknown {
    const obj: any = {};
    message.addressString !== undefined && (obj.addressString = message.addressString);
    return obj;
  },
  fromPartial(object: DeepPartial<AddressStringToBytesRequest>): AddressStringToBytesRequest {
    const message = createBaseAddressStringToBytesRequest();
    message.addressString = object.addressString ?? "";
    return message;
  },
  fromAmino(object: AddressStringToBytesRequestAmino): AddressStringToBytesRequest {
    return {
      addressString: object.address_string
    };
  },
  toAmino(message: AddressStringToBytesRequest): AddressStringToBytesRequestAmino {
    const obj: any = {};
    obj.address_string = message.addressString;
    return obj;
  },
  fromProtoMsg(message: AddressStringToBytesRequestProtoMsg): AddressStringToBytesRequest {
    return AddressStringToBytesRequest.decode(message.value);
  },
  toProto(message: AddressStringToBytesRequest): Uint8Array {
    return AddressStringToBytesRequest.encode(message).finish();
  },
  toProtoMsg(message: AddressStringToBytesRequest): AddressStringToBytesRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesRequest",
      value: AddressStringToBytesRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddressStringToBytesRequest.typeUrl, AddressStringToBytesRequest);
function createBaseAddressStringToBytesResponse(): AddressStringToBytesResponse {
  return {
    addressBytes: new Uint8Array()
  };
}
export const AddressStringToBytesResponse = {
  typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesResponse",
  aminoType: "cosmos-sdk/AddressStringToBytesResponse",
  is(o: any): o is AddressStringToBytesResponse {
    return o && (o.$typeUrl === AddressStringToBytesResponse.typeUrl || o.addressBytes instanceof Uint8Array || typeof o.addressBytes === "string");
  },
  isAmino(o: any): o is AddressStringToBytesResponseAmino {
    return o && (o.$typeUrl === AddressStringToBytesResponse.typeUrl || o.address_bytes instanceof Uint8Array || typeof o.address_bytes === "string");
  },
  encode(message: AddressStringToBytesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressBytes.length !== 0) {
      writer.uint32(10).bytes(message.addressBytes);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressStringToBytesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressStringToBytesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddressStringToBytesResponse {
    return {
      addressBytes: isSet(object.addressBytes) ? bytesFromBase64(object.addressBytes) : new Uint8Array()
    };
  },
  toJSON(message: AddressStringToBytesResponse): unknown {
    const obj: any = {};
    message.addressBytes !== undefined && (obj.addressBytes = base64FromBytes(message.addressBytes !== undefined ? message.addressBytes : new Uint8Array()));
    return obj;
  },
  fromPartial(object: DeepPartial<AddressStringToBytesResponse>): AddressStringToBytesResponse {
    const message = createBaseAddressStringToBytesResponse();
    message.addressBytes = object.addressBytes ?? new Uint8Array();
    return message;
  },
  fromAmino(object: AddressStringToBytesResponseAmino): AddressStringToBytesResponse {
    return {
      addressBytes: object.address_bytes
    };
  },
  toAmino(message: AddressStringToBytesResponse): AddressStringToBytesResponseAmino {
    const obj: any = {};
    obj.address_bytes = message.addressBytes;
    return obj;
  },
  fromProtoMsg(message: AddressStringToBytesResponseProtoMsg): AddressStringToBytesResponse {
    return AddressStringToBytesResponse.decode(message.value);
  },
  toProto(message: AddressStringToBytesResponse): Uint8Array {
    return AddressStringToBytesResponse.encode(message).finish();
  },
  toProtoMsg(message: AddressStringToBytesResponse): AddressStringToBytesResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.AddressStringToBytesResponse",
      value: AddressStringToBytesResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(AddressStringToBytesResponse.typeUrl, AddressStringToBytesResponse);
function createBaseQueryAccountAddressByIDRequest(): QueryAccountAddressByIDRequest {
  return {
    id: BigInt(0),
    accountId: BigInt(0)
  };
}
export const QueryAccountAddressByIDRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDRequest",
  aminoType: "cosmos-sdk/QueryAccountAddressByIDRequest",
  is(o: any): o is QueryAccountAddressByIDRequest {
    return o && (o.$typeUrl === QueryAccountAddressByIDRequest.typeUrl || typeof o.id === "bigint" && typeof o.accountId === "bigint");
  },
  isAmino(o: any): o is QueryAccountAddressByIDRequestAmino {
    return o && (o.$typeUrl === QueryAccountAddressByIDRequest.typeUrl || typeof o.id === "bigint" && typeof o.account_id === "bigint");
  },
  encode(message: QueryAccountAddressByIDRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).int64(message.id);
    }
    if (message.accountId !== BigInt(0)) {
      writer.uint32(16).uint64(message.accountId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountAddressByIDRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountAddressByIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int64();
          break;
        case 2:
          message.accountId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountAddressByIDRequest {
    return {
      id: isSet(object.id) ? BigInt(object.id.toString()) : BigInt(0),
      accountId: isSet(object.accountId) ? BigInt(object.accountId.toString()) : BigInt(0)
    };
  },
  toJSON(message: QueryAccountAddressByIDRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || BigInt(0)).toString());
    message.accountId !== undefined && (obj.accountId = (message.accountId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountAddressByIDRequest>): QueryAccountAddressByIDRequest {
    const message = createBaseQueryAccountAddressByIDRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.accountId = object.accountId !== undefined && object.accountId !== null ? BigInt(object.accountId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAccountAddressByIDRequestAmino): QueryAccountAddressByIDRequest {
    return {
      id: BigInt(object.id),
      accountId: BigInt(object.account_id)
    };
  },
  toAmino(message: QueryAccountAddressByIDRequest): QueryAccountAddressByIDRequestAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.account_id = message.accountId ? message.accountId.toString() : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryAccountAddressByIDRequestProtoMsg): QueryAccountAddressByIDRequest {
    return QueryAccountAddressByIDRequest.decode(message.value);
  },
  toProto(message: QueryAccountAddressByIDRequest): Uint8Array {
    return QueryAccountAddressByIDRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountAddressByIDRequest): QueryAccountAddressByIDRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDRequest",
      value: QueryAccountAddressByIDRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountAddressByIDRequest.typeUrl, QueryAccountAddressByIDRequest);
function createBaseQueryAccountAddressByIDResponse(): QueryAccountAddressByIDResponse {
  return {
    accountAddress: ""
  };
}
export const QueryAccountAddressByIDResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDResponse",
  aminoType: "cosmos-sdk/QueryAccountAddressByIDResponse",
  is(o: any): o is QueryAccountAddressByIDResponse {
    return o && (o.$typeUrl === QueryAccountAddressByIDResponse.typeUrl || typeof o.accountAddress === "string");
  },
  isAmino(o: any): o is QueryAccountAddressByIDResponseAmino {
    return o && (o.$typeUrl === QueryAccountAddressByIDResponse.typeUrl || typeof o.account_address === "string");
  },
  encode(message: QueryAccountAddressByIDResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountAddressByIDResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountAddressByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountAddressByIDResponse {
    return {
      accountAddress: isSet(object.accountAddress) ? String(object.accountAddress) : ""
    };
  },
  toJSON(message: QueryAccountAddressByIDResponse): unknown {
    const obj: any = {};
    message.accountAddress !== undefined && (obj.accountAddress = message.accountAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountAddressByIDResponse>): QueryAccountAddressByIDResponse {
    const message = createBaseQueryAccountAddressByIDResponse();
    message.accountAddress = object.accountAddress ?? "";
    return message;
  },
  fromAmino(object: QueryAccountAddressByIDResponseAmino): QueryAccountAddressByIDResponse {
    return {
      accountAddress: object.account_address
    };
  },
  toAmino(message: QueryAccountAddressByIDResponse): QueryAccountAddressByIDResponseAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress;
    return obj;
  },
  fromProtoMsg(message: QueryAccountAddressByIDResponseProtoMsg): QueryAccountAddressByIDResponse {
    return QueryAccountAddressByIDResponse.decode(message.value);
  },
  toProto(message: QueryAccountAddressByIDResponse): Uint8Array {
    return QueryAccountAddressByIDResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountAddressByIDResponse): QueryAccountAddressByIDResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountAddressByIDResponse",
      value: QueryAccountAddressByIDResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountAddressByIDResponse.typeUrl, QueryAccountAddressByIDResponse);
function createBaseQueryAccountInfoRequest(): QueryAccountInfoRequest {
  return {
    address: ""
  };
}
export const QueryAccountInfoRequest = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoRequest",
  aminoType: "cosmos-sdk/QueryAccountInfoRequest",
  is(o: any): o is QueryAccountInfoRequest {
    return o && (o.$typeUrl === QueryAccountInfoRequest.typeUrl || typeof o.address === "string");
  },
  isAmino(o: any): o is QueryAccountInfoRequestAmino {
    return o && (o.$typeUrl === QueryAccountInfoRequest.typeUrl || typeof o.address === "string");
  },
  encode(message: QueryAccountInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountInfoRequest();
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
  fromJSON(object: any): QueryAccountInfoRequest {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: QueryAccountInfoRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountInfoRequest>): QueryAccountInfoRequest {
    const message = createBaseQueryAccountInfoRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountInfoRequestAmino): QueryAccountInfoRequest {
    return {
      address: object.address
    };
  },
  toAmino(message: QueryAccountInfoRequest): QueryAccountInfoRequestAmino {
    const obj: any = {};
    obj.address = message.address;
    return obj;
  },
  fromProtoMsg(message: QueryAccountInfoRequestProtoMsg): QueryAccountInfoRequest {
    return QueryAccountInfoRequest.decode(message.value);
  },
  toProto(message: QueryAccountInfoRequest): Uint8Array {
    return QueryAccountInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountInfoRequest): QueryAccountInfoRequestProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoRequest",
      value: QueryAccountInfoRequest.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountInfoRequest.typeUrl, QueryAccountInfoRequest);
function createBaseQueryAccountInfoResponse(): QueryAccountInfoResponse {
  return {
    info: undefined
  };
}
export const QueryAccountInfoResponse = {
  typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoResponse",
  aminoType: "cosmos-sdk/QueryAccountInfoResponse",
  is(o: any): o is QueryAccountInfoResponse {
    return o && o.$typeUrl === QueryAccountInfoResponse.typeUrl;
  },
  isAmino(o: any): o is QueryAccountInfoResponseAmino {
    return o && o.$typeUrl === QueryAccountInfoResponse.typeUrl;
  },
  encode(message: QueryAccountInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.info !== undefined) {
      BaseAccount.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = BaseAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountInfoResponse {
    return {
      info: isSet(object.info) ? BaseAccount.fromJSON(object.info) : undefined
    };
  },
  toJSON(message: QueryAccountInfoResponse): unknown {
    const obj: any = {};
    message.info !== undefined && (obj.info = message.info ? BaseAccount.toJSON(message.info) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<QueryAccountInfoResponse>): QueryAccountInfoResponse {
    const message = createBaseQueryAccountInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? BaseAccount.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountInfoResponseAmino): QueryAccountInfoResponse {
    return {
      info: object?.info ? BaseAccount.fromAmino(object.info) : undefined
    };
  },
  toAmino(message: QueryAccountInfoResponse): QueryAccountInfoResponseAmino {
    const obj: any = {};
    obj.info = message.info ? BaseAccount.toAmino(message.info) : undefined;
    return obj;
  },
  fromProtoMsg(message: QueryAccountInfoResponseProtoMsg): QueryAccountInfoResponse {
    return QueryAccountInfoResponse.decode(message.value);
  },
  toProto(message: QueryAccountInfoResponse): Uint8Array {
    return QueryAccountInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountInfoResponse): QueryAccountInfoResponseProtoMsg {
    return {
      typeUrl: "/cosmos.auth.v1beta1.QueryAccountInfoResponse",
      value: QueryAccountInfoResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(QueryAccountInfoResponse.typeUrl, QueryAccountInfoResponse);