import { SignMode } from "../codegen/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  Fee,
  SignerInfo,
  Tx,
  TxBody,
} from "../codegen/cosmos/tx/v1beta1/tx";
import { Any } from "../codegen/google/protobuf/any";
import { EncodeObject, Parser } from "../types";

export const EncodeObjectUtils = {
  encode(
    msgs: EncodeObject[],
    getParserFromTypeUrl: (typeUrl: string) => Parser
  ): Any[] {
    return msgs.map((msg) => {
      const generated = getParserFromTypeUrl(msg.typeUrl);
      return {
        typeUrl: generated.typeUrl,
        value: generated.encode(generated.fromPartial(msg.value)).finish(),
      };
    });
  },
};

export const TxUtils = {
  toTxForGasEstimation(
    messages: EncodeObject[],
    publicKey: Any,
    getParserFromTypeUrl: (typeUrl: string) => Parser,
    sequence: bigint,
    memo: string = ""
  ): Tx {
    const txBody: TxBody = TxBody.fromPartial({
      messages: EncodeObjectUtils.encode(messages, getParserFromTypeUrl),
      memo,
    });
    const signerInfo: SignerInfo = SignerInfo.fromPartial({
      publicKey,
      sequence,
      modeInfo: { single: { mode: SignMode.SIGN_MODE_UNSPECIFIED } },
    });

    return Tx.fromPartial({
      body: txBody,
      authInfo: AuthInfo.fromPartial({
        fee: Fee.fromPartial({}),
        signerInfos: [signerInfo],
      }),
      signatures: [new Uint8Array()],
    });
  },
};
