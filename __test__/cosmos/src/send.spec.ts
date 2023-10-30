import { Signer, WrapTypeUrl } from "@sign/cosmos";
import { TxRaw } from "@sign/cosmos";

import { AminoConverter } from "../codegen/cosmos/bank/v1beta1/tx.amino";
import { registry } from "../codegen/cosmos/bank/v1beta1/tx.registry";
import {
  Account1 as fromAccount,
  Account2 as toAccount,
  fetchBalance,
  fetchBaseAccount,
} from "./.setup";

const amount = 100;

let msgs: WrapTypeUrl<any>[];
let txRaw: TxRaw;
let signer: Signer;

beforeAll(async () => {
  signer = fromAccount.signer;
  signer.register(registry as any, AminoConverter);
  msgs = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount,
            denom: fromAccount.denom,
          },
        ],
        fromAddress: fromAccount.address,
        toAddress: toAccount.address,
      },
    },
  ];
  console.log("%csend.spec.ts line:37 msgs", "color: #007acc;", msgs);
  txRaw = await signer.sign({
    msgs,
    fee: {
      amount: [
        {
          denom: fromAccount.denom,
          amount: "500",
        },
      ],
      gasLimit: 200000n,
      payer: "",
      granter: "",
    },
  }).signed;
});

describe("MsgSend Broadcasting", () => {
  let senderSequenceBefore: bigint;
  let senderSequenceAfter: bigint;
  let receiverAmountBefore: bigint;
  let receiverAmountAfter: bigint;

  beforeAll(async () => {
    senderSequenceBefore = (await fetchBaseAccount(fromAccount)).sequence;
    console.log(
      "%csend.spec.ts line:57 senderSequenceBefore",
      "color: #007acc;",
      senderSequenceBefore
    );
    receiverAmountBefore = BigInt((await fetchBalance(toAccount)).amount);
    console.log(
      "%csend.spec.ts line:63 receiverAmountBefore",
      "color: #007acc;",
      receiverAmountBefore
    );
    const resp = await signer.broadcast(txRaw, true, true);
    console.log("%csend.spec.ts line:69 resp", "color: #007acc;", resp);
    senderSequenceAfter = (await fetchBaseAccount(fromAccount)).sequence;
    console.log(
      "%csend.spec.ts line:60 senderSequenceAfter",
      "color: #007acc;",
      senderSequenceAfter
    );
    receiverAmountAfter = BigInt((await fetchBalance(toAccount)).amount);
    console.log(
      "%csend.spec.ts line:76 receiverAmountAfter",
      "color: #007acc;",
      receiverAmountAfter
    );
  });

  test("fromAccount should increase sequence", async () => {
    expect(senderSequenceAfter).toEqual(senderSequenceBefore + 1n);
  });

  test("toAccount should receive balance", async () => {
    expect(receiverAmountAfter).toEqual(receiverAmountBefore + BigInt(amount));
  });
});

export { msgs, signer, txRaw };
