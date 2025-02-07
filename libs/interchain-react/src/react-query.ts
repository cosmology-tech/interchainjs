/**
* This file and any referenced files were automatically generated by @cosmology/telescope@1.11.16
* DO NOT MODIFY BY HAND. Instead, download the latest proto files for your chain
* and run the transpile command or npm scripts command that is used to regenerate this bundle.
*/


  import { getRpcClient } from './extern'
import {
  isRpc,
  Rpc,
} from './helpers'
import {
  ITxArgs,
  ISigningClient,
  StdFee,
  DeliverTxResponse,
  SigningClientResolver,
  RpcResolver,
  isISigningClient
} from './helper-func-types'
import {
    useQuery,
    useQueryClient,
    UseQueryOptions,
    useMutation,
    UseMutationOptions,
    QueryKey,
} from '@tanstack/react-query';

import { HttpEndpoint } from "@interchainjs/types";
import { Rpc as ProtobufRpcClient } from "./helpers";

export const DEFAULT_RPC_CLIENT_QUERY_KEY = 'rpcClient';
export const DEFAULT_RPC_ENDPOINT_QUERY_KEY = 'rpcEndPoint';
export const DEFAULT_SIGNING_CLIENT_QUERY_KEY = 'signingClient';

export interface CacheResolver {
    rpcEndpoint?: string | HttpEndpoint;
    clientQueryKey?: string;
}

export function isCacheResolver(resolver: unknown) : resolver is CacheResolver {
    return resolver !== null && resolver !== undefined && (resolver as CacheResolver).rpcEndpoint !== undefined && (resolver as CacheResolver).clientQueryKey !== undefined;
}

export interface ReactQueryParams<TResponse, TData = TResponse> {
    options?: UseQueryOptions<TResponse, Error, TData>;
}

export interface UseRpcClientQuery<TData> extends ReactQueryParams<ProtobufRpcClient, TData> {
    clientResolver?: CacheResolver;
}


export interface UseRpcEndpointQuery<TData> extends ReactQueryParams<string | HttpEndpoint, TData> {
    getter: () => Promise<string | HttpEndpoint>;
    rpcEndPointKey?: string;
}

export const useRpcEndpoint = <TData = string | HttpEndpoint>({
    getter,
    options,
    rpcEndPointKey,
}: UseRpcEndpointQuery<TData>) => {
    const key = rpcEndPointKey || DEFAULT_RPC_ENDPOINT_QUERY_KEY;
    return useQuery<string | HttpEndpoint, Error, TData>([key, getter], async () => {
        return await getter();
    }, options);
};

export const useRpcClient = <TData = ProtobufRpcClient>({
    options,
    clientResolver
}: UseRpcClientQuery<TData>) => {
    const queryClient = useQueryClient({
      context: options?.context
    });

    const key = clientResolver?.clientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY;
    return useQuery<ProtobufRpcClient, Error, TData>([key, clientResolver?.rpcEndpoint], async () => {
      if(!clientResolver?.rpcEndpoint) {
        throw new Error('rpcEndpoint is required');
      }

      const client = await getRpcClient(clientResolver.rpcEndpoint);
      if(!client) {
          throw new Error('Failed to connect to rpc client');
      }

      queryClient.setQueryData([key], client);

      return client;
    }, options);
};

export interface UseQueryBuilderOptions<TReq, TRes> {
  builderQueryFn: (clientResolver?: RpcResolver) => (request: TReq) => Promise<TRes>,
  queryKeyPrefix: string,
}

const getRpcClientFromCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  key: string,
  rpcEndpoint?: string | HttpEndpoint
): Rpc | undefined => {
  const queryKey = rpcEndpoint ? [key, rpcEndpoint] : [key];
  return queryClient.getQueryData<Rpc>(queryKey);
};

export function buildUseQuery<TReq, TRes>(opts: UseQueryBuilderOptions<TReq, TRes>) {
  return <TData = TRes>({
    request,
    options,
    clientResolver,
    customizedQueryKey,
  }: UseQueryParams<TReq, TRes, TData>) => {
    const queryClient = useQueryClient({
      context: options?.context
    });

    let rpcResolver: RpcResolver | undefined;

    if(isRpc(clientResolver)) {
      rpcResolver = clientResolver;
    } else {
      const key = isCacheResolver(clientResolver)
        ? clientResolver.clientQueryKey || DEFAULT_RPC_CLIENT_QUERY_KEY
        : DEFAULT_RPC_CLIENT_QUERY_KEY;
      const endpoint = isCacheResolver(clientResolver) ? clientResolver.rpcEndpoint : undefined;

      const cachedClient = getRpcClientFromCache(queryClient, key, endpoint);
      // For CacheResolver with endpoint, use endpoint as fallback if no cached client
      rpcResolver = cachedClient ||
        (isCacheResolver(clientResolver) && clientResolver.rpcEndpoint ? clientResolver.rpcEndpoint :
          (!isCacheResolver(clientResolver) ? clientResolver : undefined));
    }

    const queryFn = opts.builderQueryFn(rpcResolver);
    return useQuery<TRes, Error, TData>(customizedQueryKey || [opts.queryKeyPrefix, request], () => queryFn(request), options);
  };
}

export interface UseQueryParams<TReq, TRes, TData = TRes> extends ReactQueryParams<TRes, TData> {
  request: TReq;
  clientResolver?: CacheResolver | RpcResolver;
  customizedQueryKey?: QueryKey
}

export interface ReactMutationParams<TData, TError, TVariables, TContext = unknown> {
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  clientResolver?: CacheResolver | SigningClientResolver;
}


export interface UseMutationBuilderOptions<TMsg> {
  builderMutationFn: (clientResolver?: SigningClientResolver) => (
    signerAddress: string,
    message: TMsg | TMsg[],
    fee: StdFee | 'auto',
    memo: string
  ) => Promise<DeliverTxResponse>,
}

const getSigningClientFromCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  key: string,
  rpcEndpoint?: string | HttpEndpoint
): ISigningClient | undefined => {
  const queryKey = rpcEndpoint ? [key, rpcEndpoint] : [key];
  return queryClient.getQueryData<ISigningClient>(queryKey);
};

export function buildUseMutation<TMsg, TError>(opts: UseMutationBuilderOptions<TMsg>) {
  return ({
    options,
    clientResolver
  }: ReactMutationParams<DeliverTxResponse, TError, ITxArgs<TMsg>>) => {
    const queryClient = useQueryClient({
      context: options?.context
    });

    let signingClientResolver: SigningClientResolver | undefined;

    if(isISigningClient(clientResolver)) {
      signingClientResolver = clientResolver;
    } else {
      // For both CacheResolver and other cases, try to get from cache first
      const key = isCacheResolver(clientResolver)
        ? clientResolver.clientQueryKey || DEFAULT_SIGNING_CLIENT_QUERY_KEY
        : DEFAULT_SIGNING_CLIENT_QUERY_KEY;
      const endpoint = isCacheResolver(clientResolver) ? clientResolver.rpcEndpoint : undefined;

      const cachedClient = getSigningClientFromCache(queryClient, key, endpoint);
      signingClientResolver = cachedClient || (!isCacheResolver(clientResolver) ? clientResolver : undefined);
    }

    const mutationFn = opts.builderMutationFn(signingClientResolver);

    return useMutation<DeliverTxResponse, Error, ITxArgs<TMsg>>(
      (reqData: ITxArgs<TMsg>) => mutationFn(reqData.signerAddress, reqData.message, reqData.fee, reqData.memo),
      options as Omit<UseMutationOptions<DeliverTxResponse, Error, ITxArgs<TMsg>, unknown>, "mutationFn">
    );
  };
}
