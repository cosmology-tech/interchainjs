import { Secp256k1Auth, toHex } from "@cosmonauts/core";
import { AminoSigner } from "@cosmonauts/cosmos-amino";
import { Message, TxRaw } from "@cosmonauts/cosmos-proto";
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

const signer = new AminoSigner();
signer.registerAmino([["/cosmos.bank.v1beta1.MsgSend", MsgSend]], {
  "/cosmos.bank.v1beta1.MsgSend": MsgSend,
});
signer.on(chain.osmosis.rpc).by(Secp256k1Auth.fromMnemonic(seed.genesis));

async function run() {
  const signed = await signer.signAminoMessages(messages);

  const visualDoc = signed.visualDoc;
  console.log("\n## visualDoc ##\n\n", printJSON(visualDoc));

  const signDoc = signed.signDoc;
  console.log("## signDoc ##\n\n", printJSON(signDoc));

  const execDoc = signed.execDoc;
  console.log("## execDoc ##\n\n", printJSON(execDoc));
  console.log(
    "## execDoc hash ##\n\n",
    toHex(signer.hash!(TxRaw.encode(execDoc).finish())).toUpperCase(),
    "\n"
  );

  const resp = await signed.broadcast(true, true);
  console.log("## broadcast response ##\n\n", printJSON(resp));
}

run();
