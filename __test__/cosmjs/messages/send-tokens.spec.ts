import { StargateSigningClient } from "@cosmonauts/cosmjs/stargate";
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";

import { address, chain, seed } from "../../data";
import { Secp256k1Wallet } from "@cosmonauts/cosmjs/wallets/secp256k1";
import { Message } from "@cosmonauts/cosmos/types";

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

export const wallet = Secp256k1Wallet.fromMnemonic(seed.genesis, {
  prefix: chain.osmosis.prefix,
});

describe("Send tokens", () => {
  it("should success with direct signing", async () => {
    const client = StargateSigningClient.connectWithSigner(
      chain.osmosis.rpc,
      wallet.toOfflineDirectSigner()
    );
    const resp = await client.signAndBroadcast(
      address.osmosis.genesis,
      messages,
      "auto"
    );
    expect(resp.code).toEqual(0);
  });

  it("should success with amino signing", async () => {
    const client = StargateSigningClient.connectWithSigner(
      chain.osmosis.rpc,
      wallet.toOfflineAminoSigner()
    );
    const resp = await client.signAndBroadcast(
      address.osmosis.genesis,
      messages,
      "auto"
    );
    expect(resp.code).toEqual(0);
  });
});
