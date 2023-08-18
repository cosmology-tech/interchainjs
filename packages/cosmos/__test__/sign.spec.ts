process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Secp256k1HdWallet } from "@cosmjs/amino";
import { toBase64 } from "@cosmjs/encoding";
import { calculateFee, SigningStargateClient } from "@cosmjs/stargate";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

import { msgSendParser, stargateMsgPoolParser } from "../src/const";
import { Secp256k1Auth } from "../src/core/auth";
import { Auth, WrapTypeUrl } from "../src/types";
import { mnemonic2 } from "./test-data";

const timeout = 50000;

describe("MsgSend Sign", () => {
  const address = "cosmos1k0c55lcmsrvrj2j39tz4d5yeysvdd2pk20ae3t";
  const msgSend = {
    amount: [
      {
        amount: "1",
        denom: "uatom",
      },
    ],
    fromAddress: address,
    toAddress: address,
  };
  const msgs = [msgSend];
  const wrappedMsgs = [
    /**
     * {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        }
     */
    msgSendParser.fromProto(msgSend).wrap().pop() as WrapTypeUrl<MsgSend>,
  ];
  const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";

  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  test(
    "prepare sign result with `cosmjs`",
    async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic2);
      const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet
      );
      const gasEstimation = await client.simulate(address, wrappedMsgs, "");
      const usedFee = calculateFee(
        Math.round(gasEstimation * 1.3),
        "0.025uatom"
      );
      const txRaw = await client.sign(address, wrappedMsgs, usedFee, "");
      bodyBytes = toBase64(txRaw.bodyBytes);
      authInfoBytes = toBase64(txRaw.authInfoBytes);
      signature = toBase64(txRaw.signatures[0]);
    },
    timeout
  );

  let auth: Auth;

  test("prepare auth", async () => {
    auth = await Secp256k1Auth.fromMnemonic(mnemonic2);
  });

  test(
    "should equals to result with MsgParser",
    async () => {
      const txRaw = await msgSendParser.on(rpcEndpoint).by(auth).sign({ msgs });
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );

  test(
    "should equals to result with MsgPoolParser",
    async () => {
      const txRaw = await stargateMsgPoolParser.on(rpcEndpoint).by(auth).sign({
        msgs: wrappedMsgs,
      });
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );
});
