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

export const address = {
  osmosis: {
    genesis: "osmo1qjtcxl86z0zua2egcsz4ncff2gzlcndz2jeczk",
    test1: "osmo1pss7nxeh3f9md2vuxku8q99femnwdjtc8ws4un",
  },
  cosmoshub: {
    genesis: "cosmos1qjtcxl86z0zua2egcsz4ncff2gzlcndzzf2g5y",
    test1: "cosmos1pss7nxeh3f9md2vuxku8q99femnwdjtc04r92p",
  },
};
