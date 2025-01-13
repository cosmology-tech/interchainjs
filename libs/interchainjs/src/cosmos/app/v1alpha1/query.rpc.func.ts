import { RpcResolver, buildQuery } from "../../../helper-func-types";
import { QueryConfigRequest, QueryConfigResponse } from "./query";
export const createGetConfig = (clientResolver?: RpcResolver) => buildQuery<QueryConfigRequest, QueryConfigResponse>({
  encode: QueryConfigRequest.encode,
  decode: QueryConfigResponse.decode,
  service: "cosmos.app.v1alpha1.Query",
  method: "Config",
  clientResolver,
  deps: [QueryConfigRequest, QueryConfigResponse]
});