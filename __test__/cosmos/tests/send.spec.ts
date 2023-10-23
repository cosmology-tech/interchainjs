process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Signer, WrapTypeUrl } from "@sign/cosmos";
import { TxRaw } from "@sign/cosmos";

import { AminoConverter } from "../codegen/cosmos/bank/v1beta1/tx.amino";
import { registry } from "../codegen/cosmos/bank/v1beta1/tx.registry";
import { account1, account2 } from "./.prepare";

const timeout = 50000;

let msgs: WrapTypeUrl<any>[];
let txRaw: TxRaw;
let signer: Signer;

const prepare = async () => {
  signer = account1.signer;
  signer.register(registry as any, AminoConverter);
  msgs = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount: "100",
            denom: "uosmo",
          },
        ],
        fromAddress: account1.address,
        toAddress: account2.address,
      },
    },
  ];
  console.log("%csend.spec.ts line:41 12", "color: #007acc;", 12);
  txRaw = await signer.sign({
    msgs,
  }).signed;
  console.log(
    "%csend.spec.ts line:41 32",
    "color: #007acc;",
    txRaw.authInfoBytes
  );
};

describe("Broadcasting", () => {
  beforeAll(async () => {
    await prepare();
  });
  test(
    "should success",
    async () => {
      // const resp = await signer.broadcast(txRaw);
      // console.log(resp.height);
      // console.log(resp.txhash);
    },
    timeout
  );
});

export { msgs, prepare, signer, txRaw };
