import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgCreateValidator, MsgEditValidator, MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation, MsgUpdateParams } from "./tx";
/** Msg defines the staking Msg service. */
export interface Msg {
  /** CreateValidator defines a method for creating a new validator. */
  createValidator(request: BroadcastTxReq<MsgCreateValidator>): Promise<DeliverTxResponse>;
  /** EditValidator defines a method for editing an existing validator. */
  editValidator(request: BroadcastTxReq<MsgEditValidator>): Promise<DeliverTxResponse>;
  /**
   * Delegate defines a method for performing a delegation of coins
   * from a delegator to a validator.
   */
  delegate(request: BroadcastTxReq<MsgDelegate>): Promise<DeliverTxResponse>;
  /**
   * BeginRedelegate defines a method for performing a redelegation
   * of coins from a delegator and source validator to a destination validator.
   */
  beginRedelegate(request: BroadcastTxReq<MsgBeginRedelegate>): Promise<DeliverTxResponse>;
  /**
   * Undelegate defines a method for performing an undelegation from a
   * delegate and a validator.
   */
  undelegate(request: BroadcastTxReq<MsgUndelegate>): Promise<DeliverTxResponse>;
  /**
   * CancelUnbondingDelegation defines a method for performing canceling the unbonding delegation
   * and delegate back to previous validator.
   * 
   * Since: cosmos-sdk 0.46
   */
  cancelUnbondingDelegation(request: BroadcastTxReq<MsgCancelUnbondingDelegation>): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines an operation for updating the x/staking module
   * parameters.
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse>;
}
/** Msg defines the staking Msg service. */
export interface StargateImpl {
  /**
   * Delegate defines a method for performing a delegation of coins
   * from a delegator to a validator.
   */
  delegateTokens(request: BroadcastTxReq<MsgDelegate>): Promise<DeliverTxResponse>;
  /**
   * Undelegate defines a method for performing an undelegation from a
   * delegate and a validator.
   */
  undelegateTokens(request: BroadcastTxReq<MsgUndelegate>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.createValidator = this.createValidator.bind(this);
    this.editValidator = this.editValidator.bind(this);
    this.delegate = this.delegate.bind(this);
    this.beginRedelegate = this.beginRedelegate.bind(this);
    this.undelegate = this.undelegate.bind(this);
    this.cancelUnbondingDelegation = this.cancelUnbondingDelegation.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  createValidator(request: BroadcastTxReq<MsgCreateValidator>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateValidator.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  editValidator(request: BroadcastTxReq<MsgEditValidator>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgEditValidator.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  delegate(request: BroadcastTxReq<MsgDelegate>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgDelegate.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  beginRedelegate(request: BroadcastTxReq<MsgBeginRedelegate>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgBeginRedelegate.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  undelegate(request: BroadcastTxReq<MsgUndelegate>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUndelegate.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  cancelUnbondingDelegation(request: BroadcastTxReq<MsgCancelUnbondingDelegation>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCancelUnbondingDelegation.typeUrl,
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
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};