import { MemberRequest, MemberRequestAmino, VoteOption, ProposalExecutorResult, ThresholdDecisionPolicy, ThresholdDecisionPolicyProtoMsg, PercentageDecisionPolicy, PercentageDecisionPolicyProtoMsg, voteOptionFromJSON, voteOptionToJSON, proposalExecutorResultFromJSON, proposalExecutorResultToJSON } from "./types";
import { Any, AnyProtoMsg, AnyAmino } from "../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/** Exec defines modes of execution of a proposal on creation or on new vote. */
export enum Exec {
  /**
   * EXEC_UNSPECIFIED - An empty value means that there should be a separate
   * MsgExec request for the proposal to execute.
   */
  EXEC_UNSPECIFIED = 0,
  /**
   * EXEC_TRY - Try to execute the proposal immediately.
   * If the proposal is not allowed per the DecisionPolicy,
   * the proposal will still be open and could
   * be executed at a later point.
   */
  EXEC_TRY = 1,
  UNRECOGNIZED = -1,
}
export const ExecAmino = Exec;
export function execFromJSON(object: any): Exec {
  switch (object) {
    case 0:
    case "EXEC_UNSPECIFIED":
      return Exec.EXEC_UNSPECIFIED;
    case 1:
    case "EXEC_TRY":
      return Exec.EXEC_TRY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Exec.UNRECOGNIZED;
  }
}
export function execToJSON(object: Exec): string {
  switch (object) {
    case Exec.EXEC_UNSPECIFIED:
      return "EXEC_UNSPECIFIED";
    case Exec.EXEC_TRY:
      return "EXEC_TRY";
    case Exec.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** MsgCreateGroup is the Msg/CreateGroup request type. */
export interface MsgCreateGroup {
  /** admin is the account address of the group admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequest[];
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
}
export interface MsgCreateGroupProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroup";
  value: Uint8Array;
}
/** MsgCreateGroup is the Msg/CreateGroup request type. */
export interface MsgCreateGroupAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequestAmino[];
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
}
/** MsgCreateGroupResponse is the Msg/CreateGroup response type. */
export interface MsgCreateGroupResponse {
  /** group_id is the unique ID of the newly created group. */
  groupId: bigint;
}
export interface MsgCreateGroupResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupResponse";
  value: Uint8Array;
}
/** MsgCreateGroupResponse is the Msg/CreateGroup response type. */
export interface MsgCreateGroupResponseAmino {
  /** group_id is the unique ID of the newly created group. */
  group_id: string;
}
/** MsgUpdateGroupMembers is the Msg/UpdateGroupMembers request type. */
export interface MsgUpdateGroupMembers {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  groupId: bigint;
  /**
   * member_updates is the list of members to update,
   * set weight to 0 to remove a member.
   */
  memberUpdates: MemberRequest[];
}
export interface MsgUpdateGroupMembersProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers";
  value: Uint8Array;
}
/** MsgUpdateGroupMembers is the Msg/UpdateGroupMembers request type. */
export interface MsgUpdateGroupMembersAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /**
   * member_updates is the list of members to update,
   * set weight to 0 to remove a member.
   */
  member_updates: MemberRequestAmino[];
}
/** MsgUpdateGroupMembersResponse is the Msg/UpdateGroupMembers response type. */
export interface MsgUpdateGroupMembersResponse {}
export interface MsgUpdateGroupMembersResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembersResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupMembersResponse is the Msg/UpdateGroupMembers response type. */
export interface MsgUpdateGroupMembersResponseAmino {}
/** MsgUpdateGroupAdmin is the Msg/UpdateGroupAdmin request type. */
export interface MsgUpdateGroupAdmin {
  /** admin is the current account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  groupId: bigint;
  /** new_admin is the group new admin account address. */
  newAdmin: string;
}
export interface MsgUpdateGroupAdminProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin";
  value: Uint8Array;
}
/** MsgUpdateGroupAdmin is the Msg/UpdateGroupAdmin request type. */
export interface MsgUpdateGroupAdminAmino {
  /** admin is the current account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** new_admin is the group new admin account address. */
  new_admin: string;
}
/** MsgUpdateGroupAdminResponse is the Msg/UpdateGroupAdmin response type. */
export interface MsgUpdateGroupAdminResponse {}
export interface MsgUpdateGroupAdminResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdminResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupAdminResponse is the Msg/UpdateGroupAdmin response type. */
export interface MsgUpdateGroupAdminResponseAmino {}
/** MsgUpdateGroupMetadata is the Msg/UpdateGroupMetadata request type. */
export interface MsgUpdateGroupMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  groupId: bigint;
  /** metadata is the updated group's metadata. */
  metadata: string;
}
export interface MsgUpdateGroupMetadataProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata";
  value: Uint8Array;
}
/** MsgUpdateGroupMetadata is the Msg/UpdateGroupMetadata request type. */
export interface MsgUpdateGroupMetadataAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** metadata is the updated group's metadata. */
  metadata: string;
}
/** MsgUpdateGroupMetadataResponse is the Msg/UpdateGroupMetadata response type. */
export interface MsgUpdateGroupMetadataResponse {}
export interface MsgUpdateGroupMetadataResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadataResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupMetadataResponse is the Msg/UpdateGroupMetadata response type. */
export interface MsgUpdateGroupMetadataResponseAmino {}
/** MsgCreateGroupPolicy is the Msg/CreateGroupPolicy request type. */
export interface MsgCreateGroupPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  groupId: bigint;
  /** metadata is any arbitrary metadata attached to the group policy. */
  metadata: string;
  /** decision_policy specifies the group policy's decision policy. */
  decisionPolicy?: ThresholdDecisionPolicy | PercentageDecisionPolicy | Any | undefined;
}
export interface MsgCreateGroupPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy";
  value: Uint8Array;
}
export type MsgCreateGroupPolicyEncoded = Omit<MsgCreateGroupPolicy, "decisionPolicy"> & {
  /** decision_policy specifies the group policy's decision policy. */decisionPolicy?: ThresholdDecisionPolicyProtoMsg | PercentageDecisionPolicyProtoMsg | AnyProtoMsg | undefined;
};
/** MsgCreateGroupPolicy is the Msg/CreateGroupPolicy request type. */
export interface MsgCreateGroupPolicyAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** metadata is any arbitrary metadata attached to the group policy. */
  metadata: string;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: AnyAmino;
}
/** MsgCreateGroupPolicyResponse is the Msg/CreateGroupPolicy response type. */
export interface MsgCreateGroupPolicyResponse {
  /** address is the account address of the newly created group policy. */
  address: string;
}
export interface MsgCreateGroupPolicyResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicyResponse";
  value: Uint8Array;
}
/** MsgCreateGroupPolicyResponse is the Msg/CreateGroupPolicy response type. */
export interface MsgCreateGroupPolicyResponseAmino {
  /** address is the account address of the newly created group policy. */
  address: string;
}
/** MsgUpdateGroupPolicyAdmin is the Msg/UpdateGroupPolicyAdmin request type. */
export interface MsgUpdateGroupPolicyAdmin {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of the group policy. */
  groupPolicyAddress: string;
  /** new_admin is the new group policy admin. */
  newAdmin: string;
}
export interface MsgUpdateGroupPolicyAdminProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin";
  value: Uint8Array;
}
/** MsgUpdateGroupPolicyAdmin is the Msg/UpdateGroupPolicyAdmin request type. */
export interface MsgUpdateGroupPolicyAdminAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of the group policy. */
  group_policy_address: string;
  /** new_admin is the new group policy admin. */
  new_admin: string;
}
/** MsgUpdateGroupPolicyAdminResponse is the Msg/UpdateGroupPolicyAdmin response type. */
export interface MsgUpdateGroupPolicyAdminResponse {}
export interface MsgUpdateGroupPolicyAdminResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdminResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupPolicyAdminResponse is the Msg/UpdateGroupPolicyAdmin response type. */
export interface MsgUpdateGroupPolicyAdminResponseAmino {}
/** MsgCreateGroupWithPolicy is the Msg/CreateGroupWithPolicy request type. */
export interface MsgCreateGroupWithPolicy {
  /** admin is the account address of the group and group policy admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequest[];
  /** group_metadata is any arbitrary metadata attached to the group. */
  groupMetadata: string;
  /** group_policy_metadata is any arbitrary metadata attached to the group policy. */
  groupPolicyMetadata: string;
  /**
   * group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group
   * and group policy admin.
   */
  groupPolicyAsAdmin: boolean;
  /** decision_policy specifies the group policy's decision policy. */
  decisionPolicy?: ThresholdDecisionPolicy | PercentageDecisionPolicy | Any | undefined;
}
export interface MsgCreateGroupWithPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy";
  value: Uint8Array;
}
export type MsgCreateGroupWithPolicyEncoded = Omit<MsgCreateGroupWithPolicy, "decisionPolicy"> & {
  /** decision_policy specifies the group policy's decision policy. */decisionPolicy?: ThresholdDecisionPolicyProtoMsg | PercentageDecisionPolicyProtoMsg | AnyProtoMsg | undefined;
};
/** MsgCreateGroupWithPolicy is the Msg/CreateGroupWithPolicy request type. */
export interface MsgCreateGroupWithPolicyAmino {
  /** admin is the account address of the group and group policy admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequestAmino[];
  /** group_metadata is any arbitrary metadata attached to the group. */
  group_metadata: string;
  /** group_policy_metadata is any arbitrary metadata attached to the group policy. */
  group_policy_metadata: string;
  /**
   * group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group
   * and group policy admin.
   */
  group_policy_as_admin: boolean;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: AnyAmino;
}
/** MsgCreateGroupWithPolicyResponse is the Msg/CreateGroupWithPolicy response type. */
export interface MsgCreateGroupWithPolicyResponse {
  /** group_id is the unique ID of the newly created group with policy. */
  groupId: bigint;
  /** group_policy_address is the account address of the newly created group policy. */
  groupPolicyAddress: string;
}
export interface MsgCreateGroupWithPolicyResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicyResponse";
  value: Uint8Array;
}
/** MsgCreateGroupWithPolicyResponse is the Msg/CreateGroupWithPolicy response type. */
export interface MsgCreateGroupWithPolicyResponseAmino {
  /** group_id is the unique ID of the newly created group with policy. */
  group_id: string;
  /** group_policy_address is the account address of the newly created group policy. */
  group_policy_address: string;
}
/** MsgUpdateGroupPolicyDecisionPolicy is the Msg/UpdateGroupPolicyDecisionPolicy request type. */
export interface MsgUpdateGroupPolicyDecisionPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  groupPolicyAddress: string;
  /** decision_policy is the updated group policy's decision policy. */
  decisionPolicy?: ThresholdDecisionPolicy | PercentageDecisionPolicy | Any | undefined;
}
export interface MsgUpdateGroupPolicyDecisionPolicyProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy";
  value: Uint8Array;
}
export type MsgUpdateGroupPolicyDecisionPolicyEncoded = Omit<MsgUpdateGroupPolicyDecisionPolicy, "decisionPolicy"> & {
  /** decision_policy is the updated group policy's decision policy. */decisionPolicy?: ThresholdDecisionPolicyProtoMsg | PercentageDecisionPolicyProtoMsg | AnyProtoMsg | undefined;
};
/** MsgUpdateGroupPolicyDecisionPolicy is the Msg/UpdateGroupPolicyDecisionPolicy request type. */
export interface MsgUpdateGroupPolicyDecisionPolicyAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /** decision_policy is the updated group policy's decision policy. */
  decision_policy?: AnyAmino;
}
/** MsgUpdateGroupPolicyDecisionPolicyResponse is the Msg/UpdateGroupPolicyDecisionPolicy response type. */
export interface MsgUpdateGroupPolicyDecisionPolicyResponse {}
export interface MsgUpdateGroupPolicyDecisionPolicyResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicyResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupPolicyDecisionPolicyResponse is the Msg/UpdateGroupPolicyDecisionPolicy response type. */
export interface MsgUpdateGroupPolicyDecisionPolicyResponseAmino {}
/** MsgUpdateGroupPolicyMetadata is the Msg/UpdateGroupPolicyMetadata request type. */
export interface MsgUpdateGroupPolicyMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  groupPolicyAddress: string;
  /** metadata is the group policy metadata to be updated. */
  metadata: string;
}
export interface MsgUpdateGroupPolicyMetadataProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata";
  value: Uint8Array;
}
/** MsgUpdateGroupPolicyMetadata is the Msg/UpdateGroupPolicyMetadata request type. */
export interface MsgUpdateGroupPolicyMetadataAmino {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /** metadata is the group policy metadata to be updated. */
  metadata: string;
}
/** MsgUpdateGroupPolicyMetadataResponse is the Msg/UpdateGroupPolicyMetadata response type. */
export interface MsgUpdateGroupPolicyMetadataResponse {}
export interface MsgUpdateGroupPolicyMetadataResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadataResponse";
  value: Uint8Array;
}
/** MsgUpdateGroupPolicyMetadataResponse is the Msg/UpdateGroupPolicyMetadata response type. */
export interface MsgUpdateGroupPolicyMetadataResponseAmino {}
/** MsgSubmitProposal is the Msg/SubmitProposal request type. */
export interface MsgSubmitProposal {
  /** group_policy_address is the account address of group policy. */
  groupPolicyAddress: string;
  /**
   * proposers are the account addresses of the proposers.
   * Proposers signatures will be counted as yes votes.
   */
  proposers: string[];
  /** metadata is any arbitrary metadata attached to the proposal. */
  metadata: string;
  /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
  messages: Any[];
  /**
   * exec defines the mode of execution of the proposal,
   * whether it should be executed immediately on creation or not.
   * If so, proposers signatures are considered as Yes votes.
   */
  exec: Exec;
  /**
   * title is the title of the proposal.
   * 
   * Since: cosmos-sdk 0.47
   */
  title: string;
  /**
   * summary is the summary of the proposal.
   * 
   * Since: cosmos-sdk 0.47
   */
  summary: string;
}
export interface MsgSubmitProposalProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgSubmitProposal";
  value: Uint8Array;
}
/** MsgSubmitProposal is the Msg/SubmitProposal request type. */
export interface MsgSubmitProposalAmino {
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /**
   * proposers are the account addresses of the proposers.
   * Proposers signatures will be counted as yes votes.
   */
  proposers: string[];
  /** metadata is any arbitrary metadata attached to the proposal. */
  metadata: string;
  /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
  messages: AnyAmino[];
  /**
   * exec defines the mode of execution of the proposal,
   * whether it should be executed immediately on creation or not.
   * If so, proposers signatures are considered as Yes votes.
   */
  exec: Exec;
  /**
   * title is the title of the proposal.
   * 
   * Since: cosmos-sdk 0.47
   */
  title: string;
  /**
   * summary is the summary of the proposal.
   * 
   * Since: cosmos-sdk 0.47
   */
  summary: string;
}
/** MsgSubmitProposalResponse is the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  /** proposal is the unique ID of the proposal. */
  proposalId: bigint;
}
export interface MsgSubmitProposalResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgSubmitProposalResponse";
  value: Uint8Array;
}
/** MsgSubmitProposalResponse is the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponseAmino {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
}
/** MsgWithdrawProposal is the Msg/WithdrawProposal request type. */
export interface MsgWithdrawProposal {
  /** proposal is the unique ID of the proposal. */
  proposalId: bigint;
  /** address is the admin of the group policy or one of the proposer of the proposal. */
  address: string;
}
export interface MsgWithdrawProposalProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgWithdrawProposal";
  value: Uint8Array;
}
/** MsgWithdrawProposal is the Msg/WithdrawProposal request type. */
export interface MsgWithdrawProposalAmino {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** address is the admin of the group policy or one of the proposer of the proposal. */
  address: string;
}
/** MsgWithdrawProposalResponse is the Msg/WithdrawProposal response type. */
export interface MsgWithdrawProposalResponse {}
export interface MsgWithdrawProposalResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgWithdrawProposalResponse";
  value: Uint8Array;
}
/** MsgWithdrawProposalResponse is the Msg/WithdrawProposal response type. */
export interface MsgWithdrawProposalResponseAmino {}
/** MsgVote is the Msg/Vote request type. */
export interface MsgVote {
  /** proposal is the unique ID of the proposal. */
  proposalId: bigint;
  /** voter is the voter account address. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata attached to the vote. */
  metadata: string;
  /**
   * exec defines whether the proposal should be executed
   * immediately after voting or not.
   */
  exec: Exec;
}
export interface MsgVoteProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgVote";
  value: Uint8Array;
}
/** MsgVote is the Msg/Vote request type. */
export interface MsgVoteAmino {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** voter is the voter account address. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata attached to the vote. */
  metadata: string;
  /**
   * exec defines whether the proposal should be executed
   * immediately after voting or not.
   */
  exec: Exec;
}
/** MsgVoteResponse is the Msg/Vote response type. */
export interface MsgVoteResponse {}
export interface MsgVoteResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgVoteResponse";
  value: Uint8Array;
}
/** MsgVoteResponse is the Msg/Vote response type. */
export interface MsgVoteResponseAmino {}
/** MsgExec is the Msg/Exec request type. */
export interface MsgExec {
  /** proposal is the unique ID of the proposal. */
  proposalId: bigint;
  /** executor is the account address used to execute the proposal. */
  executor: string;
}
export interface MsgExecProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgExec";
  value: Uint8Array;
}
/** MsgExec is the Msg/Exec request type. */
export interface MsgExecAmino {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** executor is the account address used to execute the proposal. */
  executor: string;
}
/** MsgExecResponse is the Msg/Exec request type. */
export interface MsgExecResponse {
  /** result is the final result of the proposal execution. */
  result: ProposalExecutorResult;
}
export interface MsgExecResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgExecResponse";
  value: Uint8Array;
}
/** MsgExecResponse is the Msg/Exec request type. */
export interface MsgExecResponseAmino {
  /** result is the final result of the proposal execution. */
  result: ProposalExecutorResult;
}
/** MsgLeaveGroup is the Msg/LeaveGroup request type. */
export interface MsgLeaveGroup {
  /** address is the account address of the group member. */
  address: string;
  /** group_id is the unique ID of the group. */
  groupId: bigint;
}
export interface MsgLeaveGroupProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgLeaveGroup";
  value: Uint8Array;
}
/** MsgLeaveGroup is the Msg/LeaveGroup request type. */
export interface MsgLeaveGroupAmino {
  /** address is the account address of the group member. */
  address: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
}
/** MsgLeaveGroupResponse is the Msg/LeaveGroup response type. */
export interface MsgLeaveGroupResponse {}
export interface MsgLeaveGroupResponseProtoMsg {
  typeUrl: "/cosmos.group.v1.MsgLeaveGroupResponse";
  value: Uint8Array;
}
/** MsgLeaveGroupResponse is the Msg/LeaveGroup response type. */
export interface MsgLeaveGroupResponseAmino {}
function createBaseMsgCreateGroup(): MsgCreateGroup {
  return {
    admin: "",
    members: [],
    metadata: ""
  };
}
export const MsgCreateGroup = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroup",
  aminoType: "cosmos-sdk/MsgCreateGroup",
  is(o: any): o is MsgCreateGroup {
    return o && (o.$typeUrl === MsgCreateGroup.typeUrl || typeof o.admin === "string" && Array.isArray(o.members) && (!o.members.length || MemberRequest.is(o.members[0])) && typeof o.metadata === "string");
  },
  isAmino(o: any): o is MsgCreateGroupAmino {
    return o && (o.$typeUrl === MsgCreateGroup.typeUrl || typeof o.admin === "string" && Array.isArray(o.members) && (!o.members.length || MemberRequest.isAmino(o.members[0])) && typeof o.metadata === "string");
  },
  encode(message: MsgCreateGroup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroup {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromJSON(e)) : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : ""
    };
  },
  toJSON(message: MsgCreateGroup): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map(e => e ? MemberRequest.toJSON(e) : undefined);
    } else {
      obj.members = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroup>): MsgCreateGroup {
    const message = createBaseMsgCreateGroup();
    message.admin = object.admin ?? "";
    message.members = object.members?.map(e => MemberRequest.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
  fromAmino(object: MsgCreateGroupAmino): MsgCreateGroup {
    return {
      admin: object.admin,
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromAmino(e)) : [],
      metadata: object.metadata
    };
  },
  toAmino(message: MsgCreateGroup): MsgCreateGroupAmino {
    const obj: any = {};
    obj.admin = message.admin;
    if (message.members) {
      obj.members = message.members.map(e => e ? MemberRequest.toAmino(e) : undefined);
    } else {
      obj.members = [];
    }
    obj.metadata = message.metadata;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupProtoMsg): MsgCreateGroup {
    return MsgCreateGroup.decode(message.value);
  },
  toProto(message: MsgCreateGroup): Uint8Array {
    return MsgCreateGroup.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroup): MsgCreateGroupProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroup",
      value: MsgCreateGroup.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroup.typeUrl, MsgCreateGroup);
function createBaseMsgCreateGroupResponse(): MsgCreateGroupResponse {
  return {
    groupId: BigInt(0)
  };
}
export const MsgCreateGroupResponse = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupResponse",
  aminoType: "cosmos-sdk/MsgCreateGroupResponse",
  is(o: any): o is MsgCreateGroupResponse {
    return o && (o.$typeUrl === MsgCreateGroupResponse.typeUrl || typeof o.groupId === "bigint");
  },
  isAmino(o: any): o is MsgCreateGroupResponseAmino {
    return o && (o.$typeUrl === MsgCreateGroupResponse.typeUrl || typeof o.group_id === "bigint");
  },
  encode(message: MsgCreateGroupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.groupId !== BigInt(0)) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroupResponse {
    return {
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgCreateGroupResponse): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroupResponse>): MsgCreateGroupResponse {
    const message = createBaseMsgCreateGroupResponse();
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgCreateGroupResponseAmino): MsgCreateGroupResponse {
    return {
      groupId: BigInt(object.group_id)
    };
  },
  toAmino(message: MsgCreateGroupResponse): MsgCreateGroupResponseAmino {
    const obj: any = {};
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupResponseProtoMsg): MsgCreateGroupResponse {
    return MsgCreateGroupResponse.decode(message.value);
  },
  toProto(message: MsgCreateGroupResponse): Uint8Array {
    return MsgCreateGroupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroupResponse): MsgCreateGroupResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupResponse",
      value: MsgCreateGroupResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroupResponse.typeUrl, MsgCreateGroupResponse);
function createBaseMsgUpdateGroupMembers(): MsgUpdateGroupMembers {
  return {
    admin: "",
    groupId: BigInt(0),
    memberUpdates: []
  };
}
export const MsgUpdateGroupMembers = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
  aminoType: "cosmos-sdk/MsgUpdateGroupMembers",
  is(o: any): o is MsgUpdateGroupMembers {
    return o && (o.$typeUrl === MsgUpdateGroupMembers.typeUrl || typeof o.admin === "string" && typeof o.groupId === "bigint" && Array.isArray(o.memberUpdates) && (!o.memberUpdates.length || MemberRequest.is(o.memberUpdates[0])));
  },
  isAmino(o: any): o is MsgUpdateGroupMembersAmino {
    return o && (o.$typeUrl === MsgUpdateGroupMembers.typeUrl || typeof o.admin === "string" && typeof o.group_id === "bigint" && Array.isArray(o.member_updates) && (!o.member_updates.length || MemberRequest.isAmino(o.member_updates[0])));
  },
  encode(message: MsgUpdateGroupMembers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== BigInt(0)) {
      writer.uint32(16).uint64(message.groupId);
    }
    for (const v of message.memberUpdates) {
      MemberRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupMembers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupId = reader.uint64();
          break;
        case 3:
          message.memberUpdates.push(MemberRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupMembers {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0),
      memberUpdates: Array.isArray(object?.memberUpdates) ? object.memberUpdates.map((e: any) => MemberRequest.fromJSON(e)) : []
    };
  },
  toJSON(message: MsgUpdateGroupMembers): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    if (message.memberUpdates) {
      obj.memberUpdates = message.memberUpdates.map(e => e ? MemberRequest.toJSON(e) : undefined);
    } else {
      obj.memberUpdates = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupMembers>): MsgUpdateGroupMembers {
    const message = createBaseMsgUpdateGroupMembers();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    message.memberUpdates = object.memberUpdates?.map(e => MemberRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdateGroupMembersAmino): MsgUpdateGroupMembers {
    return {
      admin: object.admin,
      groupId: BigInt(object.group_id),
      memberUpdates: Array.isArray(object?.member_updates) ? object.member_updates.map((e: any) => MemberRequest.fromAmino(e)) : []
    };
  },
  toAmino(message: MsgUpdateGroupMembers): MsgUpdateGroupMembersAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    if (message.memberUpdates) {
      obj.member_updates = message.memberUpdates.map(e => e ? MemberRequest.toAmino(e) : undefined);
    } else {
      obj.member_updates = [];
    }
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupMembersProtoMsg): MsgUpdateGroupMembers {
    return MsgUpdateGroupMembers.decode(message.value);
  },
  toProto(message: MsgUpdateGroupMembers): Uint8Array {
    return MsgUpdateGroupMembers.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupMembers): MsgUpdateGroupMembersProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
      value: MsgUpdateGroupMembers.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupMembers.typeUrl, MsgUpdateGroupMembers);
function createBaseMsgUpdateGroupMembersResponse(): MsgUpdateGroupMembersResponse {
  return {};
}
export const MsgUpdateGroupMembersResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembersResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupMembersResponse",
  is(o: any): o is MsgUpdateGroupMembersResponse {
    return o && o.$typeUrl === MsgUpdateGroupMembersResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupMembersResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupMembersResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupMembersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupMembersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupMembersResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupMembersResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupMembersResponse>): MsgUpdateGroupMembersResponse {
    const message = createBaseMsgUpdateGroupMembersResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupMembersResponseAmino): MsgUpdateGroupMembersResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupMembersResponse): MsgUpdateGroupMembersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupMembersResponseProtoMsg): MsgUpdateGroupMembersResponse {
    return MsgUpdateGroupMembersResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupMembersResponse): Uint8Array {
    return MsgUpdateGroupMembersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupMembersResponse): MsgUpdateGroupMembersResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembersResponse",
      value: MsgUpdateGroupMembersResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupMembersResponse.typeUrl, MsgUpdateGroupMembersResponse);
function createBaseMsgUpdateGroupAdmin(): MsgUpdateGroupAdmin {
  return {
    admin: "",
    groupId: BigInt(0),
    newAdmin: ""
  };
}
export const MsgUpdateGroupAdmin = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
  aminoType: "cosmos-sdk/MsgUpdateGroupAdmin",
  is(o: any): o is MsgUpdateGroupAdmin {
    return o && (o.$typeUrl === MsgUpdateGroupAdmin.typeUrl || typeof o.admin === "string" && typeof o.groupId === "bigint" && typeof o.newAdmin === "string");
  },
  isAmino(o: any): o is MsgUpdateGroupAdminAmino {
    return o && (o.$typeUrl === MsgUpdateGroupAdmin.typeUrl || typeof o.admin === "string" && typeof o.group_id === "bigint" && typeof o.new_admin === "string");
  },
  encode(message: MsgUpdateGroupAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== BigInt(0)) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupId = reader.uint64();
          break;
        case 3:
          message.newAdmin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0),
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : ""
    };
  },
  toJSON(message: MsgUpdateGroupAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupAdmin>): MsgUpdateGroupAdmin {
    const message = createBaseMsgUpdateGroupAdmin();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateGroupAdminAmino): MsgUpdateGroupAdmin {
    return {
      admin: object.admin,
      groupId: BigInt(object.group_id),
      newAdmin: object.new_admin
    };
  },
  toAmino(message: MsgUpdateGroupAdmin): MsgUpdateGroupAdminAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    obj.new_admin = message.newAdmin;
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupAdminProtoMsg): MsgUpdateGroupAdmin {
    return MsgUpdateGroupAdmin.decode(message.value);
  },
  toProto(message: MsgUpdateGroupAdmin): Uint8Array {
    return MsgUpdateGroupAdmin.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupAdmin): MsgUpdateGroupAdminProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
      value: MsgUpdateGroupAdmin.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupAdmin.typeUrl, MsgUpdateGroupAdmin);
function createBaseMsgUpdateGroupAdminResponse(): MsgUpdateGroupAdminResponse {
  return {};
}
export const MsgUpdateGroupAdminResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdminResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupAdminResponse",
  is(o: any): o is MsgUpdateGroupAdminResponse {
    return o && o.$typeUrl === MsgUpdateGroupAdminResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupAdminResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupAdminResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupAdminResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupAdminResponse>): MsgUpdateGroupAdminResponse {
    const message = createBaseMsgUpdateGroupAdminResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupAdminResponseAmino): MsgUpdateGroupAdminResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupAdminResponse): MsgUpdateGroupAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupAdminResponseProtoMsg): MsgUpdateGroupAdminResponse {
    return MsgUpdateGroupAdminResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupAdminResponse): Uint8Array {
    return MsgUpdateGroupAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupAdminResponse): MsgUpdateGroupAdminResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdminResponse",
      value: MsgUpdateGroupAdminResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupAdminResponse.typeUrl, MsgUpdateGroupAdminResponse);
function createBaseMsgUpdateGroupMetadata(): MsgUpdateGroupMetadata {
  return {
    admin: "",
    groupId: BigInt(0),
    metadata: ""
  };
}
export const MsgUpdateGroupMetadata = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
  aminoType: "cosmos-sdk/MsgUpdateGroupMetadata",
  is(o: any): o is MsgUpdateGroupMetadata {
    return o && (o.$typeUrl === MsgUpdateGroupMetadata.typeUrl || typeof o.admin === "string" && typeof o.groupId === "bigint" && typeof o.metadata === "string");
  },
  isAmino(o: any): o is MsgUpdateGroupMetadataAmino {
    return o && (o.$typeUrl === MsgUpdateGroupMetadata.typeUrl || typeof o.admin === "string" && typeof o.group_id === "bigint" && typeof o.metadata === "string");
  },
  encode(message: MsgUpdateGroupMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== BigInt(0)) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupId = reader.uint64();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0),
      metadata: isSet(object.metadata) ? String(object.metadata) : ""
    };
  },
  toJSON(message: MsgUpdateGroupMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupMetadata>): MsgUpdateGroupMetadata {
    const message = createBaseMsgUpdateGroupMetadata();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    message.metadata = object.metadata ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateGroupMetadataAmino): MsgUpdateGroupMetadata {
    return {
      admin: object.admin,
      groupId: BigInt(object.group_id),
      metadata: object.metadata
    };
  },
  toAmino(message: MsgUpdateGroupMetadata): MsgUpdateGroupMetadataAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    obj.metadata = message.metadata;
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupMetadataProtoMsg): MsgUpdateGroupMetadata {
    return MsgUpdateGroupMetadata.decode(message.value);
  },
  toProto(message: MsgUpdateGroupMetadata): Uint8Array {
    return MsgUpdateGroupMetadata.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupMetadata): MsgUpdateGroupMetadataProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
      value: MsgUpdateGroupMetadata.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupMetadata.typeUrl, MsgUpdateGroupMetadata);
function createBaseMsgUpdateGroupMetadataResponse(): MsgUpdateGroupMetadataResponse {
  return {};
}
export const MsgUpdateGroupMetadataResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadataResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupMetadataResponse",
  is(o: any): o is MsgUpdateGroupMetadataResponse {
    return o && o.$typeUrl === MsgUpdateGroupMetadataResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupMetadataResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupMetadataResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupMetadataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupMetadataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupMetadataResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupMetadataResponse>): MsgUpdateGroupMetadataResponse {
    const message = createBaseMsgUpdateGroupMetadataResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupMetadataResponseAmino): MsgUpdateGroupMetadataResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupMetadataResponse): MsgUpdateGroupMetadataResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupMetadataResponseProtoMsg): MsgUpdateGroupMetadataResponse {
    return MsgUpdateGroupMetadataResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupMetadataResponse): Uint8Array {
    return MsgUpdateGroupMetadataResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupMetadataResponse): MsgUpdateGroupMetadataResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadataResponse",
      value: MsgUpdateGroupMetadataResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupMetadataResponse.typeUrl, MsgUpdateGroupMetadataResponse);
function createBaseMsgCreateGroupPolicy(): MsgCreateGroupPolicy {
  return {
    admin: "",
    groupId: BigInt(0),
    metadata: "",
    decisionPolicy: undefined
  };
}
export const MsgCreateGroupPolicy = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
  aminoType: "cosmos-sdk/MsgCreateGroupPolicy",
  is(o: any): o is MsgCreateGroupPolicy {
    return o && (o.$typeUrl === MsgCreateGroupPolicy.typeUrl || typeof o.admin === "string" && typeof o.groupId === "bigint" && typeof o.metadata === "string");
  },
  isAmino(o: any): o is MsgCreateGroupPolicyAmino {
    return o && (o.$typeUrl === MsgCreateGroupPolicy.typeUrl || typeof o.admin === "string" && typeof o.group_id === "bigint" && typeof o.metadata === "string");
  },
  encode(message: MsgCreateGroupPolicy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== BigInt(0)) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(GlobalDecoderRegistry.wrapAny(message.decisionPolicy), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroupPolicy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupId = reader.uint64();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.decisionPolicy = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroupPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0),
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      decisionPolicy: isSet(object.decisionPolicy) ? GlobalDecoderRegistry.fromJSON(object.decisionPolicy) : undefined
    };
  },
  toJSON(message: MsgCreateGroupPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.decisionPolicy !== undefined && (obj.decisionPolicy = message.decisionPolicy ? GlobalDecoderRegistry.toJSON(message.decisionPolicy) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroupPolicy>): MsgCreateGroupPolicy {
    const message = createBaseMsgCreateGroupPolicy();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    message.metadata = object.metadata ?? "";
    message.decisionPolicy = object.decisionPolicy !== undefined && object.decisionPolicy !== null ? GlobalDecoderRegistry.fromPartial(object.decisionPolicy) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateGroupPolicyAmino): MsgCreateGroupPolicy {
    return {
      admin: object.admin,
      groupId: BigInt(object.group_id),
      metadata: object.metadata,
      decisionPolicy: object?.decision_policy ? GlobalDecoderRegistry.fromAmino(object.decision_policy) : undefined
    };
  },
  toAmino(message: MsgCreateGroupPolicy): MsgCreateGroupPolicyAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    obj.metadata = message.metadata;
    obj.decision_policy = message.decisionPolicy ? GlobalDecoderRegistry.toAmino(message.decisionPolicy) : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupPolicyProtoMsg): MsgCreateGroupPolicy {
    return MsgCreateGroupPolicy.decode(message.value);
  },
  toProto(message: MsgCreateGroupPolicy): Uint8Array {
    return MsgCreateGroupPolicy.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroupPolicy): MsgCreateGroupPolicyProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
      value: MsgCreateGroupPolicy.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroupPolicy.typeUrl, MsgCreateGroupPolicy);
function createBaseMsgCreateGroupPolicyResponse(): MsgCreateGroupPolicyResponse {
  return {
    address: ""
  };
}
export const MsgCreateGroupPolicyResponse = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicyResponse",
  aminoType: "cosmos-sdk/MsgCreateGroupPolicyResponse",
  is(o: any): o is MsgCreateGroupPolicyResponse {
    return o && (o.$typeUrl === MsgCreateGroupPolicyResponse.typeUrl || typeof o.address === "string");
  },
  isAmino(o: any): o is MsgCreateGroupPolicyResponseAmino {
    return o && (o.$typeUrl === MsgCreateGroupPolicyResponse.typeUrl || typeof o.address === "string");
  },
  encode(message: MsgCreateGroupPolicyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroupPolicyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroupPolicyResponse {
    return {
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: MsgCreateGroupPolicyResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroupPolicyResponse>): MsgCreateGroupPolicyResponse {
    const message = createBaseMsgCreateGroupPolicyResponse();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: MsgCreateGroupPolicyResponseAmino): MsgCreateGroupPolicyResponse {
    return {
      address: object.address
    };
  },
  toAmino(message: MsgCreateGroupPolicyResponse): MsgCreateGroupPolicyResponseAmino {
    const obj: any = {};
    obj.address = message.address;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupPolicyResponseProtoMsg): MsgCreateGroupPolicyResponse {
    return MsgCreateGroupPolicyResponse.decode(message.value);
  },
  toProto(message: MsgCreateGroupPolicyResponse): Uint8Array {
    return MsgCreateGroupPolicyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroupPolicyResponse): MsgCreateGroupPolicyResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicyResponse",
      value: MsgCreateGroupPolicyResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroupPolicyResponse.typeUrl, MsgCreateGroupPolicyResponse);
function createBaseMsgUpdateGroupPolicyAdmin(): MsgUpdateGroupPolicyAdmin {
  return {
    admin: "",
    groupPolicyAddress: "",
    newAdmin: ""
  };
}
export const MsgUpdateGroupPolicyAdmin = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
  aminoType: "cosmos-sdk/MsgUpdateGroupPolicyAdmin",
  is(o: any): o is MsgUpdateGroupPolicyAdmin {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyAdmin.typeUrl || typeof o.admin === "string" && typeof o.groupPolicyAddress === "string" && typeof o.newAdmin === "string");
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyAdminAmino {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyAdmin.typeUrl || typeof o.admin === "string" && typeof o.group_policy_address === "string" && typeof o.new_admin === "string");
  },
  encode(message: MsgUpdateGroupPolicyAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupPolicyAddress = reader.string();
          break;
        case 3:
          message.newAdmin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupPolicyAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : ""
    };
  },
  toJSON(message: MsgUpdateGroupPolicyAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupPolicyAddress !== undefined && (obj.groupPolicyAddress = message.groupPolicyAddress);
    message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupPolicyAdmin>): MsgUpdateGroupPolicyAdmin {
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateGroupPolicyAdminAmino): MsgUpdateGroupPolicyAdmin {
    return {
      admin: object.admin,
      groupPolicyAddress: object.group_policy_address,
      newAdmin: object.new_admin
    };
  },
  toAmino(message: MsgUpdateGroupPolicyAdmin): MsgUpdateGroupPolicyAdminAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_policy_address = message.groupPolicyAddress;
    obj.new_admin = message.newAdmin;
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyAdminProtoMsg): MsgUpdateGroupPolicyAdmin {
    return MsgUpdateGroupPolicyAdmin.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyAdmin): Uint8Array {
    return MsgUpdateGroupPolicyAdmin.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyAdmin): MsgUpdateGroupPolicyAdminProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
      value: MsgUpdateGroupPolicyAdmin.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyAdmin.typeUrl, MsgUpdateGroupPolicyAdmin);
function createBaseMsgUpdateGroupPolicyAdminResponse(): MsgUpdateGroupPolicyAdminResponse {
  return {};
}
export const MsgUpdateGroupPolicyAdminResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdminResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupPolicyAdminResponse",
  is(o: any): o is MsgUpdateGroupPolicyAdminResponse {
    return o && o.$typeUrl === MsgUpdateGroupPolicyAdminResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyAdminResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupPolicyAdminResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupPolicyAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupPolicyAdminResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupPolicyAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupPolicyAdminResponse>): MsgUpdateGroupPolicyAdminResponse {
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupPolicyAdminResponseAmino): MsgUpdateGroupPolicyAdminResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupPolicyAdminResponse): MsgUpdateGroupPolicyAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyAdminResponseProtoMsg): MsgUpdateGroupPolicyAdminResponse {
    return MsgUpdateGroupPolicyAdminResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyAdminResponse): Uint8Array {
    return MsgUpdateGroupPolicyAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyAdminResponse): MsgUpdateGroupPolicyAdminResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdminResponse",
      value: MsgUpdateGroupPolicyAdminResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyAdminResponse.typeUrl, MsgUpdateGroupPolicyAdminResponse);
function createBaseMsgCreateGroupWithPolicy(): MsgCreateGroupWithPolicy {
  return {
    admin: "",
    members: [],
    groupMetadata: "",
    groupPolicyMetadata: "",
    groupPolicyAsAdmin: false,
    decisionPolicy: undefined
  };
}
export const MsgCreateGroupWithPolicy = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
  aminoType: "cosmos-sdk/MsgCreateGroupWithPolicy",
  is(o: any): o is MsgCreateGroupWithPolicy {
    return o && (o.$typeUrl === MsgCreateGroupWithPolicy.typeUrl || typeof o.admin === "string" && Array.isArray(o.members) && (!o.members.length || MemberRequest.is(o.members[0])) && typeof o.groupMetadata === "string" && typeof o.groupPolicyMetadata === "string" && typeof o.groupPolicyAsAdmin === "boolean");
  },
  isAmino(o: any): o is MsgCreateGroupWithPolicyAmino {
    return o && (o.$typeUrl === MsgCreateGroupWithPolicy.typeUrl || typeof o.admin === "string" && Array.isArray(o.members) && (!o.members.length || MemberRequest.isAmino(o.members[0])) && typeof o.group_metadata === "string" && typeof o.group_policy_metadata === "string" && typeof o.group_policy_as_admin === "boolean");
  },
  encode(message: MsgCreateGroupWithPolicy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.groupMetadata !== "") {
      writer.uint32(26).string(message.groupMetadata);
    }
    if (message.groupPolicyMetadata !== "") {
      writer.uint32(34).string(message.groupPolicyMetadata);
    }
    if (message.groupPolicyAsAdmin === true) {
      writer.uint32(40).bool(message.groupPolicyAsAdmin);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(GlobalDecoderRegistry.wrapAny(message.decisionPolicy), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroupWithPolicy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.groupMetadata = reader.string();
          break;
        case 4:
          message.groupPolicyMetadata = reader.string();
          break;
        case 5:
          message.groupPolicyAsAdmin = reader.bool();
          break;
        case 6:
          message.decisionPolicy = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroupWithPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromJSON(e)) : [],
      groupMetadata: isSet(object.groupMetadata) ? String(object.groupMetadata) : "",
      groupPolicyMetadata: isSet(object.groupPolicyMetadata) ? String(object.groupPolicyMetadata) : "",
      groupPolicyAsAdmin: isSet(object.groupPolicyAsAdmin) ? Boolean(object.groupPolicyAsAdmin) : false,
      decisionPolicy: isSet(object.decisionPolicy) ? GlobalDecoderRegistry.fromJSON(object.decisionPolicy) : undefined
    };
  },
  toJSON(message: MsgCreateGroupWithPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map(e => e ? MemberRequest.toJSON(e) : undefined);
    } else {
      obj.members = [];
    }
    message.groupMetadata !== undefined && (obj.groupMetadata = message.groupMetadata);
    message.groupPolicyMetadata !== undefined && (obj.groupPolicyMetadata = message.groupPolicyMetadata);
    message.groupPolicyAsAdmin !== undefined && (obj.groupPolicyAsAdmin = message.groupPolicyAsAdmin);
    message.decisionPolicy !== undefined && (obj.decisionPolicy = message.decisionPolicy ? GlobalDecoderRegistry.toJSON(message.decisionPolicy) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroupWithPolicy>): MsgCreateGroupWithPolicy {
    const message = createBaseMsgCreateGroupWithPolicy();
    message.admin = object.admin ?? "";
    message.members = object.members?.map(e => MemberRequest.fromPartial(e)) || [];
    message.groupMetadata = object.groupMetadata ?? "";
    message.groupPolicyMetadata = object.groupPolicyMetadata ?? "";
    message.groupPolicyAsAdmin = object.groupPolicyAsAdmin ?? false;
    message.decisionPolicy = object.decisionPolicy !== undefined && object.decisionPolicy !== null ? GlobalDecoderRegistry.fromPartial(object.decisionPolicy) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateGroupWithPolicyAmino): MsgCreateGroupWithPolicy {
    return {
      admin: object.admin,
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromAmino(e)) : [],
      groupMetadata: object.group_metadata,
      groupPolicyMetadata: object.group_policy_metadata,
      groupPolicyAsAdmin: object.group_policy_as_admin,
      decisionPolicy: object?.decision_policy ? GlobalDecoderRegistry.fromAmino(object.decision_policy) : undefined
    };
  },
  toAmino(message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyAmino {
    const obj: any = {};
    obj.admin = message.admin;
    if (message.members) {
      obj.members = message.members.map(e => e ? MemberRequest.toAmino(e) : undefined);
    } else {
      obj.members = [];
    }
    obj.group_metadata = message.groupMetadata;
    obj.group_policy_metadata = message.groupPolicyMetadata;
    obj.group_policy_as_admin = message.groupPolicyAsAdmin;
    obj.decision_policy = message.decisionPolicy ? GlobalDecoderRegistry.toAmino(message.decisionPolicy) : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupWithPolicyProtoMsg): MsgCreateGroupWithPolicy {
    return MsgCreateGroupWithPolicy.decode(message.value);
  },
  toProto(message: MsgCreateGroupWithPolicy): Uint8Array {
    return MsgCreateGroupWithPolicy.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
      value: MsgCreateGroupWithPolicy.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroupWithPolicy.typeUrl, MsgCreateGroupWithPolicy);
function createBaseMsgCreateGroupWithPolicyResponse(): MsgCreateGroupWithPolicyResponse {
  return {
    groupId: BigInt(0),
    groupPolicyAddress: ""
  };
}
export const MsgCreateGroupWithPolicyResponse = {
  typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicyResponse",
  aminoType: "cosmos-sdk/MsgCreateGroupWithPolicyResponse",
  is(o: any): o is MsgCreateGroupWithPolicyResponse {
    return o && (o.$typeUrl === MsgCreateGroupWithPolicyResponse.typeUrl || typeof o.groupId === "bigint" && typeof o.groupPolicyAddress === "string");
  },
  isAmino(o: any): o is MsgCreateGroupWithPolicyResponseAmino {
    return o && (o.$typeUrl === MsgCreateGroupWithPolicyResponse.typeUrl || typeof o.group_id === "bigint" && typeof o.group_policy_address === "string");
  },
  encode(message: MsgCreateGroupWithPolicyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.groupId !== BigInt(0)) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateGroupWithPolicyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = reader.uint64();
          break;
        case 2:
          message.groupPolicyAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGroupWithPolicyResponse {
    return {
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0),
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : ""
    };
  },
  toJSON(message: MsgCreateGroupWithPolicyResponse): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    message.groupPolicyAddress !== undefined && (obj.groupPolicyAddress = message.groupPolicyAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgCreateGroupWithPolicyResponse>): MsgCreateGroupWithPolicyResponse {
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    return message;
  },
  fromAmino(object: MsgCreateGroupWithPolicyResponseAmino): MsgCreateGroupWithPolicyResponse {
    return {
      groupId: BigInt(object.group_id),
      groupPolicyAddress: object.group_policy_address
    };
  },
  toAmino(message: MsgCreateGroupWithPolicyResponse): MsgCreateGroupWithPolicyResponseAmino {
    const obj: any = {};
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    obj.group_policy_address = message.groupPolicyAddress;
    return obj;
  },
  fromProtoMsg(message: MsgCreateGroupWithPolicyResponseProtoMsg): MsgCreateGroupWithPolicyResponse {
    return MsgCreateGroupWithPolicyResponse.decode(message.value);
  },
  toProto(message: MsgCreateGroupWithPolicyResponse): Uint8Array {
    return MsgCreateGroupWithPolicyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateGroupWithPolicyResponse): MsgCreateGroupWithPolicyResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicyResponse",
      value: MsgCreateGroupWithPolicyResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgCreateGroupWithPolicyResponse.typeUrl, MsgCreateGroupWithPolicyResponse);
function createBaseMsgUpdateGroupPolicyDecisionPolicy(): MsgUpdateGroupPolicyDecisionPolicy {
  return {
    admin: "",
    groupPolicyAddress: "",
    decisionPolicy: undefined
  };
}
export const MsgUpdateGroupPolicyDecisionPolicy = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
  aminoType: "cosmos-sdk/MsgUpdateGroupDecisionPolicy",
  is(o: any): o is MsgUpdateGroupPolicyDecisionPolicy {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyDecisionPolicy.typeUrl || typeof o.admin === "string" && typeof o.groupPolicyAddress === "string");
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyDecisionPolicyAmino {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyDecisionPolicy.typeUrl || typeof o.admin === "string" && typeof o.group_policy_address === "string");
  },
  encode(message: MsgUpdateGroupPolicyDecisionPolicy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(GlobalDecoderRegistry.wrapAny(message.decisionPolicy), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupPolicyAddress = reader.string();
          break;
        case 3:
          message.decisionPolicy = GlobalDecoderRegistry.unwrapAny(reader);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupPolicyDecisionPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      decisionPolicy: isSet(object.decisionPolicy) ? GlobalDecoderRegistry.fromJSON(object.decisionPolicy) : undefined
    };
  },
  toJSON(message: MsgUpdateGroupPolicyDecisionPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupPolicyAddress !== undefined && (obj.groupPolicyAddress = message.groupPolicyAddress);
    message.decisionPolicy !== undefined && (obj.decisionPolicy = message.decisionPolicy ? GlobalDecoderRegistry.toJSON(message.decisionPolicy) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupPolicyDecisionPolicy>): MsgUpdateGroupPolicyDecisionPolicy {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.decisionPolicy = object.decisionPolicy !== undefined && object.decisionPolicy !== null ? GlobalDecoderRegistry.fromPartial(object.decisionPolicy) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateGroupPolicyDecisionPolicyAmino): MsgUpdateGroupPolicyDecisionPolicy {
    return {
      admin: object.admin,
      groupPolicyAddress: object.group_policy_address,
      decisionPolicy: object?.decision_policy ? GlobalDecoderRegistry.fromAmino(object.decision_policy) : undefined
    };
  },
  toAmino(message: MsgUpdateGroupPolicyDecisionPolicy): MsgUpdateGroupPolicyDecisionPolicyAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_policy_address = message.groupPolicyAddress;
    obj.decision_policy = message.decisionPolicy ? GlobalDecoderRegistry.toAmino(message.decisionPolicy) : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyDecisionPolicyProtoMsg): MsgUpdateGroupPolicyDecisionPolicy {
    return MsgUpdateGroupPolicyDecisionPolicy.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyDecisionPolicy): Uint8Array {
    return MsgUpdateGroupPolicyDecisionPolicy.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyDecisionPolicy): MsgUpdateGroupPolicyDecisionPolicyProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
      value: MsgUpdateGroupPolicyDecisionPolicy.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyDecisionPolicy.typeUrl, MsgUpdateGroupPolicyDecisionPolicy);
function createBaseMsgUpdateGroupPolicyDecisionPolicyResponse(): MsgUpdateGroupPolicyDecisionPolicyResponse {
  return {};
}
export const MsgUpdateGroupPolicyDecisionPolicyResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicyResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicyResponse",
  is(o: any): o is MsgUpdateGroupPolicyDecisionPolicyResponse {
    return o && o.$typeUrl === MsgUpdateGroupPolicyDecisionPolicyResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyDecisionPolicyResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupPolicyDecisionPolicyResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupPolicyDecisionPolicyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupPolicyDecisionPolicyResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupPolicyDecisionPolicyResponse>): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupPolicyDecisionPolicyResponseAmino): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupPolicyDecisionPolicyResponse): MsgUpdateGroupPolicyDecisionPolicyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyDecisionPolicyResponseProtoMsg): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return MsgUpdateGroupPolicyDecisionPolicyResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyDecisionPolicyResponse): Uint8Array {
    return MsgUpdateGroupPolicyDecisionPolicyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyDecisionPolicyResponse): MsgUpdateGroupPolicyDecisionPolicyResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicyResponse",
      value: MsgUpdateGroupPolicyDecisionPolicyResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyDecisionPolicyResponse.typeUrl, MsgUpdateGroupPolicyDecisionPolicyResponse);
function createBaseMsgUpdateGroupPolicyMetadata(): MsgUpdateGroupPolicyMetadata {
  return {
    admin: "",
    groupPolicyAddress: "",
    metadata: ""
  };
}
export const MsgUpdateGroupPolicyMetadata = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
  aminoType: "cosmos-sdk/MsgUpdateGroupPolicyMetadata",
  is(o: any): o is MsgUpdateGroupPolicyMetadata {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyMetadata.typeUrl || typeof o.admin === "string" && typeof o.groupPolicyAddress === "string" && typeof o.metadata === "string");
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyMetadataAmino {
    return o && (o.$typeUrl === MsgUpdateGroupPolicyMetadata.typeUrl || typeof o.admin === "string" && typeof o.group_policy_address === "string" && typeof o.metadata === "string");
  },
  encode(message: MsgUpdateGroupPolicyMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.groupPolicyAddress = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateGroupPolicyMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : ""
    };
  },
  toJSON(message: MsgUpdateGroupPolicyMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.groupPolicyAddress !== undefined && (obj.groupPolicyAddress = message.groupPolicyAddress);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgUpdateGroupPolicyMetadata>): MsgUpdateGroupPolicyMetadata {
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateGroupPolicyMetadataAmino): MsgUpdateGroupPolicyMetadata {
    return {
      admin: object.admin,
      groupPolicyAddress: object.group_policy_address,
      metadata: object.metadata
    };
  },
  toAmino(message: MsgUpdateGroupPolicyMetadata): MsgUpdateGroupPolicyMetadataAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.group_policy_address = message.groupPolicyAddress;
    obj.metadata = message.metadata;
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyMetadataProtoMsg): MsgUpdateGroupPolicyMetadata {
    return MsgUpdateGroupPolicyMetadata.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyMetadata): Uint8Array {
    return MsgUpdateGroupPolicyMetadata.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyMetadata): MsgUpdateGroupPolicyMetadataProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
      value: MsgUpdateGroupPolicyMetadata.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyMetadata.typeUrl, MsgUpdateGroupPolicyMetadata);
function createBaseMsgUpdateGroupPolicyMetadataResponse(): MsgUpdateGroupPolicyMetadataResponse {
  return {};
}
export const MsgUpdateGroupPolicyMetadataResponse = {
  typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadataResponse",
  aminoType: "cosmos-sdk/MsgUpdateGroupPolicyMetadataResponse",
  is(o: any): o is MsgUpdateGroupPolicyMetadataResponse {
    return o && o.$typeUrl === MsgUpdateGroupPolicyMetadataResponse.typeUrl;
  },
  isAmino(o: any): o is MsgUpdateGroupPolicyMetadataResponseAmino {
    return o && o.$typeUrl === MsgUpdateGroupPolicyMetadataResponse.typeUrl;
  },
  encode(_: MsgUpdateGroupPolicyMetadataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateGroupPolicyMetadataResponse {
    return {};
  },
  toJSON(_: MsgUpdateGroupPolicyMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgUpdateGroupPolicyMetadataResponse>): MsgUpdateGroupPolicyMetadataResponse {
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
    return message;
  },
  fromAmino(_: MsgUpdateGroupPolicyMetadataResponseAmino): MsgUpdateGroupPolicyMetadataResponse {
    return {};
  },
  toAmino(_: MsgUpdateGroupPolicyMetadataResponse): MsgUpdateGroupPolicyMetadataResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgUpdateGroupPolicyMetadataResponseProtoMsg): MsgUpdateGroupPolicyMetadataResponse {
    return MsgUpdateGroupPolicyMetadataResponse.decode(message.value);
  },
  toProto(message: MsgUpdateGroupPolicyMetadataResponse): Uint8Array {
    return MsgUpdateGroupPolicyMetadataResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateGroupPolicyMetadataResponse): MsgUpdateGroupPolicyMetadataResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadataResponse",
      value: MsgUpdateGroupPolicyMetadataResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgUpdateGroupPolicyMetadataResponse.typeUrl, MsgUpdateGroupPolicyMetadataResponse);
function createBaseMsgSubmitProposal(): MsgSubmitProposal {
  return {
    groupPolicyAddress: "",
    proposers: [],
    metadata: "",
    messages: [],
    exec: 0,
    title: "",
    summary: ""
  };
}
export const MsgSubmitProposal = {
  typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
  aminoType: "cosmos-sdk/group/MsgSubmitProposal",
  is(o: any): o is MsgSubmitProposal {
    return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || typeof o.groupPolicyAddress === "string" && Array.isArray(o.proposers) && (!o.proposers.length || typeof o.proposers[0] === "string") && typeof o.metadata === "string" && Array.isArray(o.messages) && (!o.messages.length || Any.is(o.messages[0])) && o.exec && typeof o.title === "string" && typeof o.summary === "string");
  },
  isAmino(o: any): o is MsgSubmitProposalAmino {
    return o && (o.$typeUrl === MsgSubmitProposal.typeUrl || typeof o.group_policy_address === "string" && Array.isArray(o.proposers) && (!o.proposers.length || typeof o.proposers[0] === "string") && typeof o.metadata === "string" && Array.isArray(o.messages) && (!o.messages.length || Any.isAmino(o.messages[0])) && o.exec && typeof o.title === "string" && typeof o.summary === "string");
  },
  encode(message: MsgSubmitProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.groupPolicyAddress !== "") {
      writer.uint32(10).string(message.groupPolicyAddress);
    }
    for (const v of message.proposers) {
      writer.uint32(18).string(v!);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    if (message.title !== "") {
      writer.uint32(50).string(message.title);
    }
    if (message.summary !== "") {
      writer.uint32(58).string(message.summary);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupPolicyAddress = reader.string();
          break;
        case 2:
          message.proposers.push(reader.string());
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 5:
          message.exec = (reader.int32() as any);
          break;
        case 6:
          message.title = reader.string();
          break;
        case 7:
          message.summary = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSubmitProposal {
    return {
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      proposers: Array.isArray(object?.proposers) ? object.proposers.map((e: any) => String(e)) : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromJSON(e)) : [],
      exec: isSet(object.exec) ? execFromJSON(object.exec) : -1,
      title: isSet(object.title) ? String(object.title) : "",
      summary: isSet(object.summary) ? String(object.summary) : ""
    };
  },
  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    message.groupPolicyAddress !== undefined && (obj.groupPolicyAddress = message.groupPolicyAddress);
    if (message.proposers) {
      obj.proposers = message.proposers.map(e => e);
    } else {
      obj.proposers = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    if (message.messages) {
      obj.messages = message.messages.map(e => e ? Any.toJSON(e) : undefined);
    } else {
      obj.messages = [];
    }
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    message.title !== undefined && (obj.title = message.title);
    message.summary !== undefined && (obj.summary = message.summary);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSubmitProposal>): MsgSubmitProposal {
    const message = createBaseMsgSubmitProposal();
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.proposers = object.proposers?.map(e => e) || [];
    message.metadata = object.metadata ?? "";
    message.messages = object.messages?.map(e => Any.fromPartial(e)) || [];
    message.exec = object.exec ?? 0;
    message.title = object.title ?? "";
    message.summary = object.summary ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitProposalAmino): MsgSubmitProposal {
    return {
      groupPolicyAddress: object.group_policy_address,
      proposers: Array.isArray(object?.proposers) ? object.proposers.map((e: any) => e) : [],
      metadata: object.metadata,
      messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromAmino(e)) : [],
      exec: isSet(object.exec) ? execFromJSON(object.exec) : -1,
      title: object.title,
      summary: object.summary
    };
  },
  toAmino(message: MsgSubmitProposal): MsgSubmitProposalAmino {
    const obj: any = {};
    obj.group_policy_address = message.groupPolicyAddress;
    if (message.proposers) {
      obj.proposers = message.proposers.map(e => e);
    } else {
      obj.proposers = [];
    }
    obj.metadata = message.metadata;
    if (message.messages) {
      obj.messages = message.messages.map(e => e ? Any.toAmino(e) : undefined);
    } else {
      obj.messages = [];
    }
    obj.exec = message.exec;
    obj.title = message.title;
    obj.summary = message.summary;
    return obj;
  },
  fromProtoMsg(message: MsgSubmitProposalProtoMsg): MsgSubmitProposal {
    return MsgSubmitProposal.decode(message.value);
  },
  toProto(message: MsgSubmitProposal): Uint8Array {
    return MsgSubmitProposal.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitProposal): MsgSubmitProposalProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
      value: MsgSubmitProposal.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgSubmitProposal.typeUrl, MsgSubmitProposal);
function createBaseMsgSubmitProposalResponse(): MsgSubmitProposalResponse {
  return {
    proposalId: BigInt(0)
  };
}
export const MsgSubmitProposalResponse = {
  typeUrl: "/cosmos.group.v1.MsgSubmitProposalResponse",
  aminoType: "cosmos-sdk/MsgSubmitProposalResponse",
  is(o: any): o is MsgSubmitProposalResponse {
    return o && (o.$typeUrl === MsgSubmitProposalResponse.typeUrl || typeof o.proposalId === "bigint");
  },
  isAmino(o: any): o is MsgSubmitProposalResponseAmino {
    return o && (o.$typeUrl === MsgSubmitProposalResponse.typeUrl || typeof o.proposal_id === "bigint");
  },
  encode(message: MsgSubmitProposalResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitProposalResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSubmitProposalResponse {
    return {
      proposalId: isSet(object.proposalId) ? BigInt(object.proposalId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = (message.proposalId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSubmitProposalResponse>): MsgSubmitProposalResponse {
    const message = createBaseMsgSubmitProposalResponse();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSubmitProposalResponseAmino): MsgSubmitProposalResponse {
    return {
      proposalId: BigInt(object.proposal_id)
    };
  },
  toAmino(message: MsgSubmitProposalResponse): MsgSubmitProposalResponseAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId ? message.proposalId.toString() : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgSubmitProposalResponseProtoMsg): MsgSubmitProposalResponse {
    return MsgSubmitProposalResponse.decode(message.value);
  },
  toProto(message: MsgSubmitProposalResponse): Uint8Array {
    return MsgSubmitProposalResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitProposalResponse): MsgSubmitProposalResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgSubmitProposalResponse",
      value: MsgSubmitProposalResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgSubmitProposalResponse.typeUrl, MsgSubmitProposalResponse);
function createBaseMsgWithdrawProposal(): MsgWithdrawProposal {
  return {
    proposalId: BigInt(0),
    address: ""
  };
}
export const MsgWithdrawProposal = {
  typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
  aminoType: "cosmos-sdk/group/MsgWithdrawProposal",
  is(o: any): o is MsgWithdrawProposal {
    return o && (o.$typeUrl === MsgWithdrawProposal.typeUrl || typeof o.proposalId === "bigint" && typeof o.address === "string");
  },
  isAmino(o: any): o is MsgWithdrawProposalAmino {
    return o && (o.$typeUrl === MsgWithdrawProposal.typeUrl || typeof o.proposal_id === "bigint" && typeof o.address === "string");
  },
  encode(message: MsgWithdrawProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdrawProposal {
    return {
      proposalId: isSet(object.proposalId) ? BigInt(object.proposalId.toString()) : BigInt(0),
      address: isSet(object.address) ? String(object.address) : ""
    };
  },
  toJSON(message: MsgWithdrawProposal): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = (message.proposalId || BigInt(0)).toString());
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgWithdrawProposal>): MsgWithdrawProposal {
    const message = createBaseMsgWithdrawProposal();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: MsgWithdrawProposalAmino): MsgWithdrawProposal {
    return {
      proposalId: BigInt(object.proposal_id),
      address: object.address
    };
  },
  toAmino(message: MsgWithdrawProposal): MsgWithdrawProposalAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId ? message.proposalId.toString() : undefined;
    obj.address = message.address;
    return obj;
  },
  fromProtoMsg(message: MsgWithdrawProposalProtoMsg): MsgWithdrawProposal {
    return MsgWithdrawProposal.decode(message.value);
  },
  toProto(message: MsgWithdrawProposal): Uint8Array {
    return MsgWithdrawProposal.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawProposal): MsgWithdrawProposalProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
      value: MsgWithdrawProposal.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgWithdrawProposal.typeUrl, MsgWithdrawProposal);
function createBaseMsgWithdrawProposalResponse(): MsgWithdrawProposalResponse {
  return {};
}
export const MsgWithdrawProposalResponse = {
  typeUrl: "/cosmos.group.v1.MsgWithdrawProposalResponse",
  aminoType: "cosmos-sdk/MsgWithdrawProposalResponse",
  is(o: any): o is MsgWithdrawProposalResponse {
    return o && o.$typeUrl === MsgWithdrawProposalResponse.typeUrl;
  },
  isAmino(o: any): o is MsgWithdrawProposalResponseAmino {
    return o && o.$typeUrl === MsgWithdrawProposalResponse.typeUrl;
  },
  encode(_: MsgWithdrawProposalResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawProposalResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgWithdrawProposalResponse {
    return {};
  },
  toJSON(_: MsgWithdrawProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgWithdrawProposalResponse>): MsgWithdrawProposalResponse {
    const message = createBaseMsgWithdrawProposalResponse();
    return message;
  },
  fromAmino(_: MsgWithdrawProposalResponseAmino): MsgWithdrawProposalResponse {
    return {};
  },
  toAmino(_: MsgWithdrawProposalResponse): MsgWithdrawProposalResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgWithdrawProposalResponseProtoMsg): MsgWithdrawProposalResponse {
    return MsgWithdrawProposalResponse.decode(message.value);
  },
  toProto(message: MsgWithdrawProposalResponse): Uint8Array {
    return MsgWithdrawProposalResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawProposalResponse): MsgWithdrawProposalResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgWithdrawProposalResponse",
      value: MsgWithdrawProposalResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgWithdrawProposalResponse.typeUrl, MsgWithdrawProposalResponse);
function createBaseMsgVote(): MsgVote {
  return {
    proposalId: BigInt(0),
    voter: "",
    option: 0,
    metadata: "",
    exec: 0
  };
}
export const MsgVote = {
  typeUrl: "/cosmos.group.v1.MsgVote",
  aminoType: "cosmos-sdk/group/MsgVote",
  is(o: any): o is MsgVote {
    return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposalId === "bigint" && typeof o.voter === "string" && o.option && typeof o.metadata === "string" && o.exec);
  },
  isAmino(o: any): o is MsgVoteAmino {
    return o && (o.$typeUrl === MsgVote.typeUrl || typeof o.proposal_id === "bigint" && typeof o.voter === "string" && o.option && typeof o.metadata === "string" && o.exec);
  },
  encode(message: MsgVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.option !== 0) {
      writer.uint32(24).int32(message.option);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.option = (reader.int32() as any);
          break;
        case 4:
          message.metadata = reader.string();
          break;
        case 5:
          message.exec = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgVote {
    return {
      proposalId: isSet(object.proposalId) ? BigInt(object.proposalId.toString()) : BigInt(0),
      voter: isSet(object.voter) ? String(object.voter) : "",
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : -1,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      exec: isSet(object.exec) ? execFromJSON(object.exec) : -1
    };
  },
  toJSON(message: MsgVote): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = (message.proposalId || BigInt(0)).toString());
    message.voter !== undefined && (obj.voter = message.voter);
    message.option !== undefined && (obj.option = voteOptionToJSON(message.option));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    return obj;
  },
  fromPartial(object: DeepPartial<MsgVote>): MsgVote {
    const message = createBaseMsgVote();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    message.metadata = object.metadata ?? "";
    message.exec = object.exec ?? 0;
    return message;
  },
  fromAmino(object: MsgVoteAmino): MsgVote {
    return {
      proposalId: BigInt(object.proposal_id),
      voter: object.voter,
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : -1,
      metadata: object.metadata,
      exec: isSet(object.exec) ? execFromJSON(object.exec) : -1
    };
  },
  toAmino(message: MsgVote): MsgVoteAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId ? message.proposalId.toString() : undefined;
    obj.voter = message.voter;
    obj.option = message.option;
    obj.metadata = message.metadata;
    obj.exec = message.exec;
    return obj;
  },
  fromProtoMsg(message: MsgVoteProtoMsg): MsgVote {
    return MsgVote.decode(message.value);
  },
  toProto(message: MsgVote): Uint8Array {
    return MsgVote.encode(message).finish();
  },
  toProtoMsg(message: MsgVote): MsgVoteProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgVote",
      value: MsgVote.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgVote.typeUrl, MsgVote);
function createBaseMsgVoteResponse(): MsgVoteResponse {
  return {};
}
export const MsgVoteResponse = {
  typeUrl: "/cosmos.group.v1.MsgVoteResponse",
  aminoType: "cosmos-sdk/MsgVoteResponse",
  is(o: any): o is MsgVoteResponse {
    return o && o.$typeUrl === MsgVoteResponse.typeUrl;
  },
  isAmino(o: any): o is MsgVoteResponseAmino {
    return o && o.$typeUrl === MsgVoteResponse.typeUrl;
  },
  encode(_: MsgVoteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgVoteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgVoteResponse {
    return {};
  },
  toJSON(_: MsgVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgVoteResponse>): MsgVoteResponse {
    const message = createBaseMsgVoteResponse();
    return message;
  },
  fromAmino(_: MsgVoteResponseAmino): MsgVoteResponse {
    return {};
  },
  toAmino(_: MsgVoteResponse): MsgVoteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgVoteResponseProtoMsg): MsgVoteResponse {
    return MsgVoteResponse.decode(message.value);
  },
  toProto(message: MsgVoteResponse): Uint8Array {
    return MsgVoteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgVoteResponse): MsgVoteResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgVoteResponse",
      value: MsgVoteResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgVoteResponse.typeUrl, MsgVoteResponse);
function createBaseMsgExec(): MsgExec {
  return {
    proposalId: BigInt(0),
    executor: ""
  };
}
export const MsgExec = {
  typeUrl: "/cosmos.group.v1.MsgExec",
  aminoType: "cosmos-sdk/group/MsgExec",
  is(o: any): o is MsgExec {
    return o && (o.$typeUrl === MsgExec.typeUrl || typeof o.proposalId === "bigint" && typeof o.executor === "string");
  },
  isAmino(o: any): o is MsgExecAmino {
    return o && (o.$typeUrl === MsgExec.typeUrl || typeof o.proposal_id === "bigint" && typeof o.executor === "string");
  },
  encode(message: MsgExec, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.executor !== "") {
      writer.uint32(18).string(message.executor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.executor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgExec {
    return {
      proposalId: isSet(object.proposalId) ? BigInt(object.proposalId.toString()) : BigInt(0),
      executor: isSet(object.executor) ? String(object.executor) : ""
    };
  },
  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = (message.proposalId || BigInt(0)).toString());
    message.executor !== undefined && (obj.executor = message.executor);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgExec>): MsgExec {
    const message = createBaseMsgExec();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.executor = object.executor ?? "";
    return message;
  },
  fromAmino(object: MsgExecAmino): MsgExec {
    return {
      proposalId: BigInt(object.proposal_id),
      executor: object.executor
    };
  },
  toAmino(message: MsgExec): MsgExecAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId ? message.proposalId.toString() : undefined;
    obj.executor = message.executor;
    return obj;
  },
  fromProtoMsg(message: MsgExecProtoMsg): MsgExec {
    return MsgExec.decode(message.value);
  },
  toProto(message: MsgExec): Uint8Array {
    return MsgExec.encode(message).finish();
  },
  toProtoMsg(message: MsgExec): MsgExecProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgExec",
      value: MsgExec.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgExec.typeUrl, MsgExec);
function createBaseMsgExecResponse(): MsgExecResponse {
  return {
    result: 0
  };
}
export const MsgExecResponse = {
  typeUrl: "/cosmos.group.v1.MsgExecResponse",
  aminoType: "cosmos-sdk/MsgExecResponse",
  is(o: any): o is MsgExecResponse {
    return o && (o.$typeUrl === MsgExecResponse.typeUrl || o.result);
  },
  isAmino(o: any): o is MsgExecResponseAmino {
    return o && (o.$typeUrl === MsgExecResponse.typeUrl || o.result);
  },
  encode(message: MsgExecResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.result !== 0) {
      writer.uint32(16).int32(message.result);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgExecResponse {
    return {
      result: isSet(object.result) ? proposalExecutorResultFromJSON(object.result) : -1
    };
  },
  toJSON(message: MsgExecResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = proposalExecutorResultToJSON(message.result));
    return obj;
  },
  fromPartial(object: DeepPartial<MsgExecResponse>): MsgExecResponse {
    const message = createBaseMsgExecResponse();
    message.result = object.result ?? 0;
    return message;
  },
  fromAmino(object: MsgExecResponseAmino): MsgExecResponse {
    return {
      result: isSet(object.result) ? proposalExecutorResultFromJSON(object.result) : -1
    };
  },
  toAmino(message: MsgExecResponse): MsgExecResponseAmino {
    const obj: any = {};
    obj.result = message.result;
    return obj;
  },
  fromProtoMsg(message: MsgExecResponseProtoMsg): MsgExecResponse {
    return MsgExecResponse.decode(message.value);
  },
  toProto(message: MsgExecResponse): Uint8Array {
    return MsgExecResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExecResponse): MsgExecResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgExecResponse",
      value: MsgExecResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgExecResponse.typeUrl, MsgExecResponse);
function createBaseMsgLeaveGroup(): MsgLeaveGroup {
  return {
    address: "",
    groupId: BigInt(0)
  };
}
export const MsgLeaveGroup = {
  typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
  aminoType: "cosmos-sdk/group/MsgLeaveGroup",
  is(o: any): o is MsgLeaveGroup {
    return o && (o.$typeUrl === MsgLeaveGroup.typeUrl || typeof o.address === "string" && typeof o.groupId === "bigint");
  },
  isAmino(o: any): o is MsgLeaveGroupAmino {
    return o && (o.$typeUrl === MsgLeaveGroup.typeUrl || typeof o.address === "string" && typeof o.group_id === "bigint");
  },
  encode(message: MsgLeaveGroup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.groupId !== BigInt(0)) {
      writer.uint32(16).uint64(message.groupId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgLeaveGroup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.groupId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgLeaveGroup {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      groupId: isSet(object.groupId) ? BigInt(object.groupId.toString()) : BigInt(0)
    };
  },
  toJSON(message: MsgLeaveGroup): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.groupId !== undefined && (obj.groupId = (message.groupId || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<MsgLeaveGroup>): MsgLeaveGroup {
    const message = createBaseMsgLeaveGroup();
    message.address = object.address ?? "";
    message.groupId = object.groupId !== undefined && object.groupId !== null ? BigInt(object.groupId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgLeaveGroupAmino): MsgLeaveGroup {
    return {
      address: object.address,
      groupId: BigInt(object.group_id)
    };
  },
  toAmino(message: MsgLeaveGroup): MsgLeaveGroupAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.group_id = message.groupId ? message.groupId.toString() : undefined;
    return obj;
  },
  fromProtoMsg(message: MsgLeaveGroupProtoMsg): MsgLeaveGroup {
    return MsgLeaveGroup.decode(message.value);
  },
  toProto(message: MsgLeaveGroup): Uint8Array {
    return MsgLeaveGroup.encode(message).finish();
  },
  toProtoMsg(message: MsgLeaveGroup): MsgLeaveGroupProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
      value: MsgLeaveGroup.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgLeaveGroup.typeUrl, MsgLeaveGroup);
function createBaseMsgLeaveGroupResponse(): MsgLeaveGroupResponse {
  return {};
}
export const MsgLeaveGroupResponse = {
  typeUrl: "/cosmos.group.v1.MsgLeaveGroupResponse",
  aminoType: "cosmos-sdk/MsgLeaveGroupResponse",
  is(o: any): o is MsgLeaveGroupResponse {
    return o && o.$typeUrl === MsgLeaveGroupResponse.typeUrl;
  },
  isAmino(o: any): o is MsgLeaveGroupResponseAmino {
    return o && o.$typeUrl === MsgLeaveGroupResponse.typeUrl;
  },
  encode(_: MsgLeaveGroupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgLeaveGroupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgLeaveGroupResponse {
    return {};
  },
  toJSON(_: MsgLeaveGroupResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgLeaveGroupResponse>): MsgLeaveGroupResponse {
    const message = createBaseMsgLeaveGroupResponse();
    return message;
  },
  fromAmino(_: MsgLeaveGroupResponseAmino): MsgLeaveGroupResponse {
    return {};
  },
  toAmino(_: MsgLeaveGroupResponse): MsgLeaveGroupResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromProtoMsg(message: MsgLeaveGroupResponseProtoMsg): MsgLeaveGroupResponse {
    return MsgLeaveGroupResponse.decode(message.value);
  },
  toProto(message: MsgLeaveGroupResponse): Uint8Array {
    return MsgLeaveGroupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLeaveGroupResponse): MsgLeaveGroupResponseProtoMsg {
    return {
      typeUrl: "/cosmos.group.v1.MsgLeaveGroupResponse",
      value: MsgLeaveGroupResponse.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(MsgLeaveGroupResponse.typeUrl, MsgLeaveGroupResponse);