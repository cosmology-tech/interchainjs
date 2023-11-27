import { toBase64 } from "@sign/core";
import { Message } from "@sign/cosmos-proto";
import { MsgSend } from "@sign/cosmos-stargate";

import {
  address,
  chain,
  seed,
  sign,
  signAmino,
  signAndBroadcast,
  signAndBroadcastWithCosmjs,
  Store,
} from "./setup";

describe("Send tokens", () => {
  const chainData = chain.osmosis;
  const signerAddress = address.osmosis.genesis;
  const directStore = new Store(chainData, seed.genesis);
  const aminoStore = new Store(chainData, seed.genesis, "amino");

  const amount = "1000000";
  const messages: Message<MsgSend>[] = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount,
            denom: chainData.denom,
          },
        ],
        fromAddress: signerAddress,
        toAddress: address.osmosis.test1,
      },
    },
  ];

  async function getRecord(store: Store) {
    const { sequence: fromSequence } =
      await store.query.getBaseAccount(signerAddress);
    const toAmount = BigInt(
      (await store.query.getBalance(address.osmosis.test1, chainData.denom))
        .amount
    );
    return { fromSequence, toAmount };
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      directStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  });

  it("should success with AMINO signing using @cosmjs", async () => {
    const { resp, before, after } = await signAndBroadcastWithCosmjs(
      chainData,
      signerAddress,
      messages,
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  });

  it("should match wallet AMINO signing with @cosmjs", async () => {
    const { fromSign, fromCosmjs } = await signAmino(
      chainData,
      signerAddress,
      messages,
      aminoStore
    );
    expect(fromSign.signature.signature).toEqual(
      fromCosmjs.signature.signature
    );
  });

  it("should match signer/signingClient AMINO signing with @cosmjs", async () => {
    const { fromSign, fromCosmjs } = await sign(
      chainData,
      signerAddress,
      messages,
      aminoStore
    );
    expect(toBase64(fromSign.bodyBytes)).toEqual(
      toBase64(fromCosmjs.bodyBytes)
    );
    expect(toBase64(fromSign.authInfoBytes)).toEqual(
      toBase64(fromCosmjs.authInfoBytes)
    );
    expect(toBase64(fromSign.signatures[0])).toEqual(
      toBase64(fromCosmjs.signatures[0])
    );
  });
});
