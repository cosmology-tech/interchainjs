import { Secp256k1Auth } from "@cosmonauts/cosmos-proto";
import { toBech32 } from "@cosmonauts/cosmos-proto";

export interface ChainData {
  chainId: string;
  rpc: string;
  rest: string;
  prefix: string;
  denom: string;
}

export const chain: Record<string, ChainData> = {
  osmosis: {
    chainId: "osmosis-1",
    rpc: "http://localhost:26653",
    rest: "http://localhost:1313",
    prefix: "osmo",
    denom: "uosmo",
  },
  cosmoshub: {
    chainId: "cosmoshub-1",
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    prefix: "cosmos",
    denom: "uatom",
  },
};

export const seed: Record<string, string> = {
  genesis:
    "razor dog gown public private couple ecology paper flee connect local robot diamond stay rude join sound win ribbon soup kidney glass robot vehicle",
  test1:
    "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley",
};

function getAddress(prefix: string, seed: string) {
  const auth = Secp256k1Auth.fromMnemonic(seed);
  return toBech32(prefix, auth.key.address);
}

export const address = {
  osmosis: {
    genesis: getAddress(chain.osmosis.prefix, seed.genesis),
    test1: getAddress(chain.osmosis.prefix, seed.test1),
  },
  cosmoshub: {
    genesis: getAddress(chain.cosmoshub.prefix, seed.genesis),
    test1: getAddress(chain.cosmoshub.prefix, seed.test1),
  },
};
