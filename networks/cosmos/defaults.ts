import { bytes as assertBytes } from "@noble/hashes/_assert";
import { sha256 } from "@noble/hashes/sha256";
import { BroadcastOptions, FeeOptions } from "./types/direct";
import { SignerConfig } from "@cosmonauts/types";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { Key, Signature } from "@cosmonauts/utils";

export const defaultBroadcastOptions: BroadcastOptions = {
  checkTx: true,
  deliverTx: false,
};

export const defaultFeeOptions: FeeOptions = {
  multiplier: 1.6,
  gasPrice: "average",
};

export const defaultHdPath = "m/44'/118'/0'/0/0";

export const defaultSignerConfig: SignerConfig = {
  publicKey: {
    isCompressed: true,
    toAddress: (publicKey: Key) => Key.from(ripemd160(sha256(publicKey.value))),
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
      return new Signature(key.slice(0, 32), key.slice(32, 64));
    },
  },
};
