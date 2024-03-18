import { SignDoc, StdSignDoc } from "@cosmonauts/cosmos/types";
import { EthTypedData as GeneralEthTypedData } from "@cosmonauts/ethereum/types";
import { BaseWalletAccount, Wallet } from "@cosmonauts/types";

export interface InjectiveAccount extends BaseWalletAccount {
  cosmosAddress: string;
  ethereumAddress: string;
}

export type EthTypedData = GeneralEthTypedData<StdSignDoc>;

export type DirectWallet = Wallet<InjectiveAccount, SignDoc>;
export type AminoWallet = Wallet<InjectiveAccount, StdSignDoc>;
export type EthTypedDataWallet = Wallet<InjectiveAccount, EthTypedData>;
