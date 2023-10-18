import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar.
 * It is not intended to model geographical locations (roads, towns,
 * mountains).
 * 
 * In typical usage an address would be created via user input or from importing
 * existing data, depending on the type of process.
 * 
 * Advice on address input / editing:
 *  - Use an i18n-ready address widget such as
 *    https://github.com/google/libaddressinput)
 * - Users should not be presented with UI elements for input or editing of
 *   fields outside countries where that field is used.
 * 
 * For more guidance on how to use this schema, please see:
 * https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which is
   * the latest revision.
   * 
   * All new revisions **must** be backward compatible with old revisions.
   */
  revision: number;
  /**
   * Required. CLDR region code of the country/region of the address. This
   * is never inferred and it is up to the user to ensure the value is
   * correct. See http://cldr.unicode.org/ and
   * http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if
   * known). This is often the UI language of the input form or is expected
   * to match one of the languages used in the address' country/region, or their
   * transliterated equivalents.
   * This can affect formatting in certain countries, but is not critical
   * to the correctness of the data and will never affect any validation or
   * other non-formatting related operations.
   * 
   * If this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default).
   * 
   * Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode: string;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used
   * in most regions. Where it is used, the value is either a string like
   * "CEDEX", optionally followed by a number (e.g. "CEDEX 7"), or just a number
   * alone, representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode: string;
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region.
   * For example, this can be a state, a province, an oblast, or a prefecture.
   * Specifically, for Spain this is the province and not the autonomous
   * community (e.g. "Barcelona" and not "Catalonia").
   * Many countries don't use an administrative area in postal addresses. E.g.
   * in Switzerland this should be left unpopulated.
   */
  administrativeArea: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town.
   * In regions of the world where localities are not well defined or do not fit
   * into this structure well, leave locality empty and use address_lines.
   */
  locality: string;
  /**
   * Optional. Sublocality of the address.
   * For example, this can be neighborhoods, boroughs, districts.
   */
  sublocality: string;
  /**
   * Unstructured address lines describing the lower levels of an address.
   * 
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g.
   * "Austin, TX"), it is important that the line order is clear. The order of
   * address lines should be "envelope order" for the country/region of the
   * address. In places where this can vary (e.g. Japan), address_language is
   * used to make it explicit (e.g. "ja" for large-to-small ordering and
   * "ja-Latn" or "en" for small-to-large). This way, the most specific line of
   * an address can be selected based on the language.
   * 
   * The minimum permitted structural representation of an address consists
   * of a region_code with all remaining information placed in the
   * address_lines. It would be possible to format such an address very
   * approximately without geocoding, but no semantic reasoning could be
   * made about any of the address components until it was at least
   * partially resolved.
   * 
   * Creating an address only containing a region_code and address_lines, and
   * then geocoding is the recommended way to handle completely unstructured
   * addresses (as opposed to guessing which parts of the address should be
   * localities or administrative areas).
   */
  addressLines: string[];
  /**
   * Optional. The recipient at the address.
   * This field may, under certain circumstances, contain multiline information.
   * For example, it might contain "care of" information.
   */
  recipients: string[];
  /** Optional. The name of the organization at the address. */
  organization: string;
}
export interface PostalAddressProtoMsg {
  typeUrl: "/google.type.PostalAddress";
  value: Uint8Array;
}
/**
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar.
 * It is not intended to model geographical locations (roads, towns,
 * mountains).
 * 
 * In typical usage an address would be created via user input or from importing
 * existing data, depending on the type of process.
 * 
 * Advice on address input / editing:
 *  - Use an i18n-ready address widget such as
 *    https://github.com/google/libaddressinput)
 * - Users should not be presented with UI elements for input or editing of
 *   fields outside countries where that field is used.
 * 
 * For more guidance on how to use this schema, please see:
 * https://support.google.com/business/answer/6397478
 */
export interface PostalAddressAmino {
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which is
   * the latest revision.
   * 
   * All new revisions **must** be backward compatible with old revisions.
   */
  revision: number;
  /**
   * Required. CLDR region code of the country/region of the address. This
   * is never inferred and it is up to the user to ensure the value is
   * correct. See http://cldr.unicode.org/ and
   * http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  region_code: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if
   * known). This is often the UI language of the input form or is expected
   * to match one of the languages used in the address' country/region, or their
   * transliterated equivalents.
   * This can affect formatting in certain countries, but is not critical
   * to the correctness of the data and will never affect any validation or
   * other non-formatting related operations.
   * 
   * If this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default).
   * 
   * Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  language_code: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postal_code: string;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used
   * in most regions. Where it is used, the value is either a string like
   * "CEDEX", optionally followed by a number (e.g. "CEDEX 7"), or just a number
   * alone, representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sorting_code: string;
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region.
   * For example, this can be a state, a province, an oblast, or a prefecture.
   * Specifically, for Spain this is the province and not the autonomous
   * community (e.g. "Barcelona" and not "Catalonia").
   * Many countries don't use an administrative area in postal addresses. E.g.
   * in Switzerland this should be left unpopulated.
   */
  administrative_area: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town.
   * In regions of the world where localities are not well defined or do not fit
   * into this structure well, leave locality empty and use address_lines.
   */
  locality: string;
  /**
   * Optional. Sublocality of the address.
   * For example, this can be neighborhoods, boroughs, districts.
   */
  sublocality: string;
  /**
   * Unstructured address lines describing the lower levels of an address.
   * 
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g.
   * "Austin, TX"), it is important that the line order is clear. The order of
   * address lines should be "envelope order" for the country/region of the
   * address. In places where this can vary (e.g. Japan), address_language is
   * used to make it explicit (e.g. "ja" for large-to-small ordering and
   * "ja-Latn" or "en" for small-to-large). This way, the most specific line of
   * an address can be selected based on the language.
   * 
   * The minimum permitted structural representation of an address consists
   * of a region_code with all remaining information placed in the
   * address_lines. It would be possible to format such an address very
   * approximately without geocoding, but no semantic reasoning could be
   * made about any of the address components until it was at least
   * partially resolved.
   * 
   * Creating an address only containing a region_code and address_lines, and
   * then geocoding is the recommended way to handle completely unstructured
   * addresses (as opposed to guessing which parts of the address should be
   * localities or administrative areas).
   */
  address_lines: string[];
  /**
   * Optional. The recipient at the address.
   * This field may, under certain circumstances, contain multiline information.
   * For example, it might contain "care of" information.
   */
  recipients: string[];
  /** Optional. The name of the organization at the address. */
  organization: string;
}
export interface PostalAddressAminoMsg {
  type: "/google.type.PostalAddress";
  value: PostalAddressAmino;
}
function createBasePostalAddress(): PostalAddress {
  return {
    revision: 0,
    regionCode: "",
    languageCode: "",
    postalCode: "",
    sortingCode: "",
    administrativeArea: "",
    locality: "",
    sublocality: "",
    addressLines: [],
    recipients: [],
    organization: ""
  };
}
export const PostalAddress = {
  encode(message: PostalAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.revision !== 0) {
      writer.uint32(8).int32(message.revision);
    }
    if (message.regionCode !== "") {
      writer.uint32(18).string(message.regionCode);
    }
    if (message.languageCode !== "") {
      writer.uint32(26).string(message.languageCode);
    }
    if (message.postalCode !== "") {
      writer.uint32(34).string(message.postalCode);
    }
    if (message.sortingCode !== "") {
      writer.uint32(42).string(message.sortingCode);
    }
    if (message.administrativeArea !== "") {
      writer.uint32(50).string(message.administrativeArea);
    }
    if (message.locality !== "") {
      writer.uint32(58).string(message.locality);
    }
    if (message.sublocality !== "") {
      writer.uint32(66).string(message.sublocality);
    }
    for (const v of message.addressLines) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.recipients) {
      writer.uint32(82).string(v!);
    }
    if (message.organization !== "") {
      writer.uint32(90).string(message.organization);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PostalAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostalAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.revision = reader.int32();
          break;
        case 2:
          message.regionCode = reader.string();
          break;
        case 3:
          message.languageCode = reader.string();
          break;
        case 4:
          message.postalCode = reader.string();
          break;
        case 5:
          message.sortingCode = reader.string();
          break;
        case 6:
          message.administrativeArea = reader.string();
          break;
        case 7:
          message.locality = reader.string();
          break;
        case 8:
          message.sublocality = reader.string();
          break;
        case 9:
          message.addressLines.push(reader.string());
          break;
        case 10:
          message.recipients.push(reader.string());
          break;
        case 11:
          message.organization = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PostalAddress {
    return {
      revision: isSet(object.revision) ? Number(object.revision) : 0,
      regionCode: isSet(object.regionCode) ? String(object.regionCode) : "",
      languageCode: isSet(object.languageCode) ? String(object.languageCode) : "",
      postalCode: isSet(object.postalCode) ? String(object.postalCode) : "",
      sortingCode: isSet(object.sortingCode) ? String(object.sortingCode) : "",
      administrativeArea: isSet(object.administrativeArea) ? String(object.administrativeArea) : "",
      locality: isSet(object.locality) ? String(object.locality) : "",
      sublocality: isSet(object.sublocality) ? String(object.sublocality) : "",
      addressLines: Array.isArray(object?.addressLines) ? object.addressLines.map((e: any) => String(e)) : [],
      recipients: Array.isArray(object?.recipients) ? object.recipients.map((e: any) => String(e)) : [],
      organization: isSet(object.organization) ? String(object.organization) : ""
    };
  },
  toJSON(message: PostalAddress): unknown {
    const obj: any = {};
    message.revision !== undefined && (obj.revision = Math.round(message.revision));
    message.regionCode !== undefined && (obj.regionCode = message.regionCode);
    message.languageCode !== undefined && (obj.languageCode = message.languageCode);
    message.postalCode !== undefined && (obj.postalCode = message.postalCode);
    message.sortingCode !== undefined && (obj.sortingCode = message.sortingCode);
    message.administrativeArea !== undefined && (obj.administrativeArea = message.administrativeArea);
    message.locality !== undefined && (obj.locality = message.locality);
    message.sublocality !== undefined && (obj.sublocality = message.sublocality);
    if (message.addressLines) {
      obj.addressLines = message.addressLines.map(e => e);
    } else {
      obj.addressLines = [];
    }
    if (message.recipients) {
      obj.recipients = message.recipients.map(e => e);
    } else {
      obj.recipients = [];
    }
    message.organization !== undefined && (obj.organization = message.organization);
    return obj;
  },
  fromPartial(object: DeepPartial<PostalAddress>): PostalAddress {
    const message = createBasePostalAddress();
    message.revision = object.revision ?? 0;
    message.regionCode = object.regionCode ?? "";
    message.languageCode = object.languageCode ?? "";
    message.postalCode = object.postalCode ?? "";
    message.sortingCode = object.sortingCode ?? "";
    message.administrativeArea = object.administrativeArea ?? "";
    message.locality = object.locality ?? "";
    message.sublocality = object.sublocality ?? "";
    message.addressLines = object.addressLines?.map(e => e) || [];
    message.recipients = object.recipients?.map(e => e) || [];
    message.organization = object.organization ?? "";
    return message;
  },
  fromAmino(object: PostalAddressAmino): PostalAddress {
    return {
      revision: object.revision,
      regionCode: object.region_code,
      languageCode: object.language_code,
      postalCode: object.postal_code,
      sortingCode: object.sorting_code,
      administrativeArea: object.administrative_area,
      locality: object.locality,
      sublocality: object.sublocality,
      addressLines: Array.isArray(object?.address_lines) ? object.address_lines.map((e: any) => e) : [],
      recipients: Array.isArray(object?.recipients) ? object.recipients.map((e: any) => e) : [],
      organization: object.organization
    };
  },
  toAmino(message: PostalAddress): PostalAddressAmino {
    const obj: any = {};
    obj.revision = message.revision;
    obj.region_code = message.regionCode;
    obj.language_code = message.languageCode;
    obj.postal_code = message.postalCode;
    obj.sorting_code = message.sortingCode;
    obj.administrative_area = message.administrativeArea;
    obj.locality = message.locality;
    obj.sublocality = message.sublocality;
    if (message.addressLines) {
      obj.address_lines = message.addressLines.map(e => e);
    } else {
      obj.address_lines = [];
    }
    if (message.recipients) {
      obj.recipients = message.recipients.map(e => e);
    } else {
      obj.recipients = [];
    }
    obj.organization = message.organization;
    return obj;
  },
  fromAminoMsg(object: PostalAddressAminoMsg): PostalAddress {
    return PostalAddress.fromAmino(object.value);
  },
  fromProtoMsg(message: PostalAddressProtoMsg): PostalAddress {
    return PostalAddress.decode(message.value);
  },
  toProto(message: PostalAddress): Uint8Array {
    return PostalAddress.encode(message).finish();
  },
  toProtoMsg(message: PostalAddress): PostalAddressProtoMsg {
    return {
      typeUrl: "/google.type.PostalAddress",
      value: PostalAddress.encode(message).finish()
    };
  }
};