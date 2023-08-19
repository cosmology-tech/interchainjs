/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllMsgParserMap, MsgParserPoolMap } from "../../const";
import { TelescopeData } from "../../types";
import { MsgParser, MsgParserPool } from "../parsers";

export function getMsgParser(name: string): MsgParser<unknown, unknown> {
  const parser = (AllMsgParserMap as any)[name];
  if (!parser) {
    throw new Error(`No such MsgParser found with name ${name}`);
  }
  return parser;
}

export function getMsgParserPool(name: string): MsgParserPool {
  const parserPool = (MsgParserPoolMap as any)[name];
  if (!parserPool) {
    throw new Error(`No such MsgParserPool found with name ${name}`);
  }
  return parserPool;
}

export function toParserArgs<ProtoT, AminoT>(
  data: TelescopeData<ProtoT, AminoT>
) {
  const {
    typeUrl,
    aminoType,
    encode,
    decode,
    fromAmino,
    toAmino,
    fromPartial,
  } = data;
  return {
    protoType: typeUrl,
    proto: { encode, decode, fromPartial },
    aminoType: aminoType,
    converter: {
      toAmino,
      toProto: fromAmino,
    },
  };
}
