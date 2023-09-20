import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryAccountRequest, AccountResponse, QueryAccountsRequest, AccountsResponse, QueryDisabledListRequest, DisabledListResponse } from "./query";
/** Query defines the circuit gRPC querier service. */
export interface Query {
  /** Account returns account permissions. */
  account(request: QueryAccountRequest): Promise<AccountResponse>;
  /** Account returns account permissions. */
  accounts(request?: QueryAccountsRequest): Promise<AccountsResponse>;
  /** DisabledList returns a list of disabled message urls */
  disabledList(request?: QueryDisabledListRequest): Promise<DisabledListResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* Account returns account permissions. */
  account = async (request: QueryAccountRequest): Promise<AccountResponse> => {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.circuit.v1.Query", "Account", data);
    return promise.then(data => AccountResponse.decode(new BinaryReader(data)));
  };
  /* Account returns account permissions. */
  accounts = async (request: QueryAccountsRequest = {
    pagination: undefined
  }): Promise<AccountsResponse> => {
    const data = QueryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.circuit.v1.Query", "Accounts", data);
    return promise.then(data => AccountsResponse.decode(new BinaryReader(data)));
  };
  /* DisabledList returns a list of disabled message urls */
  disabledList = async (request: QueryDisabledListRequest = {}): Promise<DisabledListResponse> => {
    const data = QueryDisabledListRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.circuit.v1.Query", "DisabledList", data);
    return promise.then(data => DisabledListResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    account(request: QueryAccountRequest): Promise<AccountResponse> {
      return queryService.account(request);
    },
    accounts(request?: QueryAccountsRequest): Promise<AccountsResponse> {
      return queryService.accounts(request);
    },
    disabledList(request?: QueryDisabledListRequest): Promise<DisabledListResponse> {
      return queryService.disabledList(request);
    }
  };
};