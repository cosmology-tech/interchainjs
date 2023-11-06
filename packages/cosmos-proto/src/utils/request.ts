import { toBase64 } from "@sign/core";

export async function requestTx(
  endpoint: string,
  method: string,
  tx: Uint8Array
) {
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 992919398242,
      jsonrpc: "2.0",
      method,
      params: {
        tx: toBase64(tx),
      },
    }),
  });
  const json = await resp.json();
  const error = json["error"];
  if (error) {
    throw new Error(`${error["message"]}: ${error["data"]}`);
  }
  return json["result"];
}
