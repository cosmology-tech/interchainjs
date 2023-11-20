import { Message } from "@sign/cosmos-proto";
import { MsgSend } from "@sign/cosmos-stargate";

import { address, chain, seed, signAndBroadcast, Store } from "./setup";

describe("Send tokens", () => {
  const amount = "1000000";
  const messages: Message<MsgSend>[] = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount,
            denom: chain.osmosis.denom,
          },
        ],
        fromAddress: address.osmosis.genesis,
        toAddress: address.osmosis.test1,
      },
    },
  ];

  async function getRecord(store: Store) {
    const { sequence: fromSequence } = await store.query.getBaseAccount(
      address.osmosis.genesis
    );
    const toAmount = BigInt(
      (await store.query.getBalance(address.osmosis.test1, chain.osmosis.denom))
        .amount
    );
    return { fromSequence, toAmount };
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis, "amino"),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  });
});
