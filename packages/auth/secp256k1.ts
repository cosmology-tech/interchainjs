import { secp256k1 } from "@noble/curves/secp256k1";
import { HDKey } from "@scure/bip32";

import { AuthOptions, Auth, Signature } from "@cosmonauts/types";
import { getSeedFromMnemonic } from "./utils";
import { Key, isEmpty } from "@cosmonauts/utils";

export class Secp256k1Auth implements Auth {
  protected seed: HDKey;
  protected hdkey: HDKey;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, hdPath: string) {
    if (isEmpty(hdPath)) {
      throw new Error("HD (Hierarchical Deterministic) Path not provided");
    }
    this.seed = HDKey.fromMasterSeed(seed);
    this.updateHdPath(hdPath);
  }

  static fromMnemonic(mnemonic: string, hdPath: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1Auth(seed, hdPath);
  }

  static fromSeed(seed: Key, hdPath: string) {
    return new Secp256k1Auth(seed.value, hdPath);
  }

  updateHdPath(hdPath?: string) {
    this.hdkey = hdPath ? this.seed.derive(hdPath) : this.seed;
  }

  get privateKey() {
    if (!this.hdkey || !this.hdkey.privateKey) {
      throw new Error("privateKey is undefined");
    }
    return Key.from(this.hdkey.privateKey);
  }

  getPublicKey(isCompressed?: boolean) {
    return Key.from(
      secp256k1.getPublicKey(this.privateKey!.value, isCompressed)
    );
  }

  sign(data: Uint8Array): Signature {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    const signature = secp256k1.sign(data, this.privateKey!.toBigInt());
    return {
      r: Key.fromBigInt(signature.r),
      s: Key.fromBigInt(signature.s),
      recovery: signature.recovery,
    };
  }

  verify(data: Uint8Array, signature: Signature) {
    return secp256k1.verify(
      { r: signature.r.toBigInt(), s: signature.s.toBigInt() },
      data,
      this.getPublicKey(true).toHex()
    );
  }
}
