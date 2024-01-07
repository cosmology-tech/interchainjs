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
import {
  EventAttributeAmino,
  ResponseDeliverTxAmino,
} from "../codegen/tendermint/abci/types";
import { BlockAmino } from "../codegen/tendermint/types/block";

export type AccountResponse =
  | BaseAccount
  | ModuleAccount
  | BaseVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount;

export interface BlockResponse {
  block_id: {
    hash: string;
    parts: {
      total: number;
      hash: string;
    };
  };
  block: BlockAmino;
}

export interface TxResponse {
  hash: string;
  height: number;
  index: number;
  tx: string; // base64 encoded
  tx_result: ResponseDeliverTxAmino;
}

export interface SearchTxResponse {
  txs: {
    hash?: string;
    height?: string;
    index?: number;
    tx_result?: {
      log: string;
      gas_wanted: string;
      gas_used: string;
      tags: EventAttributeAmino[];
    };
    tx?: string;
    proof?: {
      RootHash: string;
      Data: string;
      Proof: {
        total: string;
        index: string;
        leaf_hash: string;
        aunts: string[];
      };
    };
  }[];
  total_count: string;
}
