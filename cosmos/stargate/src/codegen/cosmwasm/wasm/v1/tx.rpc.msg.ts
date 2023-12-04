import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgStoreCode, MsgInstantiateContract, MsgInstantiateContract2, MsgExecuteContract, MsgMigrateContract, MsgUpdateAdmin, MsgClearAdmin, MsgUpdateInstantiateConfig, MsgUpdateParams, MsgSudoContract, MsgPinCodes, MsgUnpinCodes, MsgStoreAndInstantiateContract, MsgRemoveCodeUploadParamsAddresses, MsgAddCodeUploadParamsAddresses, MsgStoreAndMigrateContract, MsgUpdateContractLabel } from "./tx";
/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  storeCode(request: BroadcastTxReq<MsgStoreCode>): Promise<DeliverTxResponse>;
  /**
   * InstantiateContract creates a new smart contract instance for the given
   *  code id.
   */
  instantiateContract(request: BroadcastTxReq<MsgInstantiateContract>): Promise<DeliverTxResponse>;
  /**
   * InstantiateContract2 creates a new smart contract instance for the given
   *  code id with a predictable address
   */
  instantiateContract2(request: BroadcastTxReq<MsgInstantiateContract2>): Promise<DeliverTxResponse>;
  /** Execute submits the given message data to a smart contract */
  executeContract(request: BroadcastTxReq<MsgExecuteContract>): Promise<DeliverTxResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  migrateContract(request: BroadcastTxReq<MsgMigrateContract>): Promise<DeliverTxResponse>;
  /** UpdateAdmin sets a new admin for a smart contract */
  updateAdmin(request: BroadcastTxReq<MsgUpdateAdmin>): Promise<DeliverTxResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  clearAdmin(request: BroadcastTxReq<MsgClearAdmin>): Promise<DeliverTxResponse>;
  /** UpdateInstantiateConfig updates instantiate config for a smart contract */
  updateInstantiateConfig(request: BroadcastTxReq<MsgUpdateInstantiateConfig>): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/wasm
   * module parameters. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse>;
  /**
   * SudoContract defines a governance operation for calling sudo
   * on a contract. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  sudoContract(request: BroadcastTxReq<MsgSudoContract>): Promise<DeliverTxResponse>;
  /**
   * PinCodes defines a governance operation for pinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  pinCodes(request: BroadcastTxReq<MsgPinCodes>): Promise<DeliverTxResponse>;
  /**
   * UnpinCodes defines a governance operation for unpinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  unpinCodes(request: BroadcastTxReq<MsgUnpinCodes>): Promise<DeliverTxResponse>;
  /**
   * StoreAndInstantiateContract defines a governance operation for storing
   * and instantiating the contract. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  storeAndInstantiateContract(request: BroadcastTxReq<MsgStoreAndInstantiateContract>): Promise<DeliverTxResponse>;
  /**
   * RemoveCodeUploadParamsAddresses defines a governance operation for
   * removing addresses from code upload params.
   * The authority is defined in the keeper.
   */
  removeCodeUploadParamsAddresses(request: BroadcastTxReq<MsgRemoveCodeUploadParamsAddresses>): Promise<DeliverTxResponse>;
  /**
   * AddCodeUploadParamsAddresses defines a governance operation for
   * adding addresses to code upload params.
   * The authority is defined in the keeper.
   */
  addCodeUploadParamsAddresses(request: BroadcastTxReq<MsgAddCodeUploadParamsAddresses>): Promise<DeliverTxResponse>;
  /**
   * StoreAndMigrateContract defines a governance operation for storing
   * and migrating the contract. The authority is defined in the keeper.
   * 
   * Since: 0.42
   */
  storeAndMigrateContract(request: BroadcastTxReq<MsgStoreAndMigrateContract>): Promise<DeliverTxResponse>;
  /**
   * UpdateContractLabel sets a new label for a smart contract
   * 
   * Since: 0.43
   */
  updateContractLabel(request: BroadcastTxReq<MsgUpdateContractLabel>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.storeCode = this.storeCode.bind(this);
    this.instantiateContract = this.instantiateContract.bind(this);
    this.instantiateContract2 = this.instantiateContract2.bind(this);
    this.executeContract = this.executeContract.bind(this);
    this.migrateContract = this.migrateContract.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.clearAdmin = this.clearAdmin.bind(this);
    this.updateInstantiateConfig = this.updateInstantiateConfig.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.sudoContract = this.sudoContract.bind(this);
    this.pinCodes = this.pinCodes.bind(this);
    this.unpinCodes = this.unpinCodes.bind(this);
    this.storeAndInstantiateContract = this.storeAndInstantiateContract.bind(this);
    this.removeCodeUploadParamsAddresses = this.removeCodeUploadParamsAddresses.bind(this);
    this.addCodeUploadParamsAddresses = this.addCodeUploadParamsAddresses.bind(this);
    this.storeAndMigrateContract = this.storeAndMigrateContract.bind(this);
    this.updateContractLabel = this.updateContractLabel.bind(this);
  }
  storeCode(request: BroadcastTxReq<MsgStoreCode>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgStoreCode.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  instantiateContract(request: BroadcastTxReq<MsgInstantiateContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgInstantiateContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  instantiateContract2(request: BroadcastTxReq<MsgInstantiateContract2>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgInstantiateContract2.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  executeContract(request: BroadcastTxReq<MsgExecuteContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgExecuteContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  migrateContract(request: BroadcastTxReq<MsgMigrateContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgMigrateContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateAdmin(request: BroadcastTxReq<MsgUpdateAdmin>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateAdmin.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  clearAdmin(request: BroadcastTxReq<MsgClearAdmin>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgClearAdmin.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateInstantiateConfig(request: BroadcastTxReq<MsgUpdateInstantiateConfig>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateInstantiateConfig.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateParams.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  sudoContract(request: BroadcastTxReq<MsgSudoContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSudoContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  pinCodes(request: BroadcastTxReq<MsgPinCodes>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgPinCodes.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  unpinCodes(request: BroadcastTxReq<MsgUnpinCodes>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUnpinCodes.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  storeAndInstantiateContract(request: BroadcastTxReq<MsgStoreAndInstantiateContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgStoreAndInstantiateContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  removeCodeUploadParamsAddresses(request: BroadcastTxReq<MsgRemoveCodeUploadParamsAddresses>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgRemoveCodeUploadParamsAddresses.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  addCodeUploadParamsAddresses(request: BroadcastTxReq<MsgAddCodeUploadParamsAddresses>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgAddCodeUploadParamsAddresses.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  storeAndMigrateContract(request: BroadcastTxReq<MsgStoreAndMigrateContract>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgStoreAndMigrateContract.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateContractLabel(request: BroadcastTxReq<MsgUpdateContractLabel>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateContractLabel.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};