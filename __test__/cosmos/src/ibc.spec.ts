import { CosmjsSigner } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import { MsgTransfer } from "@cosmonauts/cosmos-stargate/src/codegen/ibc/applications/transfer/v1/tx";

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

const recipientAddress: string = address.cosmoshub.test1;

async function getRecord(signer: CosmjsSigner) {
  const { sequence } = await signer.getSequence(signerAddress);
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
          revisionHeight: 13417750n,
          revisionNumber: 1n,
        },
        // timeoutTimestamp: BigInt(Math.floor(Date.now() / 1000) + 12000000000),
        timeoutTimestamp: 0n,
        memo: "",
      },
    },
  ];

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

    // this test may fail because wrong setting of starship. we're handling it.
    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });

    // this test may fail because wrong setting of starship. we're handling it.
    it.skip("should success with helper method", async () => {
      const { resp, before, after } = await helperBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
        helper: directSigner.sendIbcTokens,
      });
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

    // this test may fail because wrong setting of starship. we're handling it.
    it.skip("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: aminoSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });
  });
});
