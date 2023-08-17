import { MsgMultiSend, MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

import { BaseParser } from "./base";
import { MsgParser } from "./msg";
import { MsgPoolParser } from "./msg.pool";

export const msgSendParser = MsgParser.fromParser(
  BaseParser.fromTelescope(MsgSend)
);
export const msgMultiSendParser = MsgParser.fromParser(
  BaseParser.fromTelescope(MsgMultiSend)
);

export const stargateMsgParsers = {
  MsgSend: msgSendParser,
  MsgMultiSend: msgMultiSendParser,
};

export const msgParsers = {
  ...stargateMsgParsers,
};

export const stargateMsgPoolParser = MsgPoolParser.with(
  ...Object.values(stargateMsgParsers)
);

export const msgPoolParser = MsgPoolParser.with(...Object.values(msgParsers));
