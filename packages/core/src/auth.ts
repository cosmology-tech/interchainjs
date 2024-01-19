/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecoveredSignatureType } from "@noble/curves/abstract/weierstrass";
import { secp256k1 } from "@noble/curves/secp256k1";
import { bytes as assertBytes } from "@noble/hashes/_assert";
import { HDKey } from "@scure/bip32";

import { AuthOptions } from "./types";
import { toBigInt } from "./utils/encoding";
import { getSeedFromMnemonic } from "./utils/mnemonic";

const derTagInteger = 0x02;

export class Secp256k1AuthBase {
  protected root: HDKey;
  protected hdkey: HDKey;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, hdPath?: string) {
    this.root = HDKey.fromMasterSeed(seed);
    this.updateHdPath(hdPath);
  }

  static fromMnemonic(mnemonic: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1AuthBase(seed, options?.hdPath);
  }

  updateHdPath(hdPath?: string) {
    this.hdkey = hdPath ? this.root.derive(hdPath) : this.root;
  }

  get privkey() {
    return this.hdkey?.privateKey;
  }

  get pubkey() {
    return this.hdkey?.publicKey;
  }

  get pubKeyHash() {
    return this.hdkey?.pubKeyHash;
  }

  signHash(hash: Uint8Array): RecoveredSignatureType {
    if (!this.privkey) {
      throw new Error("No privateKey set!");
    }
    assertBytes(hash, 32);
    const sig: RecoveredSignatureType = secp256k1.sign(
      hash,
      toBigInt(this.privkey!)
    );
    return sig;
  }

  verifyHash(hash: Uint8Array, signature: Uint8Array) {
    return this.hdkey.verify(hash, signature);
  }
}
