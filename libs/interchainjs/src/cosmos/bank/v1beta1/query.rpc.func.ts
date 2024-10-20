import { RpcResolver, buildQuery } from "../../../helper-func-types";
import { buildUseQuery } from "../../../react-query";
import { QueryBalanceRequest, QueryBalanceResponse, QueryAllBalancesRequest, QueryAllBalancesResponse, QuerySpendableBalancesRequest, QuerySpendableBalancesResponse, QuerySpendableBalanceByDenomRequest, QuerySpendableBalanceByDenomResponse, QueryTotalSupplyRequest, QueryTotalSupplyResponse, QuerySupplyOfRequest, QuerySupplyOfResponse, QueryParamsRequest, QueryParamsResponse, QueryDenomMetadataRequest, QueryDenomMetadataResponse, QueryDenomMetadataByQueryStringRequest, QueryDenomMetadataByQueryStringResponse, QueryDenomsMetadataRequest, QueryDenomsMetadataResponse, QueryDenomOwnersRequest, QueryDenomOwnersResponse, QueryDenomOwnersByQueryRequest, QueryDenomOwnersByQueryResponse, QuerySendEnabledRequest, QuerySendEnabledResponse } from "./query";
export const createGetBalance = (getRpcInstance: RpcResolver) => buildQuery<QueryBalanceRequest, QueryBalanceResponse>({
  encoder: QueryBalanceRequest.encode,
  decoder: QueryBalanceResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "Balance",
  getRpcInstance: getRpcInstance
});
export const useGetBalance = buildUseQuery<QueryBalanceRequest, QueryBalanceResponse>({
  builderQueryFn: createGetBalance,
  queryKeyPrefix: "BalanceQuery"
});
export const createGetAllBalances = (getRpcInstance: RpcResolver) => buildQuery<QueryAllBalancesRequest, QueryAllBalancesResponse>({
  encoder: QueryAllBalancesRequest.encode,
  decoder: QueryAllBalancesResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "AllBalances",
  getRpcInstance: getRpcInstance
});
export const useGetAllBalances = buildUseQuery<QueryAllBalancesRequest, QueryAllBalancesResponse>({
  builderQueryFn: createGetAllBalances,
  queryKeyPrefix: "AllBalancesQuery"
});
export const createGetSpendableBalances = (getRpcInstance: RpcResolver) => buildQuery<QuerySpendableBalancesRequest, QuerySpendableBalancesResponse>({
  encoder: QuerySpendableBalancesRequest.encode,
  decoder: QuerySpendableBalancesResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "SpendableBalances",
  getRpcInstance: getRpcInstance
});
export const useGetSpendableBalances = buildUseQuery<QuerySpendableBalancesRequest, QuerySpendableBalancesResponse>({
  builderQueryFn: createGetSpendableBalances,
  queryKeyPrefix: "SpendableBalancesQuery"
});
export const createGetSpendableBalanceByDenom = (getRpcInstance: RpcResolver) => buildQuery<QuerySpendableBalanceByDenomRequest, QuerySpendableBalanceByDenomResponse>({
  encoder: QuerySpendableBalanceByDenomRequest.encode,
  decoder: QuerySpendableBalanceByDenomResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "SpendableBalanceByDenom",
  getRpcInstance: getRpcInstance
});
export const useGetSpendableBalanceByDenom = buildUseQuery<QuerySpendableBalanceByDenomRequest, QuerySpendableBalanceByDenomResponse>({
  builderQueryFn: createGetSpendableBalanceByDenom,
  queryKeyPrefix: "SpendableBalanceByDenomQuery"
});
export const createGetTotalSupply = (getRpcInstance: RpcResolver) => buildQuery<QueryTotalSupplyRequest, QueryTotalSupplyResponse>({
  encoder: QueryTotalSupplyRequest.encode,
  decoder: QueryTotalSupplyResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "TotalSupply",
  getRpcInstance: getRpcInstance
});
export const useGetTotalSupply = buildUseQuery<QueryTotalSupplyRequest, QueryTotalSupplyResponse>({
  builderQueryFn: createGetTotalSupply,
  queryKeyPrefix: "TotalSupplyQuery"
});
export const createGetSupplyOf = (getRpcInstance: RpcResolver) => buildQuery<QuerySupplyOfRequest, QuerySupplyOfResponse>({
  encoder: QuerySupplyOfRequest.encode,
  decoder: QuerySupplyOfResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "SupplyOf",
  getRpcInstance: getRpcInstance
});
export const useGetSupplyOf = buildUseQuery<QuerySupplyOfRequest, QuerySupplyOfResponse>({
  builderQueryFn: createGetSupplyOf,
  queryKeyPrefix: "SupplyOfQuery"
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
export const createGetDenomMetadata = (getRpcInstance: RpcResolver) => buildQuery<QueryDenomMetadataRequest, QueryDenomMetadataResponse>({
  encoder: QueryDenomMetadataRequest.encode,
  decoder: QueryDenomMetadataResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "DenomMetadata",
  getRpcInstance: getRpcInstance
});
export const useGetDenomMetadata = buildUseQuery<QueryDenomMetadataRequest, QueryDenomMetadataResponse>({
  builderQueryFn: createGetDenomMetadata,
  queryKeyPrefix: "DenomMetadataQuery"
});
export const createGetDenomMetadataByQueryString = (getRpcInstance: RpcResolver) => buildQuery<QueryDenomMetadataByQueryStringRequest, QueryDenomMetadataByQueryStringResponse>({
  encoder: QueryDenomMetadataByQueryStringRequest.encode,
  decoder: QueryDenomMetadataByQueryStringResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "DenomMetadataByQueryString",
  getRpcInstance: getRpcInstance
});
export const useGetDenomMetadataByQueryString = buildUseQuery<QueryDenomMetadataByQueryStringRequest, QueryDenomMetadataByQueryStringResponse>({
  builderQueryFn: createGetDenomMetadataByQueryString,
  queryKeyPrefix: "DenomMetadataByQueryStringQuery"
});
export const createGetDenomsMetadata = (getRpcInstance: RpcResolver) => buildQuery<QueryDenomsMetadataRequest, QueryDenomsMetadataResponse>({
  encoder: QueryDenomsMetadataRequest.encode,
  decoder: QueryDenomsMetadataResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "DenomsMetadata",
  getRpcInstance: getRpcInstance
});
export const useGetDenomsMetadata = buildUseQuery<QueryDenomsMetadataRequest, QueryDenomsMetadataResponse>({
  builderQueryFn: createGetDenomsMetadata,
  queryKeyPrefix: "DenomsMetadataQuery"
});
export const createGetDenomOwners = (getRpcInstance: RpcResolver) => buildQuery<QueryDenomOwnersRequest, QueryDenomOwnersResponse>({
  encoder: QueryDenomOwnersRequest.encode,
  decoder: QueryDenomOwnersResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "DenomOwners",
  getRpcInstance: getRpcInstance
});
export const useGetDenomOwners = buildUseQuery<QueryDenomOwnersRequest, QueryDenomOwnersResponse>({
  builderQueryFn: createGetDenomOwners,
  queryKeyPrefix: "DenomOwnersQuery"
});
export const createGetDenomOwnersByQuery = (getRpcInstance: RpcResolver) => buildQuery<QueryDenomOwnersByQueryRequest, QueryDenomOwnersByQueryResponse>({
  encoder: QueryDenomOwnersByQueryRequest.encode,
  decoder: QueryDenomOwnersByQueryResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "DenomOwnersByQuery",
  getRpcInstance: getRpcInstance
});
export const useGetDenomOwnersByQuery = buildUseQuery<QueryDenomOwnersByQueryRequest, QueryDenomOwnersByQueryResponse>({
  builderQueryFn: createGetDenomOwnersByQuery,
  queryKeyPrefix: "DenomOwnersByQueryQuery"
});
export const createGetSendEnabled = (getRpcInstance: RpcResolver) => buildQuery<QuerySendEnabledRequest, QuerySendEnabledResponse>({
  encoder: QuerySendEnabledRequest.encode,
  decoder: QuerySendEnabledResponse.decode,
  service: "cosmos.bank.v1beta1.Query",
  method: "SendEnabled",
  getRpcInstance: getRpcInstance
});
export const useGetSendEnabled = buildUseQuery<QuerySendEnabledRequest, QuerySendEnabledResponse>({
  builderQueryFn: createGetSendEnabled,
  queryKeyPrefix: "SendEnabledQuery"
});