/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseAccount,
  ModuleAccount,
} from "interchain-query/cosmos/auth/v1beta1/auth";
import {
  BaseVestingAccount,
  ContinuousVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
} from "interchain-query/cosmos/vesting/v1beta1/vesting";

import { AccountParser } from "../core/parsers/account";
import { BaseParser } from "../core/parsers/base";

// account
export const baseAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(BaseAccount)
);
export const moduleAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(ModuleAccount)
);
export const baseVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(BaseVestingAccount)
);
export const continuousVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(ContinuousVestingAccount)
);
export const delayedVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(DelayedVestingAccount)
);
export const periodicVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(PeriodicVestingAccount)
);

// -------------------- COLLECTIONS -----------------------

export const accountParsers = {
  BaseAccount: baseAccountParser,
  ModuleAccount: moduleAccountParser,
  BaseVestingAccount: baseVestingAccountParser,
  ContinuousVestingAccount: continuousVestingAccountParser,
  DelayedVestingAccount: delayedVestingAccountParser,
  PeriodicVestingAccount: periodicVestingAccountParser,
};
