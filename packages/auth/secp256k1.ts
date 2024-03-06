import { secp256k1 } from "@noble/curves/secp256k1";
import { HDKey } from "@scure/bip32";

import { AuthOptions, Auth } from "@cosmonauts/types";
import { getSeedFromMnemonic } from "./utils";
import { Key, Signature } from "@cosmonauts/utils";

export class Secp256k1Auth implements Auth {
  protected seed: HDKey;
  protected hdkey: HDKey;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, hdPath: string = "") {
    this.seed = HDKey.fromMasterSeed(seed);
    this.updateHdPath(hdPath);
  }

  static fromMnemonic(mnemonic: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1Auth(seed, options?.hdPath);
  }

  static fromSeed(seed: Key, options?: Pick<AuthOptions, "hdPath">) {
    return new Secp256k1Auth(seed.value, options?.hdPath);
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
    return new Signature(
      Key.fromBigInt(signature.r),
      Key.fromBigInt(signature.s),
      signature.recovery
    );
  }

  verify(data: Uint8Array, signature: Signature) {
    return this.hdkey.verify(data, signature.toCompact().value);
  }
}
