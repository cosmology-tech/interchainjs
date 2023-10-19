import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgStoreCode, MsgStoreCodeResponse, MsgInstantiateContract, MsgInstantiateContractResponse, MsgInstantiateContract2, MsgInstantiateContract2Response, MsgExecuteContract, MsgExecuteContractResponse, MsgMigrateContract, MsgMigrateContractResponse, MsgUpdateAdmin, MsgUpdateAdminResponse, MsgClearAdmin, MsgClearAdminResponse, MsgUpdateInstantiateConfig, MsgUpdateInstantiateConfigResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgSudoContract, MsgSudoContractResponse, MsgPinCodes, MsgPinCodesResponse, MsgUnpinCodes, MsgUnpinCodesResponse, MsgStoreAndInstantiateContract, MsgStoreAndInstantiateContractResponse, MsgRemoveCodeUploadParamsAddresses, MsgRemoveCodeUploadParamsAddressesResponse, MsgAddCodeUploadParamsAddresses, MsgAddCodeUploadParamsAddressesResponse, MsgStoreAndMigrateContract, MsgStoreAndMigrateContractResponse, MsgUpdateContractLabel, MsgUpdateContractLabelResponse } from "./tx";
/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  /**
   * InstantiateContract creates a new smart contract instance for the given
   *  code id.
   */
  InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
  /**
   * InstantiateContract2 creates a new smart contract instance for the given
   *  code id with a predictable address
   */
  InstantiateContract2(request: MsgInstantiateContract2): Promise<MsgInstantiateContract2Response>;
  /** Execute submits the given message data to a smart contract */
  ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
  /** UpdateAdmin sets a new admin for a smart contract */
  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
  /** UpdateInstantiateConfig updates instantiate config for a smart contract */
  UpdateInstantiateConfig(request: MsgUpdateInstantiateConfig): Promise<MsgUpdateInstantiateConfigResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/wasm
   * module parameters. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * SudoContract defines a governance operation for calling sudo
   * on a contract. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  SudoContract(request: MsgSudoContract): Promise<MsgSudoContractResponse>;
  /**
   * PinCodes defines a governance operation for pinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  PinCodes(request: MsgPinCodes): Promise<MsgPinCodesResponse>;
  /**
   * UnpinCodes defines a governance operation for unpinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  UnpinCodes(request: MsgUnpinCodes): Promise<MsgUnpinCodesResponse>;
  /**
   * StoreAndInstantiateContract defines a governance operation for storing
   * and instantiating the contract. The authority is defined in the keeper.
   * 
   * Since: 0.40
   */
  StoreAndInstantiateContract(request: MsgStoreAndInstantiateContract): Promise<MsgStoreAndInstantiateContractResponse>;
  /**
   * RemoveCodeUploadParamsAddresses defines a governance operation for
   * removing addresses from code upload params.
   * The authority is defined in the keeper.
   */
  RemoveCodeUploadParamsAddresses(request: MsgRemoveCodeUploadParamsAddresses): Promise<MsgRemoveCodeUploadParamsAddressesResponse>;
  /**
   * AddCodeUploadParamsAddresses defines a governance operation for
   * adding addresses to code upload params.
   * The authority is defined in the keeper.
   */
  AddCodeUploadParamsAddresses(request: MsgAddCodeUploadParamsAddresses): Promise<MsgAddCodeUploadParamsAddressesResponse>;
  /**
   * StoreAndMigrateContract defines a governance operation for storing
   * and migrating the contract. The authority is defined in the keeper.
   * 
   * Since: 0.42
   */
  StoreAndMigrateContract(request: MsgStoreAndMigrateContract): Promise<MsgStoreAndMigrateContractResponse>;
  /**
   * UpdateContractLabel sets a new label for a smart contract
   * 
   * Since: 0.43
   */
  UpdateContractLabel(request: MsgUpdateContractLabel): Promise<MsgUpdateContractLabelResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreCode = this.StoreCode.bind(this);
    this.InstantiateContract = this.InstantiateContract.bind(this);
    this.InstantiateContract2 = this.InstantiateContract2.bind(this);
    this.ExecuteContract = this.ExecuteContract.bind(this);
    this.MigrateContract = this.MigrateContract.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.ClearAdmin = this.ClearAdmin.bind(this);
    this.UpdateInstantiateConfig = this.UpdateInstantiateConfig.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.SudoContract = this.SudoContract.bind(this);
    this.PinCodes = this.PinCodes.bind(this);
    this.UnpinCodes = this.UnpinCodes.bind(this);
    this.StoreAndInstantiateContract = this.StoreAndInstantiateContract.bind(this);
    this.RemoveCodeUploadParamsAddresses = this.RemoveCodeUploadParamsAddresses.bind(this);
    this.AddCodeUploadParamsAddresses = this.AddCodeUploadParamsAddresses.bind(this);
    this.StoreAndMigrateContract = this.StoreAndMigrateContract.bind(this);
    this.UpdateContractLabel = this.UpdateContractLabel.bind(this);
  }
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse> {
    const data = MsgStoreCode.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "StoreCode", data);
    return promise.then(data => MsgStoreCodeResponse.decode(new BinaryReader(data)));
  }
  InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse> {
    const data = MsgInstantiateContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "InstantiateContract", data);
    return promise.then(data => MsgInstantiateContractResponse.decode(new BinaryReader(data)));
  }
  InstantiateContract2(request: MsgInstantiateContract2): Promise<MsgInstantiateContract2Response> {
    const data = MsgInstantiateContract2.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "InstantiateContract2", data);
    return promise.then(data => MsgInstantiateContract2Response.decode(new BinaryReader(data)));
  }
  ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse> {
    const data = MsgExecuteContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ExecuteContract", data);
    return promise.then(data => MsgExecuteContractResponse.decode(new BinaryReader(data)));
  }
  MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse> {
    const data = MsgMigrateContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "MigrateContract", data);
    return promise.then(data => MsgMigrateContractResponse.decode(new BinaryReader(data)));
  }
  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse> {
    const data = MsgUpdateAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateAdmin", data);
    return promise.then(data => MsgUpdateAdminResponse.decode(new BinaryReader(data)));
  }
  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse> {
    const data = MsgClearAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "ClearAdmin", data);
    return promise.then(data => MsgClearAdminResponse.decode(new BinaryReader(data)));
  }
  UpdateInstantiateConfig(request: MsgUpdateInstantiateConfig): Promise<MsgUpdateInstantiateConfigResponse> {
    const data = MsgUpdateInstantiateConfig.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateInstantiateConfig", data);
    return promise.then(data => MsgUpdateInstantiateConfigResponse.decode(new BinaryReader(data)));
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  SudoContract(request: MsgSudoContract): Promise<MsgSudoContractResponse> {
    const data = MsgSudoContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "SudoContract", data);
    return promise.then(data => MsgSudoContractResponse.decode(new BinaryReader(data)));
  }
  PinCodes(request: MsgPinCodes): Promise<MsgPinCodesResponse> {
    const data = MsgPinCodes.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "PinCodes", data);
    return promise.then(data => MsgPinCodesResponse.decode(new BinaryReader(data)));
  }
  UnpinCodes(request: MsgUnpinCodes): Promise<MsgUnpinCodesResponse> {
    const data = MsgUnpinCodes.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UnpinCodes", data);
    return promise.then(data => MsgUnpinCodesResponse.decode(new BinaryReader(data)));
  }
  StoreAndInstantiateContract(request: MsgStoreAndInstantiateContract): Promise<MsgStoreAndInstantiateContractResponse> {
    const data = MsgStoreAndInstantiateContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "StoreAndInstantiateContract", data);
    return promise.then(data => MsgStoreAndInstantiateContractResponse.decode(new BinaryReader(data)));
  }
  RemoveCodeUploadParamsAddresses(request: MsgRemoveCodeUploadParamsAddresses): Promise<MsgRemoveCodeUploadParamsAddressesResponse> {
    const data = MsgRemoveCodeUploadParamsAddresses.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "RemoveCodeUploadParamsAddresses", data);
    return promise.then(data => MsgRemoveCodeUploadParamsAddressesResponse.decode(new BinaryReader(data)));
  }
  AddCodeUploadParamsAddresses(request: MsgAddCodeUploadParamsAddresses): Promise<MsgAddCodeUploadParamsAddressesResponse> {
    const data = MsgAddCodeUploadParamsAddresses.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "AddCodeUploadParamsAddresses", data);
    return promise.then(data => MsgAddCodeUploadParamsAddressesResponse.decode(new BinaryReader(data)));
  }
  StoreAndMigrateContract(request: MsgStoreAndMigrateContract): Promise<MsgStoreAndMigrateContractResponse> {
    const data = MsgStoreAndMigrateContract.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "StoreAndMigrateContract", data);
    return promise.then(data => MsgStoreAndMigrateContractResponse.decode(new BinaryReader(data)));
  }
  UpdateContractLabel(request: MsgUpdateContractLabel): Promise<MsgUpdateContractLabelResponse> {
    const data = MsgUpdateContractLabel.encode(request).finish();
    const promise = this.rpc.request("cosmwasm.wasm.v1.Msg", "UpdateContractLabel", data);
    return promise.then(data => MsgUpdateContractLabelResponse.decode(new BinaryReader(data)));
  }
}