import { buildTx, SigningClientResolver } from "../../../../helper-func-types";
import { toEncoders, toConverters } from "@interchainjs/cosmos/utils";
import { buildUseMutation } from "../../../../react-query";
import { MsgConnectionOpenInit, MsgConnectionOpenTry, MsgConnectionOpenAck, MsgConnectionOpenConfirm, MsgUpdateParams } from "./tx";
export const createConnectionOpenInit = (clientResolver?: SigningClientResolver) => buildTx<MsgConnectionOpenInit>({
  clientResolver,
  typeUrl: MsgConnectionOpenInit.typeUrl,
  encoders: toEncoders(MsgConnectionOpenInit),
  converters: toConverters(MsgConnectionOpenInit),
  deps: [MsgConnectionOpenInit]
});
export const useConnectionOpenInit = buildUseMutation<MsgConnectionOpenInit, Error>({
  builderMutationFn: createConnectionOpenInit
});
export const createConnectionOpenTry = (clientResolver?: SigningClientResolver) => buildTx<MsgConnectionOpenTry>({
  clientResolver,
  typeUrl: MsgConnectionOpenTry.typeUrl,
  encoders: toEncoders(MsgConnectionOpenTry),
  converters: toConverters(MsgConnectionOpenTry),
  deps: [MsgConnectionOpenTry]
});
export const useConnectionOpenTry = buildUseMutation<MsgConnectionOpenTry, Error>({
  builderMutationFn: createConnectionOpenTry
});
export const createConnectionOpenAck = (clientResolver?: SigningClientResolver) => buildTx<MsgConnectionOpenAck>({
  clientResolver,
  typeUrl: MsgConnectionOpenAck.typeUrl,
  encoders: toEncoders(MsgConnectionOpenAck),
  converters: toConverters(MsgConnectionOpenAck),
  deps: [MsgConnectionOpenAck]
});
export const useConnectionOpenAck = buildUseMutation<MsgConnectionOpenAck, Error>({
  builderMutationFn: createConnectionOpenAck
});
export const createConnectionOpenConfirm = (clientResolver?: SigningClientResolver) => buildTx<MsgConnectionOpenConfirm>({
  clientResolver,
  typeUrl: MsgConnectionOpenConfirm.typeUrl,
  encoders: toEncoders(MsgConnectionOpenConfirm),
  converters: toConverters(MsgConnectionOpenConfirm),
  deps: [MsgConnectionOpenConfirm]
});
export const useConnectionOpenConfirm = buildUseMutation<MsgConnectionOpenConfirm, Error>({
  builderMutationFn: createConnectionOpenConfirm
});
export const createUpdateConnectionParams = (clientResolver?: SigningClientResolver) => buildTx<MsgUpdateParams>({
  clientResolver,
  typeUrl: MsgUpdateParams.typeUrl,
  encoders: toEncoders(MsgUpdateParams),
  converters: toConverters(MsgUpdateParams),
  deps: [MsgUpdateParams]
});
export const useUpdateConnectionParams = buildUseMutation<MsgUpdateParams, Error>({
  builderMutationFn: createUpdateConnectionParams
});