import { type Key, type Signature } from "@cosmonauts/utils";
import Decimal from "decimal.js";

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
    fromKey(key: Key): Signature;
    toKey(signature: Signature): Key;
  };
}
