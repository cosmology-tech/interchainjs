/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fee, FeeAmino } from "interchain-query/cosmos/tx/v1beta1/tx";
import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "interchain-query/cosmos/vesting/v1beta1/vesting";
import { DeepPartial } from "interchain-query/helpers";

import { BinaryReader, BinaryWriter } from "./interchain/binary";
import { BaseAccount, ModuleAccount } from "./interchain/proto/auth";
import { Coin } from "./interchain/proto/base";

export interface Rpc {
  endpoint: string;
  request: (
    service: string,
    method: string,
    data: Uint8Array
  ) => Promise<Uint8Array>;
}

export interface WrapTypeUrl<T> {
  typeUrl: string;
  value: T;
}

export interface WrapType<T> {
  type: string;
  value: T;
}

export type Account =
  | BaseAccount
  | ModuleAccount
  | BaseVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount;

export interface SignerData {
  accountNumber: bigint;
  sequence: bigint;
  chainId: string;
}

export interface PartialProtoDoc<T> extends Partial<SignerData> {
  msgs: T[];
  fee?: Fee;
  memo?: string;
}

export interface ProtoDoc<T> extends SignerData {
  msgs: T[];
  fee: Fee;
  memo: string;
}

export interface StdFee {
  amount: readonly Coin[];
  gas: string;
  granter?: string;
  payer?: string;
}

export interface StdSignDoc<T> {
  msgs: WrapType<T>[];
  fee: StdFee;
  memo: string;
  account_number: string;
  sequence: string;
  chain_id: string;
}

export interface AminoDoc<T> {
  msgs: T[];
  fee: FeeAmino;
  memo: string;
  account_number: string;
  sequence: string;
  chain_id: string;
}

export interface Converter<ProtoT, AminoT> {
  toAmino: (msg: ProtoT) => AminoT;
  toProto: (msg: AminoT) => ProtoT;
}

export interface Proto<T> {
  encode: (msg: T, writer?: BinaryWriter) => BinaryWriter;
  decode: (input: Uint8Array | BinaryReader, length?: number) => T;
  fromPartial: (msg: DeepPartial<T>) => T;
}

export interface ParserData<ProtoT, AminoT> {
  protoType: string; // equivalent to typeUrl
  proto: Proto<ProtoT>;
  aminoType?: string; // equivalent to aminoType
  converter?: Converter<ProtoT, AminoT>;
}

export interface TelescopeData<ProtoT, AminoT> {
  typeUrl: string;
  aminoType: string;
  encode(message: ProtoT, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): ProtoT;
  fromPartial(object: DeepPartial<ProtoT>): ProtoT;
  fromAmino(object: AminoT): ProtoT;
  toAmino(message: ProtoT): AminoT;
}
