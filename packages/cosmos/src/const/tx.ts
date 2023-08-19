import { Fee, Tx, TxRaw } from "interchain-query/cosmos/tx/v1beta1/tx";
import { TxBody } from "interchain-query/cosmos/tx/v1beta1/tx";
import { AuthInfo } from "interchain-query/cosmos/tx/v1beta1/tx";

import { BaseParser } from "../core/parsers/base";

export const TxParser = BaseParser.fromTelescope(Tx);
export const TxRawParser = BaseParser.fromTelescope(TxRaw);
export const TxBodyParser = BaseParser.fromTelescope(TxBody);
export const AuthInfoParser = BaseParser.fromTelescope(AuthInfo);
export const FeeParser = BaseParser.fromTelescope(Fee);

// *************************** COLLECTIONS ***************************

export const TxParserMap = {
  Tx: TxParser,
  TxRaw: TxRawParser,
  TxBody: TxBodyParser,
  AuthInfo: AuthInfoParser,
  Fee: FeeParser,
};
