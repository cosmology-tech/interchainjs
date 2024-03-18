import { Key } from "@cosmonauts/utils";

export interface BaseWalletAccount {
  algo: string;
  publicKey: Key;
}

export interface SignResponse<Doc> {
  signature: Key;
  signed: Doc;
}

export interface Wallet<Account extends BaseWalletAccount, Doc> {
  getAccount: () => Promise<Account>;
  sign: (doc: Doc) => Promise<SignResponse<Doc>>;
}

export type BaseWallet<Doc> = Wallet<BaseWalletAccount, Doc>;
