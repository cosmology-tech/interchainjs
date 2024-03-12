import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";

import { address, chain } from "../../data";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { Message } from "@cosmonauts/cosmos/types";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { auth } from "../constants";

export const messages: Message<MsgSend>[] = [
  {
    typeUrl: MsgSend.typeUrl,
    value: {
      amount: [
        {
          amount: "100000",
          denom: chain.osmosis.denom,
        },
      ],
      fromAddress: address.osmosis.genesis,
      toAddress: address.osmosis.test1,
    },
  },
];

describe("Send tokens", () => {
  it("should success with direct signing", async () => {
    const signer = new DirectSigner(
      auth,
      [toEncoder(MsgSend)],
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
      [toEncoder(MsgSend)],
      [toConverter(MsgSend)],
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
