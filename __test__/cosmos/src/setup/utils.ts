import {
  EncodeObjectUtils,
  StdFee,
  StdSignDoc,
} from "@cosmonauts/cosmos-amino";

import { ChainData } from "./data";
import { Store } from "./store";

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

/**
 * Get `signAndBroadcast` result of `CosmjsSigner` from @sign
 */
export async function signAndBroadcast<T>(
  chainData: ChainData,
  signerAddress: string,
  messages: any,
  store: Store,
  getRecord?: (store: Store) => T
) {
  const before = await getRecord?.(store);

  const resp = await store.cosmWasmCosmjsSigner.signAndBroadcast(
    signerAddress,
    messages,
    mockFee(chainData)
  );
  console.log("resp:", resp);

  const after = await getRecord?.(store);

  return {
    resp,
    before,
    after,
  };
}

/**
 * Get `signAndBroadcast` result of `SigningClient` from @cosmjs
 */
export async function signAndBroadcastWithCosmjs<T>(
  chainData: ChainData,
  signerAddress: string,
  messages: any,
  store: Store,
  getRecord?: (store: Store) => T
) {
  const before = await getRecord?.(store);

  const signingClient = await store.getSigningClient();
  const resp = await signingClient.signAndBroadcast(
    signerAddress,
    messages,
    mockFee(chainData)
  );
  console.log("resp:", resp);

  const after = await getRecord?.(store);

  return {
    resp,
    before,
    after,
  };
}

/**
 * Get `sign` result of signer from @sign and signingClient @cosmjs respectively
 */
export async function sign(
  chainData: ChainData,
  signerAddress: string,
  messages: any,
  store: Store
) {
  const fee = mockFee(chainData);
  const fromSign = await store.cosmWasmCosmjsSigner.sign(
    signerAddress,
    messages,
    fee,
    ""
  );
  const signingClient = await store.getSigningClient();
  const fromCosmjs = await signingClient.sign(signerAddress, messages, fee, "");

  return {
    fromSign,
    fromCosmjs,
  };
}

/**
 * Get `signAmino` result of wallet from @sign and @cosmjs respectively
 */
export async function signAmino(
  chainData: ChainData,
  signerAddress: string,
  messages: any,
  store: Store
) {
  const signWallet = store.wallet;
  const cosmjsWallet = await store.getWalletWithCosmjs();
  const { accountNumber, sequence } =
    await store.query.getBaseAccount(signerAddress);
  const doc: StdSignDoc = {
    chain_id: chainData.chainId,
    account_number: accountNumber.toString(),
    sequence: sequence.toString(),
    msgs: EncodeObjectUtils.toAminoMsg(
      messages,
      store.aminoSigner.getParserFromTypeUrl
    ),
    memo: "",
    fee: mockFee(chainData),
  };
  const fromSign = signWallet.signAmino(signerAddress, doc);
  const fromCosmjs = await cosmjsWallet.signAmino(signerAddress, doc);
  return { fromSign, fromCosmjs };
}
