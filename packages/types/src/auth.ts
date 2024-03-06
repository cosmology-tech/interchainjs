import { type Key, type Signature } from "@cosmonauts/utils";

export type Bech32Address = string;

export interface Auth {
  getPublicKey: (isCompressed?: boolean) => Key;
  sign: (data: Uint8Array) => Signature;
  verify: (data: Uint8Array, signature: Signature) => boolean;
}

export interface AuthOptions {
  bip39Password?: string;
  hdPath?: string;
}
