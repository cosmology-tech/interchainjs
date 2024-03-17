import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { address, chain, seed } from "../../data";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";
import { MsgTransfer } from "@cosmonauts/cosmos-msgs/ibc/applications/transfer/v1/tx";
import { messages } from "./send-tokens.spec";
// import { messages } from "./send-ibc-tokens.spec";
import { StdFee } from "@cosmonauts/cosmos/types";
import { toHex } from "@cosmonauts/utils";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { auth } from "../constants";

async function getDirectClient() {
  return await SigningStargateClient.connectWithSigner(
    chain.osmosis.rpc,
    await DirectSecp256k1HdWallet.fromMnemonic(seed.genesis, {
      prefix: chain.osmosis.prefix,
    })
  );
}

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

it("Direct signing: compare with @cosmjs 1.0", async () => {
  const client = await getDirectClient();
  const signer = new DirectSigner(
    auth,
    [toEncoder(MsgSend), toEncoder(MsgTransfer)],
    chain.osmosis.rpc
  );

  const txRaw = await client.sign(address.osmosis.genesis, messages, fee, memo);
  const {
    txRaw: { bodyBytes, authInfoBytes, signatures },
  } = await signer.sign(messages, fee, memo);

  expect(toHex(signatures[0])).toBe(toHex(txRaw.signatures[0]));
  expect(toHex(bodyBytes)).toBe(toHex(txRaw.bodyBytes));
  expect(toHex(authInfoBytes)).toBe(toHex(txRaw.authInfoBytes));
});

it("Amino signing: compare with @cosmjs 1.0", async () => {
  const client = await getAminoClient();
  const signer = new AminoSigner(
    auth,
    [toEncoder(MsgSend), toEncoder(MsgTransfer)],
    [toConverter(MsgSend), toConverter(MsgTransfer)],
    chain.osmosis.rpc
  );

  const txRaw = await client.sign(address.osmosis.genesis, messages, fee, memo);
  const {
    txRaw: { bodyBytes, authInfoBytes, signatures },
  } = await signer.sign(messages, fee, memo);

  expect(toHex(signatures[0])).toBe(toHex(txRaw.signatures[0]));
  expect(toHex(bodyBytes)).toBe(toHex(txRaw.bodyBytes));
  expect(toHex(authInfoBytes)).toBe(toHex(txRaw.authInfoBytes));
});
