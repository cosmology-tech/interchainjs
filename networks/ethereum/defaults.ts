import { SignerConfig } from "@cosmonauts/types";
import { Key, toHex, Signature } from "@cosmonauts/utils";
import { computeAddress } from "@ethersproject/transactions";
import { bytes as assertBytes } from "@noble/hashes/_assert";
import { keccak_256 } from "@noble/hashes/sha3";

export const defaultHdPath = "m/44'/60'/0'/0/0";

export const defaultSignerConfig: SignerConfig = {
  publicKey: {
    isCompressed: false,
    toAddress: (publicKey: Key) => Key.fromHex(computeAddress(publicKey.value)),
  },
  message: {
    hash: (message: Uint8Array) => {
      const hashed = keccak_256(message);
      assertBytes(hashed);
      return hashed;
    },
  },
  signature: {
    toKey: (signature: Signature) => {
      return signature
        .toCompact()
        .concat(Key.fromHex(signature.recovery === 1 ? "1c" : "1b"));
    },
    fromKey: (key: Key) => {
      return new Signature(
        key.slice(0, 32),
        key.slice(32, 64),
        toHex(key.value.slice(64)) === "1c" ? 1 : void 0
      );
    },
  },
};
