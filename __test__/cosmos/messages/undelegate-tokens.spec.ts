import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { MsgUndelegate } from "@cosmonauts/cosmos-msgs/cosmos/staking/v1beta1/tx";

import { address, chain } from "../../data";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { Message } from "@cosmonauts/cosmos/types";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
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
