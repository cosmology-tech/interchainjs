import { PubKey as PubKeyEd25519 } from "../interchain/proto/crypto.ed25519";
import { PubKey as PubKeySecp256k1 } from "../interchain/proto/crypto.secp256k1";
import { PubKey as PubKeySecp256r1 } from "../interchain/proto/crypto.secp256r1";
import { BaseParser } from "../parsers/base";
import { PubKeyParser } from "../parsers/pubkey";

export const PubKeyEd25519Parser = PubKeyParser.fromParser(
  BaseParser.fromMeta(PubKeyEd25519)
);
export const PubKeySecp256k1Parser = PubKeyParser.fromParser(
  BaseParser.fromMeta(PubKeySecp256k1)
);
export const PubKeySecp256r1Parser = PubKeyParser.fromParser(
  BaseParser.fromMeta(PubKeySecp256r1)
);
