import { Timestamp } from "../protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp, isSet, fromJsonTimestamp, DeepPartial } from "../../helpers";
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 */
export interface Interval {
  /**
   * Optional. Inclusive start of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be the same
   * or after the start.
   */
  startTime: Date;
  /**
   * Optional. Exclusive end of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be before the
   * end.
   */
  endTime: Date;
}
export interface IntervalProtoMsg {
  typeUrl: "/google.type.Interval";
  value: Uint8Array;
}
/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).
 * 
 * The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time).
 * When both start and end are unspecified, the interval matches any time.
 */
export interface IntervalAmino {
  /**
   * Optional. Inclusive start of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be the same
   * or after the start.
   */
  start_time?: Date;
  /**
   * Optional. Exclusive end of the interval.
   * 
   * If specified, a Timestamp matching this interval will have to be before the
   * end.
   */
  end_time?: Date;
}
export interface IntervalAminoMsg {
  type: "/google.type.Interval";
  value: IntervalAmino;
}
function createBaseInterval(): Interval {
  return {
    startTime: new Date(),
    endTime: new Date()
  };
}
export const Interval = {
  encode(message: Interval, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Interval {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Interval {
    return {
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined
    };
  },
  toJSON(message: Interval): unknown {
    const obj: any = {};
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    return obj;
  },
  fromPartial(object: DeepPartial<Interval>): Interval {
    const message = createBaseInterval();
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
  fromAmino(object: IntervalAmino): Interval {
    return {
      startTime: object.start_time,
      endTime: object.end_time
    };
  },
  toAmino(message: Interval): IntervalAmino {
    const obj: any = {};
    obj.start_time = message.startTime;
    obj.end_time = message.endTime;
    return obj;
  },
  fromAminoMsg(object: IntervalAminoMsg): Interval {
    return Interval.fromAmino(object.value);
  },
  fromProtoMsg(message: IntervalProtoMsg): Interval {
    return Interval.decode(message.value);
  },
  toProto(message: Interval): Uint8Array {
    return Interval.encode(message).finish();
  },
  toProtoMsg(message: Interval): IntervalProtoMsg {
    return {
      typeUrl: "/google.type.Interval",
      value: Interval.encode(message).finish()
    };
  }
};