import { Bech32Address } from "@sign/core";
import { bech32 } from "bech32";

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

export function toBech32(
  prefix: string,
  data: Uint8Array,
  limit?: number
): Bech32Address {
  const address = bech32.encode(prefix, bech32.toWords(data), limit);
  return address;
}

export const Accounts = [
  BaseAccount,
  ModuleAccount,
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
];
