import { MsgMultiSend, MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

import { BaseParser } from "../core/parsers/base";
import { MsgParser } from "../core/parsers/msg";

export const msgSendParser = MsgParser.fromParser(
  BaseParser.fromTelescope(MsgSend)
);
export const msgMultiSendParser = MsgParser.fromParser(
  BaseParser.fromTelescope(MsgMultiSend)
);

// -------------------- COLLECTIONS -----------------------

export const stargateMsgParsers = {
  MsgSend: msgSendParser,
  MsgMultiSend: msgMultiSendParser,
};

export const msgParsers = {
  ...stargateMsgParsers,
};
