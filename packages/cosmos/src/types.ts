/* eslint-disable @typescript-eslint/no-unused-vars */
import { GeneralSigned } from "@sign/core";
import { Fee } from "codegen-query/cosmos/tx/v1beta1/tx";
import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "codegen-query/cosmos/vesting/v1beta1/vesting";
import { DeepPartial } from "codegen-query/helpers";

import { IBinaryReader, IBinaryWriter } from "./codegen/binary";
import { BaseAccount, ModuleAccount } from "./codegen/proto/auth";
import { Coin } from "./codegen/proto/base";
import { TxResponse } from "./codegen/types";

export interface Rpc {
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

/**
 * is `StdFee` in "@cosmjs/amino"
 */
export interface AminoFee {
  amount: Coin[];
  gas: string;
  granter?: string;
  payer?: string;
}

export interface OfflineTxData<T> extends SignerData {
  msgs: WrapTypeUrl<T>[];
  fee: Fee;
  memo: string;
}

/**
 * is proto type of AminoTxData
 */
export interface TxData<T> extends Partial<SignerData> {
  msgs: WrapTypeUrl<T>[];
  fee?: Fee;
  memo?: string;
}

/**
 * is `StdSignDoc` in "@cosmjs/amino"
 */
export interface OfflineAminoTxData<T> {
  msgs: WrapType<T>[];
  fee: AminoFee;
  memo: string;
  account_number: string;
  sequence: string;
  chain_id: string;
}

export interface AminoTxData<T> {
  msgs: WrapType<T>[];
  fee: AminoFee;
  memo: string;
  account_number?: string;
  sequence?: string;
  chain_id?: string;
}

/**
 * is `DirectSignDoc` in "@cosmjs/proto-signing"
 */
export interface OfflineDirectTxData {
  bodyBytes: Uint8Array;
  authInfoBytes: Uint8Array;
  chainId: string;
  accountNumber: bigint;
}

export interface DirectTxData {
  bodyBytes: Uint8Array;
  authInfoBytes: Uint8Array;
  chainId?: string;
  accountNumber?: bigint;
}

export interface Converter<ProtoT, AminoT> {
  toAmino: (msg: ProtoT) => AminoT;
  toProto: (msg: AminoT) => ProtoT;
}

export interface Proto<T> {
  encode: (msg: T, writer?: IBinaryWriter) => IBinaryWriter;
  decode: (input: Uint8Array | IBinaryReader, length?: number) => T;
  fromPartial: (msg: DeepPartial<T>) => T;
}

export interface ParserData<ProtoT, AminoT> {
  protoType: string; // equivalent to typeUrl
  proto: Proto<ProtoT>;
  aminoType?: string; // equivalent to aminoType
  converter?: Converter<ProtoT, AminoT>;
}

export interface Meta<ProtoT, AminoT> {
  typeUrl: string;
  aminoType: string;
  encode(message: ProtoT, writer?: IBinaryWriter): IBinaryWriter;
  decode(input: IBinaryReader | Uint8Array, length?: number): ProtoT;
  fromPartial(object: DeepPartial<ProtoT>): ProtoT;
  fromAmino(object: AminoT): ProtoT;
  toAmino(message: ProtoT): AminoT;
}

export interface Signed<T> extends GeneralSigned<T> {
  broadcast: (
    checkTx?: boolean, // default to be true
    commitTx?: boolean // default to be false
  ) => Promise<TxResponse | undefined>;
}
