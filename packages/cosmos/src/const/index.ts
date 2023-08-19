import { AccountParserMap } from "./account";
import { AllMsgParserMap } from "./msg";
import { PubKeyParsers } from "./pubkey";
import { TxParserMap } from "./tx";

export * from "./account";
export * from "./msg";
export * from "./msg.stargate";
export * from "./msg.wasm";
export * from "./pubkey";
export * from "./tx";

// *************************** COLLECTIONS ***************************

export const parsers = {
  ...AccountParserMap,
  ...PubKeyParsers,
  ...AllMsgParserMap,
  ...TxParserMap,
};
