import { SignerConfig } from "@cosmonauts/types";
import { Key, Signature } from "@cosmonauts/utils";
import { computeAddress } from "@ethersproject/transactions";
import { bytes as assertBytes } from "@noble/hashes/_assert";
import { sha256 } from "@noble/hashes/sha256";

export const defaultHdPath = "m/44'/60'/0'/0/0";

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
    toKey: (signature: Signature) => signature.toCompact(),
    fromKey: (key: Key) => {
      throw new Error("Not implemented yet");
    },
  },
};
