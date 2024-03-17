import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { address, chain, seed } from "../../data";
import { PrivateKey, createTransaction } from "@injectivelabs/sdk-ts";
import { MsgBroadcaster, WalletStrategy } from "@injectivelabs/wallet-ts";
import { MsgSend } from "@injectivelabs/sdk-ts";
import { BigNumberInBase } from "@injectivelabs/utils";
import { EthereumChainId, ChainId } from "@injectivelabs/ts-types";
import { Network } from "@injectivelabs/networks";

const mnemonic = seed.genesis;
const myAuth = Secp256k1Auth.fromMnemonic(mnemonic, "injective");

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Mainnet,
  ethereumOptions: {
    ethereumChainId: EthereumChainId.Mainnet,
    rpcUrl: "",
  },
});

const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: Network.Local,
});

const run = async () => {
  const signer = address.injective.genesis;

  const msg = MsgSend.fromJSON({
    amount: {
      denom: chain.injective.prefix,
      amount: new BigNumberInBase(0.01).toWei().toFixed(),
    },
    srcInjectiveAddress: signer,
    dstInjectiveAddress: address.injective.test1,
  });

  const response = await walletStrategy.signCosmosTransaction(
    { txRaw: tx, accountNumber: /* */, chainId: 'injective-1' },
    signer,
  )
};

it("Direct signing: compare with @injectivelabs", async () => {
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
