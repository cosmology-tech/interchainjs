import { Auth } from "./types";

export abstract class BaseSigner<T> {
  private _Query?: { new (endpoint: string): T };

  protected _query?: T;
  protected _auth?: Auth;

  constructor(Query: { new (endpoint: string): T }) {
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

  on(endpoint: string) {
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
}
