import { Message } from "@sign/cosmos-proto";
import { MsgDelegate } from "@sign/cosmos-stargate";

import { address, chain, seed, signAndBroadcast, Store } from "./setup";

describe("Delegate tokens", () => {
  const chainData = chain.osmosis;
  const signerAddress = address.osmosis.genesis;
  const directStore = new Store(chain.osmosis, seed.genesis);
  const aminoStore = new Store(chain.osmosis, seed.genesis, "amino");
  const query = directStore.query;

  async function getMessages(): Promise<Message<MsgDelegate>[]> {
    const validators = await query.getValidators();
    console.log("All validatores:", validators);
    const validatorAddress = validators[0]?.operatorAddress;
    if (!validatorAddress) {
      throw new Error("No validators found.");
    }
    return [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: {
          delegatorAddress: signerAddress,
          validatorAddress,
          amount: {
            denom: chainData.denom,
            amount: "1000000",
          },
        },
      },
    ];
  }

  async function getRecord(store: Store) {
    const { sequence } = await store.query.getBaseAccount(signerAddress);
    return { sequence };
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      await getMessages(),
      directStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      await getMessages(),
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });
});
