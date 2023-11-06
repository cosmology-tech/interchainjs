import { Secp256k1Auth } from "@sign/core";
import { Query, QueryParser, Signer, toBech32 } from "@sign/cosmos";
import { QueryClientImpl as Bank } from "../codegen/cosmos/bank/v1beta1/query.rpc.Query";

import data from "../.data.json";

const prepare = (chain: string, slug: string) => {
  const { prefix, rpc, denom } = (data.chain as any)[chain];
  const seed = (data.seed as any)[slug];
  const query = new Query(rpc);

  const auth = Secp256k1Auth.fromMnemonic(seed);
  const signer = new Signer().on(rpc).by(auth);

  const address = toBech32(prefix, auth.key.address);
  return {
    chain,
    slug,
    query,
    auth,
    signer,
    address,
    denom,
    seed,
    rpc,
    prefix,
  };
};

type PreparedType = ReturnType<typeof prepare>;

const fetchBaseAccount = async (prepared: PreparedType) => {
  const { query, address } = prepared;
  const queryParser = QueryParser.fromQuery(query);
  const { account: baseAccount } = await queryParser.getBaseAccount(address);
  return baseAccount;
};

const fetchBalance = async (prepared: PreparedType) => {
  const { query, address, denom } = prepared;
  const bank = query.about(Bank);
  const { balance } = await bank.balance({ address, denom });
  return balance;
};

const CHAIN = "osmosis";
// const Chain = "cosmoshub";

const prepared1 = prepare(CHAIN, "genesis");
const prepared2 = prepare(CHAIN, "test1");

console.log(`============ Using Cosmos Chain ${CHAIN} ===========`);

export {
  CHAIN,
  prepared1,
  prepared2,
  fetchBaseAccount,
  fetchBalance,
  PreparedType,
};
