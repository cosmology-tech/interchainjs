import { Key } from "@cosmonauts/utils";
import { Auth, Bech32Address, Signature } from "@cosmonauts/types";

export class Ed25519Auth implements Auth {
  readonly algo = "ed25519";

  constructor() {}

  getPublicKey(isCompressed?: boolean): Key {
    throw new Error("Not implemented yet");
  }

  sign(message: Uint8Array): Signature {
    throw new Error("Not implemented yet");
  }
  verify(message: Uint8Array, signature: Signature): boolean {
    throw new Error("Not implemented yet");
  }

  get address(): Key {
    throw new Error("Not implemented yet");
  }

  get bech32Address(): Bech32Address {
    throw new Error("Not implemented yet");
  }
}
