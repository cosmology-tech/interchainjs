import { ParserData } from "../types";
import { AminoConverter, GeneratedType } from "../types/cosmjs";
import { BaseParser } from "./base";

export class MsgParser<ProtoT, AminoT> extends BaseParser<ProtoT, AminoT> {
  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new MsgParser(parser.args);
  }

  /**
   * using argument interfaces like cosmjs
   */
  static fromRegistry<ProtoT, AminoT>(
    typeUrl: string,
    type: GeneratedType<ProtoT>,
    converter: AminoConverter<ProtoT, AminoT>
  ) {
    return new MsgParser({
      protoType: typeUrl,
      proto: type,
      aminoType: converter.aminoType,
      converter: {
        toAmino: converter.toAmino,
        toProto: converter.fromAmino,
      },
    });
  }
}
