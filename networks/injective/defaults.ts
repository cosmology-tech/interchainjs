import { SignerConfig, Signature } from "@cosmonauts/types";
import { Key } from "@cosmonauts/utils";
import { computeAddress } from "@ethersproject/transactions";
import { bytes as assertBytes } from "@noble/hashes/_assert";
import { sha256 } from "@noble/hashes/sha256";
import { secp256k1 } from "@noble/curves/secp256k1";

export const defaultHdPath = {
  secp256k1: "m/44'/60'/0'/0/0",
};

export const defaultSignerConfig: SignerConfig = {
  publicKey: {
    isCompressed: false,
    toAddress: (publicKey: Key) => Key.fromHex(computeAddress(publicKey.value)),
  },
  message: {
    hash: (message: Uint8Array) => {
      const hashed = sha256(message);
      assertBytes(hashed);
      return hashed;
    },
  },
  signature: {
    toCompact: (signature: Signature, algo: string) => {
      switch (algo) {
        case "secp256k1":
          const sig = new secp256k1.Signature(
            signature.r.toBigInt(),
            signature.s.toBigInt(),
            // @ts-ignore
            signature.recovery
          );
          return Key.from(sig.toCompactRawBytes());
        case "ed25519":
          throw new Error("Not implemented yet");
        default:
          throw new Error(`Unidentified algorithm: ${algo}`);
      }
    },
    fromCompact: (key: Key, algo: string) => {
      switch (algo) {
        case "secp256k1":
          const sig = secp256k1.Signature.fromCompact(key.toHex());
          return {
            r: Key.fromBigInt(sig.r),
            s: Key.fromBigInt(sig.s),
            recovery: sig.recovery,
          };
        case "ed25519":
          throw new Error("Not implemented yet");
        default:
          throw new Error(`Unidentified algorithm: ${algo}`);
      }
    },
  },
};
