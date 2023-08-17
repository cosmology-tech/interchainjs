import { accountParsers } from "./account.const";
import { msgParsers, msgPoolParser, stargateMsgPoolParser } from "./msg.const";
import { pubKeyParsers } from "./pubkey.const";
import { txParsers } from "./tx.const";

export * from "./account.const";
export * from "./msg.const";
export * from "./pubkey.const";
export * from "./tx.const";

export const parsers = {
  ...accountParsers,
  ...pubKeyParsers,
  ...msgParsers,
  ...txParsers,
  MsgPool: {
    Stargate: stargateMsgPoolParser,
    All: msgPoolParser,
  },
};
