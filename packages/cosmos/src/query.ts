import { fromBase64, toBase64, toHex } from "@sign/core";

import { AbciQueryRpc, TendermintRpc } from "./types";
import { randomId } from "./utils/random-id";

function createAbciQuery(endpoint: string): AbciQueryRpc {
  return {
    request: async (
      service: string,
      method: string,
      data: Uint8Array
    ): Promise<Uint8Array> => {
      const req = {
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
      };
      const resp = await fetch(endpoint, req);
      const json = await resp.json();
      if (json["error"] != void 0) {
        throw new Error(`Request Error: ${json["error"]}`);
      }
      try {
        const result = fromBase64(json["result"]["response"]["value"]);
        return result;
      } catch (error) {
        throw new Error(`Request Error: ${json["result"]["response"]["log"]}`);
      }
    },
  };
}

function createTxService(endpoint: string): TendermintRpc {
  return {
    request: async (method: string, data: Uint8Array): Promise<Uint8Array> => {
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
            tx: toBase64(data),
          },
        }),
      });
      const json = await resp.json();
      if (json["error"] != void 0) {
        throw new Error(`Request Error: ${json["error"]}`);
      }
      // console.log("%cquery.ts line:63 json", "color: #007acc;", json);
      try {
        return json["result"];
      } catch (error) {
        throw new Error(`Request Error: ${json}`);
      }
    },
  };
}

export class Query {
  readonly endpoint: string;
  abciQuery: AbciQueryRpc;
  txService: TendermintRpc;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.abciQuery = createAbciQuery(endpoint);
    this.txService = createTxService(endpoint);
  }

  about<T>(Cls: { new (rpc: AbciQueryRpc): T }) {
    return new Cls(this.abciQuery);
  }
}
