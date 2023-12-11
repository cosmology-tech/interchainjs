/* eslint-disable @typescript-eslint/no-unused-vars */

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
