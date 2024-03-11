import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { MsgDelegate } from "@cosmonauts/cosmos-msgs/cosmos/staking/v1beta1/tx";

import { address, chain, seed } from "../../data";
import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { defaultHdPath } from "@cosmonauts/cosmos/defaults";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { Message } from "@cosmonauts/cosmos/types";
import { AminoSigner } from "@cosmonauts/cosmos/amino";

export const messages: Message<MsgDelegate>[] = [
  {
    typeUrl: MsgDelegate.typeUrl,
    value: {
      delegatorAddress: address.osmosis.genesis,
      validatorAddress: address.osmosis.validator,
      amount: {
        denom: chain.osmosis.denom,
        amount: "1000000",
      },
    },
  },
];

export const auth = Secp256k1Auth.fromMnemonic(
  seed.genesis,
  defaultHdPath.secp256k1
);

describe("Delegate tokens", () => {
  it("should success with direct signing", async () => {
    const signer = new DirectSigner(
      auth,
      [toEncoder(MsgDelegate)],
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
      [toEncoder(MsgDelegate)],
      [toConverter(MsgDelegate)],
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
