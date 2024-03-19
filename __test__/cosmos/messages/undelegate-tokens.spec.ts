import { DirectSigner } from "@uni-sign/cosmos/direct";
import { MsgUndelegate } from "@uni-sign/cosmos-msgs/cosmos/staking/v1beta1/tx";

import { address, chain } from "../../data";
import { toConverter, toEncoder } from "@uni-sign/cosmos/utils";
import { Message } from "@uni-sign/cosmos/types";
import { AminoSigner } from "@uni-sign/cosmos/amino";
import { auth } from "../constants";

export const messages: Message<MsgUndelegate>[] = [
  {
    typeUrl: MsgUndelegate.typeUrl,
    value: {
      delegatorAddress: address.osmosis.genesis,
      validatorAddress: address.osmosis.validator,
      amount: {
        denom: chain.osmosis.denom,
        amount: "10000",
      },
    },
  },
];

describe("Undelegate tokens", () => {
  it("should success with direct signing", async () => {
    const signer = new DirectSigner(
      auth,
      [toEncoder(MsgUndelegate)],
      chain.osmosis.rpc
    );
    const resp = await (await signer.sign(messages)).broadcast({
      checkTx: true,
      deliverTx: true,
    });
    expect(resp.check_tx?.code).toEqual(0);
    expect(resp.deliver_tx?.code).toEqual(0);
  });

  it("should success with amino signing", async () => {
    const signer = new AminoSigner(
      auth,
      [toEncoder(MsgUndelegate)],
      [toConverter(MsgUndelegate)],
      chain.osmosis.rpc
    );
    const resp = await (await signer.sign(messages)).broadcast({
      checkTx: true,
      deliverTx: true,
    });
    expect(resp.check_tx?.code).toEqual(0);
    expect(resp.deliver_tx?.code).toEqual(0);
  });
});
