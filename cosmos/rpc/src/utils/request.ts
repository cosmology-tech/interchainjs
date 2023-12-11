import { fromBase64, HttpEndpoint, toBase64, toHex } from "@cosmonauts/core";

import { AbciQueryRpc, BroadcastRpc } from "../types";
import { randomId } from "./random";

export function createAbciQuery(endpoint: string | HttpEndpoint): AbciQueryRpc {
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

export function createTxService(endpoint: string | HttpEndpoint): BroadcastRpc {
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
