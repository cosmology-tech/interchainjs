import { fromUtf8 } from "@cosmonauts/core";
import {
  EncodeObject,
  EncodeObjectUtils as _EncodeObjectUtils,
  Generated,
} from "@cosmonauts/cosmos-proto";
import {
  AuthInfo,
  Fee,
  SignDoc,
  SignerInfo,
  SignMode,
  TxBody,
} from "@cosmonauts/cosmos-proto";
import { Any, Coin } from "@cosmonauts/cosmos-rpc";

import { AminoMsg, StdFee, StdSignDoc } from "./types";

function sortKey<T>(target: T): T {
  if (target === null || typeof target !== "object") {
    return target;
  }
  if (Array.isArray(target)) {
    return target.map(sortKey) as T;
  }
  const sortedObj: Record<string, any> = {};
  Object.keys(target)
    .sort()
    .forEach((key) => {
      sortedObj[key] = sortKey((target as Record<string, any>)[key]);
    });
  return sortedObj as T;
}

export const StdFeeUtils = {
  fromFee(fee: Fee): StdFee {
    return {
      amount: fee.amount,
      gas: fee.gasLimit.toString(),
      granter: fee.granter,
      payer: fee.payer,
    };
  },
  toFee(fee: StdFee): Fee {
    return Fee.fromPartial({
      amount: fee.amount.map((coin) => Coin.fromPartial(coin)),
      gasLimit: BigInt(fee.gas),
      payer: fee.payer,
      granter: fee.granter,
    });
  },
};

export const StdSignDocUtils = {
  fromPartial(obj: StdSignDoc): StdSignDoc {
    return sortKey(obj);
  },
  encode(doc: StdSignDoc): Uint8Array {
    const str = JSON.stringify(doc);
    const serialized = str
      .replaceAll("&", "\\u0026")
      .replaceAll("<", "\\u003c")
      .replaceAll(">", "\\u003e");
    return fromUtf8(serialized);
  },
  toSignDoc(
    doc: StdSignDoc,
    publicKey: Any,
    getGeneratedFromAminoType: (type: string) => Generated
  ): SignDoc {
    const txBody: TxBody = TxBody.fromPartial({
      messages: doc.msgs.map((msg) => {
        const generated = getGeneratedFromAminoType(msg.type);
        if (!generated.amino) {
          throw new Error(
            `No such aminoConverter provided for aminoType ${msg.type}`
          );
        }
        return {
          typeUrl: generated.typeUrl,
          value: generated
            .encode(generated.fromPartial(generated.amino.fromAmino(msg.value)))
            .finish(),
        };
      }),
      memo: doc.memo,
    });
    const authInfo: AuthInfo = AuthInfo.fromPartial({
      signerInfos: [
        SignerInfo.fromPartial({
          publicKey,
          sequence: BigInt(doc.sequence),
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
            },
          },
        }),
      ],
      fee: StdFeeUtils.toFee(doc.fee),
    });
    const signDoc: SignDoc = SignDoc.fromPartial({
      bodyBytes: TxBody.encode(txBody).finish(),
      authInfoBytes: AuthInfo.encode(authInfo).finish(),
      chainId: doc.chain_id,
      accountNumber: BigInt(doc.account_number),
    });
    return signDoc;
  },
};

export const EncodeObjectUtils = {
  ..._EncodeObjectUtils,
  toAminoMsg(
    msgs: EncodeObject[],
    getGeneratedFromTypeUrl: (typeUrl: string) => Generated
  ): AminoMsg[] {
    return msgs.map((msg) => {
      const generated = getGeneratedFromTypeUrl(msg.typeUrl);
      if (!generated.amino) {
        throw new Error(
          `No such aminoConverter provided for typeUrl ${msg.typeUrl}`
        );
      }
      return {
        type: generated.amino.aminoType,
        value: generated.amino.toAmino(generated.fromPartial(msg.value)),
      };
    });
  },
};
