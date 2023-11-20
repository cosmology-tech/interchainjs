/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bech32Address, GeneralSigned } from "@sign/core";

import {
  BaseAccount,
  ModuleAccount,
} from "../codegen/cosmos/auth/v1beta1/auth";
import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "../codegen/cosmos/vesting/v1beta1/vesting";
import { TelescopeGeneratedType } from "../codegen/types";
import { TxResponse } from "./tendermint";

export interface AbciQueryRpc {
  request: (
    service: string,
    method: string,
    data: Uint8Array
  ) => Promise<Uint8Array>;
}

export interface BroadcastRpc {
  request: (method: string, data: Uint8Array) => Promise<unknown>;
}

export type AccountType =
  | BaseAccount
  | ModuleAccount
  | BaseVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount;

export interface AccountData {
  accountNumber: bigint;
  sequence: bigint;
  chainId: string;
  address: Bech32Address;
}

export interface SignerData {
  accountNumber: bigint;
  sequence: bigint;
  chainId: string;
}

export interface Signed<T> extends GeneralSigned<T> {
  broadcast: (
    checkTx?: boolean,
    deliverTx?: boolean
  ) => Promise<TxResponse | undefined>;
}

export interface AminoConverter {
  aminoType: string;
  toAmino: (value: any) => any;
  fromAmino: (value: any) => any;
}

export type TypeUrl = string;
export type Registry = Array<[TypeUrl, TelescopeGeneratedType]>;

export interface Parser extends TelescopeGeneratedType {
  amino?: AminoConverter;
}

export type EncodeObject = Message<any>;

export interface Message<T> {
  typeUrl: string;
  value: T;
}
