import { fromBase64, toBase64, toHex } from "@sign/core";
import { QueryClientImpl as Auth } from "interchain-query/cosmos/auth/v1beta1/query.rpc.Query";
import { QueryClientImpl as Bank } from "interchain-query/cosmos/bank/v1beta1/query.rpc.Query";
import { ServiceClientImpl as Tx } from "interchain-query/cosmos/tx/v1beta1/service.rpc.Service";

function createRpcClient(endpoint: string) {
  return {
    endpoint,
    request: async (
      service: string,
      method: string,
      data: Uint8Array
    ): Promise<Uint8Array> => {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 992919398242,
          jsonrpc: "2.0",
          method: "abci_query",
          params: {
            data: toHex(data),
            path: `/${service}/${method}`,
            prove: false,
          },
        }),
      });
      const json = await resp.json();
      try {
        const result = fromBase64(json["result"]["response"]["value"]);
        return result;
      } catch (error) {
        throw new Error(`Request Error: ${json["result"]["response"]["log"]}`);
      }
    },
  };
}

async function requestTx(endpoint: string, method: string, tx: Uint8Array) {
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

export class Query {
  rpc: ReturnType<typeof createRpcClient>;

  constructor(endpoint: string) {
    this.rpc = createRpcClient(endpoint);
  }

  get endpoint() {
    return this.rpc.endpoint;
  }

  get bank() {
    return new Bank(this.rpc);
  }

  get auth() {
    return new Auth(this.rpc);
  }

  get tx() {
    return new Tx(this.rpc);
  }

  status() {
    return new Promise((resolve, reject) => {
      fetch(`${this.rpc.endpoint}/status`)
        .then((data) =>
          data
            .json()
            .then((json) => resolve(json["result"]))
            .catch((e) => reject(e))
        )
        .catch((e) => reject(e));
    });
  }

  checkTx(tx: Uint8Array) {
    return requestTx(this.endpoint, "check_tx", tx);
  }
}
