import { TxRpc } from "./types";
import * as _CosmosBankV1beta1Txrpc from "./cosmos/bank/v1beta1/tx.rpc.msg";
import * as _CosmosDistributionV1beta1Txrpc from "./cosmos/distribution/v1beta1/tx.rpc.msg";
import * as _CosmosStakingV1beta1Txrpc from "./cosmos/staking/v1beta1/tx.rpc.msg";
import * as _IbcApplicationsTransferV1Txrpc from "./ibc/applications/transfer/v1/tx.rpc.msg";
export interface StargateImpl extends _CosmosBankV1beta1Txrpc.StargateImpl, _CosmosDistributionV1beta1Txrpc.StargateImpl, _CosmosStakingV1beta1Txrpc.StargateImpl, _IbcApplicationsTransferV1Txrpc.StargateImpl {}
export class StargateImpl {
  rpc: TxRpc;
  init(rpc: TxRpc) {
    this.rpc = rpc;
    this.sendTokens = _CosmosBankV1beta1Txrpc.createClientImpl(rpc).send;
    this.withdrawRewards = _CosmosDistributionV1beta1Txrpc.createClientImpl(rpc).withdrawDelegatorReward;
    this.delegateTokens = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).delegate;
    this.undelegateTokens = _CosmosStakingV1beta1Txrpc.createClientImpl(rpc).undelegate;
    this.sendIbcTokens = _IbcApplicationsTransferV1Txrpc.createClientImpl(rpc).transfer;
  }
}