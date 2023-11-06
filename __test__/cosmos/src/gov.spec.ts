import { Fee, Signer, TxRaw, TxResponse, WrapTypeUrl } from "@sign/cosmos";

import {
  ProposalStatus,
  TextProposal,
} from "../codegen/cosmos/gov/v1beta1/gov";
import { QueryClientImpl as Gov } from "../codegen/cosmos/gov/v1beta1/query.rpc.Query";
import { MsgSubmitProposal, MsgVote } from "../codegen/cosmos/gov/v1beta1/tx";
import { AminoConverter } from "../codegen/cosmos/gov/v1beta1/tx.amino";
import { registry } from "../codegen/cosmos/gov/v1beta1/tx.registry";
import { prepared2 as target, PreparedType } from "./.setup";

const fetchProposals = async (prepared: PreparedType) => {
  const { query } = prepared;
  // const query = new Query("https://rpc-cosmoshub.blockapsis.com");
  const gov = query.about(Gov);
  const { proposals } = await gov.proposals({
    proposalStatus: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
    // proposalStatus: ProposalStatus.PROPOSAL_STATUS_PASSED,
    voter: "",
    depositor: "",
  });
  return proposals;
};

let proposalId: bigint;

let msgs: WrapTypeUrl<MsgSubmitProposal | MsgVote>[];
let fee: Fee;
let txRaw: TxRaw;
let signer: Signer;

beforeAll(async () => {
  signer = target.signer;
  signer.register(registry, AminoConverter);
  const content = TextProposal.fromPartial({
    title: "Test Proposal",
    description: "Test text proposal for the @sign testing",
  });
  msgs = [
    {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        proposer: target.address,
        initialDeposit: [
          {
            amount: "1000000",
            denom: target.denom,
          },
        ],
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(content).finish(),
        },
      },
    },
  ];
  fee = {
    amount: [
      {
        amount: "100000",
        denom: target.denom,
      },
    ],
    gasLimit: 200000n,
    granter: "",
    payer: "",
  };
  txRaw = await signer.sign({ msgs, fee }).signed;
});

describe("MsgSubmitProposal Broadcasting", () => {
  let proposalsNumBefore: number;
  let resp: TxResponse;

  beforeAll(async () => {
    const proposals = await fetchProposals(target);
    proposalsNumBefore = proposals.length;
    resp = await signer.broadcast(txRaw);
  });

  test("resp code should be 0", () => {
    if (resp?.code !== 0) {
      console.log(
        `MsgSubmitProposal broadcasting failed\n\n${JSON.stringify(
          resp,
          null,
          4
        )}`
      );
    }
    expect(resp?.code).toEqual(0);
  });

  test("should submitted a proposal", async () => {
    const proposals = await fetchProposals(target);
    console.log(
      "%cgov.spec.ts line:33 proposals",
      "color: #007acc;",
      proposals
    );
    expect(proposals.length).toEqual(proposalsNumBefore + 1);
  });
});

export { fee, msgs, signer, target, txRaw };

// describe("MsgVote Broadcasting", () => {
//   let resp: TxResponse;

//   beforeAll(async () => {
//     const proposals = await fetchProposals(target);
//     console.log(
//       "%cgov.spec.ts line:91 proposals",
//       "color: #007acc;",
//       proposals
//     );
//     const msgs: WrapTypeUrl<MsgVote>[] = [
//       {
//         typeUrl: "/cosmos.gov.v1beta1.MsgVote",
//         value: {
//           proposalId,
//           voter: target.address,
//           option: VoteOption.VOTE_OPTION_YES,
//         },
//       },
//     ];
//     // resp = await signer.sign({ msgs }).broadcast();
//   });

//   test("resp code should be 0", () => {
//     // if (resp?.code !== 0) {
//     //   console.log("MsgSubmitProposal Broadcasting Failed", resp?.log);
//     // }
//     // expect(resp?.code).toEqual(0);
//   });

//   test("should voted", async () => {
//     const proposals = await fetchProposals(target);
//     console.log(
//       "%cgov.spec.ts line:33 proposals",
//       "color: #007acc;",
//       proposals
//     );
//     expect(proposals.length).toEqual(1);
//   });
// });
