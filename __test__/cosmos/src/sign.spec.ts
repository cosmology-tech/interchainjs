import { Secp256k1HdWallet, StdFee } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { toBase64 } from "@sign/core";

import { fee, msgs, target, txRaw } from "./gov.spec";

describe("Test signing", () => {
  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  beforeAll(async () => {
    const wallet = await Secp256k1HdWallet.fromMnemonic(target.seed, {
      prefix: target.prefix,
    });
    const client = await SigningStargateClient.connectWithSigner(
      target.rpc,
      wallet
    );

    // const gasEstimation = await client.simulate(account.address, msgs, "");
    // const usedFee = calculateFee(Math.round(gasEstimation * 1.3), "0.025uatom");
    const stdFee: StdFee = { amount: fee.amount, gas: fee.gasLimit.toString() };
    const txRaw = await client.sign(target.address, msgs, stdFee, "");
    bodyBytes = toBase64(txRaw.bodyBytes);
    authInfoBytes = toBase64(txRaw.authInfoBytes);
    signature = toBase64(txRaw.signatures[0]);
  });

  test("should equals to cosmjs result", async () => {
    expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
    expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
    expect(toBase64(txRaw.signatures[0])).toEqual(signature);
  });
});
