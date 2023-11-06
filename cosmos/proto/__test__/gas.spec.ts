import { getAvgGasPrice } from "../src/utils/fee";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

const chainId = "cosmoshub-4";

describe("Gas", () => {
  test("get average gas price", async () => {
    const p = getAvgGasPrice(chainId);
    console.log(
      "%cgas.spec.ts line:15 p",
      "color: #007acc;",
      p.amount.toString()
    );
  });
});
