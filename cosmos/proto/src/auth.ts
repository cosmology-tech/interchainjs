import {
  Auth,
  getSeedFromMnemonic,
  Key,
  Secp256k1AuthBase,
} from "@cosmonauts/core";
import { sha256 } from "@noble/hashes/sha256";

import prefixJson from "./config/prefix.json";
import { CosmosAuthOptions } from "./types";
import { toBech32 } from "./utils/account";

export const defaultHdPath = "m/44'/118'/0'/0/0";
export const defaultHash = (data: Uint8Array) => sha256(data);
export const defaultGetPrefix = (chainId: string): string => {
  const prefix = (prefixJson as any)[chainId];
  if (!prefix) {
    throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
  }
  return prefix;
};

export class Secp256k1Auth extends Secp256k1AuthBase implements Auth {
  readonly getPrefix = defaultGetPrefix;

  constructor(
    seed: Uint8Array,
    options?: Omit<CosmosAuthOptions, "bip39Password">
  ) {
    super(seed, options?.hdPath ?? "m/44'/118'/0'/0/0");
    if (options?.getPrefix) {
      this.getPrefix = options?.getPrefix;
    }
  }

  static fromMnemonic(mnemonic: string, options?: CosmosAuthOptions) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1Auth(seed, options);
  }

  get key(): Key {
    return {
      pubkey: this.pubkey,
    };
  }

  sign = (data: Uint8Array): Uint8Array => {
    return this.signHash(defaultHash(data)).toCompactRawBytes();
  };

  verify = (data: Uint8Array, signature: Uint8Array): boolean => {
    return this.verifyHash(defaultHash(data), signature);
  };

  getAddress = (chainId: string): string => {
    if (!this.pubkey) {
      throw new Error("pubkey cannot be empty.");
    }
    return toBech32(this.getPrefix(chainId), this.pubKeyHash);
  };
}
