process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { calculateFee } from "@cosmjs/stargate";
import { toBase64 } from "@sign/core";

import { account1, prepareCosmjs } from "./.prepare";
import { msgs, prepare as prepareSend, txRaw } from "./send.spec";

const timeout = 50000;

describe("Signing MsgSend", () => {
  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  beforeAll(async () => {
    await prepareSend();
    const { client } = await prepareCosmjs("osmosis", "genesis");

    const gasEstimation = await client.simulate(account1.address, msgs, "");
    const usedFee = calculateFee(Math.round(gasEstimation * 1.3), "0.025uatom");
    const txRaw = await client.sign(account1.address, msgs, usedFee, "");
    bodyBytes = toBase64(txRaw.bodyBytes);
    authInfoBytes = toBase64(txRaw.authInfoBytes);
    signature = toBase64(txRaw.signatures[0]);
  }, timeout);

  test(
    "should equals to result with Signer",
    async () => {
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );
});
