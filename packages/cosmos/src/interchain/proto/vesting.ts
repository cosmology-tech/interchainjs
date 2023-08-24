import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial } from "../helpers";
import { BaseAccount, BaseAccountAmino } from "./auth";
import { Coin, CoinAmino } from "./base";
/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccount {
  baseAccount: BaseAccount | undefined;
  originalVesting: Coin[];
  delegatedFree: Coin[];
  delegatedVesting: Coin[];
  endTime: bigint;
}
/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccountAmino {
  base_account?: BaseAccountAmino | undefined;
  original_vesting: CoinAmino[];
  delegated_free: CoinAmino[];
  delegated_vesting: CoinAmino[];
  end_time: string;
}
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccount {
  baseVestingAccount: BaseVestingAccount | undefined;
  startTime: bigint;
}
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccountAmino {
  base_vesting_account?: BaseVestingAccountAmino | undefined;
  start_time: string;
}
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccount {
  baseVestingAccount: BaseVestingAccount | undefined;
}
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccountAmino {
  base_vesting_account?: BaseVestingAccountAmino | undefined;
}
/** Period defines a length of time and amount of coins that will vest. */
export interface Period {
  length: bigint;
  amount: Coin[];
}
/** Period defines a length of time and amount of coins that will vest. */
export interface PeriodAmino {
  length: string;
  amount: CoinAmino[];
}
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccount {
  baseVestingAccount: BaseVestingAccount | undefined;
  startTime: bigint;
  vestingPeriods: Period[];
}
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccountAmino {
  base_vesting_account?: BaseVestingAccountAmino | undefined;
  start_time: string;
  vesting_periods: PeriodAmino[];
}
/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 *
 * Since: cosmos-sdk 0.43
 */
export interface PermanentLockedAccount {
  baseVestingAccount: BaseVestingAccount | undefined;
}
/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 *
 * Since: cosmos-sdk 0.43
 */
export interface PermanentLockedAccountAmino {
  base_vesting_account?: BaseVestingAccountAmino | undefined;
}
/**
 * ClawbackVestingAccount implements the VestingAccount interface. It provides
 * an account that can hold contributions subject to "lockup" (like a
 * PeriodicVestingAccount), or vesting which is subject to clawback
 * of unvested tokens, or a combination (tokens vest, but are still locked).
 */
export interface ClawbackVestingAccount {
  baseVestingAccount: BaseVestingAccount | undefined;
  /** funder_address specifies the account which can perform clawback. */
  funderAddress: string;
  startTime: bigint;
  /** unlocking schedule relative to the BaseVestingAccount start_time. */
  lockupPeriods: Period[];
  /** vesting (i.e. immunity from clawback) schedule relative to the BaseVestingAccount start_time. */
  vestingPeriods: Period[];
}
/**
 * ClawbackVestingAccount implements the VestingAccount interface. It provides
 * an account that can hold contributions subject to "lockup" (like a
 * PeriodicVestingAccount), or vesting which is subject to clawback
 * of unvested tokens, or a combination (tokens vest, but are still locked).
 */
export interface ClawbackVestingAccountAmino {
  base_vesting_account?: BaseVestingAccountAmino | undefined;
  /** funder_address specifies the account which can perform clawback. */
  funder_address: string;
  start_time: string;
  /** unlocking schedule relative to the BaseVestingAccount start_time. */
  lockup_periods: PeriodAmino[];
  /** vesting (i.e. immunity from clawback) schedule relative to the BaseVestingAccount start_time. */
  vesting_periods: PeriodAmino[];
}
function createBaseBaseVestingAccount(): BaseVestingAccount {
  return {
    baseAccount: BaseAccount.fromPartial({}),
    originalVesting: [],
    delegatedFree: [],
    delegatedVesting: [],
    endTime: BigInt(0),
  };
}
export const BaseVestingAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.BaseVestingAccount",
  aminoType: "cosmos-sdk/BaseVestingAccount",
  encode(
    message: BaseVestingAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(
        message.baseAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.originalVesting) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.delegatedFree) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegatedVesting) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.endTime !== BigInt(0)) {
      writer.uint32(40).int64(message.endTime);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): BaseVestingAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.originalVesting.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.delegatedFree.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.delegatedVesting.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.endTime = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BaseVestingAccount>): BaseVestingAccount {
    const message = createBaseBaseVestingAccount();
    message.baseAccount =
      object.baseAccount !== undefined && object.baseAccount !== null
        ? BaseAccount.fromPartial(object.baseAccount)
        : undefined;
    message.originalVesting =
      object.originalVesting?.map((e) => Coin.fromPartial(e)) || [];
    message.delegatedFree =
      object.delegatedFree?.map((e) => Coin.fromPartial(e)) || [];
    message.delegatedVesting =
      object.delegatedVesting?.map((e) => Coin.fromPartial(e)) || [];
    message.endTime =
      object.endTime !== undefined && object.endTime !== null
        ? BigInt(object.endTime.toString())
        : BigInt(0);
    return message;
  },
  fromAmino(object: BaseVestingAccountAmino): BaseVestingAccount {
    return {
      baseAccount: object?.base_account
        ? BaseAccount.fromAmino(object.base_account)
        : undefined,
      originalVesting: Array.isArray(object?.original_vesting)
        ? object.original_vesting.map((e: any) => Coin.fromAmino(e))
        : [],
      delegatedFree: Array.isArray(object?.delegated_free)
        ? object.delegated_free.map((e: any) => Coin.fromAmino(e))
        : [],
      delegatedVesting: Array.isArray(object?.delegated_vesting)
        ? object.delegated_vesting.map((e: any) => Coin.fromAmino(e))
        : [],
      endTime: BigInt(object.end_time),
    };
  },
  toAmino(message: BaseVestingAccount): BaseVestingAccountAmino {
    const obj: any = {};
    obj.base_account = message.baseAccount
      ? BaseAccount.toAmino(message.baseAccount)
      : undefined;
    if (message.originalVesting) {
      obj.original_vesting = message.originalVesting.map((e) =>
        e ? Coin.toAmino(e) : undefined
      );
    } else {
      obj.original_vesting = [];
    }
    if (message.delegatedFree) {
      obj.delegated_free = message.delegatedFree.map((e) =>
        e ? Coin.toAmino(e) : undefined
      );
    } else {
      obj.delegated_free = [];
    }
    if (message.delegatedVesting) {
      obj.delegated_vesting = message.delegatedVesting.map((e) =>
        e ? Coin.toAmino(e) : undefined
      );
    } else {
      obj.delegated_vesting = [];
    }
    obj.end_time = message.endTime ? message.endTime.toString() : undefined;
    return obj;
  },
};
function createBaseContinuousVestingAccount(): ContinuousVestingAccount {
  return {
    baseVestingAccount: BaseVestingAccount.fromPartial({}),
    startTime: BigInt(0),
  };
}
export const ContinuousVestingAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.ContinuousVestingAccount",
  aminoType: "cosmos-sdk/ContinuousVestingAccount",
  encode(
    message: ContinuousVestingAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.startTime !== BigInt(0)) {
      writer.uint32(16).int64(message.startTime);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): ContinuousVestingAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContinuousVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.startTime = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(
    object: DeepPartial<ContinuousVestingAccount>
  ): ContinuousVestingAccount {
    const message = createBaseContinuousVestingAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? BigInt(object.startTime.toString())
        : BigInt(0);
    return message;
  },
  fromAmino(object: ContinuousVestingAccountAmino): ContinuousVestingAccount {
    return {
      baseVestingAccount: object?.base_vesting_account
        ? BaseVestingAccount.fromAmino(object.base_vesting_account)
        : undefined,
      startTime: BigInt(object.start_time),
    };
  },
  toAmino(message: ContinuousVestingAccount): ContinuousVestingAccountAmino {
    const obj: any = {};
    obj.base_vesting_account = message.baseVestingAccount
      ? BaseVestingAccount.toAmino(message.baseVestingAccount)
      : undefined;
    obj.start_time = message.startTime
      ? message.startTime.toString()
      : undefined;
    return obj;
  },
};
function createBaseDelayedVestingAccount(): DelayedVestingAccount {
  return {
    baseVestingAccount: BaseVestingAccount.fromPartial({}),
  };
}
export const DelayedVestingAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.DelayedVestingAccount",
  aminoType: "cosmos-sdk/DelayedVestingAccount",
  encode(
    message: DelayedVestingAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): DelayedVestingAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelayedVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(
    object: DeepPartial<DelayedVestingAccount>
  ): DelayedVestingAccount {
    const message = createBaseDelayedVestingAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    return message;
  },
  fromAmino(object: DelayedVestingAccountAmino): DelayedVestingAccount {
    return {
      baseVestingAccount: object?.base_vesting_account
        ? BaseVestingAccount.fromAmino(object.base_vesting_account)
        : undefined,
    };
  },
  toAmino(message: DelayedVestingAccount): DelayedVestingAccountAmino {
    const obj: any = {};
    obj.base_vesting_account = message.baseVestingAccount
      ? BaseVestingAccount.toAmino(message.baseVestingAccount)
      : undefined;
    return obj;
  },
};
function createBasePeriod(): Period {
  return {
    length: BigInt(0),
    amount: [],
  };
}
export const Period = {
  typeUrl: "/cosmos.vesting.v1beta1.Period",
  aminoType: "cosmos-sdk/Period",
  encode(
    message: Period,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.length !== BigInt(0)) {
      writer.uint32(8).int64(message.length);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Period {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.length = reader.int64();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Period>): Period {
    const message = createBasePeriod();
    message.length =
      object.length !== undefined && object.length !== null
        ? BigInt(object.length.toString())
        : BigInt(0);
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PeriodAmino): Period {
    return {
      length: BigInt(object.length),
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromAmino(e))
        : [],
    };
  },
  toAmino(message: Period): PeriodAmino {
    const obj: any = {};
    obj.length = message.length ? message.length.toString() : undefined;
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toAmino(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },
};
function createBasePeriodicVestingAccount(): PeriodicVestingAccount {
  return {
    baseVestingAccount: BaseVestingAccount.fromPartial({}),
    startTime: BigInt(0),
    vestingPeriods: [],
  };
}
export const PeriodicVestingAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.PeriodicVestingAccount",
  aminoType: "cosmos-sdk/PeriodicVestingAccount",
  encode(
    message: PeriodicVestingAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.startTime !== BigInt(0)) {
      writer.uint32(16).int64(message.startTime);
    }
    for (const v of message.vestingPeriods) {
      Period.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): PeriodicVestingAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodicVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.startTime = reader.int64();
          break;
        case 3:
          message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(
    object: DeepPartial<PeriodicVestingAccount>
  ): PeriodicVestingAccount {
    const message = createBasePeriodicVestingAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? BigInt(object.startTime.toString())
        : BigInt(0);
    message.vestingPeriods =
      object.vestingPeriods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PeriodicVestingAccountAmino): PeriodicVestingAccount {
    return {
      baseVestingAccount: object?.base_vesting_account
        ? BaseVestingAccount.fromAmino(object.base_vesting_account)
        : undefined,
      startTime: BigInt(object.start_time),
      vestingPeriods: Array.isArray(object?.vesting_periods)
        ? object.vesting_periods.map((e: any) => Period.fromAmino(e))
        : [],
    };
  },
  toAmino(message: PeriodicVestingAccount): PeriodicVestingAccountAmino {
    const obj: any = {};
    obj.base_vesting_account = message.baseVestingAccount
      ? BaseVestingAccount.toAmino(message.baseVestingAccount)
      : undefined;
    obj.start_time = message.startTime
      ? message.startTime.toString()
      : undefined;
    if (message.vestingPeriods) {
      obj.vesting_periods = message.vestingPeriods.map((e) =>
        e ? Period.toAmino(e) : undefined
      );
    } else {
      obj.vesting_periods = [];
    }
    return obj;
  },
};
function createBasePermanentLockedAccount(): PermanentLockedAccount {
  return {
    baseVestingAccount: BaseVestingAccount.fromPartial({}),
  };
}
export const PermanentLockedAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.PermanentLockedAccount",
  aminoType: "cosmos-sdk/PermanentLockedAccount",
  encode(
    message: PermanentLockedAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): PermanentLockedAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermanentLockedAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(
    object: DeepPartial<PermanentLockedAccount>
  ): PermanentLockedAccount {
    const message = createBasePermanentLockedAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    return message;
  },
  fromAmino(object: PermanentLockedAccountAmino): PermanentLockedAccount {
    return {
      baseVestingAccount: object?.base_vesting_account
        ? BaseVestingAccount.fromAmino(object.base_vesting_account)
        : undefined,
    };
  },
  toAmino(message: PermanentLockedAccount): PermanentLockedAccountAmino {
    const obj: any = {};
    obj.base_vesting_account = message.baseVestingAccount
      ? BaseVestingAccount.toAmino(message.baseVestingAccount)
      : undefined;
    return obj;
  },
};
function createBaseClawbackVestingAccount(): ClawbackVestingAccount {
  return {
    baseVestingAccount: BaseVestingAccount.fromPartial({}),
    funderAddress: "",
    startTime: BigInt(0),
    lockupPeriods: [],
    vestingPeriods: [],
  };
}
export const ClawbackVestingAccount = {
  typeUrl: "/cosmos.vesting.v1beta1.ClawbackVestingAccount",
  aminoType: "cosmos-sdk/ClawbackVestingAccount",
  encode(
    message: ClawbackVestingAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(
        message.baseVestingAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.funderAddress !== "") {
      writer.uint32(18).string(message.funderAddress);
    }
    if (message.startTime !== BigInt(0)) {
      writer.uint32(24).int64(message.startTime);
    }
    for (const v of message.lockupPeriods) {
      Period.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.vestingPeriods) {
      Period.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): ClawbackVestingAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawbackVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.funderAddress = reader.string();
          break;
        case 3:
          message.startTime = reader.int64();
          break;
        case 4:
          message.lockupPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        case 5:
          message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(
    object: DeepPartial<ClawbackVestingAccount>
  ): ClawbackVestingAccount {
    const message = createBaseClawbackVestingAccount();
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined &&
      object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.funderAddress = object.funderAddress ?? "";
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? BigInt(object.startTime.toString())
        : BigInt(0);
    message.lockupPeriods =
      object.lockupPeriods?.map((e) => Period.fromPartial(e)) || [];
    message.vestingPeriods =
      object.vestingPeriods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ClawbackVestingAccountAmino): ClawbackVestingAccount {
    return {
      baseVestingAccount: object?.base_vesting_account
        ? BaseVestingAccount.fromAmino(object.base_vesting_account)
        : undefined,
      funderAddress: object.funder_address,
      startTime: BigInt(object.start_time),
      lockupPeriods: Array.isArray(object?.lockup_periods)
        ? object.lockup_periods.map((e: any) => Period.fromAmino(e))
        : [],
      vestingPeriods: Array.isArray(object?.vesting_periods)
        ? object.vesting_periods.map((e: any) => Period.fromAmino(e))
        : [],
    };
  },
  toAmino(message: ClawbackVestingAccount): ClawbackVestingAccountAmino {
    const obj: any = {};
    obj.base_vesting_account = message.baseVestingAccount
      ? BaseVestingAccount.toAmino(message.baseVestingAccount)
      : undefined;
    obj.funder_address = message.funderAddress;
    obj.start_time = message.startTime
      ? message.startTime.toString()
      : undefined;
    if (message.lockupPeriods) {
      obj.lockup_periods = message.lockupPeriods.map((e) =>
        e ? Period.toAmino(e) : undefined
      );
    } else {
      obj.lockup_periods = [];
    }
    if (message.vestingPeriods) {
      obj.vesting_periods = message.vestingPeriods.map((e) =>
        e ? Period.toAmino(e) : undefined
      );
    } else {
      obj.vesting_periods = [];
    }
    return obj;
  },
};
