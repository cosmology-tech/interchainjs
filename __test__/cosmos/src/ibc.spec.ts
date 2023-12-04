import { Message } from "@sign/cosmos-proto";
import { MsgTransfer } from "@sign/cosmos-stargate";

import {
  address,
  chain,
  ChainData,
  QueryParserExt,
  seed,
  signAndBroadcast,
  Store,
} from "./setup";

let chainData: ChainData;
let signerAddress: string;
let directStore: Store;
let aminoStore: Store;
let query: QueryParserExt;

let recipientAddress: string;

beforeAll(async () => {
  chainData = chain.osmosis;
  signerAddress = address.osmosis.genesis;
  directStore = new Store(chain.osmosis, seed.genesis);
  aminoStore = new Store(chain.osmosis, seed.genesis, "amino");
  query = directStore.query;
  recipientAddress = address;
});

async function getRecord(store: Store) {
  const { sequence } = await store.query.getBaseAccount(signerAddress);
  const delegation = await query.getDelegation(signerAddress, validatorAddress);
  return { sequence, delegation: BigInt(delegation.balance.amount) };
}

describe("Send IBC tokens", () => {
  const delegationAmount = 1000000n;
  const messages: Message<MsgTransfer>[] = [
    {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sourcePort: sourcePort,
        sourceChannel: sourceChannel,
        sender: signerAddress,
        receiver: recipientAddress,
        token: transferAmount,
        timeoutHeight: timeoutHeight,
        timeoutTimestamp: timeoutTimestampNanoseconds,
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
    expect(before.delegation + delegationAmount).toEqual(after.delegation);
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
    expect(before.delegation + delegationAmount).toEqual(after.delegation);
  });
});
