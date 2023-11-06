import { chains } from "chain-registry";
import fs from "fs";

const entries = chains
  .map((chain) => {
    return [chain.chain_id, chain.fees?.fee_tokens] as [string, any];
  })
  .filter(([, feeTokens]) => feeTokens && feeTokens.length !== 0)
  .sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

const json = Object.fromEntries(entries);
delete json[""];

fs.writeFile(
  "/Users/june/code/sign/packages/cosmos/src/core/config/fee-tokens.json",
  JSON.stringify(json, void 0, 2),
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
