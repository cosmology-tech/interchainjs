import { chain, seed, Store } from "./setup";

const store: Store = new Store(chain.osmosis, seed.genesis);
const signer = store.stargateCosmjsSigner;
const query = signer.query;

describe("Comet Methods", () => {
  it("should get status", async () => {
    const status = await query.getStatus();
    expect(status.network).toBe("osmosis-1");
  });

  it("should get block", async () => {
    const block = await signer.getBlock(12);
    expect(block.header.chainId).toBe("osmosis-1");
  });
});
