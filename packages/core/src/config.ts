import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { computeAddress } from "@ethersproject/transactions";
import { Key } from "./key";
import { AuthConfig } from "./types";

export const authConfig: Record<string, AuthConfig> = {
  cosmos: {
    hdPath: "m/44'/118'/0'/0/0",
    computeAddress: (getPublicKey: (isCompressed?: boolean) => Key) =>
      Key.from(ripemd160(sha256(getPublicKey(false).value))),
    hashMessage: (message: Uint8Array) => sha256(message),
  },
  injective: {
    hdPath: "m/44'/60'/0'/0/0",
    computeAddress: (getPublicKey: (isCompressed?: boolean) => Key) =>
      Key.fromHex(computeAddress(getPublicKey(true).value)),
    hashMessage: (message: Uint8Array) => sha256(message),
  },
};
