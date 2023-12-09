import { DeliverTxResponse, StdFee, TxRpc } from "../../../../types";
import { MsgCreateClient, MsgUpdateClient, MsgUpgradeClient, MsgSubmitMisbehaviour } from "./tx";
/** Msg defines the ibc/client Msg service. */
export interface Msg {
  /** CreateClient defines a rpc handler method for MsgCreateClient. */
  createClient(signerAddress: string, message: MsgCreateClient, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
  updateClient(signerAddress: string, message: MsgUpdateClient, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
  upgradeClient(signerAddress: string, message: MsgUpgradeClient, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
  submitMisbehaviour(signerAddress: string, message: MsgSubmitMisbehaviour, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.createClient = this.createClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.upgradeClient = this.upgradeClient.bind(this);
    this.submitMisbehaviour = this.submitMisbehaviour.bind(this);
  }
  createClient(signerAddress: string, message: MsgCreateClient, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateClient.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateClient(signerAddress: string, message: MsgUpdateClient, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateClient.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  upgradeClient(signerAddress: string, message: MsgUpgradeClient, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpgradeClient.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  submitMisbehaviour(signerAddress: string, message: MsgSubmitMisbehaviour, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitMisbehaviour.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};