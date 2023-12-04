import { Message } from "@cosmonauts/cosmos-proto";
import { MsgDelegate, MsgUndelegate } from "@cosmonauts/cosmos-stargate";

import {
  address,
  chain,
  ChainData,
  QueryParserExt,
  seed,
  signAndBroadcast,
  Store,
} from "./setup";

const chainData: ChainData = chain.osmosis;
const signerAddress: string = address.osmosis.genesis;
const directStore: Store = new Store(chain.osmosis, seed.genesis);
const aminoStore: Store = new Store(chain.osmosis, seed.genesis, "amino");
const query: QueryParserExt = directStore.query;

let validatorAddress: string;

beforeAll(async () => {
  const validators = await query.getValidators();
  // console.log("All validatores:", validators);
  validatorAddress = validators[0]?.operatorAddress;
  if (!validatorAddress) {
    throw new Error("No validators found.");
  }
  console.log("Validator:", validatorAddress);
});

async function getRecord(store: Store) {
  const { sequence } = await store.query.getBaseAccount(signerAddress);
  const delegation = await query.getDelegation(signerAddress, validatorAddress);
  return { sequence, delegation: BigInt(delegation.balance.amount) };
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

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      directStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation + delegationAmount).toEqual(after.delegation);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation + delegationAmount).toEqual(after.delegation);
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

  it("should success with DIRECT signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      directStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation - undelegationAmount).toEqual(after.delegation);
  });

  it("should success with AMINO signing", async () => {
    const { resp, before, after } = await signAndBroadcast(
      chainData,
      signerAddress,
      messages,
      aminoStore,
      getRecord
    );
    expect(resp.code).toEqual(0);
    expect(before.sequence + 1n).toEqual(after.sequence);
    expect(before.delegation - undelegationAmount).toEqual(after.delegation);
  });
});
