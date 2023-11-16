import { Secp256k1Auth } from "@sign/core";
import { toBech32 } from "@sign/cosmos-proto";

import { chain, seed } from "./data";

export function getAddress(prefix: string, seed: string) {
  const auth = Secp256k1Auth.fromMnemonic(seed);
  return toBech32(prefix, auth.key.address);
}

export const address = {
  osmosis: {
    genesis: getAddress(chain.osmosis.prefix, seed.genesis),
    test1: getAddress(chain.osmosis.prefix, seed.test1),
  },
};
