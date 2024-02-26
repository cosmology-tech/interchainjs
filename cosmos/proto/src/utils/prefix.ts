import prefixJson from "../config/prefix.json";

export const getPrefix = (chainId: string): string => {
  const prefix = (prefixJson as any)[chainId];
  if (!prefix) {
    throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
  }
  return prefix;
};
