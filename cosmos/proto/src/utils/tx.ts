import {
  Any,
  AuthInfo,
  Fee,
  SignerInfo,
  SignMode,
  Tx,
  TxBody,
} from "@cosmonauts/cosmos-rpc";

import { EncodeObject, Generated } from "../types";

export const EncodeObjectUtils = {
  encode(
    msgs: EncodeObject[],
    getParserFromTypeUrl: (typeUrl: string) => Generated
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
    getParserFromTypeUrl: (typeUrl: string) => Generated,
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
