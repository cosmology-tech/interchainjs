import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { calculateFee } from "@cosmjs/stargate";
import { toBase64 } from "@sign/core";

import data from "../.data.json";
import { Account1 as account, Chain } from "./.setup";
import { msgs, txRaw } from "./send.spec";

const prepareCosmjs = async (chain: string, account: string) => {
  const { rpc } = (data as any)[chain];
  const { seed } = (data as any)[chain][account];
  const wallet = await Secp256k1HdWallet.fromMnemonic(seed);
  const client = await SigningStargateClient.connectWithSigner(rpc, wallet);
  return { wallet, client };
};

describe("Signing MsgSend", () => {
  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  beforeAll(async () => {
    const { client } = await prepareCosmjs(Chain, account.slug);

    const gasEstimation = await client.simulate(account.address, msgs, "");
    const usedFee = calculateFee(Math.round(gasEstimation * 1.3), "0.025uatom");
    const txRaw = await client.sign(account.address, msgs, usedFee, "");
    bodyBytes = toBase64(txRaw.bodyBytes);
    authInfoBytes = toBase64(txRaw.authInfoBytes);
    signature = toBase64(txRaw.signatures[0]);
  });

  test("should equals to result with Signer", async () => {
    expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
    expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
    expect(toBase64(txRaw.signatures[0])).toEqual(signature);
  });
});
