import { fromUtf8 } from "@cosmonauts/core";
import {
  Any,
  AuthInfo,
  Coin,
  EncodeObject,
  EncodeObjectUtils as _EncodeObjectUtils,
  Fee,
  Parser,
  SignDoc,
  SignerInfo,
  TxBody,
} from "@cosmonauts/cosmos-proto";
import { SignMode } from "@cosmonauts/cosmos-proto/src/codegen/cosmos/tx/signing/v1beta1/signing";

import { AminoMsg, StdFee, StdSignDoc } from "./types";

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
  encode(doc: StdSignDoc): Uint8Array {
    const serialized: string = escapeCharacters(
      JSON.stringify(sortedObject(doc))
    );
    return fromUtf8(serialized);
  },
  toSignDoc(
    doc: StdSignDoc,
    publicKey: Any,
    getParserFromAminoType: (type: string) => Parser
  ): SignDoc {
    const txBody: TxBody = TxBody.fromPartial({
      messages: doc.msgs.map((msg) => {
        const generated = getParserFromAminoType(msg.type);
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
    getParserFromTypeUrl: (typeUrl: string) => Parser
  ): AminoMsg[] {
    return msgs.map((msg) => {
      const parser = getParserFromTypeUrl(msg.typeUrl);
      if (!parser.amino) {
        throw new Error(
          `No such aminoConverter provided for typeUrl ${msg.typeUrl}`
        );
      }
      return {
        type: parser.amino.aminoType,
        value: parser.amino.toAmino(parser.fromPartial(msg.value)),
      };
    });
  },
};
