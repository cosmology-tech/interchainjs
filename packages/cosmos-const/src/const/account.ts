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
export const BaseAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(BaseAccount)
);
export const ModuleAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(ModuleAccount)
);
export const BaseVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(BaseVestingAccount)
);
export const ContinuousVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(ContinuousVestingAccount)
);
export const DelayedVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(DelayedVestingAccount)
);
export const PeriodicVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescope(PeriodicVestingAccount)
);

// *************************** COLLECTIONS ***************************

export const AccountParserMap = {
  BaseAccount: BaseAccountParser,
  ModuleAccount: ModuleAccountParser,
  BaseVestingAccount: BaseVestingAccountParser,
  ContinuousVestingAccount: ContinuousVestingAccountParser,
  DelayedVestingAccount: DelayedVestingAccountParser,
  PeriodicVestingAccount: PeriodicVestingAccountParser,
};
