import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgSend, MsgMultiSend, MsgUpdateParams, MsgSetSendEnabled } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /** Send defines a method for sending coins from one account to another account. */
  send(request: BroadcastTxReq<MsgSend>): Promise<DeliverTxResponse>;
  /** MultiSend defines a method for sending coins from some accounts to other accounts. */
  multiSend(request: BroadcastTxReq<MsgMultiSend>): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/bank module parameters.
   * The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse>;
  /**
   * SetSendEnabled is a governance operation for setting the SendEnabled flag
   * on any number of Denoms. Only the entries to add or update should be
   * included. Entries that already exist in the store, but that aren't
   * included in this message, will be left unchanged.
   * 
   * Since: cosmos-sdk 0.47
   */
  setSendEnabled(request: BroadcastTxReq<MsgSetSendEnabled>): Promise<DeliverTxResponse>;
}
/** Msg defines the bank Msg service. */
export interface StargateImpl {
  /** Send defines a method for sending coins from one account to another account. */
  sendTokens(request: BroadcastTxReq<MsgSend>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.send = this.send.bind(this);
    this.multiSend = this.multiSend.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.setSendEnabled = this.setSendEnabled.bind(this);
  }
  send(request: BroadcastTxReq<MsgSend>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSend.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  multiSend(request: BroadcastTxReq<MsgMultiSend>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgMultiSend.typeUrl,
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
  setSendEnabled(request: BroadcastTxReq<MsgSetSendEnabled>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSetSendEnabled.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};