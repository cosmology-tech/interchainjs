process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Secp256k1AuthBase } from "../src";
import { toBase64 } from "../src/utils/encoding";
import { mnemonic, pubkey as pubkeyBaseline } from "./test-data";

const timeout = 50000;

describe("Slip10", () => {
  test(
    "getSeedFromMnemonic",
    async () => {
      const auth = await Secp256k1AuthBase.fromMnemonic(mnemonic);
      expect(toBase64(auth.key.pubkey)).toEqual(pubkeyBaseline);
    },
    timeout
  );
});
