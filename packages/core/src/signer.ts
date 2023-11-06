import { Auth, HttpEndpoint, SignatureConverter } from "./types";

export abstract class BaseSigner<T> {
  private _Query?: { new (endpoint: string | HttpEndpoint): T };

  protected _query?: T;
  protected _auth?: Auth;

  protected abstract hash: (data: Uint8Array) => Uint8Array;
  protected abstract signatureConverter: SignatureConverter;

  constructor(Query: { new (endpoint: string | HttpEndpoint): T }) {
    this._Query = Query;
  }

  get query() {
    this._assertQuery();
    return this._query!;
  }

  get auth() {
    this._assertAuth();
    return this._auth!;
  }

  on(endpoint: string | HttpEndpoint) {
    this._query = new this._Query(endpoint);
    return this;
  }

  by(auth: Auth) {
    this._auth = auth;
    return this;
  }

  protected _assertQuery() {
    if (!this._query) {
      throw new Error(
        "Please provide rpc endpoint before signing (using `on` method)."
      );
    }
  }

  protected _assertAuth() {
    if (!this._auth) {
      throw new Error(
        "Please provide auth info before signing (using `by` method)."
      );
    }
  }

  signBytes(bytes: Uint8Array, isHashed = false): Uint8Array {
    let data: Uint8Array;
    if (!isHashed) {
      data = this.hash(bytes);
    } else {
      data = bytes;
    }
    const sigObj = this.auth.sign(data);
    const signature = this.signatureConverter.toSignature(sigObj);
    return signature;
  }

  verifyBytes(
    bytes: Uint8Array,
    signature: Uint8Array,
    isHashed = false
  ): boolean {
    let data: Uint8Array;
    if (!isHashed) {
      data = this.hash(bytes);
    } else {
      data = bytes;
    }
    const sigObj = this.signatureConverter.fromSignature(signature);
    return this.auth.verify(data, sigObj);
  }
}
