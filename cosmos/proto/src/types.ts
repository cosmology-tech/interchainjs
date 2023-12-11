/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bech32Address, GeneralSigned, SigObj } from "@cosmonauts/core";
import {
  Any,
  TelescopeGeneratedType,
  TxResponse,
} from "@cosmonauts/cosmos-rpc";

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
