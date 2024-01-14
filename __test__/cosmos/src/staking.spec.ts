import { DeliverTxResponse } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import { StargateCosmjsSigner } from "@cosmonauts/cosmos-stargate";
import {
  BondStatus,
  bondStatusToJSON,
} from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/staking/v1beta1/staking";
import {
  MsgDelegate,
  MsgUndelegate,
} from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/staking/v1beta1/tx";

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

let validatorAddress: string;

beforeAll(async () => {
  const { validators } = await directSigner.validators({
    status: bondStatusToJSON(BondStatus.BOND_STATUS_BONDED),
  });
  // console.log("All validatores:", validators);
  validatorAddress = validators[0]?.operatorAddress;
  if (!validatorAddress) {
    throw new Error("No validators found.");
  }
  console.log("Validator:", validatorAddress);
});

async function getRecord(signer: StargateCosmjsSigner) {
  const { sequence } = await signer.request.getBaseAccount(signerAddress);
  const { delegationResponse } = await signer.getDelegation({
    delegatorAddr: signerAddress,
    validatorAddr: validatorAddress,
  });
  return { sequence, delegation: BigInt(delegationResponse.balance.amount) };
}

describe("Delegate tokens", () => {
  const delegationAmount = 1000000n;
  let messages: Message<MsgDelegate>[];

  beforeAll(() => {
    messages = [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: {
          delegatorAddress: signerAddress,
          validatorAddress,
          amount: {
            denom: chainData.denom,
            amount: delegationAmount.toString(),
          },
        },
      },
    ];
  });

  function expectSuccessfulBroadcast(
    resp: DeliverTxResponse,
    before?: { sequence: bigint; delegation: bigint },
    after?: { sequence: bigint; delegation: bigint }
  ) {
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation + delegationAmount).toEqual(after.delegation);
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
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should success with helper method", async () => {
      const { resp, before, after } = await helperBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
        helper: directSigner.delegateTokens,
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

describe("Undelegate tokens", () => {
  let messages: Message<MsgUndelegate>[];
  const undelegationAmount = 100000n;

  beforeAll(() => {
    messages = [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: {
          delegatorAddress: signerAddress,
          validatorAddress: validatorAddress,
          amount: {
            denom: chainData.denom,
            amount: undelegationAmount.toString(),
          },
        },
      },
    ];
  });

  function expectSuccessfulBroadcast(
    resp: DeliverTxResponse,
    before?: { sequence: bigint; delegation: bigint },
    after?: { sequence: bigint; delegation: bigint }
  ) {
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation - undelegationAmount).toEqual(after.delegation);
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
      expectSuccessfulBroadcast(resp, before, after);
    });

    it("should success with helper methods", async () => {
      const { resp, before, after } = await helperBroadcast({
        ...signParams,
        signer: directSigner,
        getRecord,
        helper: directSigner.undelegateTokens,
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
