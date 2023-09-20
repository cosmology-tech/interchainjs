import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { AccountQueryRequest, AccountQueryResponse } from "./query";
/** Query defines the Query service for the x/accounts module. */
export interface Query {
  /** AccountQuery runs an account query. */
  accountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* AccountQuery runs an account query. */
  accountQuery = async (request: AccountQueryRequest): Promise<AccountQueryResponse> => {
    const data = AccountQueryRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.accounts.v1.Query", "AccountQuery", data);
    return promise.then(data => AccountQueryResponse.decode(new BinaryReader(data)));
  };
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    accountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse> {
      return queryService.accountQuery(request);
    }
  };
};