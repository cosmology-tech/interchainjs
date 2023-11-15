import { Slip10RawIndex } from "./utils/slip10";

export type Bech32Address = string;

/* eslint-disable @typescript-eslint/ban-types */
export interface Key {
  pubkey: Uint8Array;
  address?: Uint8Array;
  bech32address?: Bech32Address;
}

export interface SigObj {
  r: Uint8Array;
  s: Uint8Array;
  recoveryId?: bigint;
}

export interface Auth {
  key: Key;
  sign: (data: Uint8Array) => SigObj;
  verify: (data: Uint8Array, sigObj: SigObj) => boolean;
}

/**
 * An array of raw SLIP10 indices.
 *
 * This can be constructed via string parsing:
 *
 * ```ts
 *
 * const path = stringToPath("m/0'/1/2'/2/1000000000");
 * ```
 *
 * or manually:
 *
 * ```ts
 *
 * // m/0'/1/2'/2/1000000000
 * const path: HdPath = [
 *   Slip10RawIndex.hardened(0),
 *   Slip10RawIndex.normal(1),
 *   Slip10RawIndex.hardened(2),
 *   Slip10RawIndex.normal(2),
 *   Slip10RawIndex.normal(1000000000),
 * ];
 * ```
 */
export type HdPath = Slip10RawIndex[];

export interface AuthOptions {
  bip39Password?: string;
  hdPath?: HdPath;
}

export interface GeneralSigned<T> {
  signed: T;
  broadcast: Function;
}

export interface SignatureConverter {
  toSignature: (sigObj: SigObj) => Uint8Array;
  fromSignature: (signature: Uint8Array) => SigObj;
}

export interface HttpEndpoint {
  url: string;
  headers: Record<string, string>;
}
