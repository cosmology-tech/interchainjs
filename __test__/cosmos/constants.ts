import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { seed } from "../data";

export const auth = Secp256k1Auth.fromMnemonic(seed.genesis).derive("cosmos");
