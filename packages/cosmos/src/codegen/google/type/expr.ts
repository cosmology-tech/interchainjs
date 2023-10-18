import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial } from "../../helpers";
/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec.
 * 
 * Example (Comparison):
 * 
 *     title: "Summary size limit"
 *     description: "Determines if a summary is less than 100 chars"
 *     expression: "document.summary.size() < 100"
 * 
 * Example (Equality):
 * 
 *     title: "Requestor is owner"
 *     description: "Determines if requestor is the document owner"
 *     expression: "document.owner == request.auth.claims.email"
 * 
 * Example (Logic):
 * 
 *     title: "Public documents"
 *     description: "Determine whether the document should be publicly visible"
 *     expression: "document.type != 'private' && document.type != 'internal'"
 * 
 * Example (Data Manipulation):
 * 
 *     title: "Notification string"
 *     description: "Create a notification string with a timestamp."
 *     expression: "'New message received at ' + string(document.create_time)"
 * 
 * The exact variables and functions that may be referenced within an expression
 * are determined by the service that evaluates it. See the service
 * documentation for additional information.
 */
export interface Expr {
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing
   * its purpose. This can be used e.g. in UIs which allow to enter the
   * expression.
   */
  title: string;
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location: string;
}
export interface ExprProtoMsg {
  typeUrl: "/google.type.Expr";
  value: Uint8Array;
}
/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec.
 * 
 * Example (Comparison):
 * 
 *     title: "Summary size limit"
 *     description: "Determines if a summary is less than 100 chars"
 *     expression: "document.summary.size() < 100"
 * 
 * Example (Equality):
 * 
 *     title: "Requestor is owner"
 *     description: "Determines if requestor is the document owner"
 *     expression: "document.owner == request.auth.claims.email"
 * 
 * Example (Logic):
 * 
 *     title: "Public documents"
 *     description: "Determine whether the document should be publicly visible"
 *     expression: "document.type != 'private' && document.type != 'internal'"
 * 
 * Example (Data Manipulation):
 * 
 *     title: "Notification string"
 *     description: "Create a notification string with a timestamp."
 *     expression: "'New message received at ' + string(document.create_time)"
 * 
 * The exact variables and functions that may be referenced within an expression
 * are determined by the service that evaluates it. See the service
 * documentation for additional information.
 */
export interface ExprAmino {
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing
   * its purpose. This can be used e.g. in UIs which allow to enter the
   * expression.
   */
  title: string;
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location: string;
}
export interface ExprAminoMsg {
  type: "/google.type.Expr";
  value: ExprAmino;
}
function createBaseExpr(): Expr {
  return {
    expression: "",
    title: "",
    description: "",
    location: ""
  };
}
export const Expr = {
  encode(message: Expr, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.expression !== "") {
      writer.uint32(10).string(message.expression);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.location !== "") {
      writer.uint32(34).string(message.location);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Expr {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExpr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expression = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.location = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Expr {
    return {
      expression: isSet(object.expression) ? String(object.expression) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      location: isSet(object.location) ? String(object.location) : ""
    };
  },
  toJSON(message: Expr): unknown {
    const obj: any = {};
    message.expression !== undefined && (obj.expression = message.expression);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.location !== undefined && (obj.location = message.location);
    return obj;
  },
  fromPartial(object: DeepPartial<Expr>): Expr {
    const message = createBaseExpr();
    message.expression = object.expression ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.location = object.location ?? "";
    return message;
  },
  fromAmino(object: ExprAmino): Expr {
    return {
      expression: object.expression,
      title: object.title,
      description: object.description,
      location: object.location
    };
  },
  toAmino(message: Expr): ExprAmino {
    const obj: any = {};
    obj.expression = message.expression;
    obj.title = message.title;
    obj.description = message.description;
    obj.location = message.location;
    return obj;
  },
  fromAminoMsg(object: ExprAminoMsg): Expr {
    return Expr.fromAmino(object.value);
  },
  fromProtoMsg(message: ExprProtoMsg): Expr {
    return Expr.decode(message.value);
  },
  toProto(message: Expr): Uint8Array {
    return Expr.encode(message).finish();
  },
  toProtoMsg(message: Expr): ExprProtoMsg {
    return {
      typeUrl: "/google.type.Expr",
      value: Expr.encode(message).finish()
    };
  }
};