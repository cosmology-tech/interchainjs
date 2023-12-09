import { TxRpc } from "./types";
import * as _CosmwasmWasmV1Txrpc from "./cosmwasm/wasm/v1/tx.rpc.msg";
export interface CosmWasmImpl extends _CosmwasmWasmV1Txrpc.CosmWasmImpl {}
export class CosmWasmImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.storeCode = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeCode;
    this.instantiateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).instantiateContract;
    this.instantiateContract2 = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).instantiateContract2;
    this.executeContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).executeContract;
    this.migrateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).migrateContract;
    this.updateAdmin = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateAdmin;
    this.clearAdmin = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).clearAdmin;
  }
}