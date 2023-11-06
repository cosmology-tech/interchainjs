import { fetchBalance, fetchBaseAccount, prepared2 as target } from "./.setup";

describe(`Check account`, () => {
  it("retrieve account", async () => {
    const baseAccount = await fetchBaseAccount(target);
    console.log(
      `slug: ${target.slug}\naddress: ${target.address}\naccountNumber: ${baseAccount.accountNumber}\nsequence: ${baseAccount.sequence}`
    );
  });

  it("fetch balance", async () => {
    const balance = await fetchBalance(target);
    console.log(`balance: ${balance.amount} ${balance.denom}`);
  });
});
