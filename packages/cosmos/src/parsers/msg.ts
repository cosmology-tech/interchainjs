import { ParserData } from "../../types";
import { BaseParser } from "./base";

export class MsgParser<ProtoT, AminoT> extends BaseParser<ProtoT, AminoT> {
  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new MsgParser(parser.args);
  }
}
