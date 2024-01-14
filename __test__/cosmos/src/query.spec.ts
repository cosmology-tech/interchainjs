import { toUtf8 } from "@cosmonauts/core";

import { chain, seed } from "./setup/data";
import { getStargateCosmjsSigner } from "./setup/utils";

const signer = getStargateCosmjsSigner({
  chainData: chain.osmosis,
  seed: seed.genesis,
});

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
    const proposal = await signer.proposal({ proposalId: 4n });
    console.log(proposal);
  });

  it("should get votingParams", async () => {
    const votingParams = await signer.getGovParams({
      paramsType: "voting",
    });
    console.log(votingParams);
  });

  it("should get depositParams", async () => {
    const depositParams = await signer.getGovParams({
      paramsType: "deposit",
    });
    console.log(depositParams);
  });

  it("should get tallyParams", async () => {
    const { tallyParams } = await signer.getGovParams({
      paramsType: "tallying",
    });
    console.log("quorum", toUtf8(tallyParams.quorum));
    console.log("threshold", toUtf8(tallyParams.threshold));
    console.log("vetoThreshold", toUtf8(tallyParams.vetoThreshold));
  });
});
