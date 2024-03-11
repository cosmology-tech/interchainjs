import { BaseAccount } from "../codegen/cosmos/auth/v1beta1/auth";
import { QueryClientImpl as AuthQuery } from "../codegen/cosmos/auth/v1beta1/query.rpc.Query";
import { ServiceClientImpl as TxQuery } from "../codegen/cosmos/tx/v1beta1/service.rpc.Service";
import {
  BroadcastMode,
  BroadcastOptions,
  BroadcastResult,
  FeeOptions,
  QueryClient,
} from "../types/direct";
import { Status, CometBroadcastResult } from "../types/rpc";
import {
  accountDecoders,
  broadcast,
  createTxRpc,
  getAvgGasPrice,
  getHighGasPrice,
  getLowGasPrice,
  getPrefix,
} from "../utils/rpc";
import { Key, isEmpty, toHttpEndpoint } from "@cosmonauts/utils";
import { TxBody, SignerInfo, Tx, Fee } from "../codegen/cosmos/tx/v1beta1/tx";
import { constructAuthInfo } from "../utils/direct";
import { SignMode } from "../codegen/cosmos/tx/signing/v1beta1/signing";
import { toPrice } from "@cosmonauts/utils";
import { Decimal } from "decimal.js";
import { HttpEndpoint, Price } from "@cosmonauts/types";
import { defaultBroadcastOptions, defaultFeeOptions } from "../defaults";

export class RpcClient implements QueryClient {
  readonly endpoint: HttpEndpoint;
  readonly address?: Key;

  protected chainId?: string;
  protected accountNumber?: bigint;
  protected readonly authQuery: AuthQuery;
  protected readonly txQuery: TxQuery;

  constructor(endpoint: string | HttpEndpoint, address?: Key) {
    this.endpoint = toHttpEndpoint(endpoint);
    this.address = address;
    const txRpc = createTxRpc(this.endpoint);
    this.authQuery = new AuthQuery(txRpc);
    this.txQuery = new TxQuery(txRpc);
  }

  protected async getBaseAccount(): Promise<BaseAccount> {
    if (!this.address) {
      throw new Error("Address is not provided when constructing RpcClient");
    }
    const address = this.address.toBech32(getPrefix(await this.getChainId()));

    const accountResp = await this.authQuery.account({ address });

    if (!accountResp || !accountResp.account) {
      throw new Error(`Account is undefined.`);
    }

    const decoder = accountDecoders.find(
      (decoder) => decoder.typeUrl === accountResp.account!.typeUrl
    );

    if (!decoder) {
      throw new Error(
        `No corresponding account found for account type ${accountResp.account.typeUrl}.`
      );
    }

    const account = decoder.fromPartial(
      decoder.decode(accountResp.account.value)
    );
    const baseAccount =
      (account as any).baseVestingAccount?.baseAccount ||
      (account as any).baseAccount ||
      account;
    return baseAccount;
  }

  async getChainId() {
    if (isEmpty(this.chainId)) {
      const data = await fetch(`${this.endpoint.url}/status`);
      const json = await data.json();
      const status: Status = json["result"];
      this.chainId = status.node_info.network;
    }
    return this.chainId;
  }

  async getAccountNumber() {
    if (isEmpty(this.accountNumber)) {
      const account = await this.getBaseAccount();
      this.accountNumber = account.accountNumber;
    }
    return this.accountNumber;
  }

  async getSequence() {
    const account = await this.getBaseAccount();
    return account.sequence;
  }

  async estimateFee(
    txBody: TxBody,
    signerInfos: SignerInfo[],
    options?: FeeOptions
  ) {
    // estimate gas
    const tx = Tx.fromPartial({
      body: txBody,
      authInfo: constructAuthInfo(
        signerInfos.map((signerInfo) => {
          return {
            ...signerInfo,
            modeInfo: { single: { mode: SignMode.SIGN_MODE_UNSPECIFIED } },
          };
        }),
        Fee.fromPartial({})
      ).authInfo,
      signatures: [new Uint8Array()],
    });
    const { gasInfo } = await this.txQuery.simulate({
      tx: void 0,
      txBytes: Tx.encode(tx).finish(),
    });
    if (typeof gasInfo === "undefined") {
      throw new Error("Fail to estimate gas by simulate tx.");
    }

    // calculate fee
    const gasLimit = new Decimal(gasInfo.gasUsed.toString())
      .mul(options?.multiplier || defaultFeeOptions.multiplier)
      .ceil();

    let price: Price;
    switch (options?.gasPrice ?? defaultFeeOptions.gasPrice) {
      case "average":
        price = getAvgGasPrice(await this.getChainId());
        break;
      case "high":
        price = getHighGasPrice(await this.getChainId());
        break;
      case "low":
        price = getLowGasPrice(await this.getChainId());
        break;
      default:
        price = toPrice(options?.gasPrice);
        break;
    }

    if (price.denom.length < 3 || price.denom.length > 128) {
      throw new Error("Denom must be between 3 and 128 characters");
    }

    return {
      amount: [
        {
          amount: gasLimit.mul(price.amount).ceil().toString(),
          denom: price.denom,
        },
      ],
      gas: gasLimit.toString(),
    };
  }

  async broadcast(
    txBytes: Uint8Array,
    options?: BroadcastOptions
  ): Promise<BroadcastResult> {
    const { checkTx, deliverTx } = { ...defaultBroadcastOptions, ...options };
    const mode: BroadcastMode =
      checkTx && deliverTx
        ? "broadcast_tx_commit"
        : checkTx
        ? "broadcast_tx_sync"
        : "broadcast_tx_async";
    const resp = await broadcast(this.endpoint, mode, txBytes);
    switch (mode) {
      case "broadcast_tx_async":
        const { hash: hash1, ...rest1 } = resp as CometBroadcastResult.Async;
        return {
          hash: hash1,
          add_tx: rest1,
        };
      case "broadcast_tx_sync":
        const { hash: hash2, ...rest2 } = resp as CometBroadcastResult.Sync;
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
        } = resp as CometBroadcastResult.Commit;
        return {
          hash: hash3,
          check_tx,
          deliver_tx: { height, ...deliver_tx },
        };
      default:
        throw new Error(`Wrong method: ${mode}`);
    }
  }
}