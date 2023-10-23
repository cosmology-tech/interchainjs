import { Secp256k1HdWallet } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Secp256k1Auth } from "@sign/core";
import { Query, Signer, toBech32 } from "@sign/cosmos";
import data from "./.data.json";

export const prepare = (chain: string, account: string) => {
  const { prefix, rpc, denom } = (data.chain as any)[chain];
  const seed = (data.seed as any)[account];
  const query = new Query(rpc);

  const auth = Secp256k1Auth.fromMnemonic(seed);
  const signer = new Signer().on(rpc).by(auth);

  const address = toBech32(prefix, auth.key.address);
  return { query, auth, signer, address, denom };
};

export const prepareCosmjs = async (chain: string, account: string) => {
  const { rpc } = (data as any)[chain];
  const { seed } = (data as any)[chain][account];
  const wallet = await Secp256k1HdWallet.fromMnemonic(seed);
  const client = await SigningStargateClient.connectWithSigner(rpc, wallet);
  return { wallet, client };
};

// export const account1 = prepare("osmosis", "genesis");
// export const account2 = prepare("osmosis", "test1");
export const account1 = prepare("gaia", "genesis");
export const account2 = prepare("gaia", "test1");
