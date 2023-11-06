import { Fee, Signer, TxResponse, WrapTypeUrl } from "@sign/cosmos";
import { TxRaw } from "@sign/cosmos";

import { MsgSend } from "../codegen/cosmos/bank/v1beta1/tx";
import { AminoConverter } from "../codegen/cosmos/bank/v1beta1/tx.amino";
import { registry } from "../codegen/cosmos/bank/v1beta1/tx.registry";
import {
  fetchBalance,
  fetchBaseAccount,
  prepared1 as fromTarget,
  prepared2 as toTarget,
} from "./.setup";

const amount = "100000000";

let msgs: WrapTypeUrl<MsgSend>[];
let fee: Fee;
let txRaw: TxRaw;
let signer: Signer;

beforeAll(async () => {
  signer = fromTarget.signer;
  signer.register(registry, AminoConverter);
  msgs = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount,
            denom: fromTarget.denom,
          },
        ],
        fromAddress: fromTarget.address,
        toAddress: toTarget.address,
      },
    },
  ];
  fee = {
    amount: [
      {
        denom: fromTarget.denom,
        amount: "500",
      },
    ],
    gasLimit: 200000n,
    payer: "",
    granter: "",
  };
  txRaw = await signer.sign({ msgs, fee }).signed;
});

describe("MsgSend Broadcasting", () => {
  let senderSequenceBefore: bigint;
  let senderSequenceAfter: bigint;
  let receiverAmountBefore: bigint;
  let receiverAmountAfter: bigint;
  let resp: TxResponse;

  beforeAll(async () => {
    senderSequenceBefore = (await fetchBaseAccount(fromTarget)).sequence;
    receiverAmountBefore = BigInt((await fetchBalance(toTarget)).amount);
    resp = await signer.broadcast(txRaw, true, true);
    senderSequenceAfter = (await fetchBaseAccount(fromTarget)).sequence;
    receiverAmountAfter = BigInt((await fetchBalance(toTarget)).amount);
  });

  test("resp code should be 0", () => {
    if (resp?.code !== 0) {
      console.log("MsgSend Broadcasting Failed", resp?.log);
    }
    expect(resp?.code).toEqual(0);
  });

  test("fromAddress should increase sequence", async () => {
    expect(senderSequenceAfter).toEqual(senderSequenceBefore + 1n);
  });

  test("toAddress should receive balance", async () => {
    expect(receiverAmountAfter).toEqual(receiverAmountBefore + BigInt(amount));
  });
});

export { fee, msgs, signer, fromTarget as target, txRaw };
