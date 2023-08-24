process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { mnemonic, seed as seedBaseline } from "../../../test-data";
import { toBase64 } from "../src/utils/encoding";
import { getSeedFromMnemonic } from "../src/utils/mnemonic";

const timeout = 50000;

describe("Mnemonic", () => {
  test(
    "getSeedFromMnemonic",
    async () => {
      const seed = await getSeedFromMnemonic(mnemonic);
      expect(toBase64(seed)).toEqual(seedBaseline);
    },
    timeout
  );
});
