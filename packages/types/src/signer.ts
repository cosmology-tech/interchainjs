import { type Key } from "@uni-sign/utils";
import Decimal from "decimal.js";
import {  Signature } from "./auth";
import { SignResponse } from "./wallet";

export interface HttpEndpoint {
  url: string;
  headers: Record<string, string>;
}

export interface Price {
  amount: Decimal;
  denom: string;
}

export interface SignerConfig {
  publicKey: {
    isCompressed: boolean;
    hash(publicKey: Key): Key;
  };
  message: {
    hash(message: Uint8Array): Uint8Array;
  };
  signature: {
    fromCompact(key: Key, algo: string): Signature;
    toCompact(signature: Signature, algo: string): Key;
  };
}

export interface BroadcastOptions {
  checkTx?: boolean;
  deliverTx?: boolean;
}

export interface UniSigner<SignDoc> {
  publicKey: Key;
  /**
   * publicKeyHash is usually used to get address.
   * - for cosmos chains: publicKeyHash.toBech32(prefix)
   * - for ethereum chains: publicKeyHash.toPrefixedHex()
   */
  publicKeyHash: Key;
  signArbitrary(message: Uint8Array): Key;
  verifyArbitrary(message: Uint8Array, signature: Key): boolean;
  broadcastArbitrary(message: Uint8Array, options?: BroadcastOptions): Promise<unknown>;
  signDoc: (doc: SignDoc) => Promise<SignResponse<SignDoc>>;
}
