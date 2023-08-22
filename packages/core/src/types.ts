export interface Key {
  pubkey: Uint8Array;
  address: Uint8Array;
}

export interface SigObj {
  r: Uint8Array;
  s: Uint8Array;
  recoveryId: number;
}

export interface Auth {
  readonly key: Key;
  sign: (message: Uint8Array) => Uint8Array;
}
