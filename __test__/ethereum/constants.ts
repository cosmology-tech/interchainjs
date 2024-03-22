import { Secp256k1Auth } from "@uni-sign/auth/secp256k1";
import { defaultSignerConfig } from "@uni-sign/ethereum/defaults";
import { seed } from "../data";

export const mnemonic = seed.genesis;
export const auth = Secp256k1Auth.fromMnemonic(mnemonic).derive("ethereum");
export const hashPubKey = defaultSignerConfig.publicKey.hash;
export const isPubkeyCompressed = defaultSignerConfig.publicKey.isCompressed;
