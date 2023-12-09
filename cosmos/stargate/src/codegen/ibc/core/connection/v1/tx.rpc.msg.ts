import { DeliverTxResponse, StdFee, TxRpc } from "../../../../types";
import { MsgConnectionOpenInit, MsgConnectionOpenTry, MsgConnectionOpenAck, MsgConnectionOpenConfirm } from "./tx";
/** Msg defines the ibc/connection Msg service. */
export interface Msg {
  /** ConnectionOpenInit defines a rpc handler method for MsgConnectionOpenInit. */
  connectionOpenInit(signerAddress: string, message: MsgConnectionOpenInit, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ConnectionOpenTry defines a rpc handler method for MsgConnectionOpenTry. */
  connectionOpenTry(signerAddress: string, message: MsgConnectionOpenTry, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** ConnectionOpenAck defines a rpc handler method for MsgConnectionOpenAck. */
  connectionOpenAck(signerAddress: string, message: MsgConnectionOpenAck, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * ConnectionOpenConfirm defines a rpc handler method for
   * MsgConnectionOpenConfirm.
   */
  connectionOpenConfirm(signerAddress: string, message: MsgConnectionOpenConfirm, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
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
  connectionOpenInit(signerAddress: string, message: MsgConnectionOpenInit, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenInit.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  connectionOpenTry(signerAddress: string, message: MsgConnectionOpenTry, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenTry.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  connectionOpenAck(signerAddress: string, message: MsgConnectionOpenAck, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenAck.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  connectionOpenConfirm(signerAddress: string, message: MsgConnectionOpenConfirm, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgConnectionOpenConfirm.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};