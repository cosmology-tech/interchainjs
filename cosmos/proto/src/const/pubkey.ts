import { PubKey as PubKeyEd25519 } from "../codegen/cosmos/crypto/ed25519/keys";
import { PubKey as PubKeySecp256k1 } from "../codegen/cosmos/crypto/secp256k1/keys";
import { PubKey as PubKeySecp256r1 } from "../codegen/cosmos/crypto/secp256r1/keys";
import { BaseParser } from "../parsers/base";
import { PubKeyParser } from "../parsers/pubkey";

export const PubKeyEd25519Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(PubKeyEd25519)
);
export const PubKeySecp256k1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(PubKeySecp256k1)
);
export const PubKeySecp256r1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescopeGeneratedType(PubKeySecp256r1)
);
