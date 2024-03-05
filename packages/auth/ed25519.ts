import { Key } from "@cosmonauts/utils";
import { Auth, Bech32Address } from "@cosmonauts/types";

export class Ed25519Auth implements Auth {
  constructor() {}

  getPublicKey(isCompressed?: boolean): Key {
    throw new Error("Not implemented yet");
  }

  sign(data: Uint8Array): Uint8Array {
    throw new Error("Not implemented yet");
  }
  verify(data: Uint8Array, signature: Uint8Array): boolean {
    throw new Error("Not implemented yet");
  }

  get address(): Key {
    throw new Error("Not implemented yet");
  }

  get bech32Address(): Bech32Address {
    throw new Error("Not implemented yet");
  }
}
