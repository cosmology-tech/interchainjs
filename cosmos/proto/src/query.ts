import { fromBase64, HttpEndpoint, toBase64, toHex } from "@sign/core";

import { AbciQueryRpc, TendermintRpc } from "./types";
import { randomId } from "./utils/random-id";

function createAbciQuery(endpoint: string | HttpEndpoint): AbciQueryRpc {
  return {
    request: async (
      service: string,
      method: string,
      data: Uint8Array
    ): Promise<Uint8Array> => {
      let _endpoint: string;
      let headers: Record<string, string> = {};
      if (typeof endpoint === "string") {
        _endpoint = endpoint;
      } else {
        _endpoint = endpoint.url;
        headers = endpoint.headers;
      }
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
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
      const resp = await fetch(_endpoint, req);
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

function createTxService(endpoint: string | HttpEndpoint): TendermintRpc {
  let _endpoint: string;
  let headers: Record<string, string> = {};
  if (typeof endpoint === "string") {
    _endpoint = endpoint;
  } else {
    _endpoint = endpoint.url;
    headers = endpoint.headers;
  }
  return {
    request: async (method: string, data: Uint8Array): Promise<Uint8Array> => {
      const resp = await fetch(_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
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
      try {
        return json["result"];
      } catch (error) {
        throw new Error(`Request Error: ${json}`);
      }
    },
  };
}

export class Query {
  readonly endpoint: string | HttpEndpoint;
  abciQuery: AbciQueryRpc;
  txService: TendermintRpc;

  constructor(endpoint: string | HttpEndpoint) {
    this.endpoint = endpoint;
    this.abciQuery = createAbciQuery(endpoint);
    this.txService = createTxService(endpoint);
  }

  about<T>(Cls: { new (rpc: AbciQueryRpc): T }) {
    return new Cls(this.abciQuery);
  }
}
