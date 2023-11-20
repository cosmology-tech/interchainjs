import { Message } from "@sign/cosmos-proto";
import { MsgSubmitProposal, MsgVote } from "@sign/cosmos-stargate";

import { TextProposal } from "../codegen/cosmos/gov/v1beta1/gov";
import { address, chain, seed, signAndBroadcast, Store } from "./setup";

describe("Submit a proposal", () => {
  const messages: Message<MsgSubmitProposal>[] = [
    {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        proposer: address.osmosis.genesis,
        initialDeposit: [
          {
            amount: "1000000",
            denom: chain.osmosis.denom,
          },
        ],
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(
            TextProposal.fromPartial({
              title: "Test Proposal",
              description: "Test text proposal for the @sign testing",
            })
          ).finish(),
        },
      },
    },
  ];

  async function getRecord(store: Store) {
    const { sequence } = await store.query.getBaseAccount(
      address.osmosis.genesis
    );
    return { sequence };
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis, "amino"),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });
});

describe("Vote", () => {
  const messages: Message<MsgVote> = [
    {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposer: address.osmosis.genesis,
        initialDeposit: [
          {
            amount: "1000000",
            denom: chain.osmosis.denom,
          },
        ],
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(
            TextProposal.fromPartial({
              title: "Test Proposal",
              description: "Test text proposal for the @sign testing",
            })
          ).finish(),
        },
      },
    },
  ];

  async function getRecord(store: Store) {
    const { sequence } = await store.query.getBaseAccount(
      address.osmosis.genesis
    );
    return { sequence };
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      address.osmosis.genesis,
      messages,
      new Store(chain.osmosis, seed.genesis, "amino"),
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
  });
});
