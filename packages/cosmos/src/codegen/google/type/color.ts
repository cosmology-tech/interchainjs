import { FloatValue, FloatValueAmino } from "../protobuf/wrappers";
import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript.
 * 
 * This reference page doesn't carry information about the absolute color
 * space
 * that should be used to interpret the RGB value (e.g. sRGB, Adobe RGB,
 * DCI-P3, BT.2020, etc.). By default, applications should assume the sRGB color
 * space.
 * 
 * When color equality needs to be decided, implementations, unless
 * documented otherwise, treat two colors as equal if all their red,
 * green, blue, and alpha values each differ by at most 1e-5.
 * 
 * Example (Java):
 * 
 *      import com.google.type.Color;
 * 
 *      // ...
 *      public static java.awt.Color fromProto(Color protocolor) {
 *        float alpha = protocolor.hasAlpha()
 *            ? protocolor.getAlpha().getValue()
 *            : 1.0;
 * 
 *        return new java.awt.Color(
 *            protocolor.getRed(),
 *            protocolor.getGreen(),
 *            protocolor.getBlue(),
 *            alpha);
 *      }
 * 
 *      public static Color toProto(java.awt.Color color) {
 *        float red = (float) color.getRed();
 *        float green = (float) color.getGreen();
 *        float blue = (float) color.getBlue();
 *        float denominator = 255.0;
 *        Color.Builder resultBuilder =
 *            Color
 *                .newBuilder()
 *                .setRed(red / denominator)
 *                .setGreen(green / denominator)
 *                .setBlue(blue / denominator);
 *        int alpha = color.getAlpha();
 *        if (alpha != 255) {
 *          result.setAlpha(
 *              FloatValue
 *                  .newBuilder()
 *                  .setValue(((float) alpha) / denominator)
 *                  .build());
 *        }
 *        return resultBuilder.build();
 *      }
 *      // ...
 * 
 * Example (iOS / Obj-C):
 * 
 *      // ...
 *      static UIColor* fromProto(Color* protocolor) {
 *         float red = [protocolor red];
 *         float green = [protocolor green];
 *         float blue = [protocolor blue];
 *         FloatValue* alpha_wrapper = [protocolor alpha];
 *         float alpha = 1.0;
 *         if (alpha_wrapper != nil) {
 *           alpha = [alpha_wrapper value];
 *         }
 *         return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
 *      }
 * 
 *      static Color* toProto(UIColor* color) {
 *          CGFloat red, green, blue, alpha;
 *          if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) {
 *            return nil;
 *          }
 *          Color* result = [[Color alloc] init];
 *          [result setRed:red];
 *          [result setGreen:green];
 *          [result setBlue:blue];
 *          if (alpha <= 0.9999) {
 *            [result setAlpha:floatWrapperWithValue(alpha)];
 *          }
 *          [result autorelease];
 *          return result;
 *     }
 *     // ...
 * 
 *  Example (JavaScript):
 * 
 *     // ...
 * 
 *     var protoToCssColor = function(rgb_color) {
 *        var redFrac = rgb_color.red || 0.0;
 *        var greenFrac = rgb_color.green || 0.0;
 *        var blueFrac = rgb_color.blue || 0.0;
 *        var red = Math.floor(redFrac * 255);
 *        var green = Math.floor(greenFrac * 255);
 *        var blue = Math.floor(blueFrac * 255);
 * 
 *        if (!('alpha' in rgb_color)) {
 *           return rgbToCssColor(red, green, blue);
 *        }
 * 
 *        var alphaFrac = rgb_color.alpha.value || 0.0;
 *        var rgbParams = [red, green, blue].join(',');
 *        return ['rgba(', rgbParams, ',', alphaFrac, ')'].join('');
 *     };
 * 
 *     var rgbToCssColor = function(red, green, blue) {
 *       var rgbNumber = new Number((red << 16) | (green << 8) | blue);
 *       var hexString = rgbNumber.toString(16);
 *       var missingZeros = 6 - hexString.length;
 *       var resultBuilder = ['#'];
 *       for (var i = 0; i < missingZeros; i++) {
 *          resultBuilder.push('0');
 *       }
 *       resultBuilder.push(hexString);
 *       return resultBuilder.join('');
 *     };
 * 
 *     // ...
 */
export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue: number;
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation:
   * 
   *   `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)`
   * 
   * This means that a value of 1.0 corresponds to a solid color, whereas
   * a value of 0.0 corresponds to a completely transparent color. This
   * uses a wrapper message rather than a simple float scalar so that it is
   * possible to distinguish between a default value and the value being unset.
   * If omitted, this color object is rendered as a solid color
   * (as if the alpha value had been explicitly given a value of 1.0).
   */
  alpha: FloatValue;
}
export interface ColorProtoMsg {
  typeUrl: "/google.type.Color";
  value: Uint8Array;
}
/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript.
 * 
 * This reference page doesn't carry information about the absolute color
 * space
 * that should be used to interpret the RGB value (e.g. sRGB, Adobe RGB,
 * DCI-P3, BT.2020, etc.). By default, applications should assume the sRGB color
 * space.
 * 
 * When color equality needs to be decided, implementations, unless
 * documented otherwise, treat two colors as equal if all their red,
 * green, blue, and alpha values each differ by at most 1e-5.
 * 
 * Example (Java):
 * 
 *      import com.google.type.Color;
 * 
 *      // ...
 *      public static java.awt.Color fromProto(Color protocolor) {
 *        float alpha = protocolor.hasAlpha()
 *            ? protocolor.getAlpha().getValue()
 *            : 1.0;
 * 
 *        return new java.awt.Color(
 *            protocolor.getRed(),
 *            protocolor.getGreen(),
 *            protocolor.getBlue(),
 *            alpha);
 *      }
 * 
 *      public static Color toProto(java.awt.Color color) {
 *        float red = (float) color.getRed();
 *        float green = (float) color.getGreen();
 *        float blue = (float) color.getBlue();
 *        float denominator = 255.0;
 *        Color.Builder resultBuilder =
 *            Color
 *                .newBuilder()
 *                .setRed(red / denominator)
 *                .setGreen(green / denominator)
 *                .setBlue(blue / denominator);
 *        int alpha = color.getAlpha();
 *        if (alpha != 255) {
 *          result.setAlpha(
 *              FloatValue
 *                  .newBuilder()
 *                  .setValue(((float) alpha) / denominator)
 *                  .build());
 *        }
 *        return resultBuilder.build();
 *      }
 *      // ...
 * 
 * Example (iOS / Obj-C):
 * 
 *      // ...
 *      static UIColor* fromProto(Color* protocolor) {
 *         float red = [protocolor red];
 *         float green = [protocolor green];
 *         float blue = [protocolor blue];
 *         FloatValue* alpha_wrapper = [protocolor alpha];
 *         float alpha = 1.0;
 *         if (alpha_wrapper != nil) {
 *           alpha = [alpha_wrapper value];
 *         }
 *         return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
 *      }
 * 
 *      static Color* toProto(UIColor* color) {
 *          CGFloat red, green, blue, alpha;
 *          if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) {
 *            return nil;
 *          }
 *          Color* result = [[Color alloc] init];
 *          [result setRed:red];
 *          [result setGreen:green];
 *          [result setBlue:blue];
 *          if (alpha <= 0.9999) {
 *            [result setAlpha:floatWrapperWithValue(alpha)];
 *          }
 *          [result autorelease];
 *          return result;
 *     }
 *     // ...
 * 
 *  Example (JavaScript):
 * 
 *     // ...
 * 
 *     var protoToCssColor = function(rgb_color) {
 *        var redFrac = rgb_color.red || 0.0;
 *        var greenFrac = rgb_color.green || 0.0;
 *        var blueFrac = rgb_color.blue || 0.0;
 *        var red = Math.floor(redFrac * 255);
 *        var green = Math.floor(greenFrac * 255);
 *        var blue = Math.floor(blueFrac * 255);
 * 
 *        if (!('alpha' in rgb_color)) {
 *           return rgbToCssColor(red, green, blue);
 *        }
 * 
 *        var alphaFrac = rgb_color.alpha.value || 0.0;
 *        var rgbParams = [red, green, blue].join(',');
 *        return ['rgba(', rgbParams, ',', alphaFrac, ')'].join('');
 *     };
 * 
 *     var rgbToCssColor = function(red, green, blue) {
 *       var rgbNumber = new Number((red << 16) | (green << 8) | blue);
 *       var hexString = rgbNumber.toString(16);
 *       var missingZeros = 6 - hexString.length;
 *       var resultBuilder = ['#'];
 *       for (var i = 0; i < missingZeros; i++) {
 *          resultBuilder.push('0');
 *       }
 *       resultBuilder.push(hexString);
 *       return resultBuilder.join('');
 *     };
 * 
 *     // ...
 */
export interface ColorAmino {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue: number;
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation:
   * 
   *   `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)`
   * 
   * This means that a value of 1.0 corresponds to a solid color, whereas
   * a value of 0.0 corresponds to a completely transparent color. This
   * uses a wrapper message rather than a simple float scalar so that it is
   * possible to distinguish between a default value and the value being unset.
   * If omitted, this color object is rendered as a solid color
   * (as if the alpha value had been explicitly given a value of 1.0).
   */
  alpha?: FloatValueAmino;
}
export interface ColorAminoMsg {
  type: "/google.type.Color";
  value: ColorAmino;
}
function createBaseColor(): Color {
  return {
    red: 0,
    green: 0,
    blue: 0,
    alpha: FloatValue.fromPartial({})
  };
}
export const Color = {
  encode(message: Color, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.red !== 0) {
      writer.uint32(13).float(message.red);
    }
    if (message.green !== 0) {
      writer.uint32(21).float(message.green);
    }
    if (message.blue !== 0) {
      writer.uint32(29).float(message.blue);
    }
    if (message.alpha !== undefined) {
      FloatValue.encode(message.alpha, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Color {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.red = reader.float();
          break;
        case 2:
          message.green = reader.float();
          break;
        case 3:
          message.blue = reader.float();
          break;
        case 4:
          message.alpha = FloatValue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Color {
    return {
      red: isSet(object.red) ? Number(object.red) : 0,
      green: isSet(object.green) ? Number(object.green) : 0,
      blue: isSet(object.blue) ? Number(object.blue) : 0,
      alpha: isSet(object.alpha) ? FloatValue.fromJSON(object.alpha) : undefined
    };
  },
  toJSON(message: Color): unknown {
    const obj: any = {};
    message.red !== undefined && (obj.red = message.red);
    message.green !== undefined && (obj.green = message.green);
    message.blue !== undefined && (obj.blue = message.blue);
    message.alpha !== undefined && (obj.alpha = message.alpha ? FloatValue.toJSON(message.alpha) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<Color>): Color {
    const message = createBaseColor();
    message.red = object.red ?? 0;
    message.green = object.green ?? 0;
    message.blue = object.blue ?? 0;
    message.alpha = object.alpha !== undefined && object.alpha !== null ? FloatValue.fromPartial(object.alpha) : undefined;
    return message;
  },
  fromAmino(object: ColorAmino): Color {
    return {
      red: object.red,
      green: object.green,
      blue: object.blue,
      alpha: object?.alpha ? FloatValue.fromAmino(object.alpha) : undefined
    };
  },
  toAmino(message: Color): ColorAmino {
    const obj: any = {};
    obj.red = message.red;
    obj.green = message.green;
    obj.blue = message.blue;
    obj.alpha = message.alpha ? FloatValue.toAmino(message.alpha) : undefined;
    return obj;
  },
  fromAminoMsg(object: ColorAminoMsg): Color {
    return Color.fromAmino(object.value);
  },
  fromProtoMsg(message: ColorProtoMsg): Color {
    return Color.decode(message.value);
  },
  toProto(message: Color): Uint8Array {
    return Color.encode(message).finish();
  },
  toProtoMsg(message: Color): ColorProtoMsg {
    return {
      typeUrl: "/google.type.Color",
      value: Color.encode(message).finish()
    };
  }
};