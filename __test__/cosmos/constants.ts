import { Secp256k1Auth } from "@uni-sign/auth/secp256k1";
import { chain, seed } from "../data";
import { RpcQuery } from "@uni-sign/cosmos-query/rpc";

export const auth = Secp256k1Auth.fromMnemonic(seed.genesis).derive("cosmos");
export const rpcQuery = new RpcQuery(chain.osmosis.rpc);
