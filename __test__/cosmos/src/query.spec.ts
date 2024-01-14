import { toUtf8 } from "@cosmonauts/core";

import { chain, seed } from "./setup/data";
import { getCosmjsSigner } from "./setup/utils";

const signer = getCosmjsSigner({
  chainData: chain.osmosis,
  seed: seed.genesis,
});
const request = signer.request;

describe("Test Query", () => {
  it("should get status", async () => {
    const chainId = await signer.getChainId();
    expect(chainId).toBe("osmosis-1");
  });

  it("should get block", async () => {
    const block = await signer.getBlock(12);
    expect(block.header.chainId).toBe("osmosis-1");
  });

  // it("should get tx", async () => {
  //   const block = await signer.getTx(12);
  //   expect(block.header.chainId).toBe("osmosis-1");
  // });

  it("should get target proposal", async () => {
    const proposal = await request.proposal({ proposalId: 4n });
    console.log(proposal);
  });

  it("should get votingParams", async () => {
    const votingParams = await request.govParams({
      paramsType: "voting",
    });
    console.log(votingParams);
  });

  it("should get depositParams", async () => {
    const depositParams = await request.govParams({
      paramsType: "deposit",
    });
    console.log(depositParams);
  });

  it("should get tallyParams", async () => {
    const { tallyParams } = await request.govParams({
      paramsType: "tallying",
    });
    console.log("quorum", toUtf8(tallyParams.quorum));
    console.log("threshold", toUtf8(tallyParams.threshold));
    console.log("vetoThreshold", toUtf8(tallyParams.vetoThreshold));
  });
});
