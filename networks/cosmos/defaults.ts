import { bytes as assertBytes } from "@noble/hashes/_assert";
import { sha256 } from "@noble/hashes/sha256";
import { BroadcastOptions, FeeOptions } from "./types/direct";
import { AuthConfig, PublicKeyType, SignatureType } from "@cosmonauts/types";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { Key } from "@cosmonauts/utils";

export const defaultMessageHash = (data: Uint8Array) => {
  const hashed = sha256(data);
  assertBytes(hashed);
  return hashed;
};

export const defaultBroadcastOptions: BroadcastOptions = {
  checkTx: true,
  deliverTx: false,
};

export const defaultFeeOptions: FeeOptions = {
  multiplier: 1.6,
  gasPrice: "average",
};

export const defaultAuthConfig: AuthConfig = {
  hdPath: "m/44'/118'/0'/0/0",
  computeAddress: (args: PublicKeyType) =>
    Key.from(ripemd160(sha256(args.toPublicKey(false).value))),
  computeSignature: (args: SignatureType) => args.toCompact(),
};
