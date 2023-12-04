import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../../types";
import { MsgCreateClient, MsgUpdateClient, MsgUpgradeClient, MsgSubmitMisbehaviour } from "./tx";
/** Msg defines the ibc/client Msg service. */
export interface Msg {
  /** CreateClient defines a rpc handler method for MsgCreateClient. */
  createClient(request: BroadcastTxReq<MsgCreateClient>): Promise<DeliverTxResponse>;
  /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
  updateClient(request: BroadcastTxReq<MsgUpdateClient>): Promise<DeliverTxResponse>;
  /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
  upgradeClient(request: BroadcastTxReq<MsgUpgradeClient>): Promise<DeliverTxResponse>;
  /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
  submitMisbehaviour(request: BroadcastTxReq<MsgSubmitMisbehaviour>): Promise<DeliverTxResponse>;
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
  createClient(request: BroadcastTxReq<MsgCreateClient>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateClient.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateClient(request: BroadcastTxReq<MsgUpdateClient>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateClient.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  upgradeClient(request: BroadcastTxReq<MsgUpgradeClient>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpgradeClient.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  submitMisbehaviour(request: BroadcastTxReq<MsgSubmitMisbehaviour>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitMisbehaviour.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};