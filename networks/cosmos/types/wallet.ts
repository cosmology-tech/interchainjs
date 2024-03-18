import { Key } from "@cosmonauts/utils";
import { StdSignDoc } from "./signer";
import { SignDoc } from "../codegen/cosmos/tx/v1beta1/tx";

export interface Wallet<Doc> {
  getAccount: () => Promise<{ algo: string; publicKey: Key }>;
  sign: (doc: Doc) => Promise<{ signature: Key; signed: Doc }>;
}

export type DirectWallet = Wallet<SignDoc>;
export type AminoWallet = Wallet<StdSignDoc>;
