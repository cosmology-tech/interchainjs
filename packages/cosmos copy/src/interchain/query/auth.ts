import { Rpc } from "../../types";
import { BinaryReader } from "../binary";
import { QueryAccountRequest, QueryAccountResponse } from "./auth.proto";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Account returns account details based on address. */
  account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.account = this.account.bind(this);
  }
  account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.auth.v1beta1.Query",
      "Account",
      data
    );
    return promise.then((data: any) =>
      QueryAccountResponse.decode(new BinaryReader(data))
    );
  }
}
