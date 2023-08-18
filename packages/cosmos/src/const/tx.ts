import { Fee, Tx, TxRaw } from "interchain-query/cosmos/tx/v1beta1/tx";
import { TxBody } from "interchain-query/cosmos/tx/v1beta1/tx";
import { AuthInfo } from "interchain-query/cosmos/tx/v1beta1/tx";

import { BaseParser } from "../core/parsers/base";

export const txParser = BaseParser.fromTelescope(Tx);
export const txRawParser = BaseParser.fromTelescope(TxRaw);
export const txBodyParser = BaseParser.fromTelescope(TxBody);
export const authInfoParser = BaseParser.fromTelescope(AuthInfo);
export const feeParser = BaseParser.fromTelescope(Fee);

// -------------------- COLLECTIONS -----------------------

export const txParsers = {
  Tx: txParser,
  TxRaw: txRawParser,
  TxBody: txBodyParser,
  AuthInfo: authInfoParser,
  Fee: feeParser,
};
