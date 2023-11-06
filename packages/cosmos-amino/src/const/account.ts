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
import { AccountParser } from "../parsers/account";
import { BaseParser } from "../parsers/base";

// account
export const BaseAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(BaseAccount)
);
export const ModuleAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(ModuleAccount)
);
export const BaseVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(BaseVestingAccount)
);
export const ContinuousVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(ContinuousVestingAccount)
);
export const DelayedVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(DelayedVestingAccount)
);
export const PeriodicVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(PeriodicVestingAccount)
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
