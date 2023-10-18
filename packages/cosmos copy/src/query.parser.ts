import { toBase64 } from "@sign/core";
import { QueryClientImpl as Auth } from "interchain-query/cosmos/auth/v1beta1/query.rpc.Query";
import { ServiceClientImpl as Tx } from "interchain-query/cosmos/tx/v1beta1/service.rpc.Service";

import { AccountParserMap, BaseAccountParser } from "./const/account";
import { BroadcastMode } from "./interchain/types";
import { Server } from "./query";
import { Account } from "./types";
import { randomId } from "./utils/random-id";
import { requestTx } from "./utils/request";

export class QueryParser extends Server {
  constructor(endpoint: string) {
    super(endpoint);
  }

  static fromQuery(query: Server) {
    return new QueryParser(query.endpoint);
  }

  get auth() {
    return this.about(Auth);
  }

  get tx() {
    return this.about(Tx);
  }

  status() {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}/status`)
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

  async getAccount(address: string) {
    const accountResp = await this.auth.account({ address });

    if (!accountResp || !accountResp.account) {
      throw new Error(`Account is undefined.`);
    }

    const accountParser = Object.values(AccountParserMap).find(
      (parser) => parser.protoType === accountResp.account!.typeUrl
    );

    if (!accountParser) {
      throw new Error(
        `No corresponding accountParser found for account type ${accountResp.account.typeUrl}.`
      );
    }

    const account = accountParser
      .fromProto(accountResp.account)
      .decode()
      .unwrap()
      .pop() as Account;

    return { account, parser: accountParser };
  }

  async getBaseAccount(address: string) {
    const { account, parser } = await this.getAccount(address);
    const baseAccount = parser.getBaseAccount(account);
    if (!baseAccount) {
      throw new Error("BaseAccount is undefined.");
    }
    return { account: baseAccount, parser: BaseAccountParser };
  }

  async getChainId() {
    const status = await this.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (status as any)["node_info"]["network"];
  }

  async estimateGas(tx: Uint8Array) {
    const { gasInfo } = await this.tx.simulate({ tx: void 0, txBytes: tx });
    if (typeof gasInfo === "undefined") {
      throw new Error("Fail to estimate gas by simulate tx.");
    }
    return gasInfo;
  }

  async broadcast(tx: Uint8Array, mode: BroadcastMode) {
    // const req = { params: { tx }, method: "broadcast_tx_sync" };
    // const request = createJsonRpcRequest(
    //   req.method,
    //   encodeBroadcastTxParams(req.params)
    // );
    // const resp = await fetch(this.endpoint, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(request),
    // });
    // const json = await resp.json();
    // return json;
    return await this.tx.broadcastTx({ txBytes: tx, mode });
  }
}

/** Creates a JSON-RPC request with random ID */
// eslint-disable-next-line @typescript-eslint/ban-types
export function createJsonRpcRequest(method: string, params?: {}) {
  const paramsCopy = params ? { ...params } : {};
  return {
    jsonrpc: "2.0",
    id: randomId(),
    method: method,
    params: paramsCopy,
  };
}

interface RpcBroadcastTxParams {
  /** base64 encoded */
  readonly tx: string;
}
function encodeBroadcastTxParams(params: {
  tx: Uint8Array;
}): RpcBroadcastTxParams {
  return {
    tx: toBase64(params.tx),
  };
}

// interface RpcBroadcastTxSyncResponse extends RpcTxData {
//   /** hex encoded */
//   readonly hash: string;
// }

// function decodeBroadcastTxSync(data: RpcBroadcastTxSyncResponse) {
//   return {
//     ...decodeTxData(data),
//     hash: fromHex(data.hash),
//   };
// }

// interface RpcTxData {
//   readonly codespace?: string;
//   readonly code?: number;
//   readonly log?: string;
//   /** base64 encoded */
//   readonly data?: string;
//   readonly events?: readonly RpcEvent[];
//   readonly gas_wanted?: string;
//   readonly gas_used?: string;
// }

// function decodeTxData(data: RpcTxData) {
//   return {
//     code: apiToSmallInt(assertNumber(data.code ?? 0)),
//     codespace: data.codespace,
//     log: data.log,
//     data: may(fromBase64, data.data),
//     events: data.events ? decodeEvents(data.events) : [],
//     gasWanted: apiToSmallInt(data.gas_wanted ?? "0"),
//     gasUsed: apiToSmallInt(data.gas_used ?? "0"),
//   };
// }
