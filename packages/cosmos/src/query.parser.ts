import { QueryClientImpl as Auth } from "./codegen/cosmos/auth/v1beta1/query.rpc.Query";
import { ServiceClientImpl as Tx } from "./codegen/cosmos/tx/v1beta1/service.rpc.Service";
import { AccountParserMap, BaseAccountParser } from "./const/account";
import { Query } from "./query";
import {
  Account,
  BroadcastTxCommitResponse,
  BroadcastTxResponse,
  TxResponse,
} from "./types";
import { requestTx } from "./utils/request";

export class QueryParser extends Query {
  constructor(endpoint: string) {
    super(endpoint);
  }

  static fromQuery(query: Query) {
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
      case "broadcast_tx_commit":
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { check_tx, deliver_tx, ...rest } =
          resp as BroadcastTxCommitResponse;
        return { ...rest, ...(check_tx.code !== 0 ? check_tx : deliver_tx) };
      case "broadcast_tx_sync":
      case "broadcast_tx_async":
        return resp as BroadcastTxResponse;
      default:
        throw new Error(`Wrong method: ${method}`);
    }
  }
}
