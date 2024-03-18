import { BaseWalletAccount, Wallet } from "@cosmonauts/types";
import { BigNumberish } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";

export type TypeName = string;

export interface Property {
  name: string;
  type: string;
}

export interface Domain {
  name: string;
  version: string;
  chainId: BigNumberish;
  verifyingContract: string;
  salt: BytesLike;
}

export interface EthTypedData<T = any> {
  types: Record<TypeName, Property[]>;
  primaryType: TypeName;
  domain: Domain;
  message: T;
}

export interface EthereumAccount extends BaseWalletAccount {
  address: string;
}

export type EthTypedDataWallet = Wallet<EthereumAccount, EthTypedData>;
