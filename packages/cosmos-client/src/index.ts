import { MsgParserPool } from "@sign/cosmos";

import { MsgStargateParser } from "./msg.stargate";
import { MsgWasmParser } from "./msg.wasm";

export * from "./msg.stargate";
export * from "./msg.wasm";

export const MsgCosmWasmParser = MsgParserPool.fromPools(
  MsgStargateParser,
  MsgWasmParser
);
