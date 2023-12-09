import { DeliverTxResponse, StdFee, TxRpc } from "../../../../types";
import { MsgChannelOpenInit, MsgChannelOpenTry, MsgChannelOpenAck, MsgChannelOpenConfirm, MsgChannelCloseInit, MsgChannelCloseConfirm, MsgRecvPacket, MsgTimeout, MsgTimeoutOnClose, MsgAcknowledgement } from "./tx";
/** Msg defines the ibc/channel Msg service. */
export interface Msg {
  /** ChannelOpenInit defines a rpc handler method for MsgChannelOpenInit. */
  channelOpenInit(signerAddress: string, message: MsgChannelOpenInit, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ChannelOpenTry defines a rpc handler method for MsgChannelOpenTry. */
  channelOpenTry(signerAddress: string, message: MsgChannelOpenTry, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ChannelOpenAck defines a rpc handler method for MsgChannelOpenAck. */
  channelOpenAck(signerAddress: string, message: MsgChannelOpenAck, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ChannelOpenConfirm defines a rpc handler method for MsgChannelOpenConfirm. */
  channelOpenConfirm(signerAddress: string, message: MsgChannelOpenConfirm, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ChannelCloseInit defines a rpc handler method for MsgChannelCloseInit. */
  channelCloseInit(signerAddress: string, message: MsgChannelCloseInit, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * ChannelCloseConfirm defines a rpc handler method for
   * MsgChannelCloseConfirm.
   */
  channelCloseConfirm(signerAddress: string, message: MsgChannelCloseConfirm, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
  recvPacket(signerAddress: string, message: MsgRecvPacket, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** Timeout defines a rpc handler method for MsgTimeout. */
  timeout(signerAddress: string, message: MsgTimeout, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** TimeoutOnClose defines a rpc handler method for MsgTimeoutOnClose. */
  timeoutOnClose(signerAddress: string, message: MsgTimeoutOnClose, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
  acknowledgement(signerAddress: string, message: MsgAcknowledgement, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
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
  channelOpenInit(signerAddress: string, message: MsgChannelOpenInit, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenInit.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  channelOpenTry(signerAddress: string, message: MsgChannelOpenTry, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenTry.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  channelOpenAck(signerAddress: string, message: MsgChannelOpenAck, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenAck.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  channelOpenConfirm(signerAddress: string, message: MsgChannelOpenConfirm, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelOpenConfirm.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  channelCloseInit(signerAddress: string, message: MsgChannelCloseInit, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelCloseInit.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  channelCloseConfirm(signerAddress: string, message: MsgChannelCloseConfirm, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgChannelCloseConfirm.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  recvPacket(signerAddress: string, message: MsgRecvPacket, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgRecvPacket.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  timeout(signerAddress: string, message: MsgTimeout, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgTimeout.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  timeoutOnClose(signerAddress: string, message: MsgTimeoutOnClose, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgTimeoutOnClose.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  acknowledgement(signerAddress: string, message: MsgAcknowledgement, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgAcknowledgement.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};