import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../../types";
import { MsgConnectionOpenInit, MsgConnectionOpenTry, MsgConnectionOpenAck, MsgConnectionOpenConfirm } from "./tx";
/** Msg defines the ibc/connection Msg service. */
export interface Msg {
  /** ConnectionOpenInit defines a rpc handler method for MsgConnectionOpenInit. */
  connectionOpenInit(request: BroadcastTxReq<MsgConnectionOpenInit>): Promise<DeliverTxResponse>;
  /** ConnectionOpenTry defines a rpc handler method for MsgConnectionOpenTry. */
  connectionOpenTry(request: BroadcastTxReq<MsgConnectionOpenTry>): Promise<DeliverTxResponse>;
  /** ConnectionOpenAck defines a rpc handler method for MsgConnectionOpenAck. */
  connectionOpenAck(request: BroadcastTxReq<MsgConnectionOpenAck>): Promise<DeliverTxResponse>;
  /**
   * ConnectionOpenConfirm defines a rpc handler method for
   * MsgConnectionOpenConfirm.
   */
  connectionOpenConfirm(request: BroadcastTxReq<MsgConnectionOpenConfirm>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.connectionOpenInit = this.connectionOpenInit.bind(this);
    this.connectionOpenTry = this.connectionOpenTry.bind(this);
    this.connectionOpenAck = this.connectionOpenAck.bind(this);
    this.connectionOpenConfirm = this.connectionOpenConfirm.bind(this);
  }
  connectionOpenInit(request: BroadcastTxReq<MsgConnectionOpenInit>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenInit.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  connectionOpenTry(request: BroadcastTxReq<MsgConnectionOpenTry>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenTry.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  connectionOpenAck(request: BroadcastTxReq<MsgConnectionOpenAck>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenAck.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  connectionOpenConfirm(request: BroadcastTxReq<MsgConnectionOpenConfirm>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenConfirm.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};