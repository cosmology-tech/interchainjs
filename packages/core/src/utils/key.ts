import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import elliptic from "elliptic";

export function getCompressedPubkey(
  ec: elliptic.ec,
  keypair: elliptic.ec.KeyPair
): Uint8Array {
  const pubkey = Uint8Array.from(keypair.getPublic("array"));
  switch (pubkey.length) {
    case 33:
      return pubkey;
    case 65:
      return Uint8Array.from(ec.keyFromPublic(pubkey).getPublic(true, "array"));
    default:
      throw new Error("Invalid pubkey length");
  }
}

export function toAddress(pubKey: Uint8Array) {
  if (pubKey.length !== 33) {
    throw new Error(
      `Invalid Secp256k1 pubkey length (compressed): ${pubKey.length}`
    );
  }
  return ripemd160(sha256(pubKey));
}
