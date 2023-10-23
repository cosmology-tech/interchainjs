process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Secp256k1HdWallet } from "@cosmjs/amino";
import { calculateFee, SigningStargateClient } from "@cosmjs/stargate";
import { Auth, Secp256k1Auth, toBase64 } from "@sign/core";

import { cosmoshubAddress, mnemonic, rpcEndpoint } from "../../../test-data";
import { stargateSigner } from "../src/stargate";

const timeout = 50000;

describe("Signing MsgSend", () => {
  const msgSend = {
    amount: [
      {
        amount: "1",
        denom: "uatom",
      },
    ],
    fromAddress: cosmoshubAddress,
    toAddress: cosmoshubAddress,
  };
  const msgs = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSend,
    },
  ];

  const auth: Auth = Secp256k1Auth.fromMnemonic(mnemonic);

  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  test(
    "prepare sign result with `cosmjs`",
    async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet
      );
      const gasEstimation = await client.simulate(cosmoshubAddress, msgs, "");
      const usedFee = calculateFee(
        Math.round(gasEstimation * 1.3),
        "0.025uatom"
      );
      const txRaw = await client.sign(cosmoshubAddress, msgs, usedFee, "");
      bodyBytes = toBase64(txRaw.bodyBytes);
      authInfoBytes = toBase64(txRaw.authInfoBytes);
      signature = toBase64(txRaw.signatures[0]);
    },
    timeout
  );

  test(
    "should equals to result with Signer",
    async () => {
      const txRaw = await stargateSigner.on(rpcEndpoint).by(auth).sign({
        msgs,
      }).signed;
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );
});
