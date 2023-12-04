import { Message } from "@cosmonauts/cosmos-proto";
import { MsgTransfer } from "@cosmonauts/cosmos-stargate";

import {
  address,
  chain,
  ChainData,
  seed,
  signAndBroadcast,
  Store,
} from "./setup";

const chainData: ChainData = chain.osmosis;
const signerAddress: string = address.osmosis.genesis;
const directStore: Store = new Store(chain.osmosis, seed.genesis);
const aminoStore: Store = new Store(chain.osmosis, seed.genesis, "amino");

const recipientAddress: string = address.cosmoshub.test1;

async function getRecord(store: Store) {
  const { sequence } = await store.query.getBaseAccount(signerAddress);
  return { sequence };
}

describe("Send IBC tokens", () => {
  const amount = 1000000n;
  const messages: Message<MsgTransfer>[] = [
    {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sourcePort: "transfer",
        sourceChannel: "channel-0",
        sender: signerAddress,
        receiver: recipientAddress,
        token: {
          amount: amount.toString(),
          denom: chain.osmosis.denom,
        },
        timeoutHeight: {
          revisionHeight: 0n,
          revisionNumber: 0n,
        },
        timeoutTimestamp: BigInt(Math.floor(Date.now() / 1000) + 120),
        memo: "",
      },
    },
  ];

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
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
      messages,
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });
});
