process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { privkey } from "../../../test-data";
import { Secp256k1Auth } from "../src/auth";
import { fromBase64, fromUtf8 } from "../src/utils/encoding";

describe("Verify", () => {
  const msg = fromUtf8("foolala");
  const msg2 = fromUtf8("foolalaa");
  test("derive private key", () => {
    const auth = Secp256k1Auth.fromPrivKey(fromBase64(privkey));
    const signature = auth.sign(msg);
    expect(auth.verify(msg, signature)).toBe(true);
    expect(auth.verify(msg, auth.sign(msg2))).toBe(false);
  });
});
