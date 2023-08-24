import { BaseParser } from "../core/parsers/base";
import { PubKeyParser } from "../core/parsers/pubkey";
import { PubKey as PubKeyEd25519 } from "../interchain/proto/crypto.ed25519";
import { PubKey as PubKeySecp256k1 } from "../interchain/proto/crypto.secp256k1";
import { PubKey as PubKeySecp256r1 } from "../interchain/proto/crypto.secp256r1";

export const PubKeyEd25519Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeyEd25519)
);
export const PubKeySecp256k1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeySecp256k1)
);
export const PubKeySecp256r1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeySecp256r1)
);
