import { DeliverTxResponse } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import { StargateCosmjsSigner } from "@cosmonauts/cosmos-stargate";
import { MsgSend } from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/bank/v1beta1/tx";

import { address, chain, ChainData, seed } from "./setup/data";
import { expectTxRawMatch } from "./setup/expect";
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

describe("Send tokens", () => {
  const amount = "1000000";
  const messages: Message<MsgSend>[] = [
    {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        amount: [
          {
            amount,
            denom: chainData.denom,
          },
        ],
        fromAddress: signerAddress,
        toAddress: address.osmosis.test1,
      },
    },
  ];

  const signParams = {
    chainData,
    signerAddress,
    messages,
  };

  async function getRecord(signer: StargateCosmjsSigner) {
    const { sequence: fromSequence } = await signer.getSequence(signerAddress);
    const toAmount = BigInt(
      (
        await signer.getBalance({
          address: address.osmosis.test1,
          denom: chainData.denom,
        })
      ).balance.amount
    );
    return { fromSequence, toAmount };
  }

  function expectSuccessfulBroadcast(
    resp: DeliverTxResponse,
    before?: { fromSequence: bigint; toAmount: bigint },
    after?: { fromSequence: bigint; toAmount: bigint }
  ) {
    expect(resp.code).toEqual(0);
    expect(before.fromSequence + 1n).toEqual(after.fromSequence);
    expect(before.toAmount + BigInt(amount)).toEqual(after.toAmount);
  }

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

    it("should success with helper method", async () => {
      const { resp, before, after } = await helperBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
        helper: directSigner.sendTokens,
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
