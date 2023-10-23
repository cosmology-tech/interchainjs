import { Signer } from "@sign/cosmos";
import {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from "interchain-query/cosmos/authz/v1beta1/tx";
import { MsgMultiSend, MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "interchain-query/cosmos/distribution/v1beta1/tx";
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
} from "interchain-query/cosmos/feegrant/v1beta1/tx";
import {
  MsgDeposit as MsgDepositV1,
  MsgExecLegacyContent as MsgExecLegacyContentV1,
  MsgSubmitProposal as MsgSubmitProposalV1,
  MsgVote as MsgVoteV1,
  MsgVoteWeighted as MsgVoteWeightedV1,
} from "interchain-query/cosmos/gov/v1/tx";
import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from "interchain-query/cosmos/gov/v1beta1/tx";
import {
  MsgCreateGroup,
  MsgCreateGroupPolicy,
  MsgCreateGroupWithPolicy,
  MsgExec as MsgGroupExec,
  MsgLeaveGroup,
  MsgSubmitProposal as MsgGroupSubmitProposal,
  MsgUpdateGroupAdmin,
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyAdmin,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadata,
  MsgVote as MsgGroupVote,
  MsgWithdrawProposal,
} from "interchain-query/cosmos/group/v1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "interchain-query/cosmos/staking/v1beta1/tx";
import { MsgCreateVestingAccount } from "interchain-query/cosmos/vesting/v1beta1/tx";
import { MsgTransfer } from "interchain-query/ibc/applications/transfer/v1/tx";
import {
  MsgChannelCloseConfirm,
  MsgChannelCloseInit,
  MsgChannelOpenAck,
  MsgChannelOpenConfirm,
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgRecvPacket,
  MsgTimeout,
  MsgTimeoutOnClose,
} from "interchain-query/ibc/core/channel/v1/tx";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
} from "interchain-query/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "interchain-query/ibc/core/connection/v1/tx";

const MsgAuthzConsts = [MsgGrant, MsgExec, MsgRevoke];
const MsgBankConsts = [MsgSend, MsgMultiSend];
const MsgDistributionConsts = [
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
];
const MsgFeeGrantConsts = [MsgGrantAllowance, MsgRevokeAllowance];
const MsgGovConsts = [
  MsgDepositV1,
  MsgSubmitProposalV1,
  MsgExecLegacyContentV1,
  MsgVoteV1,
  MsgVoteWeightedV1,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
  MsgDeposit,
];
const MsgGroupConsts = [
  MsgCreateGroup,
  MsgUpdateGroupMembers,
  MsgUpdateGroupAdmin,
  MsgUpdateGroupMetadata,
  MsgCreateGroupPolicy,
  MsgCreateGroupWithPolicy,
  MsgUpdateGroupPolicyAdmin,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadata,
  MsgGroupSubmitProposal,
  MsgWithdrawProposal,
  MsgGroupVote,
  MsgGroupExec,
  MsgLeaveGroup,
];

const MsgIbcConsts = [
  MsgTransfer,
  MsgTransfer,
  MsgChannelCloseConfirm,
  MsgChannelCloseInit,
  MsgChannelOpenAck,
  MsgChannelOpenConfirm,
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgRecvPacket,
  MsgTimeout,
  MsgTimeoutOnClose,
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
];

const MsgStakingConsts = [
  MsgCreateValidator,
  MsgEditValidator,
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
];

const MsgVestingConsts = [MsgCreateVestingAccount];

export const stargateSigner = new Signer(
  ...MsgAuthzConsts,
  ...MsgBankConsts,
  ...MsgDistributionConsts,
  ...MsgFeeGrantConsts,
  ...MsgGovConsts,
  ...MsgGroupConsts,
  ...MsgIbcConsts,
  ...MsgStakingConsts,
  ...MsgVestingConsts
);
