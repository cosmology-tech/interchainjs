import { secp256k1 } from "@noble/curves/secp256k1";
import { HDKey } from "@scure/bip32";

import { AuthConfig, AuthOptions, Auth } from "@cosmonauts/types";
import { getSeedFromMnemonic } from "./utils";
import { Key } from "@cosmonauts/utils";

const defaultAuthConfig: AuthConfig = {
  hdPath: "",
  computeAddress: (publicKeyType) => publicKeyType.toPublicKey(true),
  computeSignature: (signatureType) => signatureType.toCompact(),
};

export class Secp256k1Auth implements Auth {
  protected seed: HDKey;
  protected hdkey: HDKey;
  protected config: AuthConfig;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, config: AuthConfig) {
    this.config = config;
    this.seed = HDKey.fromMasterSeed(seed);
    this.updateHdPath(this.config.hdPath);
  }

  static fromMnemonic(mnemonic: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    const config: AuthConfig = {
      hdPath: options?.hdPath || defaultAuthConfig.hdPath,
      computeAddress:
        options?.computeAddress || defaultAuthConfig.computeAddress,
      computeSignature:
        options?.computeSignature || defaultAuthConfig.computeSignature,
    };
    return new Secp256k1Auth(seed, config);
  }

  static fromSeed(seed: Key, options?: AuthConfig) {
    const config: AuthConfig = {
      hdPath: options?.hdPath || defaultAuthConfig.hdPath,
      computeAddress:
        options?.computeAddress || defaultAuthConfig.computeAddress,
      computeSignature:
        options?.computeSignature || defaultAuthConfig.computeSignature,
    };
    return new Secp256k1Auth(seed.value, config);
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

  get address(): Key {
    return this.config.computeAddress({ toPublicKey: this.getPublicKey });
  }

  sign(data: Uint8Array): Key {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    const sig = secp256k1.sign(data, this.privateKey!.toBigInt());
    return this.config.computeSignature({
      ...sig,
      toCompact: () => Key.from(sig.toCompactRawBytes()),
      toDER: (isCompressed?: boolean) =>
        Key.from(sig.toDERRawBytes(isCompressed)),
    });
  }

  verify(data: Uint8Array, signature: Key) {
    return this.hdkey.verify(data, signature.value);
  }
}
