import {
  Auth,
  BaseSigner,
  Bech32Address,
  HttpEndpoint,
  parsePrice,
  Price,
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
import Decimal from "decimal.js";

import { PubKey as PubKeySecp256k1 } from "./codegen/cosmos/crypto/secp256k1/keys";
import prefixJson from "./config/prefix.json";
import {
  AccountData,
  EncodeObject,
  Generated,
  Registry,
  Signed,
  SignerOptions,
  VisualSignDoc,
} from "./types";
import { toBech32 } from "./utils/account";
import { getAvgGasPrice } from "./utils/price";
import { EncodeObjectUtils, TxUtils } from "./utils/tx";

export class Signer extends BaseSigner<RpcClient> {
  readonly generated: Generated[] = [];
  gasPrice?: Price | string;
  accountData: AccountData;

  constructor(registry?: Registry, options?: SignerOptions) {
    super(RpcClient);
    this.gasPrice = options?.gasPrice;
    if (registry) this.register(registry);
  }

  register(registry?: Registry) {
    registry?.forEach(([typeUrl, type]) => {
      this.generated.push({ ...type, typeUrl });
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

  protected encodePubKey(pubkey: Uint8Array) {
    return {
      typeUrl: PubKeySecp256k1.typeUrl,
      value: PubKeySecp256k1.encode(
        PubKeySecp256k1.fromPartial({ key: pubkey })
      ).finish(),
    };
  }

  protected async initAccountData() {
    const chainId = await this.getChainId();
    const _prefix = (prefixJson as any)[chainId];
    if (!_prefix) {
      throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
    }
    const bech32address = toBech32(_prefix, this.auth.key.address);

    const { sequence, accountNumber } = await this.getSequence(bech32address);
    this.accountData = {
      chainId,
      sequence,
      accountNumber,
      address: bech32address,
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
    const generated = this.generated.find((g) => g.typeUrl === typeUrl);
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
      gasPrice?: Price | string;
    }
  ) {
    const gas = await this.estimateGas(messages, memo);
    const gasLimit = new Decimal(gas.gasUsed.toString())
      .mul(options?.multiplier || 1.6)
      .ceil();

    let price =
      options.gasPrice ||
      this.gasPrice ||
      getAvgGasPrice(this.accountData.chainId);

    if (typeof price === "string") {
      price = parsePrice(price);
      if (price.denom.length < 3 || price.denom.length > 128) {
        throw new Error("Denom must be between 3 and 128 characters");
      }
    }
    return Fee.fromPartial({
      amount: [
        {
          amount: gasLimit.mul(price.amount).ceil().toString(),
          denom: price.denom,
        },
      ],
      gasLimit: BigInt(gasLimit.toString()),
    });
  }

  protected _signDoc(doc: SignDoc) {
    const signDoc = SignDoc.fromPartial(doc);
    const signature = this.signRawBytes(SignDoc.encode(signDoc).finish());
    const txRaw = TxRaw.fromPartial({
      bodyBytes: doc.bodyBytes,
      authInfoBytes: doc.authInfoBytes,
      signatures: [signature],
    });
    return {
      signDoc,
      execDoc: txRaw,
    };
  }

  async signMessages(
    messages: EncodeObject[],
    fee?: Fee,
    memo: string = "",
    options?: {
      multiplier?: number;
      gasPrice?: Price | string;
    }
  ): Promise<Signed<SignDoc, VisualSignDoc>> {
    if (!this.accountData) {
      await this.initAccountData();
    }

    const [visualMessages, encodedMessages] =
      EncodeObjectUtils.fromPartialAndEncode(
        messages,
        this.getGeneratedFromTypeUrl
      );

    const txBody: TxBody = TxBody.fromPartial({
      messages: encodedMessages,
      memo,
    });

    const visualTxBody = {
      ...txBody,
      messages: visualMessages,
    };

    const signerInfo: SignerInfo = SignerInfo.fromPartial({
      publicKey: this.encodePubKey(this.auth.key.pubkey),
      sequence: this.accountData.sequence,
      modeInfo: { single: { mode: SignMode.SIGN_MODE_DIRECT } },
    });

    const authInfo: AuthInfo = AuthInfo.fromPartial({
      fee: fee || (await this.estimateFee(messages, memo, options)),
      signerInfos: [signerInfo],
    });

    const visualDoc: VisualSignDoc = {
      txBody: visualTxBody,
      authInfo,
      chainId: this.accountData.chainId,
      accountNumber: this.accountData.accountNumber,
    };

    const doc: SignDoc = SignDoc.fromPartial({
      bodyBytes: TxBody.encode(txBody).finish(),
      authInfoBytes: AuthInfo.encode(authInfo).finish(),
      chainId: this.accountData.chainId,
      accountNumber: this.accountData.accountNumber,
    });

    const { signDoc, execDoc } = this._signDoc(doc);

    return {
      visualDoc,
      signDoc,
      execDoc,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(execDoc, checkTx, deliverTx);
      },
    };
  }

  signDoc(doc: SignDoc): Signed<SignDoc, VisualSignDoc> {
    const visualDoc: VisualSignDoc = {
      txBody: TxBody.decode(doc.bodyBytes),
      authInfo: AuthInfo.decode(doc.authInfoBytes),
      chainId: doc.chainId,
      accountNumber: doc.accountNumber,
    };

    const { signDoc, execDoc } = this._signDoc(doc);
    return {
      visualDoc,
      signDoc,
      execDoc,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(execDoc, checkTx, deliverTx);
      },
    };
  }

  async broadcast(txRaw: TxRaw, checkTx = true, deliverTx = false) {
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastRawBytes(txBytes, checkTx, deliverTx);
  }

  async broadcastRawBytes(raw: Uint8Array, checkTx = true, deliverTx = false) {
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
