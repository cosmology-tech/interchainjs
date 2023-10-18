import { Duration, DurationAmino } from "../protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * Represents civil time (or occasionally physical time).
 * 
 * This type can represent a civil time in one of a few possible ways:
 * 
 *  * When utc_offset is set and time_zone is unset: a civil time on a calendar
 *    day with a particular offset from UTC.
 *  * When time_zone is set and utc_offset is unset: a civil time on a calendar
 *    day in a particular time zone.
 *  * When neither time_zone nor utc_offset is set: a civil time on a calendar
 *    day in local time.
 * 
 * The date is relative to the Proleptic Gregorian Calendar.
 * 
 * If year is 0, the DateTime is considered not to have a specific year. month
 * and day must have valid, non-zero values.
 * 
 * This type may also be used to represent a physical time if all the date and
 * time fields are set and either case of the `time_offset` oneof is set.
 * Consider using `Timestamp` message for physical time instead. If your use
 * case also would like to store the user's timezone, that can be done in
 * another field.
 * 
 * This type is more flexible than some applications may want. Make sure to
 * document and validate your application's limitations.
 */
export interface DateTime {
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year: number;
  /** Required. Month of year. Must be from 1 to 12. */
  month: number;
  /**
   * Required. Day of month. Must be from 1 to 31 and valid for the year and
   * month.
   */
  day: number;
  /**
   * Required. Hours of day in 24 hour format. Should be from 0 to 23. An API
   * may choose to allow the value "24:00:00" for scenarios like business
   * closing time.
   */
  hours: number;
  /** Required. Minutes of hour of day. Must be from 0 to 59. */
  minutes: number;
  /**
   * Required. Seconds of minutes of the time. Must normally be from 0 to 59. An
   * API may allow the value 60 if it allows leap-seconds.
   */
  seconds: number;
  /**
   * Required. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999.
   */
  nanos: number;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours.
   * For example, a UTC offset of -4:00 would be represented as
   * { seconds: -14400 }.
   */
  utcOffset?: Duration;
  /** Time zone. */
  timeZone?: TimeZone;
}
export interface DateTimeProtoMsg {
  typeUrl: "/google.type.DateTime";
  value: Uint8Array;
}
/**
 * Represents civil time (or occasionally physical time).
 * 
 * This type can represent a civil time in one of a few possible ways:
 * 
 *  * When utc_offset is set and time_zone is unset: a civil time on a calendar
 *    day with a particular offset from UTC.
 *  * When time_zone is set and utc_offset is unset: a civil time on a calendar
 *    day in a particular time zone.
 *  * When neither time_zone nor utc_offset is set: a civil time on a calendar
 *    day in local time.
 * 
 * The date is relative to the Proleptic Gregorian Calendar.
 * 
 * If year is 0, the DateTime is considered not to have a specific year. month
 * and day must have valid, non-zero values.
 * 
 * This type may also be used to represent a physical time if all the date and
 * time fields are set and either case of the `time_offset` oneof is set.
 * Consider using `Timestamp` message for physical time instead. If your use
 * case also would like to store the user's timezone, that can be done in
 * another field.
 * 
 * This type is more flexible than some applications may want. Make sure to
 * document and validate your application's limitations.
 */
export interface DateTimeAmino {
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year: number;
  /** Required. Month of year. Must be from 1 to 12. */
  month: number;
  /**
   * Required. Day of month. Must be from 1 to 31 and valid for the year and
   * month.
   */
  day: number;
  /**
   * Required. Hours of day in 24 hour format. Should be from 0 to 23. An API
   * may choose to allow the value "24:00:00" for scenarios like business
   * closing time.
   */
  hours: number;
  /** Required. Minutes of hour of day. Must be from 0 to 59. */
  minutes: number;
  /**
   * Required. Seconds of minutes of the time. Must normally be from 0 to 59. An
   * API may allow the value 60 if it allows leap-seconds.
   */
  seconds: number;
  /**
   * Required. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999.
   */
  nanos: number;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours.
   * For example, a UTC offset of -4:00 would be represented as
   * { seconds: -14400 }.
   */
  utc_offset?: DurationAmino;
  /** Time zone. */
  time_zone?: TimeZoneAmino;
}
export interface DateTimeAminoMsg {
  type: "/google.type.DateTime";
  value: DateTimeAmino;
}
/**
 * Represents a time zone from the
 * [IANA Time Zone Database](https://www.iana.org/time-zones).
 */
export interface TimeZone {
  /** IANA Time Zone Database time zone, e.g. "America/New_York". */
  id: string;
  /** Optional. IANA Time Zone Database version number, e.g. "2019a". */
  version: string;
}
export interface TimeZoneProtoMsg {
  typeUrl: "/google.type.TimeZone";
  value: Uint8Array;
}
/**
 * Represents a time zone from the
 * [IANA Time Zone Database](https://www.iana.org/time-zones).
 */
export interface TimeZoneAmino {
  /** IANA Time Zone Database time zone, e.g. "America/New_York". */
  id: string;
  /** Optional. IANA Time Zone Database version number, e.g. "2019a". */
  version: string;
}
export interface TimeZoneAminoMsg {
  type: "/google.type.TimeZone";
  value: TimeZoneAmino;
}
function createBaseDateTime(): DateTime {
  return {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nanos: 0,
    utcOffset: undefined,
    timeZone: undefined
  };
}
export const DateTime = {
  encode(message: DateTime, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.day !== 0) {
      writer.uint32(24).int32(message.day);
    }
    if (message.hours !== 0) {
      writer.uint32(32).int32(message.hours);
    }
    if (message.minutes !== 0) {
      writer.uint32(40).int32(message.minutes);
    }
    if (message.seconds !== 0) {
      writer.uint32(48).int32(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(56).int32(message.nanos);
    }
    if (message.utcOffset !== undefined) {
      Duration.encode(message.utcOffset, writer.uint32(66).fork()).ldelim();
    }
    if (message.timeZone !== undefined) {
      TimeZone.encode(message.timeZone, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DateTime {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.year = reader.int32();
          break;
        case 2:
          message.month = reader.int32();
          break;
        case 3:
          message.day = reader.int32();
          break;
        case 4:
          message.hours = reader.int32();
          break;
        case 5:
          message.minutes = reader.int32();
          break;
        case 6:
          message.seconds = reader.int32();
          break;
        case 7:
          message.nanos = reader.int32();
          break;
        case 8:
          message.utcOffset = Duration.decode(reader, reader.uint32());
          break;
        case 9:
          message.timeZone = TimeZone.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DateTime {
    return {
      year: isSet(object.year) ? Number(object.year) : 0,
      month: isSet(object.month) ? Number(object.month) : 0,
      day: isSet(object.day) ? Number(object.day) : 0,
      hours: isSet(object.hours) ? Number(object.hours) : 0,
      minutes: isSet(object.minutes) ? Number(object.minutes) : 0,
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
      utcOffset: isSet(object.utcOffset) ? Duration.fromJSON(object.utcOffset) : undefined,
      timeZone: isSet(object.timeZone) ? TimeZone.fromJSON(object.timeZone) : undefined
    };
  },
  toJSON(message: DateTime): unknown {
    const obj: any = {};
    message.year !== undefined && (obj.year = Math.round(message.year));
    message.month !== undefined && (obj.month = Math.round(message.month));
    message.day !== undefined && (obj.day = Math.round(message.day));
    message.hours !== undefined && (obj.hours = Math.round(message.hours));
    message.minutes !== undefined && (obj.minutes = Math.round(message.minutes));
    message.seconds !== undefined && (obj.seconds = Math.round(message.seconds));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    message.utcOffset !== undefined && (obj.utcOffset = message.utcOffset ? Duration.toJSON(message.utcOffset) : undefined);
    message.timeZone !== undefined && (obj.timeZone = message.timeZone ? TimeZone.toJSON(message.timeZone) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<DateTime>): DateTime {
    const message = createBaseDateTime();
    message.year = object.year ?? 0;
    message.month = object.month ?? 0;
    message.day = object.day ?? 0;
    message.hours = object.hours ?? 0;
    message.minutes = object.minutes ?? 0;
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    message.utcOffset = object.utcOffset !== undefined && object.utcOffset !== null ? Duration.fromPartial(object.utcOffset) : undefined;
    message.timeZone = object.timeZone !== undefined && object.timeZone !== null ? TimeZone.fromPartial(object.timeZone) : undefined;
    return message;
  },
  fromAmino(object: DateTimeAmino): DateTime {
    return {
      year: object.year,
      month: object.month,
      day: object.day,
      hours: object.hours,
      minutes: object.minutes,
      seconds: object.seconds,
      nanos: object.nanos,
      utcOffset: object?.utc_offset ? Duration.fromAmino(object.utc_offset) : undefined,
      timeZone: object?.time_zone ? TimeZone.fromAmino(object.time_zone) : undefined
    };
  },
  toAmino(message: DateTime): DateTimeAmino {
    const obj: any = {};
    obj.year = message.year;
    obj.month = message.month;
    obj.day = message.day;
    obj.hours = message.hours;
    obj.minutes = message.minutes;
    obj.seconds = message.seconds;
    obj.nanos = message.nanos;
    obj.utc_offset = message.utcOffset ? Duration.toAmino(message.utcOffset) : undefined;
    obj.time_zone = message.timeZone ? TimeZone.toAmino(message.timeZone) : undefined;
    return obj;
  },
  fromAminoMsg(object: DateTimeAminoMsg): DateTime {
    return DateTime.fromAmino(object.value);
  },
  fromProtoMsg(message: DateTimeProtoMsg): DateTime {
    return DateTime.decode(message.value);
  },
  toProto(message: DateTime): Uint8Array {
    return DateTime.encode(message).finish();
  },
  toProtoMsg(message: DateTime): DateTimeProtoMsg {
    return {
      typeUrl: "/google.type.DateTime",
      value: DateTime.encode(message).finish()
    };
  }
};
function createBaseTimeZone(): TimeZone {
  return {
    id: "",
    version: ""
  };
}
export const TimeZone = {
  encode(message: TimeZone, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TimeZone {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TimeZone {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      version: isSet(object.version) ? String(object.version) : ""
    };
  },
  toJSON(message: TimeZone): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },
  fromPartial(object: DeepPartial<TimeZone>): TimeZone {
    const message = createBaseTimeZone();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    return message;
  },
  fromAmino(object: TimeZoneAmino): TimeZone {
    return {
      id: object.id,
      version: object.version
    };
  },
  toAmino(message: TimeZone): TimeZoneAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: TimeZoneAminoMsg): TimeZone {
    return TimeZone.fromAmino(object.value);
  },
  fromProtoMsg(message: TimeZoneProtoMsg): TimeZone {
    return TimeZone.decode(message.value);
  },
  toProto(message: TimeZone): Uint8Array {
    return TimeZone.encode(message).finish();
  },
  toProtoMsg(message: TimeZone): TimeZoneProtoMsg {
    return {
      typeUrl: "/google.type.TimeZone",
      value: TimeZone.encode(message).finish()
    };
  }
};