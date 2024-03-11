import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { MsgVote } from "@cosmonauts/cosmos-msgs/cosmos/gov/v1beta1/tx";

import { address, chain, seed } from "../../data";
import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { Message } from "@cosmonauts/cosmos/types";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { VoteOption } from "@cosmonauts/cosmos-msgs/cosmos/gov/v1beta1/gov";

export const messages: Message<MsgVote>[] = [
  {
    typeUrl: MsgVote.typeUrl,
    value: {
      proposalId: 4n,
      voter: address.osmosis.genesis,
      option: VoteOption.VOTE_OPTION_YES,
    },
  },
];

export const auth = Secp256k1Auth.fromMnemonic(seed.genesis).derive("cosmos");

describe("Vote", () => {
  it("should success with direct signing", async () => {
    const signer = new DirectSigner(
      auth,
      [toEncoder(MsgVote)],
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
      [toEncoder(MsgVote)],
      [toConverter(MsgVote)],
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
