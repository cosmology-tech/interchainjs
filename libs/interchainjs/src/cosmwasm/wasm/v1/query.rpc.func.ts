import { RpcResolver, buildQuery } from "../../../helper-func-types";
import { buildUseQuery } from "../../../react-query";
import { QueryContractInfoRequest, QueryContractInfoResponse, QueryContractHistoryRequest, QueryContractHistoryResponse, QueryContractsByCodeRequest, QueryContractsByCodeResponse, QueryAllContractStateRequest, QueryAllContractStateResponse, QueryRawContractStateRequest, QueryRawContractStateResponse, QuerySmartContractStateRequest, QuerySmartContractStateResponse, QueryCodeRequest, QueryCodeResponse, QueryCodesRequest, QueryCodesResponse, QueryPinnedCodesRequest, QueryPinnedCodesResponse, QueryParamsRequest, QueryParamsResponse, QueryContractsByCreatorRequest, QueryContractsByCreatorResponse, QueryBuildAddressRequest, QueryBuildAddressResponse } from "./query";
export const createGetContractInfo = (getRpcInstance: RpcResolver) => buildQuery<QueryContractInfoRequest, QueryContractInfoResponse>({
  encoder: QueryContractInfoRequest.encode,
  decoder: QueryContractInfoResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "ContractInfo",
  getRpcInstance: getRpcInstance
});
export const useGetContractInfo = buildUseQuery<QueryContractInfoRequest, QueryContractInfoResponse>({
  builderQueryFn: createGetContractInfo,
  queryKeyPrefix: "ContractInfoQuery"
});
export const createGetContractHistory = (getRpcInstance: RpcResolver) => buildQuery<QueryContractHistoryRequest, QueryContractHistoryResponse>({
  encoder: QueryContractHistoryRequest.encode,
  decoder: QueryContractHistoryResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "ContractHistory",
  getRpcInstance: getRpcInstance
});
export const useGetContractHistory = buildUseQuery<QueryContractHistoryRequest, QueryContractHistoryResponse>({
  builderQueryFn: createGetContractHistory,
  queryKeyPrefix: "ContractHistoryQuery"
});
export const createGetContractsByCode = (getRpcInstance: RpcResolver) => buildQuery<QueryContractsByCodeRequest, QueryContractsByCodeResponse>({
  encoder: QueryContractsByCodeRequest.encode,
  decoder: QueryContractsByCodeResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "ContractsByCode",
  getRpcInstance: getRpcInstance
});
export const useGetContractsByCode = buildUseQuery<QueryContractsByCodeRequest, QueryContractsByCodeResponse>({
  builderQueryFn: createGetContractsByCode,
  queryKeyPrefix: "ContractsByCodeQuery"
});
export const createGetAllContractState = (getRpcInstance: RpcResolver) => buildQuery<QueryAllContractStateRequest, QueryAllContractStateResponse>({
  encoder: QueryAllContractStateRequest.encode,
  decoder: QueryAllContractStateResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "AllContractState",
  getRpcInstance: getRpcInstance
});
export const useGetAllContractState = buildUseQuery<QueryAllContractStateRequest, QueryAllContractStateResponse>({
  builderQueryFn: createGetAllContractState,
  queryKeyPrefix: "AllContractStateQuery"
});
export const createGetRawContractState = (getRpcInstance: RpcResolver) => buildQuery<QueryRawContractStateRequest, QueryRawContractStateResponse>({
  encoder: QueryRawContractStateRequest.encode,
  decoder: QueryRawContractStateResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "RawContractState",
  getRpcInstance: getRpcInstance
});
export const useGetRawContractState = buildUseQuery<QueryRawContractStateRequest, QueryRawContractStateResponse>({
  builderQueryFn: createGetRawContractState,
  queryKeyPrefix: "RawContractStateQuery"
});
export const createGetSmartContractState = (getRpcInstance: RpcResolver) => buildQuery<QuerySmartContractStateRequest, QuerySmartContractStateResponse>({
  encoder: QuerySmartContractStateRequest.encode,
  decoder: QuerySmartContractStateResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "SmartContractState",
  getRpcInstance: getRpcInstance
});
export const useGetSmartContractState = buildUseQuery<QuerySmartContractStateRequest, QuerySmartContractStateResponse>({
  builderQueryFn: createGetSmartContractState,
  queryKeyPrefix: "SmartContractStateQuery"
});
export const createGetCode = (getRpcInstance: RpcResolver) => buildQuery<QueryCodeRequest, QueryCodeResponse>({
  encoder: QueryCodeRequest.encode,
  decoder: QueryCodeResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "Code",
  getRpcInstance: getRpcInstance
});
export const useGetCode = buildUseQuery<QueryCodeRequest, QueryCodeResponse>({
  builderQueryFn: createGetCode,
  queryKeyPrefix: "CodeQuery"
});
export const createGetCodes = (getRpcInstance: RpcResolver) => buildQuery<QueryCodesRequest, QueryCodesResponse>({
  encoder: QueryCodesRequest.encode,
  decoder: QueryCodesResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "Codes",
  getRpcInstance: getRpcInstance
});
export const useGetCodes = buildUseQuery<QueryCodesRequest, QueryCodesResponse>({
  builderQueryFn: createGetCodes,
  queryKeyPrefix: "CodesQuery"
});
export const createGetPinnedCodes = (getRpcInstance: RpcResolver) => buildQuery<QueryPinnedCodesRequest, QueryPinnedCodesResponse>({
  encoder: QueryPinnedCodesRequest.encode,
  decoder: QueryPinnedCodesResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "PinnedCodes",
  getRpcInstance: getRpcInstance
});
export const useGetPinnedCodes = buildUseQuery<QueryPinnedCodesRequest, QueryPinnedCodesResponse>({
  builderQueryFn: createGetPinnedCodes,
  queryKeyPrefix: "PinnedCodesQuery"
});
export const createGetParams = (getRpcInstance: RpcResolver) => buildQuery<QueryParamsRequest, QueryParamsResponse>({
  encoder: QueryParamsRequest.encode,
  decoder: QueryParamsResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "Params",
  getRpcInstance: getRpcInstance
});
export const useGetParams = buildUseQuery<QueryParamsRequest, QueryParamsResponse>({
  builderQueryFn: createGetParams,
  queryKeyPrefix: "ParamsQuery"
});
export const createGetContractsByCreator = (getRpcInstance: RpcResolver) => buildQuery<QueryContractsByCreatorRequest, QueryContractsByCreatorResponse>({
  encoder: QueryContractsByCreatorRequest.encode,
  decoder: QueryContractsByCreatorResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "ContractsByCreator",
  getRpcInstance: getRpcInstance
});
export const useGetContractsByCreator = buildUseQuery<QueryContractsByCreatorRequest, QueryContractsByCreatorResponse>({
  builderQueryFn: createGetContractsByCreator,
  queryKeyPrefix: "ContractsByCreatorQuery"
});
export const createGetBuildAddress = (getRpcInstance: RpcResolver) => buildQuery<QueryBuildAddressRequest, QueryBuildAddressResponse>({
  encoder: QueryBuildAddressRequest.encode,
  decoder: QueryBuildAddressResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "BuildAddress",
  getRpcInstance: getRpcInstance
});
export const useGetBuildAddress = buildUseQuery<QueryBuildAddressRequest, QueryBuildAddressResponse>({
  builderQueryFn: createGetBuildAddress,
  queryKeyPrefix: "BuildAddressQuery"
});