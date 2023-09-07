/* eslint-disable @typescript-eslint/ban-types */
export interface Key {
  pubkey: Uint8Array;
  address: Uint8Array;
}

export interface SigObj {
  r: Uint8Array;
  s: Uint8Array;
  recoveryId: bigint | null;
}

export interface Auth {
  readonly key: Key;
  sign: (hash: Uint8Array) => SigObj;
  verify: (hash: Uint8Array, sigObj: SigObj) => boolean;
}

export interface GeneralSigned<T> {
  signed: T;
  broadcast: Function;
}
