import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgCreateVestingAccount, MsgCreatePermanentLockedAccount, MsgCreatePeriodicVestingAccount } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /**
   * CreateVestingAccount defines a method that enables creating a vesting
   * account.
   */
  createVestingAccount(request: BroadcastTxReq<MsgCreateVestingAccount>): Promise<DeliverTxResponse>;
  /**
   * CreatePermanentLockedAccount defines a method that enables creating a permanent
   * locked account.
   * 
   * Since: cosmos-sdk 0.46
   */
  createPermanentLockedAccount(request: BroadcastTxReq<MsgCreatePermanentLockedAccount>): Promise<DeliverTxResponse>;
  /**
   * CreatePeriodicVestingAccount defines a method that enables creating a
   * periodic vesting account.
   * 
   * Since: cosmos-sdk 0.46
   */
  createPeriodicVestingAccount(request: BroadcastTxReq<MsgCreatePeriodicVestingAccount>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.createVestingAccount = this.createVestingAccount.bind(this);
    this.createPermanentLockedAccount = this.createPermanentLockedAccount.bind(this);
    this.createPeriodicVestingAccount = this.createPeriodicVestingAccount.bind(this);
  }
  createVestingAccount(request: BroadcastTxReq<MsgCreateVestingAccount>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateVestingAccount.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  createPermanentLockedAccount(request: BroadcastTxReq<MsgCreatePermanentLockedAccount>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreatePermanentLockedAccount.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  createPeriodicVestingAccount(request: BroadcastTxReq<MsgCreatePeriodicVestingAccount>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreatePeriodicVestingAccount.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};