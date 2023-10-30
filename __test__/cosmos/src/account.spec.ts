import { Account1 as account, fetchBalance, fetchBaseAccount } from "./.setup";

describe(`Check account`, () => {
  it("retrieve account", async () => {
    const baseAccount = await fetchBaseAccount(account);
    console.log(
      `slug: ${account.slug}\naddress: ${account.address}\naccountNumber: ${baseAccount.accountNumber}\nsequence: ${baseAccount.sequence}`
    );
  });

  it("fetch balance", async () => {
    const balance = await fetchBalance(account);
    console.log(`balance: ${balance.amount} ${balance.denom}`);
  });
});
