import { PubKey } from "./codegen/cosmos/crypto/secp256k1/keys";
import { TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import { Any } from "./codegen/google/protobuf/any";
import { Signer } from "./signer";
import {
  AminoConverters,
  Generated,
  Registry,
  Signed,
  StdSignDoc,
} from "./types";
import { DocUtils } from "./utils/doc";

export class AminoSigner extends Signer {
  constructor(registry: Registry, aminoConverters: AminoConverters) {
    super();
    this.registerWithAmino(registry, aminoConverters);
  }

  registerWithAmino(registry: Registry, aminoConverters: AminoConverters) {
    registry.forEach(([typeUrl, type]) => {
      this.generated.push({
        ...type,
        typeUrl,
        amino: aminoConverters[typeUrl],
      });
    });
  }

  getGeneratedFromAminoType = (type: string): Generated => {
    const generated = this.generated.find((g) => g.amino?.aminoType === type);
    if (!generated) {
      throw new Error(
        `No such Generated corresponding to aminoType ${type} registered`
      );
    }
    return generated;
  };

  signStd(doc: StdSignDoc): Signed<TxRaw> {
    const signature = this.signBytes(DocUtils.StdSignDoc.encode(doc));
    const publicKey: Any = {
      typeUrl: "/cosmos.crypto.secp256k1.PubKey",
      value: PubKey.encode({
        key: this.auth.key.pubkey,
      }).finish(),
    };
    const { bodyBytes, authInfoBytes } = DocUtils.StdSignDoc.toSignDoc(
      doc,
      publicKey,
      this.getGeneratedFromAminoType
    );
    const signed = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [signature],
    });
    return {
      signed,
      broadcast: async (checkTx = true, commitTx = false) => {
        return this.broadcast(signed, checkTx, commitTx);
      },
    };
  }
}
