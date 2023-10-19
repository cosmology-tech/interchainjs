import {
  AuthInfo,
  Fee,
  SignDoc,
  Tx,
  TxBody,
  TxRaw,
} from "../interchain/proto/tx";
import { BaseParser } from "../parsers/base";

export const TxParser = BaseParser.fromMeta(Tx);
export const TxRawParser = BaseParser.fromMeta(TxRaw);
export const TxBodyParser = BaseParser.fromMeta(TxBody);
export const AuthInfoParser = BaseParser.fromMeta(AuthInfo);
export const FeeParser = BaseParser.fromMeta(Fee);
export const SignDocParser = BaseParser.fromMeta(SignDoc);