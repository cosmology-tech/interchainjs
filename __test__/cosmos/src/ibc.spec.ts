import { CosmjsSigner } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import { MsgTransfer } from "@cosmonauts/cosmos-stargate/src/codegen/ibc/applications/transfer/v1/tx";

import { address, chain, ChainData, seed } from "./setup/data";
import { expectSuccessfulBroadcast, expectTxRawMatch } from "./setup/expect";
import {
  getCosmjsSigner,
  getSigningStargateClient,
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
const directSigner = getCosmjsSigner(params);
const aminoSigner = getCosmjsSigner(params, "amino");

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
          revisionHeight: 0n,
          revisionNumber: 0n,
        },
        timeoutTimestamp: BigInt(Math.floor(Date.now() / 1000) + 120),
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

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should success with helper methods", async () => {
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

    it("should successfully broadcast", async () => {
      const { resp, before, after } = await signAndBroadcast({
        ...signParams,
        signer: aminoSigner,
        getRecord,
      });
      expectSuccessfulBroadcast(resp, before, after);
    });
  });
});
