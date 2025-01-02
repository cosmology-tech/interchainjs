import { buildTx, SigningClientResolver } from "../../../helper-func-types";
import { toEncoders, toConverters } from "@interchainjs/cosmos/utils";
import { buildUseMutation } from "../../../react-query";
import { MsgCreateValidator, MsgEditValidator, MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCancelUnbondingDelegation, MsgUpdateParams } from "./tx";
export const createCreateValidator = (clientResolver?: SigningClientResolver) => buildTx<MsgCreateValidator>({
  clientResolver,
  typeUrl: MsgCreateValidator.typeUrl,
  encoders: toEncoders(MsgCreateValidator),
  converters: toConverters(MsgCreateValidator),
  deps: [MsgCreateValidator]
});
export const useCreateValidator = buildUseMutation<MsgCreateValidator, Error>({
  builderMutationFn: createCreateValidator
});
export const createEditValidator = (clientResolver?: SigningClientResolver) => buildTx<MsgEditValidator>({
  clientResolver,
  typeUrl: MsgEditValidator.typeUrl,
  encoders: toEncoders(MsgEditValidator),
  converters: toConverters(MsgEditValidator),
  deps: [MsgEditValidator]
});
export const useEditValidator = buildUseMutation<MsgEditValidator, Error>({
  builderMutationFn: createEditValidator
});
export const createDelegate = (clientResolver?: SigningClientResolver) => buildTx<MsgDelegate>({
  clientResolver,
  typeUrl: MsgDelegate.typeUrl,
  encoders: toEncoders(MsgDelegate),
  converters: toConverters(MsgDelegate),
  deps: [MsgDelegate]
});
export const useDelegate = buildUseMutation<MsgDelegate, Error>({
  builderMutationFn: createDelegate
});
export const createBeginRedelegate = (clientResolver?: SigningClientResolver) => buildTx<MsgBeginRedelegate>({
  clientResolver,
  typeUrl: MsgBeginRedelegate.typeUrl,
  encoders: toEncoders(MsgBeginRedelegate),
  converters: toConverters(MsgBeginRedelegate),
  deps: [MsgBeginRedelegate]
});
export const useBeginRedelegate = buildUseMutation<MsgBeginRedelegate, Error>({
  builderMutationFn: createBeginRedelegate
});
export const createUndelegate = (clientResolver?: SigningClientResolver) => buildTx<MsgUndelegate>({
  clientResolver,
  typeUrl: MsgUndelegate.typeUrl,
  encoders: toEncoders(MsgUndelegate),
  converters: toConverters(MsgUndelegate),
  deps: [MsgUndelegate]
});
export const useUndelegate = buildUseMutation<MsgUndelegate, Error>({
  builderMutationFn: createUndelegate
});
export const createCancelUnbondingDelegation = (clientResolver?: SigningClientResolver) => buildTx<MsgCancelUnbondingDelegation>({
  clientResolver,
  typeUrl: MsgCancelUnbondingDelegation.typeUrl,
  encoders: toEncoders(MsgCancelUnbondingDelegation),
  converters: toConverters(MsgCancelUnbondingDelegation),
  deps: [MsgCancelUnbondingDelegation]
});
export const useCancelUnbondingDelegation = buildUseMutation<MsgCancelUnbondingDelegation, Error>({
  builderMutationFn: createCancelUnbondingDelegation
});
export const createUpdateParams = (clientResolver?: SigningClientResolver) => buildTx<MsgUpdateParams>({
  clientResolver,
  typeUrl: MsgUpdateParams.typeUrl,
  encoders: toEncoders(MsgUpdateParams),
  converters: toConverters(MsgUpdateParams),
  deps: [MsgUpdateParams]
});
export const useUpdateParams = buildUseMutation<MsgUpdateParams, Error>({
  builderMutationFn: createUpdateParams
});