import { Secp256k1Auth } from "@sign/core";
import {
  Query,
  QueryParser,
  Signer,
  toBech32,
  BaseAccount,
  Coin,
} from "@sign/cosmos";
import { QueryClientImpl as Bank } from "../codegen/cosmos/bank/v1beta1/query.rpc.Query";

import data from "../.data.json";

const prepare = (chain: string, slug: string) => {
  const { prefix, rpc, denom } = (data.chain as any)[chain];
  const seed = (data.seed as any)[slug];
  const query = new Query(rpc);

  const auth = Secp256k1Auth.fromMnemonic(seed);
  const signer = new Signer().on(rpc).by(auth);

  const address = toBech32(prefix, auth.key.address);
  return { chain, slug, query, auth, signer, address, denom };
};

const fetchBaseAccount = async (account: ReturnType<typeof prepare>) => {
  const { query, address } = account;
  const queryParser = QueryParser.fromQuery(query);
  const { account: baseAccount } = await queryParser.getBaseAccount(address);
  return baseAccount;
};

const fetchBalance = async (account: ReturnType<typeof prepare>) => {
  const { query, address, denom } = account;
  const bank = query.about(Bank);
  const { balance } = await bank.balance({ address, denom });
  return balance;
};

const Chain = "osmosis";
// const Chain = "cosmoshub";

const Account1 = prepare(Chain, "genesis");
const Account2 = prepare(Chain, "test1");

// console.log(
//   `Using account1: chain "${Account1.chain}" account "${Account1.slug}" address "${Account1.address}"`
// );
// console.log(
//   `Using account2: chain "${Account2.chain}" account "${Account2.slug}" address "${Account2.address}"`
// );

console.log(`============ Using Cosmos Chain ${Chain} ===========`);

export { Chain, Account1, Account2, fetchBaseAccount, fetchBalance };
