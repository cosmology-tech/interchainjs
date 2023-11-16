import { address } from "./setup/address";
import { chain, seed } from "./setup/data";
import { SignerStore } from "./setup/signer-store";
import { fetchBalance } from "./setup/utils";

describe("Bank: send tokens", () => {
  const amount = "1000000";
  const messages = [
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

  async function getRecord(store: SignerStore) {
    const { sequence } = await store.cosmjsSigner.getSequence(
      address.osmosis.genesis
    );
    const amount = BigInt(
      (
        await fetchBalance(
          store.cosmjsSigner.aminoSigner.query,
          address.osmosis.test1,
          chain.osmosis.denom
        )
      ).amount
    );
    return { sequence, amount };
  }

  async function signAndBroadcast(signType: "direct" | "amino" = "direct") {
    const store = new SignerStore(chain.osmosis, seed.genesis, signType);

    const recBefore = await getRecord(store);

    const resp = await store.cosmjsSigner.signAndBroadcast(
      address.osmosis.genesis,
      messages,
      2
    );
    console.log("resp:", resp);

    const recAfter = await getRecord(store);

    return {
      resp,
      recBefore,
      recAfter,
    };
  }

  it("should success with direct signing", async () => {
    const { resp, recBefore, recAfter } = await signAndBroadcast();
    expect(resp.code).toEqual(0);
    expect(recBefore.sequence).toEqual(recAfter.sequence + 1n);
    expect(recBefore.amount).toEqual(recAfter.amount + BigInt(amount));
  });

  it("should success with amino signing", async () => {
    const { resp, recBefore, recAfter } = await signAndBroadcast();
    expect(resp.code).toEqual(0);
    expect(recBefore.sequence).toEqual(recAfter.sequence + 1n);
    expect(recBefore.amount).toEqual(recAfter.amount + BigInt(amount));
  });
});
