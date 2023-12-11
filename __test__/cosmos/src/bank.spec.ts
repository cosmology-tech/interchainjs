import { toBase64 } from "@cosmonauts/core";
import { Message } from "@cosmonauts/cosmos-proto";
import { MsgSend } from "@cosmonauts/cosmos-stargate";

import {
  address,
  chain,
  ChainData,
  mockFee,
  seed,
  sign,
  signAmino,
  signAndBroadcast,
  signAndBroadcastWithCosmjs,
  Store,
} from "./setup";

const chainData: ChainData = chain.osmosis;
const signerAddress: string = address.osmosis.genesis;
const directStore: Store = new Store(chain.osmosis, seed.genesis);
const aminoStore: Store = new Store(chain.osmosis, seed.genesis, "amino");

describe("Send tokens", () => {
  const amount = "1000000";
  const msgSend: MsgSend = {
    amount: [
      {
        amount,
        denom: chainData.denom,
      },
    ],
    fromAddress: signerAddress,
    toAddress: address.osmosis.test1,
  };
  const messages: Message<MsgSend>[] = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSend,
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

  it("should success with helper methods", async () => {
    const resp = await directStore.stargateCosmjsSigner.sendTokens(
      signerAddress,
      msgSend,
      mockFee(chainData),
      ""
    );
    expect(resp.code).toEqual(0);
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
