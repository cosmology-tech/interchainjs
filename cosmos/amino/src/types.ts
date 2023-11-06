import { Coin } from "@sign/cosmos-proto";

export interface AminoConverter {
  readonly aminoType: string;
  readonly toAmino: (value: any) => any;
  readonly fromAmino: (value: any) => any;
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
