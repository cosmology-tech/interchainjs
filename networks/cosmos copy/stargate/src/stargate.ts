import {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from "./codegen/cosmos/authz/v1beta1/tx";
import { MsgMultiSend, MsgSend } from "./codegen/cosmos/bank/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "./codegen/cosmos/distribution/v1beta1/tx";
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
} from "./codegen/cosmos/feegrant/v1beta1/tx";
import {
  MsgDeposit as MsgDepositV1,
  MsgExecLegacyContent as MsgExecLegacyContentV1,
  MsgSubmitProposal as MsgSubmitProposalV1,
  MsgVote as MsgVoteV1,
  MsgVoteWeighted as MsgVoteWeightedV1,
} from "./codegen/cosmos/gov/v1/tx";
import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from "./codegen/cosmos/gov/v1beta1/tx";
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
} from "./codegen/cosmos/group/v1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "./codegen/cosmos/staking/v1beta1/tx";
import { MsgCreateVestingAccount } from "./codegen/cosmos/vesting/v1beta1/tx";
import { MsgTransfer } from "./codegen/ibc/applications/transfer/v1/tx";
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
} from "./codegen/ibc/core/channel/v1/tx";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
} from "./codegen/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "./codegen/ibc/core/connection/v1/tx";

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

export const stargateConsts = [
  ...MsgAuthzConsts,
  ...MsgBankConsts,
  ...MsgDistributionConsts,
  ...MsgFeeGrantConsts,
  ...MsgGovConsts,
  ...MsgGroupConsts,
  ...MsgIbcConsts,
  ...MsgStakingConsts,
  ...MsgVestingConsts,
];
