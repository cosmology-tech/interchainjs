/* eslint-disable no-console */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Secp256k1Auth, toBase64 } from "@sign/core";

import { cosmoshubAddress, mnemonic, rpcEndpoint } from "../../../test-data";
import { stargateSigner } from "../src/stargate";

const timeout = 50000;

describe("MsgSend Sign", () => {
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

  test(
    "should successfully run",
    async () => {
      const auth = await Secp256k1Auth.fromMnemonic(mnemonic);
      const txRaw = await stargateSigner.on(rpcEndpoint).by(auth).sign({ msgs })
        .signed;
      console.log(toBase64(txRaw.bodyBytes));
      console.log(toBase64(txRaw.authInfoBytes));
      console.log(toBase64(txRaw.signatures[0]));
    },
    timeout
  );
});
