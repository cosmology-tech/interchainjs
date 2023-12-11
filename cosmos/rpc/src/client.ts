import { HttpEndpoint } from "@cosmonauts/core";

import { BaseAccount } from "./codegen/cosmos/auth/v1beta1/auth";
import { QueryClientImpl as Auth } from "./codegen/cosmos/auth/v1beta1/query.rpc.Query";
import { ServiceClientImpl as Tx } from "./codegen/cosmos/tx/v1beta1/service.rpc.Service";
import { QueryImpl } from "./codegen/service-ops";
import {
  AbciQueryRpc,
  AccountType,
  BroadcastRpc,
  BroadcastTxCommitResponse,
  BroadcastTxResponse,
  IndexedTx,
  TxResponse,
} from "./types";
import { Accounts } from "./utils/account";
import { createAbciQuery, createTxService } from "./utils/request";

export class RpcClient extends QueryImpl {
  readonly endpoint: string | HttpEndpoint;
  abciQuery: AbciQueryRpc;
  txService: BroadcastRpc;

  constructor(endpoint: string | HttpEndpoint) {
    super();
    this.endpoint = endpoint;
    this.abciQuery = createAbciQuery(endpoint);
    this.txService = createTxService(endpoint);
    this.init(this.abciQuery);
  }

  about<T>(Cls: { new (rpc: AbciQueryRpc): T }) {
    return new Cls(this.abciQuery);
  }

  get auth() {
    return this.about(Auth);
  }

  get tx() {
    return this.about(Tx);
  }

  async getStatus() {
    const data = await fetch(`${this.endpoint}/status`);
    const json = await data.json();
    return json["result"];
  }

  async getBlock(height?: number) {
    const data = await fetch(
      height == void 0
        ? `${this.endpoint}/block?height=${height}`
        : `${this.endpoint}/block`
    );
    const json = await data.json();
    return json["result"];
  }

  async getTx(id: string): Promise<IndexedTx | null> {
    const data = await fetch(`${this.endpoint}/tx?hash=0x${id}`);
    const json = await data.json();
    return json["result"] || null;
  }

  async getAccount(address: string) {
    const accountResp = await this.auth.account({ address });

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

    const account: AccountType = Account.fromPartial(
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

  async estimateGas(tx: Uint8Array) {
    const { gasInfo } = await this.tx.simulate({ tx: void 0, txBytes: tx });
    if (typeof gasInfo === "undefined") {
      throw new Error("Fail to estimate gas by simulate tx.");
    }
    return gasInfo;
  }

  async broadcast(
    tx: Uint8Array,
    method: "broadcast_tx_async" | "broadcast_tx_sync" | "broadcast_tx_commit"
  ): Promise<TxResponse> {
    const resp = await this.txService.request(method, tx);
    switch (method) {
      case "broadcast_tx_async":
        const { hash: hash1, ...rest1 } = resp as BroadcastTxResponse;
        return {
          hash: hash1,
          add_tx: rest1,
        };
      case "broadcast_tx_sync":
        const { hash: hash2, ...rest2 } = resp as BroadcastTxResponse;
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
        } = resp as BroadcastTxCommitResponse;
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
