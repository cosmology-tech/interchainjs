import { PubKey as PubKeyEd25519 } from "interchain-query/cosmos/crypto/ed25519/keys";
import { PubKey as PubKeySecp256k1 } from "interchain-query/cosmos/crypto/secp256k1/keys";

import { BaseParser } from "./base";
import { PubKeyParser } from "./pubkey";

export const pubKeyEd25519Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeyEd25519)
);
export const pubKeySecp256k1Parser = PubKeyParser.fromParser(
  BaseParser.fromTelescope(PubKeySecp256k1)
);

export const pubKeyParsers = {
  PubKeyEd25519: pubKeyEd25519Parser,
  PubKeySecp256k1: pubKeySecp256k1Parser,
};
