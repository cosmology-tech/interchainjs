import { Query, QueryParser } from "@sign/cosmos-proto";

import { QueryClientImpl as Bank } from "../../codegen/cosmos/bank/v1beta1/query.rpc.Query";

export const fetchBaseAccount = async (query: Query, address: string) => {
  const queryParser = QueryParser.fromQuery(query);
  const account = await queryParser.getBaseAccount(address);
  return account;
};

export const fetchBalance = async (
  query: Query,
  address: string,
  denom: string
) => {
  const bank = query.about(Bank);
  const { balance } = await bank.balance({ address, denom });
  return balance;
};
