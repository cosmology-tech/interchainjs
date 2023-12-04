import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupPolicy, MsgCreateGroupWithPolicy, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyMetadata, MsgSubmitProposal, MsgWithdrawProposal, MsgVote, MsgExec, MsgLeaveGroup } from "./tx";
/** Msg is the cosmos.group.v1 Msg service. */
export interface Msg {
  /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
  createGroup(request: BroadcastTxReq<MsgCreateGroup>): Promise<DeliverTxResponse>;
  /** UpdateGroupMembers updates the group members with given group id and admin address. */
  updateGroupMembers(request: BroadcastTxReq<MsgUpdateGroupMembers>): Promise<DeliverTxResponse>;
  /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
  updateGroupAdmin(request: BroadcastTxReq<MsgUpdateGroupAdmin>): Promise<DeliverTxResponse>;
  /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
  updateGroupMetadata(request: BroadcastTxReq<MsgUpdateGroupMetadata>): Promise<DeliverTxResponse>;
  /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
  createGroupPolicy(request: BroadcastTxReq<MsgCreateGroupPolicy>): Promise<DeliverTxResponse>;
  /** CreateGroupWithPolicy creates a new group with policy. */
  createGroupWithPolicy(request: BroadcastTxReq<MsgCreateGroupWithPolicy>): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyAdmin updates a group policy admin. */
  updateGroupPolicyAdmin(request: BroadcastTxReq<MsgUpdateGroupPolicyAdmin>): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
  updateGroupPolicyDecisionPolicy(request: BroadcastTxReq<MsgUpdateGroupPolicyDecisionPolicy>): Promise<DeliverTxResponse>;
  /** UpdateGroupPolicyMetadata updates a group policy metadata. */
  updateGroupPolicyMetadata(request: BroadcastTxReq<MsgUpdateGroupPolicyMetadata>): Promise<DeliverTxResponse>;
  /** SubmitProposal submits a new proposal. */
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse>;
  /** WithdrawProposal withdraws a proposal. */
  withdrawProposal(request: BroadcastTxReq<MsgWithdrawProposal>): Promise<DeliverTxResponse>;
  /** Vote allows a voter to vote on a proposal. */
  vote(request: BroadcastTxReq<MsgVote>): Promise<DeliverTxResponse>;
  /** Exec executes a proposal. */
  exec(request: BroadcastTxReq<MsgExec>): Promise<DeliverTxResponse>;
  /** LeaveGroup allows a group member to leave the group. */
  leaveGroup(request: BroadcastTxReq<MsgLeaveGroup>): Promise<DeliverTxResponse>;
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
  createGroup(request: BroadcastTxReq<MsgCreateGroup>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroup.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupMembers(request: BroadcastTxReq<MsgUpdateGroupMembers>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupMembers.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupAdmin(request: BroadcastTxReq<MsgUpdateGroupAdmin>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupAdmin.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupMetadata(request: BroadcastTxReq<MsgUpdateGroupMetadata>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupMetadata.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  createGroupPolicy(request: BroadcastTxReq<MsgCreateGroupPolicy>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroupPolicy.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  createGroupWithPolicy(request: BroadcastTxReq<MsgCreateGroupWithPolicy>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgCreateGroupWithPolicy.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupPolicyAdmin(request: BroadcastTxReq<MsgUpdateGroupPolicyAdmin>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyAdmin.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupPolicyDecisionPolicy(request: BroadcastTxReq<MsgUpdateGroupPolicyDecisionPolicy>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyDecisionPolicy.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  updateGroupPolicyMetadata(request: BroadcastTxReq<MsgUpdateGroupPolicyMetadata>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateGroupPolicyMetadata.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitProposal.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  withdrawProposal(request: BroadcastTxReq<MsgWithdrawProposal>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgWithdrawProposal.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  vote(request: BroadcastTxReq<MsgVote>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgVote.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  exec(request: BroadcastTxReq<MsgExec>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgExec.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  leaveGroup(request: BroadcastTxReq<MsgLeaveGroup>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgLeaveGroup.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};