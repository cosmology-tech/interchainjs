import { PubKey as PubKeyEd25519 } from "interchain-query/cosmos/crypto/ed25519/keys";
import { PubKey as PubKeySecp256k1 } from "interchain-query/cosmos/crypto/secp256k1/keys";

import { BaseParser } from "../core/parsers/base";
import { PubKeyParser } from "../core/parsers/pubkey";

export const PubKeyEd25519Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeyEd25519)
);
export const PubKeySecp256k1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeySecp256k1)
);

// *************************** COLLECTIONS ***************************

export const PubKeyParsers = {
  PubKeyEd25519: PubKeyEd25519Parser,
  PubKeySecp256k1: PubKeySecp256k1Parser,
};
