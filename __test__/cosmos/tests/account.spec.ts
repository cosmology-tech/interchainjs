import { QueryParser } from "@sign/cosmos";

import { QueryClientImpl as Bank } from "../codegen/cosmos/bank/v1beta1/query.rpc.Query";
import { account1 } from "./.prepare";

describe("Check account `genesis`", () => {
  const { address, query, denom } = account1;

  it("retrieve account", async () => {
    const queryParser = QueryParser.fromQuery(query);
    const { account } = await queryParser.getBaseAccount(address);
    console.log(
      `accountNumber: ${account.accountNumber}\nsequence: ${account.sequence}`
    );
  });

  it("fetch balance", async () => {
    const bank = query.about(Bank);
    const { balance } = await bank.balance({ address, denom });

    console.log(`balance: ${balance.amount} ${balance.denom}`);
  });
});
