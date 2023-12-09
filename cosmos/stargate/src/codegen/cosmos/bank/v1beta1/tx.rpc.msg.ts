import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgSend, MsgMultiSend, MsgUpdateParams, MsgSetSendEnabled } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /** Send defines a method for sending coins from one account to another account. */
  send(signerAddress: string, message: MsgSend, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** MultiSend defines a method for sending coins from some accounts to other accounts. */
  multiSend(signerAddress: string, message: MsgMultiSend, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/bank module parameters.
   * The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * SetSendEnabled is a governance operation for setting the SendEnabled flag
   * on any number of Denoms. Only the entries to add or update should be
   * included. Entries that already exist in the store, but that aren't
   * included in this message, will be left unchanged.
   * 
   * Since: cosmos-sdk 0.47
   */
  setSendEnabled(signerAddress: string, message: MsgSetSendEnabled, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
}
/** Msg defines the bank Msg service. */
export interface StargateImpl {
  /** Send defines a method for sending coins from one account to another account. */
  sendTokens(signerAddress: string, message: MsgSend, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
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
  send(signerAddress: string, message: MsgSend, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSend.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  multiSend(signerAddress: string, message: MsgMultiSend, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgMultiSend.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateParams(signerAddress: string, message: MsgUpdateParams, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateParams.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  setSendEnabled(signerAddress: string, message: MsgSetSendEnabled, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSetSendEnabled.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};