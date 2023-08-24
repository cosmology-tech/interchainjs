import { MsgParser, MsgParserPool } from "@sign/cosmos";
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

// ------------- AUTHZ -------------

export const MsgGrantParser = MsgParser.fromTelescope(MsgGrant);
export const MsgExecParser = MsgParser.fromTelescope(MsgExec);
export const MsgRevokeParser = MsgParser.fromTelescope(MsgRevoke);

// ------------- BANK -------------

export const MsgSendParser = MsgParser.fromTelescope(MsgSend);
export const MsgMultiSendParser = MsgParser.fromTelescope(MsgMultiSend);

// ------------- DISTRIBUTION -------------

export const MsgSetWithdrawAddressParser = MsgParser.fromTelescope(
  MsgSetWithdrawAddress
);
export const MsgWithdrawDelegatorRewardParser = MsgParser.fromTelescope(
  MsgWithdrawDelegatorReward
);
export const MsgWithdrawValidatorCommissionParser = MsgParser.fromTelescope(
  MsgWithdrawValidatorCommission
);
export const MsgFundCommunityPoolParser =
  MsgParser.fromTelescope(MsgFundCommunityPool);

// ------------- FEE GRANT -------------

export const MsgGrantAllowanceParser =
  MsgParser.fromTelescope(MsgGrantAllowance);
export const MsgRevokeAllowanceParser =
  MsgParser.fromTelescope(MsgRevokeAllowance);

// ------------- GOV -------------

export const MsgDepositV1Parser = MsgParser.fromTelescope(MsgDepositV1);
export const MsgMsgSubmitProposalV1Parser =
  MsgParser.fromTelescope(MsgSubmitProposalV1);
export const MsgExecLegacyContentV1Parser = MsgParser.fromTelescope(
  MsgExecLegacyContentV1
);
export const MsgVoteV1Parser = MsgParser.fromTelescope(MsgVoteV1);
export const MsgVoteWeightedV1Parser =
  MsgParser.fromTelescope(MsgVoteWeightedV1);

export const MsgSubmitProposalParser =
  MsgParser.fromTelescope(MsgSubmitProposal);
export const MsgVoteParser = MsgParser.fromTelescope(MsgVote);
export const MsgVoteWeightedParser = MsgParser.fromTelescope(MsgVoteWeighted);
export const MsgDepositParser = MsgParser.fromTelescope(MsgDeposit);

// ------------- GROUP -------------

export const MsgCreateGroupParser = MsgParser.fromTelescope(MsgCreateGroup);
export const MsgUpdateGroupMembersParser = MsgParser.fromTelescope(
  MsgUpdateGroupMembers
);
export const MsgUpdateGroupAdminParser =
  MsgParser.fromTelescope(MsgUpdateGroupAdmin);
export const MsgUpdateGroupMetadataParser = MsgParser.fromTelescope(
  MsgUpdateGroupMetadata
);
export const MsgCreateGroupPolicyParser =
  MsgParser.fromTelescope(MsgCreateGroupPolicy);
export const MsgCreateGroupWithPolicyParser = MsgParser.fromTelescope(
  MsgCreateGroupWithPolicy
);
export const MsgUpdateGroupPolicyAdminParser = MsgParser.fromTelescope(
  MsgUpdateGroupPolicyAdmin
);
export const MsgUpdateGroupPolicyDecisionPolicyParser = MsgParser.fromTelescope(
  MsgUpdateGroupPolicyDecisionPolicy
);
export const MsgUpdateGroupPolicyMetadataParser = MsgParser.fromTelescope(
  MsgUpdateGroupPolicyMetadata
);
export const MsgGroupSubmitProposalParser = MsgParser.fromTelescope(
  MsgGroupSubmitProposal
);
export const MsgWithdrawProposalParser =
  MsgParser.fromTelescope(MsgWithdrawProposal);
export const MsgGroupVoteParser = MsgParser.fromTelescope(MsgGroupVote);
export const MsgGroupExecParser = MsgParser.fromTelescope(MsgGroupExec);
export const MsgLeaveGroupParser = MsgParser.fromTelescope(MsgLeaveGroup);

// ------------- IBC -------------

export const MsgTransferParser = MsgParser.fromTelescope(MsgTransfer);
export const MsgAcknowledgementParser = MsgParser.fromTelescope(MsgTransfer);
export const MsgChannelCloseConfirmParser = MsgParser.fromTelescope(
  MsgChannelCloseConfirm
);
export const MsgChannelCloseInitParser =
  MsgParser.fromTelescope(MsgChannelCloseInit);
export const MsgChannelOpenAckParser =
  MsgParser.fromTelescope(MsgChannelOpenAck);
export const MsgChannelOpenConfirmParser = MsgParser.fromTelescope(
  MsgChannelOpenConfirm
);
export const MsgChannelOpenInitParser =
  MsgParser.fromTelescope(MsgChannelOpenInit);
export const MsgChannelOpenTryParser =
  MsgParser.fromTelescope(MsgChannelOpenTry);
export const MsgRecvPacketParser = MsgParser.fromTelescope(MsgRecvPacket);
export const MsgTimeoutParser = MsgParser.fromTelescope(MsgTimeout);
export const MsgTimeoutOnCloseParser =
  MsgParser.fromTelescope(MsgTimeoutOnClose);
export const MsgCreateClientParser = MsgParser.fromTelescope(MsgCreateClient);
export const MsgSubmitMisbehaviourParser = MsgParser.fromTelescope(
  MsgSubmitMisbehaviour
);
export const MsgUpdateClientParser = MsgParser.fromTelescope(MsgUpdateClient);
export const MsgUpgradeClientParser = MsgParser.fromTelescope(MsgUpgradeClient);
export const MsgConnectionOpenAckParser =
  MsgParser.fromTelescope(MsgConnectionOpenAck);
export const MsgConnectionOpenConfirmParser = MsgParser.fromTelescope(
  MsgConnectionOpenConfirm
);
export const MsgConnectionOpenInitParser = MsgParser.fromTelescope(
  MsgConnectionOpenInit
);
export const MsgConnectionOpenTryParser =
  MsgParser.fromTelescope(MsgConnectionOpenTry);

// ------------- STAKING -------------

export const MsgCreateValidatorParser =
  MsgParser.fromTelescope(MsgCreateValidator);
export const MsgEditValidatorParser = MsgParser.fromTelescope(MsgEditValidator);
export const MsgDelegateParser = MsgParser.fromTelescope(MsgDelegate);
export const MsgBeginRedelegateParser =
  MsgParser.fromTelescope(MsgBeginRedelegate);
export const MsgUndelegateParser = MsgParser.fromTelescope(MsgUndelegate);

// ------------- VESTING -------------

export const MsgCreateVestingAccountParser = MsgParser.fromTelescope(
  MsgCreateVestingAccount
);

// *************************** POOL ***************************

export const MsgAuthzParser = MsgParserPool.fromTelescope(
  MsgGrant,
  MsgExec,
  MsgRevoke
);
export const MsgBankParser = MsgParserPool.fromTelescope(MsgSend, MsgMultiSend);
export const MsgDistributionParser = MsgParserPool.fromTelescope(
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool
);
export const MsgFeeGrantParser = MsgParserPool.fromTelescope(
  MsgGrantAllowance,
  MsgRevokeAllowance
);
export const MsgGovParser = MsgParserPool.fromTelescope(
  MsgDepositV1,
  MsgSubmitProposalV1,
  MsgExecLegacyContentV1,
  MsgVoteV1,
  MsgVoteWeightedV1,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
  MsgDeposit
);
export const MsgGroupParser = MsgParserPool.fromTelescope(
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
  MsgLeaveGroup
);

export const MsgIbcParser = MsgParserPool.fromTelescope(
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
  MsgConnectionOpenTry
);

export const MsgStakingParser = MsgParserPool.fromTelescope(
  MsgCreateValidator,
  MsgEditValidator,
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate
);

export const MsgVestingParser = MsgParserPool.fromTelescope(
  MsgCreateVestingAccount
);

export const MsgStargateParser = MsgParserPool.fromPools(
  MsgAuthzParser,
  MsgBankParser,
  MsgDistributionParser,
  MsgFeeGrantParser,
  MsgGovParser,
  MsgGroupParser,
  MsgIbcParser,
  MsgStakingParser,
  MsgVestingParser
);
