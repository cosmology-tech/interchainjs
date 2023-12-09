import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgCreateVestingAccount, MsgCreatePermanentLockedAccount, MsgCreatePeriodicVestingAccount } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /**
   * CreateVestingAccount defines a method that enables creating a vesting
   * account.
   */
  createVestingAccount(signerAddress: string, message: MsgCreateVestingAccount, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * CreatePermanentLockedAccount defines a method that enables creating a permanent
   * locked account.
   * 
   * Since: cosmos-sdk 0.46
   */
  createPermanentLockedAccount(signerAddress: string, message: MsgCreatePermanentLockedAccount, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /**
   * CreatePeriodicVestingAccount defines a method that enables creating a
   * periodic vesting account.
   * 
   * Since: cosmos-sdk 0.46
   */
  createPeriodicVestingAccount(signerAddress: string, message: MsgCreatePeriodicVestingAccount, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.createVestingAccount = this.createVestingAccount.bind(this);
    this.createPermanentLockedAccount = this.createPermanentLockedAccount.bind(this);
    this.createPeriodicVestingAccount = this.createPeriodicVestingAccount.bind(this);
  }
  createVestingAccount(signerAddress: string, message: MsgCreateVestingAccount, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateVestingAccount.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  createPermanentLockedAccount(signerAddress: string, message: MsgCreatePermanentLockedAccount, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreatePermanentLockedAccount.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  createPeriodicVestingAccount(signerAddress: string, message: MsgCreatePeriodicVestingAccount, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreatePeriodicVestingAccount.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};