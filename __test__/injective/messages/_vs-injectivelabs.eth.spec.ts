import { address, chain } from "../../data";
import { MsgSend, getEip712TypedData } from "@injectivelabs/sdk-ts";
import { EthereumChainId } from "@injectivelabs/ts-types";
import { MsgSend as _MsgSend } from "@uni-sign/cosmos-msgs/cosmos/bank/v1beta1/tx";

const msg = MsgSend.fromJSON({
  amount: {
    denom: chain.injective.prefix,
    amount: "0.01",
  },
  srcInjectiveAddress: address.injective.genesis,
  dstInjectiveAddress: address.injective.test1,
});

describe("Compare with @injectivelabs", () => {
  it("eip712TypedData signing", async () => {
    const eip712TypedData = getEip712TypedData({
      msgs: [msg],
      tx: {
        accountNumber: "5",
        sequence: "3",
        timeoutHeight: "10",
        chainId: "injective-1",
      },
      fee: {
        amount: [
          {
            denom: chain.injective.denom,
            amount: "0.05",
          },
        ],
        gas: "2000",
        feePayer: address.injective.genesis,
      },
      ethereumChainId: EthereumChainId.Injective,
    });

    console.log(
      "%c__test__/injective/messages/_vs-injectivelabs.eth.spec.ts:74 eip712TypedData",
      "color: #007acc;",
      JSON.stringify(eip712TypedData, undefined, 4)
    );
  });
});
