import {
  Auth,
  BaseSigner,
  Bech32Address,
  HttpEndpoint,
} from "@cosmonauts/core";
import {
  AuthInfo,
  Fee,
  SignDoc,
  SignerInfo,
  SignMode,
  Tx,
  TxBody,
  TxRaw,
} from "@cosmonauts/cosmos-proto";
import { RpcClient } from "@cosmonauts/cosmos-rpc";

import prefixJson from "./config/prefix.json";
import { CosmosDefaultOptions } from "./defaults";
import {
  AccountData,
  EncodeObject,
  Generated,
  Registry,
  Signed,
  SignerOptions,
} from "./types";
import { toBech32 } from "./utils/account";
import { calculateFee, GasPrice, getAvgGasPrice } from "./utils/fee";
import { EncodeObjectUtils, TxUtils } from "./utils/tx";

export class Signer extends BaseSigner<RpcClient> {
  protected hash = CosmosDefaultOptions.hash;
  protected signatureConverter = CosmosDefaultOptions.signatureConverter;
  protected encodePubKey = CosmosDefaultOptions.encodePubKey;
  protected parsers: Generated[] = [];
  accountData: AccountData;

  constructor(registry?: Registry, options?: SignerOptions) {
    super(RpcClient);
    if (options?.hash) this.hash = options?.hash;
    if (options?.signatureConverter)
      this.signatureConverter = options?.signatureConverter;
    if (options?.encodePubKey) this.encodePubKey = options?.encodePubKey;
    if (registry) this.register(registry);
  }

  register(registry?: Registry) {
    registry?.forEach(([typeUrl, type]) => {
      this.parsers.push({ ...type, typeUrl });
    });
  }

  on(endpoint: string | HttpEndpoint) {
    this._request = new this._RequestClient(endpoint);
    this.accountData = void 0;
    return this;
  }

  by(auth: Auth) {
    this._auth = auth;
    this.accountData = void 0;
    return this;
  }

  async initAccountData() {
    const chainId = await this.getChainId();
    let address: Bech32Address;
    if (!this.auth.key.bech32address) {
      const _prefix = (prefixJson as any)[chainId];
      if (!_prefix) {
        throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
      }
      address = toBech32(_prefix, this.auth.key.address);
    } else {
      address = this.auth.key.bech32address;
    }

    const { sequence, accountNumber } = await this.getSequence(address);
    this.accountData = {
      chainId,
      sequence,
      accountNumber,
      address,
    };
  }

  async getChainId(): Promise<string> {
    return this.request.getChainId();
  }

  async getSequence(address: Bech32Address) {
    const { sequence, accountNumber } =
      await this.request.getBaseAccount(address);
    return { sequence, accountNumber };
  }

  getGeneratedFromTypeUrl = (typeUrl: string): Generated => {
    const generated = this.parsers.find((g) => g.typeUrl === typeUrl);
    if (!generated) {
      throw new Error(
        `No such Generated corresponding to typeUrl ${typeUrl} registered`
      );
    }
    return generated;
  };

  async estimateGas(messages: EncodeObject[], memo: string = "") {
    if (!this.accountData) {
      await this.initAccountData();
    }
    const tx = TxUtils.toTxForGasEstimation(
      messages,
      this.encodePubKey(this.auth.key.pubkey),
      this.getGeneratedFromTypeUrl,
      this.accountData.sequence,
      memo
    );
    const { gasInfo } = await this.request.simulate({
      tx: void 0,
      txBytes: Tx.encode(tx).finish(),
    });
    if (typeof gasInfo === "undefined") {
      throw new Error("Fail to estimate gas by simulate tx.");
    }
    return gasInfo;
  }

  async estimateFee(
    messages: EncodeObject[],
    memo: string = "",
    options?: {
      multiplier?: number;
      gasPrice?: GasPrice;
    }
  ) {
    const gas = await this.estimateGas(messages, memo);
    const fee = calculateFee(
      gas.gasUsed * BigInt(Math.round(options?.multiplier || 1.6)),
      options?.gasPrice || getAvgGasPrice(this.accountData.chainId)
    );
    return fee;
  }

  async signMessages(
    messages: EncodeObject[],
    fee?: Fee,
    memo: string = "",
    options?: {
      multiplier?: number;
      gasPrice?: GasPrice;
    }
  ) {
    if (!this.accountData) {
      await this.initAccountData();
    }

    let _fee: Fee;
    if (!fee) {
      const gas = await this.estimateGas(messages, memo);
      _fee = calculateFee(
        gas.gasUsed * BigInt(options?.multiplier || 1.4),
        options?.gasPrice || getAvgGasPrice(this.accountData.chainId)
      );
    } else {
      _fee = fee;
    }

    const txBody: TxBody = TxBody.fromPartial({
      messages: EncodeObjectUtils.encode(
        messages,
        this.getGeneratedFromTypeUrl
      ),
      memo,
    });

    const signerInfo: SignerInfo = SignerInfo.fromPartial({
      publicKey: this.encodePubKey(this.auth.key.pubkey),
      sequence: this.accountData.sequence,
      modeInfo: { single: { mode: SignMode.SIGN_MODE_DIRECT } },
    });

    const doc: SignDoc = SignDoc.fromPartial({
      bodyBytes: TxBody.encode(txBody).finish(),
      authInfoBytes: AuthInfo.encode(
        AuthInfo.fromPartial({
          fee: _fee,
          signerInfos: [signerInfo],
        })
      ).finish(),
      chainId: this.accountData.chainId,
      accountNumber: this.accountData.accountNumber,
    });

    return this.signDoc(doc);
  }

  signDoc(doc: SignDoc): Signed<TxRaw> {
    const signature = this.signBytes(
      SignDoc.encode(SignDoc.fromPartial(doc)).finish()
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes: doc.bodyBytes,
      authInfoBytes: doc.authInfoBytes,
      signatures: [signature],
    });
    return {
      signed: txRaw,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(txRaw, checkTx, deliverTx);
      },
    };
  }

  async broadcast(txRaw: TxRaw, checkTx = true, deliverTx = false) {
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastBytes(txBytes, checkTx, deliverTx);
  }

  async broadcastBytes(raw: Uint8Array, checkTx = true, deliverTx = false) {
    const mode =
      checkTx && deliverTx
        ? "broadcast_tx_commit"
        : checkTx
          ? "broadcast_tx_sync"
          : "broadcast_tx_async";
    const txResponse = await this.request.broadcast(raw, mode);
    return txResponse;
  }
}
