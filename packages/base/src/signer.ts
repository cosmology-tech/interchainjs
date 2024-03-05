import { Auth } from "@cosmonauts/types";
import { Key } from "@cosmonauts/utils";

const defaultHash = (data: Uint8Array) => data;

export class BaseSigner {
  protected _auth: Auth;
  protected readonly hash; // method to hash message

  constructor(auth: Auth, hash?: (data: Uint8Array) => Uint8Array) {
    this._auth = auth;
    this.hash = hash ?? defaultHash;
  }

  get auth() {
    return this._auth;
  }

  setAuth(auth: Auth) {
    this._auth = auth;
  }

  signArbitrary(data: Uint8Array): Key {
    return this.auth.sign(this.hash(data));
  }

  verifyArbitrary(data: Uint8Array, signature: Key): boolean {
    return this.auth.verify(this.hash(data), signature);
  }
}
