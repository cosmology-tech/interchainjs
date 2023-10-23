import {
  AuthInfo,
  Fee,
  SignDoc,
  Tx,
  TxBody,
  TxRaw,
} from "../codegen/cosmos/tx/v1beta1/tx";
import { BaseParser } from "../parsers/base";

export const TxParser = BaseParser.fromTelescopeGeneratedType(Tx);
export const TxRawParser = BaseParser.fromTelescopeGeneratedType(TxRaw);
export const TxBodyParser = BaseParser.fromTelescopeGeneratedType(TxBody);
export const AuthInfoParser = BaseParser.fromTelescopeGeneratedType(AuthInfo);
export const FeeParser = BaseParser.fromTelescopeGeneratedType(Fee);
export const SignDocParser = BaseParser.fromTelescopeGeneratedType(SignDoc);
