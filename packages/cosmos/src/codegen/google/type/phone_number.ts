import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * An object representing a phone number, suitable as an API wire format.
 * 
 * This representation:
 * 
 *  - should not be used for locale-specific formatting of a phone number, such
 *    as "+1 (650) 253-0000 ext. 123"
 * 
 *  - is not designed for efficient storage
 *  - may not be suitable for dialing - specialized libraries (see references)
 *    should be used to parse the number for that purpose
 * 
 * To do something meaningful with this number, such as format it for various
 * use-cases, convert it to an `i18n.phonenumbers.PhoneNumber` object first.
 * 
 * For instance, in Java this would be:
 * 
 *    com.google.type.PhoneNumber wireProto =
 *        com.google.type.PhoneNumber.newBuilder().build();
 *    com.google.i18n.phonenumbers.Phonenumber.PhoneNumber phoneNumber =
 *        PhoneNumberUtil.getInstance().parse(wireProto.getE164Number(), "ZZ");
 *    if (!wireProto.getExtension().isEmpty()) {
 *      phoneNumber.setExtension(wireProto.getExtension());
 *    }
 * 
 *  Reference(s):
 *   - https://github.com/google/libphonenumber
 */
export interface PhoneNumber {
  /**
   * The phone number, represented as a leading plus sign ('+'), followed by a
   * phone number that uses a relaxed ITU E.164 format consisting of the
   * country calling code (1 to 3 digits) and the subscriber number, with no
   * additional spaces or formatting, e.g.:
   *  - correct: "+15552220123"
   *  - incorrect: "+1 (555) 222-01234 x123".
   * 
   * The ITU E.164 format limits the latter to 12 digits, but in practice not
   * all countries respect that, so we relax that restriction here.
   * National-only numbers are not allowed.
   * 
   * References:
   *  - https://www.itu.int/rec/T-REC-E.164-201011-I
   *  - https://en.wikipedia.org/wiki/E.164.
   *  - https://en.wikipedia.org/wiki/List_of_country_calling_codes
   */
  e164Number?: string;
  /**
   * A short code.
   * 
   * Reference(s):
   *  - https://en.wikipedia.org/wiki/Short_code
   */
  shortCode?: PhoneNumber_ShortCode;
  /**
   * The phone number's extension. The extension is not standardized in ITU
   * recommendations, except for being defined as a series of numbers with a
   * maximum length of 40 digits. Other than digits, some other dialing
   * characters such as ',' (indicating a wait) or '#' may be stored here.
   * 
   * Note that no regions currently use extensions with short codes, so this
   * field is normally only set in conjunction with an E.164 number. It is held
   * separately from the E.164 number to allow for short code extensions in the
   * future.
   */
  extension: string;
}
export interface PhoneNumberProtoMsg {
  typeUrl: "/google.type.PhoneNumber";
  value: Uint8Array;
}
/**
 * An object representing a phone number, suitable as an API wire format.
 * 
 * This representation:
 * 
 *  - should not be used for locale-specific formatting of a phone number, such
 *    as "+1 (650) 253-0000 ext. 123"
 * 
 *  - is not designed for efficient storage
 *  - may not be suitable for dialing - specialized libraries (see references)
 *    should be used to parse the number for that purpose
 * 
 * To do something meaningful with this number, such as format it for various
 * use-cases, convert it to an `i18n.phonenumbers.PhoneNumber` object first.
 * 
 * For instance, in Java this would be:
 * 
 *    com.google.type.PhoneNumber wireProto =
 *        com.google.type.PhoneNumber.newBuilder().build();
 *    com.google.i18n.phonenumbers.Phonenumber.PhoneNumber phoneNumber =
 *        PhoneNumberUtil.getInstance().parse(wireProto.getE164Number(), "ZZ");
 *    if (!wireProto.getExtension().isEmpty()) {
 *      phoneNumber.setExtension(wireProto.getExtension());
 *    }
 * 
 *  Reference(s):
 *   - https://github.com/google/libphonenumber
 */
export interface PhoneNumberAmino {
  /**
   * The phone number, represented as a leading plus sign ('+'), followed by a
   * phone number that uses a relaxed ITU E.164 format consisting of the
   * country calling code (1 to 3 digits) and the subscriber number, with no
   * additional spaces or formatting, e.g.:
   *  - correct: "+15552220123"
   *  - incorrect: "+1 (555) 222-01234 x123".
   * 
   * The ITU E.164 format limits the latter to 12 digits, but in practice not
   * all countries respect that, so we relax that restriction here.
   * National-only numbers are not allowed.
   * 
   * References:
   *  - https://www.itu.int/rec/T-REC-E.164-201011-I
   *  - https://en.wikipedia.org/wiki/E.164.
   *  - https://en.wikipedia.org/wiki/List_of_country_calling_codes
   */
  e164_number?: string;
  /**
   * A short code.
   * 
   * Reference(s):
   *  - https://en.wikipedia.org/wiki/Short_code
   */
  short_code?: PhoneNumber_ShortCodeAmino;
  /**
   * The phone number's extension. The extension is not standardized in ITU
   * recommendations, except for being defined as a series of numbers with a
   * maximum length of 40 digits. Other than digits, some other dialing
   * characters such as ',' (indicating a wait) or '#' may be stored here.
   * 
   * Note that no regions currently use extensions with short codes, so this
   * field is normally only set in conjunction with an E.164 number. It is held
   * separately from the E.164 number to allow for short code extensions in the
   * future.
   */
  extension: string;
}
export interface PhoneNumberAminoMsg {
  type: "/google.type.PhoneNumber";
  value: PhoneNumberAmino;
}
/**
 * An object representing a short code, which is a phone number that is
 * typically much shorter than regular phone numbers and can be used to
 * address messages in MMS and SMS systems, as well as for abbreviated dialing
 * (e.g. "Text 611 to see how many minutes you have remaining on your plan.").
 * 
 * Short codes are restricted to a region and are not internationally
 * dialable, which means the same short code can exist in different regions,
 * with different usage and pricing, even if those regions share the same
 * country calling code (e.g. US and CA).
 */
export interface PhoneNumber_ShortCode {
  /**
   * Required. The BCP-47 region code of the location where calls to this
   * short code can be made, such as "US" and "BB".
   * 
   * Reference(s):
   *  - http://www.unicode.org/reports/tr35/#unicode_region_subtag
   */
  regionCode: string;
  /**
   * Required. The short code digits, without a leading plus ('+') or country
   * calling code, e.g. "611".
   */
  number: string;
}
export interface PhoneNumber_ShortCodeProtoMsg {
  typeUrl: "/google.type.ShortCode";
  value: Uint8Array;
}
/**
 * An object representing a short code, which is a phone number that is
 * typically much shorter than regular phone numbers and can be used to
 * address messages in MMS and SMS systems, as well as for abbreviated dialing
 * (e.g. "Text 611 to see how many minutes you have remaining on your plan.").
 * 
 * Short codes are restricted to a region and are not internationally
 * dialable, which means the same short code can exist in different regions,
 * with different usage and pricing, even if those regions share the same
 * country calling code (e.g. US and CA).
 */
export interface PhoneNumber_ShortCodeAmino {
  /**
   * Required. The BCP-47 region code of the location where calls to this
   * short code can be made, such as "US" and "BB".
   * 
   * Reference(s):
   *  - http://www.unicode.org/reports/tr35/#unicode_region_subtag
   */
  region_code: string;
  /**
   * Required. The short code digits, without a leading plus ('+') or country
   * calling code, e.g. "611".
   */
  number: string;
}
export interface PhoneNumber_ShortCodeAminoMsg {
  type: "/google.type.ShortCode";
  value: PhoneNumber_ShortCodeAmino;
}
function createBasePhoneNumber(): PhoneNumber {
  return {
    e164Number: undefined,
    shortCode: undefined,
    extension: ""
  };
}
export const PhoneNumber = {
  encode(message: PhoneNumber, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.e164Number !== undefined) {
      writer.uint32(10).string(message.e164Number);
    }
    if (message.shortCode !== undefined) {
      PhoneNumber_ShortCode.encode(message.shortCode, writer.uint32(18).fork()).ldelim();
    }
    if (message.extension !== "") {
      writer.uint32(26).string(message.extension);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PhoneNumber {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhoneNumber();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.e164Number = reader.string();
          break;
        case 2:
          message.shortCode = PhoneNumber_ShortCode.decode(reader, reader.uint32());
          break;
        case 3:
          message.extension = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PhoneNumber {
    return {
      e164Number: isSet(object.e164Number) ? String(object.e164Number) : undefined,
      shortCode: isSet(object.shortCode) ? PhoneNumber_ShortCode.fromJSON(object.shortCode) : undefined,
      extension: isSet(object.extension) ? String(object.extension) : ""
    };
  },
  toJSON(message: PhoneNumber): unknown {
    const obj: any = {};
    message.e164Number !== undefined && (obj.e164Number = message.e164Number);
    message.shortCode !== undefined && (obj.shortCode = message.shortCode ? PhoneNumber_ShortCode.toJSON(message.shortCode) : undefined);
    message.extension !== undefined && (obj.extension = message.extension);
    return obj;
  },
  fromPartial(object: DeepPartial<PhoneNumber>): PhoneNumber {
    const message = createBasePhoneNumber();
    message.e164Number = object.e164Number ?? undefined;
    message.shortCode = object.shortCode !== undefined && object.shortCode !== null ? PhoneNumber_ShortCode.fromPartial(object.shortCode) : undefined;
    message.extension = object.extension ?? "";
    return message;
  },
  fromAmino(object: PhoneNumberAmino): PhoneNumber {
    return {
      e164Number: object?.e164_number,
      shortCode: object?.short_code ? PhoneNumber_ShortCode.fromAmino(object.short_code) : undefined,
      extension: object.extension
    };
  },
  toAmino(message: PhoneNumber): PhoneNumberAmino {
    const obj: any = {};
    obj.e164_number = message.e164Number;
    obj.short_code = message.shortCode ? PhoneNumber_ShortCode.toAmino(message.shortCode) : undefined;
    obj.extension = message.extension;
    return obj;
  },
  fromAminoMsg(object: PhoneNumberAminoMsg): PhoneNumber {
    return PhoneNumber.fromAmino(object.value);
  },
  fromProtoMsg(message: PhoneNumberProtoMsg): PhoneNumber {
    return PhoneNumber.decode(message.value);
  },
  toProto(message: PhoneNumber): Uint8Array {
    return PhoneNumber.encode(message).finish();
  },
  toProtoMsg(message: PhoneNumber): PhoneNumberProtoMsg {
    return {
      typeUrl: "/google.type.PhoneNumber",
      value: PhoneNumber.encode(message).finish()
    };
  }
};
function createBasePhoneNumber_ShortCode(): PhoneNumber_ShortCode {
  return {
    regionCode: "",
    number: ""
  };
}
export const PhoneNumber_ShortCode = {
  encode(message: PhoneNumber_ShortCode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.regionCode !== "") {
      writer.uint32(10).string(message.regionCode);
    }
    if (message.number !== "") {
      writer.uint32(18).string(message.number);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PhoneNumber_ShortCode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhoneNumber_ShortCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.regionCode = reader.string();
          break;
        case 2:
          message.number = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PhoneNumber_ShortCode {
    return {
      regionCode: isSet(object.regionCode) ? String(object.regionCode) : "",
      number: isSet(object.number) ? String(object.number) : ""
    };
  },
  toJSON(message: PhoneNumber_ShortCode): unknown {
    const obj: any = {};
    message.regionCode !== undefined && (obj.regionCode = message.regionCode);
    message.number !== undefined && (obj.number = message.number);
    return obj;
  },
  fromPartial(object: DeepPartial<PhoneNumber_ShortCode>): PhoneNumber_ShortCode {
    const message = createBasePhoneNumber_ShortCode();
    message.regionCode = object.regionCode ?? "";
    message.number = object.number ?? "";
    return message;
  },
  fromAmino(object: PhoneNumber_ShortCodeAmino): PhoneNumber_ShortCode {
    return {
      regionCode: object.region_code,
      number: object.number
    };
  },
  toAmino(message: PhoneNumber_ShortCode): PhoneNumber_ShortCodeAmino {
    const obj: any = {};
    obj.region_code = message.regionCode;
    obj.number = message.number;
    return obj;
  },
  fromAminoMsg(object: PhoneNumber_ShortCodeAminoMsg): PhoneNumber_ShortCode {
    return PhoneNumber_ShortCode.fromAmino(object.value);
  },
  fromProtoMsg(message: PhoneNumber_ShortCodeProtoMsg): PhoneNumber_ShortCode {
    return PhoneNumber_ShortCode.decode(message.value);
  },
  toProto(message: PhoneNumber_ShortCode): Uint8Array {
    return PhoneNumber_ShortCode.encode(message).finish();
  },
  toProtoMsg(message: PhoneNumber_ShortCode): PhoneNumber_ShortCodeProtoMsg {
    return {
      typeUrl: "/google.type.ShortCode",
      value: PhoneNumber_ShortCode.encode(message).finish()
    };
  }
};