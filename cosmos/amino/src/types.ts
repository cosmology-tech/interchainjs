import { Coin } from "@cosmonauts/cosmos-rpc";

export interface AminoConverter {
  aminoType: string;
  toAmino: (value: any) => any;
  fromAmino: (value: any) => any;
}

export type TypeUrl = string;
export type AminoConverters = Record<TypeUrl, AminoConverter>;

export interface AminoMsg {
  type: string;
  value: any;
}

export interface StdFee {
  amount: Coin[];
  gas: string;
  /** The granter address that is used for paying with feegrants */
  granter?: string;
  /** The fee payer address. The payer must have signed the transaction. */
  payer?: string;
}

export interface StdSignDoc {
  chain_id: string;
  account_number: string;
  sequence: string;
  fee: StdFee;
  msgs: AminoMsg[];
  memo: string;
}
