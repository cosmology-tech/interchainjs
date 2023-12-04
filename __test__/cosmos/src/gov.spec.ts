import { toBase64, toUtf8 } from "@sign/core";
import { DeliverTxResponse } from "@sign/cosmos-cosmjs";
import { Message } from "@sign/cosmos-proto";
import { MsgSubmitProposal, MsgVote } from "@sign/cosmos-stargate";

import { TextProposal, VoteOption } from "../codegen/cosmos/gov/v1beta1/gov";
import {
  address,
  chain,
  ChainData,
  QueryParserExt,
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
const query: QueryParserExt = directStore.query;

let proposalId: bigint;

describe("Submit a proposal", () => {
  const messages: Message<MsgSubmitProposal>[] = [
    {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        proposer: signerAddress,
        initialDeposit: [
          {
            amount: "1000000",
            denom: chainData.denom,
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
    const { sequence } = await store.query.getBaseAccount(signerAddress);
    return { sequence };
  }

  function getProposalId(resp: DeliverTxResponse) {
    const proposalIdEvent = resp.events.find(
      (event) => event.type === "submit_proposal"
    );
    const proposalId = BigInt(
      proposalIdEvent.attributes.find((attr) => attr.key === "proposal_id")
        .value
    );
    return proposalId;
  }

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      directStore,
      getRecord
    );
    proposalId = getProposalId(resp);
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
    proposalId = getProposalId(resp);
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
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
    expect(before.sequence + 1n).toEqual(after.sequence);
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

describe("Vote a proposal", () => {
  async function getMessages(): Promise<Message<MsgVote>[]> {
    return [
      {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          proposalId,
          voter: signerAddress,
          option: VoteOption.VOTE_OPTION_YES,
        },
      },
    ];
  }

  async function getRecord(store: Store) {
    const { sequence } = await store.query.getBaseAccount(signerAddress);
    return { sequence };
  }

  it("should get target proposal", async () => {
    const proposal = await query.getProposal(4n);
    console.log(proposal);
  });

  it("should get votingParams", async () => {
    const votingParams = await query.getVotingParams();
    console.log(votingParams);
  });

  it("should get depositParams", async () => {
    const depositParams = await query.getDepositParams();
    console.log(depositParams);
  });

  it("should get tallyParams", async () => {
    const tallyParams = await query.getTallyParams();
    console.log("quorum", toUtf8(tallyParams.quorum));
    console.log("threshold", toUtf8(tallyParams.threshold));
    console.log("vetoThreshold", toUtf8(tallyParams.vetoThreshold));
  });

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
