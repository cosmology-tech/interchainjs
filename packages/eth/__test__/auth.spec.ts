/* eslint-disable no-console */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { fromBase64, fromUtf8, toHex } from "@sign/core";
import EthCrypto from "eth-crypto";

import { privkey } from "../../../test-data";
import { Secp256k1Auth } from "../src/auth";

const timeout = 50000;

describe("Auth", () => {
  const message = "foobar";
  let baselineSignature: string;

  test("prepare baseline", () => {
    const messageHash = EthCrypto.hash.keccak256(message);
    baselineSignature = EthCrypto.sign(toHex(fromBase64(privkey)), messageHash);
  });

  test(
    "should match",
    async () => {
      const auth = await Secp256k1Auth.fromPrivKey(fromBase64(privkey));
      const signature = auth.sign(fromUtf8(message));
      expect(`0x${toHex(signature)}`).toEqual(baselineSignature);
    },
    timeout
  );
});
