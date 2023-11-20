import { Store } from "./store";

export async function signAndBroadcast<T>(
  signerAddress: string,
  messages: any,
  store: Store,
  getRecord: (store: Store) => T
) {
  const before = await getRecord(store);

  const resp = await store.cosmjsSigner.signAndBroadcast(
    signerAddress,
    messages,
    2
  );
  console.log("resp:", resp);

  const after = await getRecord(store);

  return {
    resp,
    before,
    after,
  };
}
