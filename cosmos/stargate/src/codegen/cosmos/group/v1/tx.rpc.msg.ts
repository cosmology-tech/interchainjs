import { DeliverTxResponse, StdFee, TxRpc } from "../../../types";
import { MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupPolicy, MsgCreateGroupWithPolicy, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyMetadata, MsgSubmitProposal, MsgWithdrawProposal, MsgVote, MsgExec, MsgLeaveGroup } from "./tx";
/** Msg is the cosmos.group.v1 Msg service. */
export interface Msg {
  /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
  createGroup(signerAddress: string, message: MsgCreateGroup, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupMembers updates the group members with given group id and admin address. */
  updateGroupMembers(signerAddress: string, message: MsgUpdateGroupMembers, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
  updateGroupAdmin(signerAddress: string, message: MsgUpdateGroupAdmin, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
  updateGroupMetadata(signerAddress: string, message: MsgUpdateGroupMetadata, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
  createGroupPolicy(signerAddress: string, message: MsgCreateGroupPolicy, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** CreateGroupWithPolicy creates a new group with policy. */
  createGroupWithPolicy(signerAddress: string, message: MsgCreateGroupWithPolicy, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyAdmin updates a group policy admin. */
  updateGroupPolicyAdmin(signerAddress: string, message: MsgUpdateGroupPolicyAdmin, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
  updateGroupPolicyDecisionPolicy(signerAddress: string, message: MsgUpdateGroupPolicyDecisionPolicy, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyMetadata updates a group policy metadata. */
  updateGroupPolicyMetadata(signerAddress: string, message: MsgUpdateGroupPolicyMetadata, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** SubmitProposal submits a new proposal. */
  submitProposal(signerAddress: string, message: MsgSubmitProposal, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** WithdrawProposal withdraws a proposal. */
  withdrawProposal(signerAddress: string, message: MsgWithdrawProposal, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** Vote allows a voter to vote on a proposal. */
  vote(signerAddress: string, message: MsgVote, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** Exec executes a proposal. */
  exec(signerAddress: string, message: MsgExec, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
  /** LeaveGroup allows a group member to leave the group. */
  leaveGroup(signerAddress: string, message: MsgLeaveGroup, fee: number | StdFee | "auto", memo: string): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.createGroup = this.createGroup.bind(this);
    this.updateGroupMembers = this.updateGroupMembers.bind(this);
    this.updateGroupAdmin = this.updateGroupAdmin.bind(this);
    this.updateGroupMetadata = this.updateGroupMetadata.bind(this);
    this.createGroupPolicy = this.createGroupPolicy.bind(this);
    this.createGroupWithPolicy = this.createGroupWithPolicy.bind(this);
    this.updateGroupPolicyAdmin = this.updateGroupPolicyAdmin.bind(this);
    this.updateGroupPolicyDecisionPolicy = this.updateGroupPolicyDecisionPolicy.bind(this);
    this.updateGroupPolicyMetadata = this.updateGroupPolicyMetadata.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
    this.withdrawProposal = this.withdrawProposal.bind(this);
    this.vote = this.vote.bind(this);
    this.exec = this.exec.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
  }
  createGroup(signerAddress: string, message: MsgCreateGroup, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroup.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupMembers(signerAddress: string, message: MsgUpdateGroupMembers, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupMembers.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupAdmin(signerAddress: string, message: MsgUpdateGroupAdmin, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupAdmin.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupMetadata(signerAddress: string, message: MsgUpdateGroupMetadata, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupMetadata.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  createGroupPolicy(signerAddress: string, message: MsgCreateGroupPolicy, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroupPolicy.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  createGroupWithPolicy(signerAddress: string, message: MsgCreateGroupWithPolicy, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroupWithPolicy.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupPolicyAdmin(signerAddress: string, message: MsgUpdateGroupPolicyAdmin, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyAdmin.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupPolicyDecisionPolicy(signerAddress: string, message: MsgUpdateGroupPolicyDecisionPolicy, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyDecisionPolicy.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  updateGroupPolicyMetadata(signerAddress: string, message: MsgUpdateGroupPolicyMetadata, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyMetadata.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  submitProposal(signerAddress: string, message: MsgSubmitProposal, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitProposal.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  withdrawProposal(signerAddress: string, message: MsgWithdrawProposal, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgWithdrawProposal.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  vote(signerAddress: string, message: MsgVote, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgVote.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  exec(signerAddress: string, message: MsgExec, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgExec.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
  leaveGroup(signerAddress: string, message: MsgLeaveGroup, fee: number | StdFee | "auto" = "auto", memo: string = ""): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgLeaveGroup.typeUrl,
      value: message
    }];
    return this.rpc.signAndBroadcast!(signerAddress, data, fee, memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};