import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { defaultSignerConfig } from "@cosmonauts/injective/defaults";
import { seed } from "../data";

export const mnemonic = seed.genesis;
export const auth = Secp256k1Auth.fromMnemonic(mnemonic).derive("injective");
export const hashPubKey = defaultSignerConfig.Cosmos.publicKey.hash;
export const isPubKeyCompressed =
  defaultSignerConfig.Cosmos.publicKey.isCompressed;
