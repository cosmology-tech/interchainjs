import { buildTx, SigningClientResolver } from "../../../helper-func-types";
import { buildUseMutation } from "../../../react-query";
import { toEncoders, toConverters } from "@interchainjs/cosmos/utils";
import { MsgSubmitProposal, MsgExecLegacyContent, MsgVote, MsgVoteWeighted, MsgDeposit, MsgUpdateParams, MsgCancelProposal } from "./tx";
export const createSubmitProposal = (getSigningClient: SigningClientResolver) => buildTx<MsgSubmitProposal>({
  getSigningClient: getSigningClient,
  typeUrl: MsgSubmitProposal.typeUrl,
  encoders: toEncoders(MsgSubmitProposal),
  converters: toConverters(MsgSubmitProposal)
});
export const useSubmitProposal = buildUseMutation<MsgSubmitProposal, Error>({
  builderMutationFn: createSubmitProposal
});
export const createExecLegacyContent = (getSigningClient: SigningClientResolver) => buildTx<MsgExecLegacyContent>({
  getSigningClient: getSigningClient,
  typeUrl: MsgExecLegacyContent.typeUrl,
  encoders: toEncoders(MsgExecLegacyContent),
  converters: toConverters(MsgExecLegacyContent)
});
export const useExecLegacyContent = buildUseMutation<MsgExecLegacyContent, Error>({
  builderMutationFn: createExecLegacyContent
});
export const createVote = (getSigningClient: SigningClientResolver) => buildTx<MsgVote>({
  getSigningClient: getSigningClient,
  typeUrl: MsgVote.typeUrl,
  encoders: toEncoders(MsgVote),
  converters: toConverters(MsgVote)
});
export const useVote = buildUseMutation<MsgVote, Error>({
  builderMutationFn: createVote
});
export const createVoteWeighted = (getSigningClient: SigningClientResolver) => buildTx<MsgVoteWeighted>({
  getSigningClient: getSigningClient,
  typeUrl: MsgVoteWeighted.typeUrl,
  encoders: toEncoders(MsgVoteWeighted),
  converters: toConverters(MsgVoteWeighted)
});
export const useVoteWeighted = buildUseMutation<MsgVoteWeighted, Error>({
  builderMutationFn: createVoteWeighted
});
export const createDeposit = (getSigningClient: SigningClientResolver) => buildTx<MsgDeposit>({
  getSigningClient: getSigningClient,
  typeUrl: MsgDeposit.typeUrl,
  encoders: toEncoders(MsgDeposit),
  converters: toConverters(MsgDeposit)
});
export const useDeposit = buildUseMutation<MsgDeposit, Error>({
  builderMutationFn: createDeposit
});
export const createUpdateParams = (getSigningClient: SigningClientResolver) => buildTx<MsgUpdateParams>({
  getSigningClient: getSigningClient,
  typeUrl: MsgUpdateParams.typeUrl,
  encoders: toEncoders(MsgUpdateParams),
  converters: toConverters(MsgUpdateParams)
});
export const useUpdateParams = buildUseMutation<MsgUpdateParams, Error>({
  builderMutationFn: createUpdateParams
});
export const createCancelProposal = (getSigningClient: SigningClientResolver) => buildTx<MsgCancelProposal>({
  getSigningClient: getSigningClient,
  typeUrl: MsgCancelProposal.typeUrl,
  encoders: toEncoders(MsgCancelProposal),
  converters: toConverters(MsgCancelProposal)
});
export const useCancelProposal = buildUseMutation<MsgCancelProposal, Error>({
  builderMutationFn: createCancelProposal
});