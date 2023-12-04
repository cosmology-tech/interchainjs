import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../../types";
import { MsgTransfer } from "./tx";
/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
  /** Transfer defines a rpc handler method for MsgTransfer. */
  transfer(request: BroadcastTxReq<MsgTransfer>): Promise<DeliverTxResponse>;
}
/** Msg defines the ibc/transfer Msg service. */
export interface StargateImpl {
  /** Transfer defines a rpc handler method for MsgTransfer. */
  sendIbcTokens(request: BroadcastTxReq<MsgTransfer>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.transfer = this.transfer.bind(this);
  }
  transfer(request: BroadcastTxReq<MsgTransfer>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgTransfer.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};