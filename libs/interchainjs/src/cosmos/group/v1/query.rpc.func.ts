import { RpcResolver, buildQuery } from "../../../helper-func-types";
import { QueryGroupInfoRequest, QueryGroupInfoResponse, QueryGroupPolicyInfoRequest, QueryGroupPolicyInfoResponse, QueryGroupMembersRequest, QueryGroupMembersResponse, QueryGroupsByAdminRequest, QueryGroupsByAdminResponse, QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByGroupResponse, QueryGroupPoliciesByAdminRequest, QueryGroupPoliciesByAdminResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsByGroupPolicyRequest, QueryProposalsByGroupPolicyResponse, QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse, QueryVotesByProposalRequest, QueryVotesByProposalResponse, QueryVotesByVoterRequest, QueryVotesByVoterResponse, QueryGroupsByMemberRequest, QueryGroupsByMemberResponse, QueryTallyResultRequest, QueryTallyResultResponse, QueryGroupsRequest, QueryGroupsResponse } from "./query";
export const createGetGroupInfo = (clientResolver?: RpcResolver) => buildQuery<QueryGroupInfoRequest, QueryGroupInfoResponse>({
  encode: QueryGroupInfoRequest.encode,
  decode: QueryGroupInfoResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupInfo",
  clientResolver,
  deps: [QueryGroupInfoRequest, QueryGroupInfoResponse]
});
export const createGetGroupPolicyInfo = (clientResolver?: RpcResolver) => buildQuery<QueryGroupPolicyInfoRequest, QueryGroupPolicyInfoResponse>({
  encode: QueryGroupPolicyInfoRequest.encode,
  decode: QueryGroupPolicyInfoResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupPolicyInfo",
  clientResolver,
  deps: [QueryGroupPolicyInfoRequest, QueryGroupPolicyInfoResponse]
});
export const createGetGroupMembers = (clientResolver?: RpcResolver) => buildQuery<QueryGroupMembersRequest, QueryGroupMembersResponse>({
  encode: QueryGroupMembersRequest.encode,
  decode: QueryGroupMembersResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupMembers",
  clientResolver,
  deps: [QueryGroupMembersRequest, QueryGroupMembersResponse]
});
export const createGetGroupsByAdmin = (clientResolver?: RpcResolver) => buildQuery<QueryGroupsByAdminRequest, QueryGroupsByAdminResponse>({
  encode: QueryGroupsByAdminRequest.encode,
  decode: QueryGroupsByAdminResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupsByAdmin",
  clientResolver,
  deps: [QueryGroupsByAdminRequest, QueryGroupsByAdminResponse]
});
export const createGetGroupPoliciesByGroup = (clientResolver?: RpcResolver) => buildQuery<QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByGroupResponse>({
  encode: QueryGroupPoliciesByGroupRequest.encode,
  decode: QueryGroupPoliciesByGroupResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupPoliciesByGroup",
  clientResolver,
  deps: [QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByGroupResponse]
});
export const createGetGroupPoliciesByAdmin = (clientResolver?: RpcResolver) => buildQuery<QueryGroupPoliciesByAdminRequest, QueryGroupPoliciesByAdminResponse>({
  encode: QueryGroupPoliciesByAdminRequest.encode,
  decode: QueryGroupPoliciesByAdminResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupPoliciesByAdmin",
  clientResolver,
  deps: [QueryGroupPoliciesByAdminRequest, QueryGroupPoliciesByAdminResponse]
});
export const createGetProposal = (clientResolver?: RpcResolver) => buildQuery<QueryProposalRequest, QueryProposalResponse>({
  encode: QueryProposalRequest.encode,
  decode: QueryProposalResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "Proposal",
  clientResolver,
  deps: [QueryProposalRequest, QueryProposalResponse]
});
export const createGetProposalsByGroupPolicy = (clientResolver?: RpcResolver) => buildQuery<QueryProposalsByGroupPolicyRequest, QueryProposalsByGroupPolicyResponse>({
  encode: QueryProposalsByGroupPolicyRequest.encode,
  decode: QueryProposalsByGroupPolicyResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "ProposalsByGroupPolicy",
  clientResolver,
  deps: [QueryProposalsByGroupPolicyRequest, QueryProposalsByGroupPolicyResponse]
});
export const createGetVoteByProposalVoter = (clientResolver?: RpcResolver) => buildQuery<QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse>({
  encode: QueryVoteByProposalVoterRequest.encode,
  decode: QueryVoteByProposalVoterResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "VoteByProposalVoter",
  clientResolver,
  deps: [QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse]
});
export const createGetVotesByProposal = (clientResolver?: RpcResolver) => buildQuery<QueryVotesByProposalRequest, QueryVotesByProposalResponse>({
  encode: QueryVotesByProposalRequest.encode,
  decode: QueryVotesByProposalResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "VotesByProposal",
  clientResolver,
  deps: [QueryVotesByProposalRequest, QueryVotesByProposalResponse]
});
export const createGetVotesByVoter = (clientResolver?: RpcResolver) => buildQuery<QueryVotesByVoterRequest, QueryVotesByVoterResponse>({
  encode: QueryVotesByVoterRequest.encode,
  decode: QueryVotesByVoterResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "VotesByVoter",
  clientResolver,
  deps: [QueryVotesByVoterRequest, QueryVotesByVoterResponse]
});
export const createGetGroupsByMember = (clientResolver?: RpcResolver) => buildQuery<QueryGroupsByMemberRequest, QueryGroupsByMemberResponse>({
  encode: QueryGroupsByMemberRequest.encode,
  decode: QueryGroupsByMemberResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "GroupsByMember",
  clientResolver,
  deps: [QueryGroupsByMemberRequest, QueryGroupsByMemberResponse]
});
export const createGetTallyResult = (clientResolver?: RpcResolver) => buildQuery<QueryTallyResultRequest, QueryTallyResultResponse>({
  encode: QueryTallyResultRequest.encode,
  decode: QueryTallyResultResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "TallyResult",
  clientResolver,
  deps: [QueryTallyResultRequest, QueryTallyResultResponse]
});
export const createGetGroups = (clientResolver?: RpcResolver) => buildQuery<QueryGroupsRequest, QueryGroupsResponse>({
  encode: QueryGroupsRequest.encode,
  decode: QueryGroupsResponse.decode,
  service: "cosmos.group.v1.Query",
  method: "Groups",
  clientResolver,
  deps: [QueryGroupsRequest, QueryGroupsResponse]
});