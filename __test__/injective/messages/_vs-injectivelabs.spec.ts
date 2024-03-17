import { address, chain } from "../../data";
import { Message, StdFee } from "@cosmonauts/cosmos/types";
import { MsgSend, createTransaction } from "@injectivelabs/sdk-ts";
import { auth, isCompressed } from "../constants";
import { toHex } from "@cosmonauts/utils";
import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { toEncoder } from "@cosmonauts/cosmos/utils";
import { MsgSend as _MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";

const msg = MsgSend.fromJSON({
  amount: {
    denom: chain.injective.prefix,
    amount: "0.01",
  },
  srcInjectiveAddress: address.injective.genesis,
  dstInjectiveAddress: address.injective.test1,
});

const messages: Message<_MsgSend>[] = [
  {
    typeUrl: _MsgSend.typeUrl,
    value: {
      amount: [
        {
          amount: "0.01",
          denom: chain.injective.denom,
        },
      ],
      fromAddress: address.injective.genesis,
      toAddress: address.injective.test1,
    },
  },
];

const fee: StdFee = {
  gas: "20000000",
  amount: [
    {
      denom: chain.osmosis.denom,
      amount: "400000",
    },
  ],
};

it("Direct signing: compare with @injectivelabs", async () => {
  const signer = new DirectSigner(
    auth,
    [toEncoder(_MsgSend)],
    chain.osmosis.rpc
  );

  const {
    txRaw: { bodyBytes, authInfoBytes, signatures },
  } = await signer.sign(messages, fee, "", {
    sequence: 3n,
    accountNumber: 5n,
    chainId: chain.injective.chainId,
  });

  const { txRaw, signDoc } = createTransaction({
    pubKey: auth.getPublicKey(isCompressed).toBase64(),
    chainId: chain.injective.chainId,
    fee,
    message: msg,
    sequence: 3,
    timeoutHeight: 0,
    accountNumber: 5,
  });

  // expect(toHex(signatures[0])).toBe(toHex(txRaw.signatures[0]));
  expect(toHex(bodyBytes)).toBe(toHex(txRaw.bodyBytes));
  // expect(toHex(authInfoBytes)).toBe(toHex(txRaw.authInfoBytes));
});
