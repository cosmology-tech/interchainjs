import { TxRpc } from "./types";
import * as _CosmosAuthV1beta1Queryrpc from "./cosmos/auth/v1beta1/query.rpc.Query";
import * as _CosmosTxV1beta1Servicerpc from "./cosmos/tx/v1beta1/service.rpc.Service";
export interface QueryImpl extends _CosmosAuthV1beta1Queryrpc.QueryImpl, _CosmosTxV1beta1Servicerpc.QueryImpl {}
export class QueryImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.account = _CosmosAuthV1beta1Queryrpc.createClientImpl(rpc).account;
    this.simulate = _CosmosTxV1beta1Servicerpc.createClientImpl(rpc).simulate;
  }
}