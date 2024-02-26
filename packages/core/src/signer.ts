import { Auth, HttpEndpoint } from "./types";

export abstract class BaseSigner<RequestClient> {
  protected _RequestClient?: {
    new (endpoint: string | HttpEndpoint): RequestClient;
  };

  protected _request?: RequestClient;
  protected _auth?: Auth;

  constructor(RequestClient: {
    new (endpoint: string | HttpEndpoint): RequestClient;
  }) {
    this._RequestClient = RequestClient;
  }

  get request() {
    this._assertRequest();
    return this._request!;
  }

  get auth() {
    this._assertAuth();
    return this._auth!;
  }

  on(endpoint: string | HttpEndpoint) {
    this._request = new this._RequestClient(endpoint);
    return this;
  }

  by(auth: Auth) {
    this._auth = auth;
    return this;
  }

  protected _assertRequest() {
    if (!this._request) {
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

  signRawBytes(raw: Uint8Array): Uint8Array {
    return this.auth.signMessage(raw);
  }

  verifyRawBytes(raw: Uint8Array, signature: Uint8Array): boolean {
    return this.auth.verifyMessage(raw, signature);
  }
}
