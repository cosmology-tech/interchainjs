import { MsgPoolParser } from "../core/parsers";
import { msgParsers, stargateMsgParsers } from "./msg";

export const stargateMsgPoolParser = MsgPoolParser.with(
  ...Object.values(stargateMsgParsers)
);

export const msgPoolParser = MsgPoolParser.with(...Object.values(msgParsers));

// -------------------- COLLECTIONS -----------------------

export const msgPoolParsers = {
  StargatePool: stargateMsgPoolParser,
  AllPool: msgPoolParser,
};
