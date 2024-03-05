import { type Key } from "@cosmonauts/utils";

export interface PublicKeyType {
  toPublicKey(isCompressed?: boolean): Key;
}

export interface SignatureType {
  r: bigint;
  s: bigint;
  recovery: number;
  toCompact(): Key;
  toDER(isCompressed?: boolean): Key;
}

export interface AuthConfig {
  hdPath: string;
  computeAddress(args: PublicKeyType): Key;
  computeSignature(args: SignatureType): Key;
}

export type Bech32Address = string;

export interface Auth {
  getPublicKey: (isCompressed?: boolean) => Key;
  address: Key;
  sign: (data: Uint8Array) => Key;
  verify: (data: Uint8Array, signature: Key) => boolean;
  bech32Address?: Bech32Address;
}

export interface AuthOptions extends Partial<AuthConfig> {
  bip39Password?: string;
}
