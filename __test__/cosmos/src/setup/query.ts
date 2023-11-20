import { HttpEndpoint } from "@sign/core";
import { Query, QueryParser } from "@sign/cosmos-proto";

import { QueryClientImpl as Bank } from "../../codegen/cosmos/bank/v1beta1/query.rpc.Query";

export class QueryParserExt extends QueryParser {
  readonly queryParser: QueryParser;

  constructor(endpoint: string | HttpEndpoint) {
    super(endpoint);
  }

  static fromQuery(query: Query) {
    return new QueryParserExt(query.endpoint);
  }

  getBalance = async (address: string, denom: string) => {
    const bank = this.about(Bank);
    const { balance } = await bank.balance({ address, denom });
    return balance;
  };
}
