import { HttpEndpoint } from "@cosmonauts/core";

import { BaseAccount } from "./codegen/cosmos/auth/v1beta1/auth";
import { QueryImpl } from "./codegen/service-ops";
import {
  AbciQueryRequest,
  AccountResponse,
  BlockResponse,
  BroadcastRequest,
  BroadcastResponse,
  SearchTxQuery,
  SearchTxResponse,
  StatusResponse,
  TendermintBroadcastTxResponse,
  TxResponse,
} from "./types";
import { Accounts } from "./utils/account";
import { createAbciQuery, createTxService } from "./utils/request";

export class RpcClient extends QueryImpl {
  readonly endpoint: string | HttpEndpoint;
  abciQuery: AbciQueryRequest;
  txService: BroadcastRequest;

  constructor(endpoint: string | HttpEndpoint) {
    super();
    this.endpoint = endpoint;
    this.abciQuery = createAbciQuery(endpoint);
    this.txService = createTxService(endpoint);
    this.init(this.abciQuery);
  }

  async getStatus(): Promise<StatusResponse> {
    const data = await fetch(`${this.endpoint}/status`);
    const json = await data.json();
    return json["result"];
  }

  async getBlock(height?: number): Promise<BlockResponse> {
    const data = await fetch(
      height == void 0
        ? `${this.endpoint}/block?height=${height}`
        : `${this.endpoint}/block`
    );
    const json = await data.json();
    return json["result"];
  }

  async getTx(id: string): Promise<TxResponse> {
    const data = await fetch(`${this.endpoint}/tx?hash=0x${id}`);
    const json = await data.json();
    return json["result"];
  }

  async searchTx(
    query: SearchTxQuery,
    orderBy: "asc" | "desc" = "asc"
  ): Promise<SearchTxResponse> {
    let rawQuery: string;
    if (typeof query === "string") {
      rawQuery = query;
    } else if (Array.isArray(query)) {
      rawQuery = query.map((t) => `${t.key}=${t.value}`).join(" AND ");
    } else {
      throw new Error("Got unsupported query type.");
    }
    const data = await fetch(
      `${this.endpoint}/tx_search?query="${rawQuery}"&order_by="${orderBy}"`
      // `${this.endpoint}/tx_search?query="${rawQuery}"&order_by="${orderBy}"&page=1&per_page=100`
    );
    const json = await data.json();
    return json["result"];
  }

  async getAccount(address: string): Promise<AccountResponse> {
    const accountResp = await this.account({ address });

    if (!accountResp || !accountResp.account) {
      throw new Error(`Account is undefined.`);
    }

    const Account = Accounts.find(
      (Account) => Account.typeUrl === accountResp.account!.typeUrl
    );

    if (!Account) {
      throw new Error(
        `No corresponding account found for account type ${accountResp.account.typeUrl}.`
      );
    }

    const account: AccountResponse = Account.fromPartial(
      Account.decode(accountResp.account.value)
    );
    return account;
  }

  async getBaseAccount(address: string): Promise<BaseAccount> {
    const account = await this.getAccount(address);
    return (
      (account as any).baseVestingAccount?.baseAccount ||
      (account as any).baseAccount ||
      account
    );
  }

  async getChainId() {
    const status = await this.getStatus();
    return (status as any)["node_info"]["network"];
  }

  async broadcast(
    tx: Uint8Array,
    method: "broadcast_tx_async" | "broadcast_tx_sync" | "broadcast_tx_commit"
  ): Promise<BroadcastResponse> {
    const resp = await this.txService.request(method, tx);
    switch (method) {
      case "broadcast_tx_async":
        const { hash: hash1, ...rest1 } =
          resp as TendermintBroadcastTxResponse.Async;
        return {
          hash: hash1,
          add_tx: rest1,
        };
      case "broadcast_tx_sync":
        const { hash: hash2, ...rest2 } =
          resp as TendermintBroadcastTxResponse.Sync;
        return {
          hash: hash2,
          check_tx: rest2,
        };
      case "broadcast_tx_commit":
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {
          check_tx,
          deliver_tx,
          height,
          hash: hash3,
        } = resp as TendermintBroadcastTxResponse.Commit;
        return {
          hash: hash3,
          check_tx,
          deliver_tx: { height, ...deliver_tx },
        };
      default:
        throw new Error(`Wrong method: ${method}`);
    }
  }
}
