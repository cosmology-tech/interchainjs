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
  BaseParser.fromMeta(BaseAccount)
);
export const ModuleAccountParser = AccountParser.fromParser(
  BaseParser.fromMeta(ModuleAccount)
);
export const BaseVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromMeta(BaseVestingAccount)
);
export const ContinuousVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromMeta(ContinuousVestingAccount)
);
export const DelayedVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromMeta(DelayedVestingAccount)
);
export const PeriodicVestingAccountParser = AccountParser.fromParser(
  BaseParser.fromMeta(PeriodicVestingAccount)
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
