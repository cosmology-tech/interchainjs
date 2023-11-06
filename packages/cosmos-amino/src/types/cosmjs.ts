import { SignDoc } from "../codegen/cosmos/tx/v1beta1/tx";
import { StdSignDoc } from "./amino";
import { AminoConverters, Registry } from "./types";

export interface EncodeObject {
  typeUrl: string;
  value: any;
}

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  address: string; // bech32 address
  algo: Algo;
  pubkey: Uint8Array;
}

export interface Pubkey {
  type: string;
  value: any;
}

export interface StdSignature {
  pub_key: Pubkey;
  signature: string;
}

export interface AminoSignResponse {
  signed: StdSignDoc;
  signature: StdSignature;
}

export interface OfflineAminoSigner {
  getAccounts: () => Promise<AccountData[]>;
  signAmino: (
    signerAddress: string,
    signDoc: StdSignDoc
  ) => Promise<AminoSignResponse>;
}

export interface DirectSignResponse {
  signed: SignDoc;
  signature: StdSignature;
}

export interface OfflineDirectSigner {
  getAccounts: () => Promise<AccountData[]>;
  signDirect: (
    signerAddress: string,
    signDoc: SignDoc
  ) => Promise<DirectSignResponse>;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;

export interface SignerOptions {
  readonly registry?: Registry;
  readonly aminoConverters?: AminoConverters;
  // readonly broadcastTimeoutMs?: number;
  // readonly broadcastPollIntervalMs?: number;
  // readonly gasPrice?: GasPrice;
}
