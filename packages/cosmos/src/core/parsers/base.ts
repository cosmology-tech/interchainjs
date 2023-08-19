/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial } from "interchain-query/helpers";

import {
  Converter,
  ParserData,
  Proto,
  TelescopeData,
  WrapType,
  WrapTypeUrl,
} from "../../types";
import { toParserArgs } from "../utils/parser";

type ProtoData<T> = T | Uint8Array | WrapTypeUrl<T | Uint8Array>;

class ProtoParser<ProtoT, AminoT> {
  readonly type: string;
  private readonly _proto: Proto<ProtoT>;
  private _target?: ProtoData<ProtoT>;
  readonly aminoParser?: AminoParser<ProtoT, AminoT>;

  constructor(args: ParserData<ProtoT, AminoT>) {
    this.type = args.protoType;
    this._proto = args.proto;
    if (args.aminoType) {
      this.aminoParser = new AminoParser<ProtoT, AminoT>(
        args as Required<ParserData<ProtoT, AminoT>>
      );
    }
  }

  get isWrapped() {
    return (
      typeof this._target === "object" &&
      Object.getOwnPropertyNames(this._target).includes("typeUrl")
    );
  }

  get isEncoded() {
    const value = this.value;
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
  }

  get target() {
    return this._target;
  }

  pop() {
    const target = this._target;
    this._target = void 0;
    return target;
  }

  get value(): ProtoT | Uint8Array {
    if (!this.target) {
      throw new Error("Target is undefined.");
    }
    return this.isWrapped ? (this._target as any).value : this._target;
  }

  assertType(type: string) {
    if (type !== this.type) {
      throw new Error(
        `Provided typeUrl: ${type} doesn't match parser used with protoType (typeUrl): ${this.type}`
      );
    }
  }

  assertMsg(msg: any) {
    if (msg["typeUrl"]) {
      this.assertType(msg["typeUrl"]);
    }
  }

  from(
    msg:
      | ProtoData<ProtoT>
      | DeepPartial<ProtoT>
      | WrapTypeUrl<DeepPartial<ProtoT>>
  ) {
    const isWrapped = typeof (msg as any)["typeUrl"] !== "undefined";
    const value: DeepPartial<ProtoT> | ProtoT | Uint8Array = isWrapped
      ? (msg as any)["value"]
      : msg;

    const isEncoded = ArrayBuffer.isView(value) && !(value instanceof DataView);
    if (isEncoded) {
      this._target = msg as ProtoData<ProtoT>;
    } else {
      if (isWrapped) {
        this.assertMsg(msg);
        this._target = {
          typeUrl: this.type,
          value: this._proto.fromPartial(
            (msg as WrapTypeUrl<DeepPartial<ProtoT>>).value
          ),
        };
      } else {
        this._target = this._proto.fromPartial(msg as DeepPartial<ProtoT>);
      }
    }
    return this;
  }

  wrap() {
    this._target = {
      typeUrl: this.type,
      value: this.value,
    };
    return this;
  }

  unwrap() {
    this._target = this.value;
    return this;
  }

  encode() {
    if (!this.isEncoded) {
      this._target = this.isWrapped
        ? {
            ...(this._target as WrapTypeUrl<ProtoT>),
            value: this._proto
              .encode((this._target as WrapTypeUrl<ProtoT>)["value"])
              .finish(),
          }
        : this._proto.encode(this._target as ProtoT).finish();
    }
    return this;
  }

  decode() {
    if (this.isEncoded) {
      this._target = this.isWrapped
        ? {
            ...(this._target as WrapTypeUrl<Uint8Array>),
            value: this._proto.decode(
              (this._target as WrapTypeUrl<Uint8Array>)["value"]
            ),
          }
        : this._proto.decode(this._target as Uint8Array);
      return this;
    }
    return this;
  }

  toAmino() {
    if (!this.aminoParser) {
      throw new Error(
        `No such amino type for proto type (typeUrl) ${this.type}`
      );
    }
    this.aminoParser.from(
      this.isWrapped
        ? {
            type: this.aminoParser.type,
            value: this.aminoParser.converter.toAmino(
              (this._target as WrapTypeUrl<ProtoT>)["value"]
            ),
          }
        : this.aminoParser.converter.toAmino(this._target as ProtoT)
    );
    return this.aminoParser;
  }
}

type AminoData<T> = T | WrapType<T>;

class AminoParser<ProtoT, AminoT> {
  readonly type: string;
  private _target?: AminoData<AminoT>;
  converter: Converter<ProtoT, AminoT>;

  constructor(args: Required<ParserData<ProtoT, AminoT>>) {
    this.type = args.aminoType;
    this.converter = args.converter;
  }

  get isWrapped() {
    return (
      typeof this._target === "object" &&
      Object.getOwnPropertyNames(this._target).includes("type")
    );
  }

  get target() {
    return this._target;
  }

  pop() {
    const target = this._target;
    this._target = void 0;
    return target;
  }

  get value(): AminoT {
    return this.isWrapped ? (this._target as any).value : this._target;
  }

  assertType(type: string) {
    if (type !== this.type) {
      throw new Error(
        `Provided type: ${type} doesn't match parser used with aminoType: ${this.type}`
      );
    }
  }

  assertMsg(msg: any) {
    if (msg["type"]) {
      this.assertType(msg["type"]);
    }
  }

  from(msg: AminoData<AminoT>) {
    this.assertMsg(msg);
    this._target = msg;
    return this;
  }

  wrap() {
    this._target = {
      type: this.type,
      value: this.value,
    };
    return this;
  }

  unwrap() {
    this._target = this.value;
    return this;
  }
}

export class BaseParser<ProtoT, AminoT> {
  readonly protoType: string; // equivalent to typeUrl
  readonly aminoType?: string; // equivalent to aminoType

  readonly protoParser: ProtoParser<ProtoT, AminoT>;
  readonly aminoParser?: AminoParser<ProtoT, AminoT>;

  readonly args: ParserData<ProtoT, AminoT>;

  constructor(args: ParserData<ProtoT, AminoT>) {
    this.args = args;

    this.protoType = args.protoType;
    this.aminoType = args.aminoType;

    this.protoParser = new ProtoParser(args);
    if (args.aminoType && args.converter) {
      this.aminoParser = new AminoParser(
        args as Required<ParserData<ProtoT, AminoT>>
      );
    }
  }

  static fromTelescope<ProtoT, AminoT>(data: TelescopeData<ProtoT, AminoT>) {
    return new BaseParser(toParserArgs(data));
  }

  createProtoData(data: DeepPartial<ProtoT>) {
    return this.fromProto(data).pop() as ProtoT;
  }

  protected _assertProtoValue(value: ProtoT) {
    return true;
  }

  protected _assertAminoValue(value: AminoT) {
    return true;
  }

  fromProto(
    data:
      | ProtoData<ProtoT>
      | DeepPartial<ProtoT>
      | WrapTypeUrl<DeepPartial<ProtoT>>
  ) {
    this.protoParser.from(data);
    this._assertProtoValue(this.protoParser.value as ProtoT);
    return this.protoParser;
  }

  fromAmino(data: AminoData<AminoT>) {
    if (!this.aminoParser) {
      throw new Error(
        `No such aminoType and converter for typeUrl "${this.protoType}".`
      );
    }
    this.aminoParser.from(data);
    this._assertAminoValue(this.aminoParser.value as AminoT);
    return this.aminoParser;
  }

  isWrapped(target: any) {
    return (
      typeof target?.["type"] !== "undefined" ||
      typeof target?.["typeUrl"] !== "undefined"
    );
  }
}
