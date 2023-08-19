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

import { Account, ParserData, TelescopeData } from "../../types";
import { toParserArgs } from "../utils/parser";
import { BaseParser } from "./base";

export class AccountParser<ProtoT, AminoT> extends BaseParser<ProtoT, AminoT> {
  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new AccountParser(parser.args);
  }

  static fromTelescope<ProtoT, AminoT>(data: TelescopeData<ProtoT, AminoT>) {
    return new AccountParser(toParserArgs(data));
  }

  getBaseAccount(account: Account) {
    switch (this.protoType) {
      case "/cosmos.auth.v1beta1.BaseAccount":
        return account as BaseAccount;
      case "/cosmos.auth.v1beta1.ModuleAccount":
      case "/cosmos.vesting.v1beta1.BaseVestingAccount":
        return (account as ModuleAccount | BaseVestingAccount).baseAccount;
      case "/cosmos.vesting.v1beta1.ContinuousVestingAccount":
      case "/cosmos.vesting.v1beta1.DelayedVestingAccount":
      case "/cosmos.vesting.v1beta1.PeriodicVestingAccount":
        return (
          account as
            | ContinuousVestingAccount
            | DelayedVestingAccount
            | PeriodicVestingAccount
        ).baseVestingAccount?.baseAccount;
      default:
        throw new Error(`Unsupported type: '${this.protoType}'`);
    }
  }
}
