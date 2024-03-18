import { type Key } from "@cosmonauts/utils";

export interface Auth {
  algo: string;
  getPublicKey: (isCompressed?: boolean) => Key;
  sign: (data: Uint8Array) => Signature;
  verify?: (data: Uint8Array, signature: Signature) => boolean;
}

export interface AuthOptions {
  bip39Password?: string;
}

export interface Signature {
   readonly r: Key;
   readonly s: Key;
   readonly recovery?: number;
}

export type Network = "cosmos" | "injective" | "ethereum"

export interface HdPathType {
  network: Network;
  algo: string;
  path: string;
}
