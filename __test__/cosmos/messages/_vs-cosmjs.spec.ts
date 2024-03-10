import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { address, chain, seed } from "../../data";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";
import { MsgTransfer } from "@cosmonauts/cosmos-msgs/ibc/applications/transfer/v1/tx";
// import { auth, messages } from "./send-tokens.spec";
import { auth, messages } from "./send-ibc-tokens.spec";
import { StdFee } from "@cosmonauts/cosmos/types";
import { toHex } from "@cosmonauts/utils";

async function getAminoClient() {
  return await SigningStargateClient.connectWithSigner(
    chain.osmosis.rpc,
    await Secp256k1HdWallet.fromMnemonic(seed.genesis, {
      prefix: chain.osmosis.prefix,
    })
  );
}

export const fee: StdFee = {
  gas: "20000000",
  amount: [
    {
      denom: chain.osmosis.denom,
      amount: "400000",
    },
  ],
};

export const memo = "for test";

it("compare with cosmjs 1.0", async () => {
  const client = await getAminoClient();
  const signer = new AminoSigner(
    auth,
    [toEncoder(MsgTransfer)],
    [toConverter(MsgTransfer)],
    chain.osmosis.rpc
  );

  const txRaw = await client.sign(address.osmosis.genesis, messages, fee, memo);
  const { signature, toTxRaw } = await signer.signMessages(messages, fee, memo);

  expect(signature.toHex()).toBe(toHex(txRaw.signatures[0]));

  const {
    txRaw: { bodyBytes, authInfoBytes },
  } = toTxRaw();

  expect(toHex(bodyBytes)).toBe(toHex(txRaw.bodyBytes));
  expect(toHex(authInfoBytes)).toBe(toHex(txRaw.authInfoBytes));
});
