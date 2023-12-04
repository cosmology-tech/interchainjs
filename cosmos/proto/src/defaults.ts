import { SigObj } from "@cosmonauts/core";
import { sha256 } from "@noble/hashes/sha256";

import { PubKey as PubKeySecp256k1 } from "./codegen/cosmos/crypto/secp256k1/keys";
import { SignerOptions } from "./types";

export const CosmosDefaultOptions: SignerOptions = {
  hash: (data: Uint8Array) => sha256(data),
  signatureConverter: {
    toSignature: (sigObj: SigObj) => new Uint8Array([...sigObj.r, ...sigObj.s]),
    fromSignature: (signature: Uint8Array): SigObj => ({
      r: signature.slice(0, 32),
      s: signature.slice(32, 64),
      recoveryId: void 0,
    }),
  },
  encodePubKey: (pubkey: Uint8Array) => {
    return {
      typeUrl: PubKeySecp256k1.typeUrl,
      value: PubKeySecp256k1.encode(
        PubKeySecp256k1.fromPartial({ key: pubkey })
      ).finish(),
    };
  },
};
