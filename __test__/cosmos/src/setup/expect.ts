import { toBase64 } from "@cosmonauts/core";
import { DeliverTxResponse } from "@cosmonauts/cosmos-cosmjs";
import { TxRaw } from "@cosmonauts/cosmos-proto";

export function expectTxRawMatch(t1: TxRaw, t2: TxRaw) {
  expect(toBase64(t1.bodyBytes)).toEqual(toBase64(t2.bodyBytes));
  expect(toBase64(t1.authInfoBytes)).toEqual(toBase64(t2.authInfoBytes));
  expect(toBase64(t1.signatures[0])).toEqual(toBase64(t2.signatures[0]));
}

export function expectSuccessfulBroadcast(
  resp: DeliverTxResponse,
  before?: { sequence: bigint },
  after?: { sequence: bigint }
) {
  expect(resp.code).toEqual(0);
  if (before) {
    expect(before.sequence + 1n).toEqual(after.sequence);
  }
}
