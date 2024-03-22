import { StdSignDoc } from "./signer";
import { SignDoc } from "../codegen/cosmos/tx/v1beta1/tx";
import { BaseWalletAccount, Wallet } from "@uni-sign/types";
import { Key } from "@uni-sign/utils";

export interface CosmosAccount extends BaseWalletAccount {
  getAddress(chainId?: string): Key | string;
}

export type DirectWallet = Wallet<CosmosAccount, SignDoc>;
export type AminoWallet = Wallet<CosmosAccount, StdSignDoc>;
