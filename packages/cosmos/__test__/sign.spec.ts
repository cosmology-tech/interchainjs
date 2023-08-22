process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Secp256k1HdWallet } from "@cosmjs/amino";
import { calculateFee, SigningStargateClient } from "@cosmjs/stargate";
import { toBase64 } from "@sign/core";
import { Auth } from "@sign/core";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

import { MsgSendParser, StargateMsgParserPool } from "../src/const";
import { Secp256k1Auth } from "../src/core/auth";
import { WrapTypeUrl } from "../src/types";
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
    MsgSendParser.fromProto(msgSend).wrap().pop() as WrapTypeUrl<MsgSend>,
  ];
  // const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
  const rpcEndpoint = "https://cosmos-rpc.quickapi.com:443";

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
      const txRaw = await MsgSendParser.on(rpcEndpoint).by(auth).sign({ msgs });
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );

  test(
    "should equals to result with MsgParserPool",
    async () => {
      const txRaw = await StargateMsgParserPool.on(rpcEndpoint).by(auth).sign({
        msgs: wrappedMsgs,
      });
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );
});
