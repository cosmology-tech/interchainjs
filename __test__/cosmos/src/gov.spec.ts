import { TextProposal } from "../codegen/cosmos/gov/v1beta1/gov";
import { address } from "./setup/address";
import { chain, seed } from "./setup/data";
import { SignerStore } from "./setup/signer-store";

describe("Gov: submit a proposal", () => {
  const messages = [
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

  async function signAndBroadcast(signType: "direct" | "amino" = "direct") {
    const store = new SignerStore(chain.osmosis, seed.genesis, signType);
    const resp = await store.cosmjsSigner.signAndBroadcast(
      address.osmosis.genesis,
      messages,
      "auto"
    );
    console.log("resp:", resp);
    return { resp };
  }

  it("should success with direct signing", async () => {
    const { resp } = await signAndBroadcast();
    expect(resp.code).toEqual(0);
  });

  it("should success with amino signing", async () => {
    const { resp } = await signAndBroadcast("amino");
    expect(resp.code).toEqual(0);
  });
});
