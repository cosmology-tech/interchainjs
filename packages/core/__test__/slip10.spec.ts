process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { privkey as privkeyBaseline, seed } from "../../../test-data";
import { defaultHdPath } from "../src";
import { fromBase64, toBase64 } from "../src/utils/encoding";
import { Slip10, Slip10Curve } from "../src/utils/slip10";

const timeout = 50000;

describe("Slip10", () => {
  test(
    "derive private key",
    async () => {
      const { privkey } = Slip10.derivePath(
        Slip10Curve.Secp256k1,
        fromBase64(seed),
        defaultHdPath
      );
      expect(toBase64(privkey)).toEqual(privkeyBaseline);
    },
    timeout
  );
});
