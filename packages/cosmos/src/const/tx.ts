import { BaseParser } from "../core/parsers/base";
import { AuthInfo, Fee, Tx, TxBody, TxRaw } from "../interchain/proto/tx";

export const TxParser = BaseParser.fromTelescope(Tx);
export const TxRawParser = BaseParser.fromTelescope(TxRaw);
export const TxBodyParser = BaseParser.fromTelescope(TxBody);
export const AuthInfoParser = BaseParser.fromTelescope(AuthInfo);
export const FeeParser = BaseParser.fromTelescope(Fee);
