import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { chain, seed } from "../data";
import { RpcQuery } from "@cosmonauts/cosmos-query/rpc";

export const auth = Secp256k1Auth.fromMnemonic(seed.genesis).derive("cosmos");
export const rpcQuery = new RpcQuery(chain.osmosis.rpc);
