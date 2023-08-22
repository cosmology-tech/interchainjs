process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { pbkdf2Sha512 } from "@cosmjs/crypto/build/pbkdf2";

import { fromUtf8, toBase64 } from "../src/utils/encoding";
import { getSeedFromMnemonic } from "../src/utils/mnemonic";
import { mnemonic } from "./test-data";

const timeout = 50000;

async function getSeedFromMnemonicBaseline(
  mnemonic: string,
  password?: string
) {
  const mnemonicBytes = fromUtf8(mnemonic.normalize("NFKD"));
  const salt = "mnemonic" + (password ? password.normalize("NFKD") : "");
  const seed = await pbkdf2Sha512(mnemonicBytes, fromUtf8(salt), 2048, 64);
  return seed;
}

describe("Mnemonic", () => {
  test(
    "getSeedFromMnemonic",
    async () => {
      const seed = await getSeedFromMnemonic(mnemonic);
      const seedBaseline = await getSeedFromMnemonicBaseline(mnemonic);
      expect(toBase64(seed)).toEqual(toBase64(seedBaseline));
    },
    timeout
  );
});
