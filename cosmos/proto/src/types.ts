/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bech32Address, GeneralSigned, SigObj } from "@cosmonauts/core";
import {
  Any,
  BroadcastResponse,
  TelescopeGeneratedType,
} from "@cosmonauts/cosmos-rpc";

import { AuthInfo, TxBody, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";

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

export interface Signed<SignDoc, VisualDoc>
  extends GeneralSigned<SignDoc, TxRaw, VisualDoc> {
  broadcast: (
    checkTx?: boolean,
    deliverTx?: boolean
  ) => Promise<BroadcastResponse | undefined>;
}

export interface AminoConverter {
  aminoType: string;
  toAmino: (value: any) => any;
  fromAmino: (value: any) => any;
}

export type TypeUrl = string;
export type Registry = Array<[TypeUrl, TelescopeGeneratedType<any, any, any>]>;

export interface Generated extends TelescopeGeneratedType {
  amino?: AminoConverter;
}

export type EncodeObject = Message<any>;

export interface Message<T> {
  typeUrl: string;
  value: T;
}

export interface SignerOptions {
  hash?: (msg: Uint8Array) => Uint8Array;
  signatureConverter?: {
    toSignature: (sigObj: SigObj) => Uint8Array;
    fromSignature: (signature: Uint8Array) => SigObj;
  };
  encodePubKey?: (pubkey: Uint8Array) => Any;
}

export interface VisualSignDoc {
  txBody: TxBody;
  authInfo: AuthInfo;
  chainId: string;
  accountNumber: bigint;
}
