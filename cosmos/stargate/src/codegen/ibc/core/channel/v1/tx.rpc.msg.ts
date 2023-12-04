import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../../types";
import { MsgChannelOpenInit, MsgChannelOpenTry, MsgChannelOpenAck, MsgChannelOpenConfirm, MsgChannelCloseInit, MsgChannelCloseConfirm, MsgRecvPacket, MsgTimeout, MsgTimeoutOnClose, MsgAcknowledgement } from "./tx";
/** Msg defines the ibc/channel Msg service. */
export interface Msg {
  /** ChannelOpenInit defines a rpc handler method for MsgChannelOpenInit. */
  channelOpenInit(request: BroadcastTxReq<MsgChannelOpenInit>): Promise<DeliverTxResponse>;
  /** ChannelOpenTry defines a rpc handler method for MsgChannelOpenTry. */
  channelOpenTry(request: BroadcastTxReq<MsgChannelOpenTry>): Promise<DeliverTxResponse>;
  /** ChannelOpenAck defines a rpc handler method for MsgChannelOpenAck. */
  channelOpenAck(request: BroadcastTxReq<MsgChannelOpenAck>): Promise<DeliverTxResponse>;
  /** ChannelOpenConfirm defines a rpc handler method for MsgChannelOpenConfirm. */
  channelOpenConfirm(request: BroadcastTxReq<MsgChannelOpenConfirm>): Promise<DeliverTxResponse>;
  /** ChannelCloseInit defines a rpc handler method for MsgChannelCloseInit. */
  channelCloseInit(request: BroadcastTxReq<MsgChannelCloseInit>): Promise<DeliverTxResponse>;
  /**
   * ChannelCloseConfirm defines a rpc handler method for
   * MsgChannelCloseConfirm.
   */
  channelCloseConfirm(request: BroadcastTxReq<MsgChannelCloseConfirm>): Promise<DeliverTxResponse>;
  /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
  recvPacket(request: BroadcastTxReq<MsgRecvPacket>): Promise<DeliverTxResponse>;
  /** Timeout defines a rpc handler method for MsgTimeout. */
  timeout(request: BroadcastTxReq<MsgTimeout>): Promise<DeliverTxResponse>;
  /** TimeoutOnClose defines a rpc handler method for MsgTimeoutOnClose. */
  timeoutOnClose(request: BroadcastTxReq<MsgTimeoutOnClose>): Promise<DeliverTxResponse>;
  /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
  acknowledgement(request: BroadcastTxReq<MsgAcknowledgement>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.channelOpenInit = this.channelOpenInit.bind(this);
    this.channelOpenTry = this.channelOpenTry.bind(this);
    this.channelOpenAck = this.channelOpenAck.bind(this);
    this.channelOpenConfirm = this.channelOpenConfirm.bind(this);
    this.channelCloseInit = this.channelCloseInit.bind(this);
    this.channelCloseConfirm = this.channelCloseConfirm.bind(this);
    this.recvPacket = this.recvPacket.bind(this);
    this.timeout = this.timeout.bind(this);
    this.timeoutOnClose = this.timeoutOnClose.bind(this);
    this.acknowledgement = this.acknowledgement.bind(this);
  }
  channelOpenInit(request: BroadcastTxReq<MsgChannelOpenInit>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenInit.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  channelOpenTry(request: BroadcastTxReq<MsgChannelOpenTry>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenTry.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  channelOpenAck(request: BroadcastTxReq<MsgChannelOpenAck>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenAck.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  channelOpenConfirm(request: BroadcastTxReq<MsgChannelOpenConfirm>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenConfirm.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  channelCloseInit(request: BroadcastTxReq<MsgChannelCloseInit>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelCloseInit.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  channelCloseConfirm(request: BroadcastTxReq<MsgChannelCloseConfirm>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelCloseConfirm.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  recvPacket(request: BroadcastTxReq<MsgRecvPacket>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgRecvPacket.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  timeout(request: BroadcastTxReq<MsgTimeout>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgTimeout.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  timeoutOnClose(request: BroadcastTxReq<MsgTimeoutOnClose>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgTimeoutOnClose.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  acknowledgement(request: BroadcastTxReq<MsgAcknowledgement>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgAcknowledgement.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};