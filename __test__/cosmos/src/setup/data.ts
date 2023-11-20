import { Secp256k1Auth } from "@sign/core";
import { toBech32 } from "@sign/cosmos-proto";

export const chain = {
  osmosis: {
    rpc: "http://localhost:26653",
    rest: "http://localhost:1313",
    prefix: "osmo",
    denom: "uosmo",
  },
  // cosmoshub: {
  //   rpc: "http://localhost:26657",
  //   rest: "http://localhost:1317",
  //   prefix: "cosmos",
  //   denom: "uatom",
  // },
};

export const seed = {
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
};
