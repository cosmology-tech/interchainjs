import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this must conform to the
 * <a href="http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf">WGS84
 * standard</a>. Values must be within normalized ranges.
 */
export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude: number;
}
export interface LatLngProtoMsg {
  typeUrl: "/google.type.LatLng";
  value: Uint8Array;
}
/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this must conform to the
 * <a href="http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf">WGS84
 * standard</a>. Values must be within normalized ranges.
 */
export interface LatLngAmino {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude: number;
}
export interface LatLngAminoMsg {
  type: "/google.type.LatLng";
  value: LatLngAmino;
}
function createBaseLatLng(): LatLng {
  return {
    latitude: 0,
    longitude: 0
  };
}
export const LatLng = {
  encode(message: LatLng, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.latitude !== 0) {
      writer.uint32(9).double(message.latitude);
    }
    if (message.longitude !== 0) {
      writer.uint32(17).double(message.longitude);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LatLng {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLatLng();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latitude = reader.double();
          break;
        case 2:
          message.longitude = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LatLng {
    return {
      latitude: isSet(object.latitude) ? Number(object.latitude) : 0,
      longitude: isSet(object.longitude) ? Number(object.longitude) : 0
    };
  },
  toJSON(message: LatLng): unknown {
    const obj: any = {};
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    return obj;
  },
  fromPartial(object: DeepPartial<LatLng>): LatLng {
    const message = createBaseLatLng();
    message.latitude = object.latitude ?? 0;
    message.longitude = object.longitude ?? 0;
    return message;
  },
  fromAmino(object: LatLngAmino): LatLng {
    return {
      latitude: object.latitude,
      longitude: object.longitude
    };
  },
  toAmino(message: LatLng): LatLngAmino {
    const obj: any = {};
    obj.latitude = message.latitude;
    obj.longitude = message.longitude;
    return obj;
  },
  fromAminoMsg(object: LatLngAminoMsg): LatLng {
    return LatLng.fromAmino(object.value);
  },
  fromProtoMsg(message: LatLngProtoMsg): LatLng {
    return LatLng.decode(message.value);
  },
  toProto(message: LatLng): Uint8Array {
    return LatLng.encode(message).finish();
  },
  toProtoMsg(message: LatLng): LatLngProtoMsg {
    return {
      typeUrl: "/google.type.LatLng",
      value: LatLng.encode(message).finish()
    };
  }
};