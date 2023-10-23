process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { calculateFee } from "@cosmjs/stargate";
import { toBase64 } from "@sign/core";

import { AminoConverter } from "../codegen/cosmos/bank/v1beta1/tx.amino";
import { registry } from "../codegen/cosmos/bank/v1beta1/tx.registry";
import { address, auth, client, rpc, signer } from "./.prepare.spec";

const timeout = 50000;

describe("Signing MsgSend", () => {
  signer.register(registry as any, AminoConverter);
  const msgSend = {
    amount: [
      {
        amount: "1",
        denom: "uosmo",
      },
    ],
    fromAddress: address,
    toAddress: address,
  };
  const wrappedMsgs = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSend,
    },
  ];

  let bodyBytes: string;
  let authInfoBytes: string;
  let signature: string;

  test(
    "prepare sign result with `cosmjs`",
    async () => {
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

  test(
    "should equals to result with Signer",
    async () => {
      const txRaw = await signer.on(rpc).by(auth).sign({
        msgs: wrappedMsgs,
      }).signed;
      expect(toBase64(txRaw.bodyBytes)).toEqual(bodyBytes);
      expect(toBase64(txRaw.authInfoBytes)).toEqual(authInfoBytes);
      expect(toBase64(txRaw.signatures[0])).toEqual(signature);
    },
    timeout
  );
});
