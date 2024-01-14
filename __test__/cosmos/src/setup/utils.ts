import { Secp256k1HdWallet } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmonauts/cosmos-amino";
import {
  CosmjsSigner,
  DeliverTxResponse,
  Secp256k1Wallet,
} from "@cosmonauts/cosmos-cosmjs";
import { StargateCosmjsSigner } from "@cosmonauts/cosmos-stargate";

import { ChainData } from "./data";

export function mockFee(chainData: ChainData): StdFee {
  const fee: StdFee = {
    gas: "20000000",
    amount: [
      {
        denom: chainData.denom,
        amount: "400000",
      },
    ],
  };
  return fee;
}

interface BroadcastParams<T> {
  chainData: ChainData;
  signerAddress: string;
  messages: any;
  signer: StargateCosmjsSigner;
  getRecord?: (signer: StargateCosmjsSigner) => T;
}

export async function signAndBroadcast<T>({
  chainData,
  signerAddress,
  messages,
  signer,
  getRecord,
}: BroadcastParams<T>) {
  const before = await getRecord?.(signer);

  const resp = await signer.signAndBroadcast(
    signerAddress,
    messages.v2 ?? messages,
    mockFee(chainData)
  );
  console.log("resp:", resp);

  const after = await getRecord?.(signer);

  return {
    resp,
    before,
    after,
  };
}

export async function helperBroadcast<T>({
  chainData,
  signerAddress,
  messages,
  signer,
  getRecord,
  helper,
}: BroadcastParams<T> & {
  helper: (
    signerAddress: string,
    message: any,
    fee: number | StdFee | "auto",
    memo: string
  ) => Promise<DeliverTxResponse>;
}) {
  const before = await getRecord?.(signer);

  const resp = await helper(
    signerAddress,
    (messages.v2 ?? messages)[0].value,
    mockFee(chainData),
    ""
  );
  console.log("resp:", resp);

  const after = await getRecord?.(signer);

  return {
    resp,
    before,
    after,
  };
}

interface SignParams {
  chainData: ChainData;
  signerAddress: string;
  messages: any;
  signerV1: SigningStargateClient;
  signerV2: CosmjsSigner;
}

/**
 * Get `sign` result of signer from StargateCosmjsSigner and SigningStargateClient respectively
 */
export async function sign({
  chainData,
  signerAddress,
  messages,
  signerV1,
  signerV2,
}: SignParams) {
  const fee = mockFee(chainData);
  const v1Result = await signerV1.sign(
    signerAddress,
    messages.v1 ?? messages,
    fee,
    ""
  );
  const v2Result = await signerV2.sign(
    signerAddress,
    messages.v2 ?? messages,
    fee,
    ""
  );

  return {
    v1Result,
    v2Result,
  };
}

interface SignerParams {
  chainData: ChainData;
  seed: string;
}

export function getStargateCosmjsSigner(
  { chainData, seed }: SignerParams,
  signType = "direct"
) {
  const wallet = Secp256k1Wallet.fromMnemonic(seed, {
    prefix: chainData.prefix,
  });
  const offlineSigner =
    signType === "direct"
      ? wallet.toOfflineDirectSigner()
      : wallet.toOfflineAminoSigner();
  return StargateCosmjsSigner.connectWithSigner(chainData.rpc, offlineSigner);
}

export async function getSigningStargateClient(
  { chainData, seed }: SignerParams,
  signType = "direct"
) {
  const offlineSigner =
    signType === "direct"
      ? await DirectSecp256k1HdWallet.fromMnemonic(seed, {
          prefix: chainData.prefix,
        })
      : await Secp256k1HdWallet.fromMnemonic(seed, {
          prefix: chainData.prefix,
        });
  return await SigningStargateClient.connectWithSigner(
    chainData.rpc,
    offlineSigner
  );
}
