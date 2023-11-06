import { fromUtf8 } from "@sign/core";

import { Coin } from "../codegen/cosmos/base/v1beta1/coin";
import {
  AuthInfo,
  Fee,
  SignDoc,
  SignerInfo,
  TxBody,
} from "../codegen/cosmos/tx/v1beta1/tx";
import { Any } from "../codegen/google/protobuf/any";
import {
  AminoMsg,
  EncodeObject,
  Generated,
  StdFee,
  StdSignDoc,
} from "../types";

function sortedObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, any> = {};
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });
  return result;
}

/**
 * Takes a valid JSON document and performs the following escapings in string values:
 *
 * `&` -> `\u0026`
 * `<` -> `\u003c`
 * `>` -> `\u003e`
 *
 * Since those characters do not occur in other places of the JSON document, only
 * string values are affected.
 *
 * If the input is invalid JSON, the behaviour is undefined.
 */
export function escapeCharacters(input: string): string {
  // When we migrate to target es2021 or above, we can use replaceAll instead of global patterns.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
  const amp = /&/g;
  const lt = /</g;
  const gt = />/g;
  return input
    .replace(amp, "\\u0026")
    .replace(lt, "\\u003c")
    .replace(gt, "\\u003e");
}

export const FeeUtils = {
  StdFee: {
    toFee(fee: StdFee): Fee {
      return Fee.fromPartial({
        amount: fee.amount.map((coin) => Coin.fromPartial(coin)),
        gasLimit: BigInt(fee.gas),
        payer: fee.payer,
        granter: fee.granter,
      });
    },
  },
};

export const MsgUtils = {
  EncodeObject: {
    encode(
      msgs: EncodeObject[],
      getGeneratedFromTypeUrl: (typeUrl: string) => Generated
    ): Any[] {
      return msgs.map((msg) => {
        const generated = getGeneratedFromTypeUrl(msg.typeUrl);
        return {
          typeUrl: generated.typeUrl,
          value: generated.encode(generated.fromPartial(msg.value)).finish(),
        };
      });
    },
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
          value: generated.amino.toAmino(msg.value),
        };
      });
    },
  },
};

export const DocUtils = {
  StdSignDoc: {
    encode(doc: StdSignDoc): Uint8Array {
      const serialized: string = escapeCharacters(
        JSON.stringify(sortedObject(doc))
      );
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
              .encode(
                generated.fromPartial(generated.amino.fromAmino(msg.value))
              )
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
          }),
        ],
        fee: FeeUtils.StdFee.toFee(doc.fee),
      });
      const signDoc: SignDoc = SignDoc.fromPartial({
        bodyBytes: TxBody.encode(txBody).finish(),
        authInfoBytes: AuthInfo.encode(authInfo).finish(),
        chainId: doc.chain_id,
        accountNumber: BigInt(doc.account_number),
      });
      return signDoc;
    },
  },
};
