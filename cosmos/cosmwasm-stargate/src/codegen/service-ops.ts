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
    this.updateInstantiateConfig = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateInstantiateConfig;
    this.updateWasmParams = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateParams;
    this.sudoContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).sudoContract;
    this.pinCodes = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).pinCodes;
    this.unpinCodes = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).unpinCodes;
    this.storeAndInstantiateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeAndInstantiateContract;
    this.removeCodeUploadParamsAddresses = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).removeCodeUploadParamsAddresses;
    this.addCodeUploadParamsAddresses = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).addCodeUploadParamsAddresses;
    this.storeAndMigrateContract = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).storeAndMigrateContract;
    this.updateContractLabel = _CosmwasmWasmV1Txrpc.createClientImpl(rpc).updateContractLabel;
  }
}