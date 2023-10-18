import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/** Represents an amount of money with its currency type. */
export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode: string;
  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   */
  units: bigint;
  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   */
  nanos: number;
}
export interface MoneyProtoMsg {
  typeUrl: "/google.type.Money";
  value: Uint8Array;
}
/** Represents an amount of money with its currency type. */
export interface MoneyAmino {
  /** The three-letter currency code defined in ISO 4217. */
  currency_code: string;
  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   */
  units: string;
  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   */
  nanos: number;
}
export interface MoneyAminoMsg {
  type: "/google.type.Money";
  value: MoneyAmino;
}
function createBaseMoney(): Money {
  return {
    currencyCode: "",
    units: BigInt(0),
    nanos: 0
  };
}
export const Money = {
  encode(message: Money, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currencyCode !== "") {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.units !== BigInt(0)) {
      writer.uint32(16).int64(message.units);
    }
    if (message.nanos !== 0) {
      writer.uint32(24).int32(message.nanos);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Money {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyCode = reader.string();
          break;
        case 2:
          message.units = reader.int64();
          break;
        case 3:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Money {
    return {
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : "",
      units: isSet(object.units) ? BigInt(object.units.toString()) : BigInt(0),
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0
    };
  },
  toJSON(message: Money): unknown {
    const obj: any = {};
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    message.units !== undefined && (obj.units = (message.units || BigInt(0)).toString());
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },
  fromPartial(object: DeepPartial<Money>): Money {
    const message = createBaseMoney();
    message.currencyCode = object.currencyCode ?? "";
    message.units = object.units !== undefined && object.units !== null ? BigInt(object.units.toString()) : BigInt(0);
    message.nanos = object.nanos ?? 0;
    return message;
  },
  fromAmino(object: MoneyAmino): Money {
    return {
      currencyCode: object.currency_code,
      units: BigInt(object.units),
      nanos: object.nanos
    };
  },
  toAmino(message: Money): MoneyAmino {
    const obj: any = {};
    obj.currency_code = message.currencyCode;
    obj.units = message.units ? message.units.toString() : undefined;
    obj.nanos = message.nanos;
    return obj;
  },
  fromAminoMsg(object: MoneyAminoMsg): Money {
    return Money.fromAmino(object.value);
  },
  fromProtoMsg(message: MoneyProtoMsg): Money {
    return Money.decode(message.value);
  },
  toProto(message: Money): Uint8Array {
    return Money.encode(message).finish();
  },
  toProtoMsg(message: Money): MoneyProtoMsg {
    return {
      typeUrl: "/google.type.Money",
      value: Money.encode(message).finish()
    };
  }
};