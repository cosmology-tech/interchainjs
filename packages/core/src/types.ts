import Decimal from "decimal.js";
import { Key } from "./key";

/* eslint-disable @typescript-eslint/ban-types */
export type Bech32Address = string;

export interface Keys {
  pubkey: Key;
}

export interface Auth {
  keys: Keys;
  signMessage: (data: Uint8Array) => Uint8Array;
  verifyMessage: (data: Uint8Array, signature: Uint8Array) => boolean;
  getBech32Address: (chainId: string) => string;
}

export interface AuthOptions extends Partial<AuthConfig> {
  bip39Password?: string;
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

export interface AuthConfig {
  hdPath: string;
  computeAddress: (pubkey: Key) => Key; // `pubkey` is uncompressed
  hashMessage: (message: Uint8Array) => Uint8Array;
}
