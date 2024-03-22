import { SignDoc, StdSignDoc } from "@uni-sign/cosmos/types";
import { EthTypedData as GeneralEthTypedData } from "@uni-sign/ethereum/types";
import { BaseWalletAccount, Wallet } from "@uni-sign/types";

export interface InjectiveAccount extends BaseWalletAccount {
  cosmosAddress: string;
  ethereumAddress: string;
}

export type EthTypedData = GeneralEthTypedData<StdSignDoc>;

export type DirectWallet = Wallet<InjectiveAccount, SignDoc>;
export type AminoWallet = Wallet<InjectiveAccount, StdSignDoc>;
export type EthTypedDataWallet = Wallet<InjectiveAccount, EthTypedData>;
