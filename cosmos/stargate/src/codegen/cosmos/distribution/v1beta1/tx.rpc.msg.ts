import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool, MsgUpdateParams, MsgCommunityPoolSpend } from "./tx";
/** Msg defines the distribution Msg service. */
export interface Msg {
  /**
   * SetWithdrawAddress defines a method to change the withdraw address
   * for a delegator (or validator self-delegation).
   */
  setWithdrawAddress(request: BroadcastTxReq<MsgSetWithdrawAddress>): Promise<DeliverTxResponse>;
  /**
   * WithdrawDelegatorReward defines a method to withdraw rewards of delegator
   * from a single validator.
   */
  withdrawDelegatorReward(request: BroadcastTxReq<MsgWithdrawDelegatorReward>): Promise<DeliverTxResponse>;
  /**
   * WithdrawValidatorCommission defines a method to withdraw the
   * full commission to the validator address.
   */
  withdrawValidatorCommission(request: BroadcastTxReq<MsgWithdrawValidatorCommission>): Promise<DeliverTxResponse>;
  /**
   * FundCommunityPool defines a method to allow an account to directly
   * fund the community pool.
   */
  fundCommunityPool(request: BroadcastTxReq<MsgFundCommunityPool>): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/distribution
   * module parameters. The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse>;
  /**
   * CommunityPoolSpend defines a governance operation for sending tokens from
   * the community pool in the x/distribution module to another account, which
   * could be the governance module itself. The authority is defined in the
   * keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  communityPoolSpend(request: BroadcastTxReq<MsgCommunityPoolSpend>): Promise<DeliverTxResponse>;
}
/** Msg defines the distribution Msg service. */
export interface StargateImpl {
  /**
   * WithdrawDelegatorReward defines a method to withdraw rewards of delegator
   * from a single validator.
   */
  withdrawRewards(request: BroadcastTxReq<MsgWithdrawDelegatorReward>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.setWithdrawAddress = this.setWithdrawAddress.bind(this);
    this.withdrawDelegatorReward = this.withdrawDelegatorReward.bind(this);
    this.withdrawValidatorCommission = this.withdrawValidatorCommission.bind(this);
    this.fundCommunityPool = this.fundCommunityPool.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.communityPoolSpend = this.communityPoolSpend.bind(this);
  }
  setWithdrawAddress(request: BroadcastTxReq<MsgSetWithdrawAddress>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSetWithdrawAddress.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  withdrawDelegatorReward(request: BroadcastTxReq<MsgWithdrawDelegatorReward>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgWithdrawDelegatorReward.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  withdrawValidatorCommission(request: BroadcastTxReq<MsgWithdrawValidatorCommission>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgWithdrawValidatorCommission.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  fundCommunityPool(request: BroadcastTxReq<MsgFundCommunityPool>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgFundCommunityPool.typeUrl,
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
  communityPoolSpend(request: BroadcastTxReq<MsgCommunityPoolSpend>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCommunityPoolSpend.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};