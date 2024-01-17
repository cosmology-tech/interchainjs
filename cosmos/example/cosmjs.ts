import { CosmjsSigner, Secp256k1Wallet } from "@cosmonauts/cosmos-cosmjs";
import { Message } from "@cosmonauts/cosmos-proto";
import { MsgSend } from "@cosmonauts/cosmos-stargate/src/codegen/cosmos/bank/v1beta1/tx";

import { address, chain, seed } from "../../__test__/cosmos/src/setup/data";
import { printJSON } from "./utils";

const messages: Message<MsgSend>[] = [
  {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
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

const offlineSigner = Secp256k1Wallet.fromMnemonic(seed.genesis, {
  prefix: chain.osmosis.prefix,
}).toOfflineDirectSigner();

const signer = CosmjsSigner.connectWithSigner(
  chain.osmosis.rpc,
  offlineSigner,
  {
    registry: [["/cosmos.bank.v1beta1.MsgSend", MsgSend]],
    aminoConverters: {
      "/cosmos.bank.v1beta1.MsgSend": MsgSend,
    },
  }
);

async function run() {
  const resp = await signer.signAndBroadcast(
    address.osmosis.genesis,
    messages,
    "auto"
  );

  console.log("\n## broadcast response ##\n\n", printJSON(resp));
}

run();
