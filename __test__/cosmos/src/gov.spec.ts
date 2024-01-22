import { CosmjsSigner, DeliverTxResponse } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import {
  TextProposal,
  VoteOption,
} from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/gov/v1beta1/gov";
import {
  MsgSubmitProposal,
  MsgVote,
} from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/gov/v1beta1/tx";

import { address, chain, ChainData, seed } from "./setup/data";
import { expectSuccessfulBroadcast, expectTxRawMatch } from "./setup/expect";
import {
  getSigningStargateClient,
  getStargateCosmjsSigner,
  helperBroadcast,
  sign,
  signAndBroadcast,
} from "./setup/utils";

const chainData: ChainData = chain.osmosis;
const signerAddress: string = address.osmosis.genesis;

const params = {
  chainData,
  seed: seed.genesis,
};
const directSigner = getStargateCosmjsSigner(params);
const aminoSigner = getStargateCosmjsSigner(params, "amino");

async function getRecord(signer: CosmjsSigner) {
  const { sequence } = await signer.getSequence(signerAddress);
  return { sequence };
}

let proposalId: bigint;

describe("Submit a proposal", () => {
  const content: TextProposal = {
    title: "Test Proposal",
    description: "Test text proposal for the @sign testing",
  };
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
            TextProposal.fromPartial(content)
          ).finish(),
        },
      },
    },
  ];

  const messages2: Message<MsgSubmitProposal>[] = [
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
        content: content,
      },
    },
  ];

  function getProposalId(resp: DeliverTxResponse) {
    const proposalIdEvent = JSON.parse(resp.rawLog)[0].events.find(
      (event: any) => event.type === "submit_proposal"
    );
    const proposalId = BigInt(
      proposalIdEvent.attributes.find((attr: any) => attr.key === "proposal_id")
        .value
    );
    console.log("Submitted proposal id:", proposalId);
    return proposalId;
  }

  const signParams = {
    chainData,
    signerAddress,
    messages,
  };

  describe("DIRECT signing", () => {
    it("should match signing result with V1", async () => {
      const { v1Result, v2Result } = await sign({
        ...signParams,
        signerV1: await getSigningStargateClient(params),
        signerV2: directSigner,
      });
      expectTxRawMatch(v1Result, v2Result);
    });

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
      });
      proposalId = getProposalId(resp);
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should successfully broadcast with TextProposal object rather than Any", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        messages: messages2,
        signer: directSigner,
        getRecord,
      });
      proposalId = getProposalId(resp);
      expectSuccessfulBroadcast(resp, before, after);
    });
  });

  describe("AMINO signing", () => {
    it("should match signing result with V1", async () => {
      const { v1Result, v2Result } = await sign({
        ...signParams,
        signerV1: await getSigningStargateClient(params, "amino"),
        signerV2: aminoSigner,
      });
      expectTxRawMatch(v1Result, v2Result);
    });

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: aminoSigner,
        getRecord,
      });
      proposalId = getProposalId(resp);
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should successfully broadcast with TextProposal object rather than Any", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        messages: messages2,
        signer: aminoSigner,
        getRecord,
      });
      proposalId = getProposalId(resp);
      expectSuccessfulBroadcast(resp, before, after);
    });
  });
});

describe("Vote a proposal", () => {
  async function getMessages(): Promise<Message<MsgVote>[]> {
    return [
      {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          proposalId: 4n,
          voter: signerAddress,
          option: VoteOption.VOTE_OPTION_YES,
        },
      },
    ];
  }

  const signParams = {
    chainData,
    signerAddress,
  };

  describe("DIRECT signing", () => {
    it("should match signing result with V1", async () => {
      const { v1Result, v2Result } = await sign({
        ...signParams,
        messages: await getMessages(),
        signerV1: await getSigningStargateClient(params),
        signerV2: directSigner,
      });
      expectTxRawMatch(v1Result, v2Result);
    });

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        messages: await getMessages(),
        signer: directSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should successfully helper method", async () => {
      const { resp, before, after } = await helperBroadcast({
        ...signParams,
        messages: await getMessages(),
        signer: directSigner,
        getRecord,
        helper: directSigner.vote,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });
  });

  describe("AMINO signing", () => {
    it("should match signing result with V1", async () => {
      const { v1Result, v2Result } = await sign({
        ...signParams,
        messages: await getMessages(),
        signerV1: await getSigningStargateClient(params, "amino"),
        signerV2: aminoSigner,
      });
      expectTxRawMatch(v1Result, v2Result);
    });

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        messages: await getMessages(),
        signer: aminoSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });
  });
});
