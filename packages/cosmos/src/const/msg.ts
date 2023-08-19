import { MsgParserPool } from "../core/parsers";
import { StargateMsgParserMap, StargateMsgParserPool } from "./msg.stargate";
import { WasmMsgParserMap, WasmMsgParserPool } from "./msg.wasm";

export const AllMsgParserMap = {
  ...StargateMsgParserMap,
  ...WasmMsgParserMap,
};

export const AllMsgParserPool = MsgParserPool.with(
  ...Object.values(AllMsgParserMap)
);

export const MsgParserPoolMap = {
  Stargate: StargateMsgParserPool,
  Wasm: WasmMsgParserPool,
  All: AllMsgParserPool,
};
