import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * A quaternion is defined as the quotient of two directed lines in a
 * three-dimensional space or equivalently as the quotient of two Euclidean
 * vectors (https://en.wikipedia.org/wiki/Quaternion).
 * 
 * Quaternions are often used in calculations involving three-dimensional
 * rotations (https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation),
 * as they provide greater mathematical robustness by avoiding the gimbal lock
 * problems that can be encountered when using Euler angles
 * (https://en.wikipedia.org/wiki/Gimbal_lock).
 * 
 * Quaternions are generally represented in this form:
 * 
 *     w + xi + yj + zk
 * 
 * where x, y, z, and w are real numbers, and i, j, and k are three imaginary
 * numbers.
 * 
 * Our naming choice `(x, y, z, w)` comes from the desire to avoid confusion for
 * those interested in the geometric properties of the quaternion in the 3D
 * Cartesian space. Other texts often use alternative names or subscripts, such
 * as `(a, b, c, d)`, `(1, i, j, k)`, or `(0, 1, 2, 3)`, which are perhaps
 * better suited for mathematical interpretations.
 * 
 * To avoid any confusion, as well as to maintain compatibility with a large
 * number of software libraries, the quaternions represented using the protocol
 * buffer below *must* follow the Hamilton convention, which defines `ij = k`
 * (i.e. a right-handed algebra), and therefore:
 * 
 *     i^2 = j^2 = k^2 = ijk = −1
 *     ij = −ji = k
 *     jk = −kj = i
 *     ki = −ik = j
 * 
 * Please DO NOT use this to represent quaternions that follow the JPL
 * convention, or any of the other quaternion flavors out there.
 * 
 * Definitions:
 * 
 *   - Quaternion norm (or magnitude): `sqrt(x^2 + y^2 + z^2 + w^2)`.
 *   - Unit (or normalized) quaternion: a quaternion whose norm is 1.
 *   - Pure quaternion: a quaternion whose scalar component (`w`) is 0.
 *   - Rotation quaternion: a unit quaternion used to represent rotation.
 *   - Orientation quaternion: a unit quaternion used to represent orientation.
 * 
 * A quaternion can be normalized by dividing it by its norm. The resulting
 * quaternion maintains the same direction, but has a norm of 1, i.e. it moves
 * on the unit sphere. This is generally necessary for rotation and orientation
 * quaternions, to avoid rounding errors:
 * https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions
 * 
 * Note that `(x, y, z, w)` and `(-x, -y, -z, -w)` represent the same rotation,
 * but normalization would be even more useful, e.g. for comparison purposes, if
 * it would produce a unique representation. It is thus recommended that `w` be
 * kept positive, which can be achieved by changing all the signs when `w` is
 * negative.
 */
export interface Quaternion {
  /** The x component. */
  x: number;
  /** The y component. */
  y: number;
  /** The z component. */
  z: number;
  /** The scalar component. */
  w: number;
}
export interface QuaternionProtoMsg {
  typeUrl: "/google.type.Quaternion";
  value: Uint8Array;
}
/**
 * A quaternion is defined as the quotient of two directed lines in a
 * three-dimensional space or equivalently as the quotient of two Euclidean
 * vectors (https://en.wikipedia.org/wiki/Quaternion).
 * 
 * Quaternions are often used in calculations involving three-dimensional
 * rotations (https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation),
 * as they provide greater mathematical robustness by avoiding the gimbal lock
 * problems that can be encountered when using Euler angles
 * (https://en.wikipedia.org/wiki/Gimbal_lock).
 * 
 * Quaternions are generally represented in this form:
 * 
 *     w + xi + yj + zk
 * 
 * where x, y, z, and w are real numbers, and i, j, and k are three imaginary
 * numbers.
 * 
 * Our naming choice `(x, y, z, w)` comes from the desire to avoid confusion for
 * those interested in the geometric properties of the quaternion in the 3D
 * Cartesian space. Other texts often use alternative names or subscripts, such
 * as `(a, b, c, d)`, `(1, i, j, k)`, or `(0, 1, 2, 3)`, which are perhaps
 * better suited for mathematical interpretations.
 * 
 * To avoid any confusion, as well as to maintain compatibility with a large
 * number of software libraries, the quaternions represented using the protocol
 * buffer below *must* follow the Hamilton convention, which defines `ij = k`
 * (i.e. a right-handed algebra), and therefore:
 * 
 *     i^2 = j^2 = k^2 = ijk = −1
 *     ij = −ji = k
 *     jk = −kj = i
 *     ki = −ik = j
 * 
 * Please DO NOT use this to represent quaternions that follow the JPL
 * convention, or any of the other quaternion flavors out there.
 * 
 * Definitions:
 * 
 *   - Quaternion norm (or magnitude): `sqrt(x^2 + y^2 + z^2 + w^2)`.
 *   - Unit (or normalized) quaternion: a quaternion whose norm is 1.
 *   - Pure quaternion: a quaternion whose scalar component (`w`) is 0.
 *   - Rotation quaternion: a unit quaternion used to represent rotation.
 *   - Orientation quaternion: a unit quaternion used to represent orientation.
 * 
 * A quaternion can be normalized by dividing it by its norm. The resulting
 * quaternion maintains the same direction, but has a norm of 1, i.e. it moves
 * on the unit sphere. This is generally necessary for rotation and orientation
 * quaternions, to avoid rounding errors:
 * https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions
 * 
 * Note that `(x, y, z, w)` and `(-x, -y, -z, -w)` represent the same rotation,
 * but normalization would be even more useful, e.g. for comparison purposes, if
 * it would produce a unique representation. It is thus recommended that `w` be
 * kept positive, which can be achieved by changing all the signs when `w` is
 * negative.
 */
export interface QuaternionAmino {
  /** The x component. */
  x: number;
  /** The y component. */
  y: number;
  /** The z component. */
  z: number;
  /** The scalar component. */
  w: number;
}
export interface QuaternionAminoMsg {
  type: "/google.type.Quaternion";
  value: QuaternionAmino;
}
function createBaseQuaternion(): Quaternion {
  return {
    x: 0,
    y: 0,
    z: 0,
    w: 0
  };
}
export const Quaternion = {
  encode(message: Quaternion, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    if (message.w !== 0) {
      writer.uint32(33).double(message.w);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Quaternion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuaternion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        case 3:
          message.z = reader.double();
          break;
        case 4:
          message.w = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Quaternion {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
      w: isSet(object.w) ? Number(object.w) : 0
    };
  },
  toJSON(message: Quaternion): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    message.w !== undefined && (obj.w = message.w);
    return obj;
  },
  fromPartial(object: DeepPartial<Quaternion>): Quaternion {
    const message = createBaseQuaternion();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    message.w = object.w ?? 0;
    return message;
  },
  fromAmino(object: QuaternionAmino): Quaternion {
    return {
      x: object.x,
      y: object.y,
      z: object.z,
      w: object.w
    };
  },
  toAmino(message: Quaternion): QuaternionAmino {
    const obj: any = {};
    obj.x = message.x;
    obj.y = message.y;
    obj.z = message.z;
    obj.w = message.w;
    return obj;
  },
  fromAminoMsg(object: QuaternionAminoMsg): Quaternion {
    return Quaternion.fromAmino(object.value);
  },
  fromProtoMsg(message: QuaternionProtoMsg): Quaternion {
    return Quaternion.decode(message.value);
  },
  toProto(message: Quaternion): Uint8Array {
    return Quaternion.encode(message).finish();
  },
  toProtoMsg(message: Quaternion): QuaternionProtoMsg {
    return {
      typeUrl: "/google.type.Quaternion",
      value: Quaternion.encode(message).finish()
    };
  }
};