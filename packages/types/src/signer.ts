import { type Key } from "@cosmonauts/utils";
import Decimal from "decimal.js";
import {  Signature } from "./auth";

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
    toAddress(publicKey: Key): Key;
  };
  message: {
    hash(message: Uint8Array): Uint8Array;
  };
  signature: {
    fromCompact(key: Key, algo: string): Signature;
    toCompact(signature: Signature, algo: string): Key;
  };
}
