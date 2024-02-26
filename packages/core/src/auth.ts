/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecoveredSignatureType } from "@noble/curves/abstract/weierstrass";
import { secp256k1 } from "@noble/curves/secp256k1";
import { bytes as assertBytes } from "@noble/hashes/_assert";
import { HDKey } from "@scure/bip32";

import { AuthConfig, AuthOptions } from "./types";
import { getSeedFromMnemonic } from "./utils/mnemonic";
import { Key } from "./key";
import { authConfig } from "./config";

export class Secp256k1Auth {
  protected root: HDKey;
  protected hdkey: HDKey;
  protected config: AuthConfig;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, config: AuthConfig) {
    this.config = config;
    this.root = HDKey.fromMasterSeed(seed);
    this.updateHdPath(this.config.hdPath);
  }

  static fromMnemonic(mnemonic: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    const config: AuthConfig = {
      hdPath: options?.hdPath || authConfig["cosmos"].hdPath,
      computeAddress:
        options?.computeAddress || authConfig["cosmos"].computeAddress,
      hashMessage: options?.hashMessage || authConfig["cosmos"].hashMessage,
    };
    return new Secp256k1Auth(seed, config);
  }

  static fromSeed(seed: Key, options?: AuthConfig) {
    const config: AuthConfig = {
      hdPath: options?.hdPath || authConfig["cosmos"].hdPath,
      computeAddress:
        options?.computeAddress || authConfig["cosmos"].computeAddress,
      hashMessage: options?.hashMessage || authConfig["cosmos"].hashMessage,
    };
    return new Secp256k1Auth(seed.value, config);
  }

  updateHdPath(hdPath?: string) {
    this.hdkey = hdPath ? this.root.derive(hdPath) : this.root;
  }

  get privateKey() {
    if (!this.hdkey) {
      throw new Error("hdkey is undefined");
    }
    return Key.from(this.hdkey?.privateKey);
  }

  /**
   * Uncompressed public key
   */
  get publicKey() {
    return Key.from(secp256k1.getPublicKey(this.privateKey!.value, false));
  }

  get publicKeyCompressed() {
    return Key.from(secp256k1.getPublicKey(this.privateKey!.value, true));
  }

  get address(): Key {
    return this.config.computeAddress(this.publicKey);
  }

  /**
   * sign data directly
   * @param data
   * @returns RecoveredSignatureType
   */
  signArbitrary(data: Uint8Array): RecoveredSignatureType {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    assertBytes(data, 32);
    const sig: RecoveredSignatureType = secp256k1.sign(
      data,
      this.privateKey!.toBigInt()
    );
    return sig;
  }

  verifyArbitrary(data: Uint8Array, signature: Uint8Array) {
    return this.hdkey.verify(data, signature);
  }

  /**
   * sign data hash
   * @param data
   * @returns
   */
  signMessage = (data: Uint8Array): Uint8Array => {
    return this.signArbitrary(
      this.config.hashMessage(data)
    ).toCompactRawBytes();
  };

  verifyMessage = (data: Uint8Array, signature: Uint8Array): boolean => {
    return this.verifyArbitrary(this.config.hashMessage(data), signature);
  };
}
