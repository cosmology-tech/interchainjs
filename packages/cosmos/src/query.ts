import { fromBase64, toHex } from "@sign/core";

import { Rpc } from "./types";
import { randomId } from "./utils/random-id";

function createAbciQuery(endpoint: string): Rpc {
  return {
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
          id: randomId(),
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

function createTxService(endpoint: string): Rpc {
  return {
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
          id: randomId(),
          jsonrpc: "2.0",
          method,
          params: {
            tx: data,
          },
        }),
      });
      const json = await resp.json();
      console.log("%cquery.ts line:62 json", "color: #007acc;", json);
      return json;
    },
  };
}

export class Server {
  readonly endpoint: string;
  abciQuery: Rpc;
  txService: Rpc;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.abciQuery = createAbciQuery(endpoint);
    this.txService = createTxService(endpoint);
  }

  about<T>(Cls: { new (rpc: Rpc): T }) {
    return new Cls(this.abciQuery);
  }
}
