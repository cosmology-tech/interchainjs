import Decimal from "decimal.js";

/* eslint-disable @typescript-eslint/ban-types */
export type Bech32Address = string;

export interface Key {
  pubkey: Uint8Array;
  privkey?: Uint8Array;
  address?: Uint8Array;
}

export interface Auth {
  key: Key;
  sign: (data: Uint8Array) => Uint8Array;
  verify: (data: Uint8Array, signature: Uint8Array) => boolean;
}

export interface AuthOptions {
  bip39Password?: string;
  hdPath?: string;
}

export interface GeneralSigned<SignDoc, ExecDoc, VisualDoc> {
  visualDoc: VisualDoc; // doc for human readability
  signDoc: SignDoc; // doc to sign
  execDoc: ExecDoc; // doc to broadcast and rescord on chain
  broadcast: Function; // broadcast `execDoc`
}

export interface HttpEndpoint {
  url: string;
  headers: Record<string, string>;
}

export interface Price {
  amount: Decimal;
  denom: string;
}
