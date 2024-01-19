import {
  Auth,
  AuthOptions,
  getSeedFromMnemonic,
  Key,
  Secp256k1AuthBase,
} from "@cosmonauts/core";
import { sha256 } from "@noble/hashes/sha256";

export const defaultHdPath = "m/44'/118'/0'/0/0";
export const defaultHash = (data: Uint8Array) => sha256(data);

export class Secp256k1Auth extends Secp256k1AuthBase implements Auth {
  constructor(seed: Uint8Array, hdPath: string = "m/44'/118'/0'/0/0") {
    super(seed, hdPath);
  }

  static fromMnemonic(mnemonic: string, options?: AuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1Auth(seed, options?.hdPath);
  }

  get key(): Key {
    return {
      pubkey: this.pubkey,
      privkey: this.privkey,
      address: this.pubKeyHash,
    };
  }

  sign(data: Uint8Array): Uint8Array {
    return this.signHash(defaultHash(data)).toCompactRawBytes();
  }

  verify(data: Uint8Array, signature: Uint8Array): boolean {
    return this.verifyHash(defaultHash(data), signature);
  }
}
