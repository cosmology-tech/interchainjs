import { Auth, Uint53 } from "@sign/core";

import {
  AuthInfoParser,
  FeeParser,
  PubKeySecp256k1Parser,
  TxBodyParser,
  TxParser,
  TxRawParser,
} from "../../const";
import { AuthInfo, Fee, TxBody, TxRaw } from "../../interchain/proto/tx";
import { BroadcastMode, SignMode, TxResponse } from "../../interchain/types";
import {
  ParserData,
  PartialProtoDoc,
  ProtoDoc,
  SignerData,
  WrapTypeUrl,
} from "../../types";
import prefixJson from "../config/prefix.json";
import { QueryParser } from "../query.parser";
import { toBech32 } from "../utils/bech";
import { calculateFee, GasPrice, getAvgGasPrice } from "../utils/fee";
import { BaseParser } from "./base";
import { MsgParser } from "./msg";

export class MsgBaseParser<ProtoT, AminoT> extends BaseParser<ProtoT, AminoT> {
  protected _query?: QueryParser;
  protected _auth?: Auth;

  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new MsgBaseParser(parser.args);
  }

  get status() {
    return {
      query: this._query,
      auth: this._auth,
    };
  }

  get query() {
    this._assertQuery();
    return this._query!;
  }

  get auth() {
    this._assertAuth();
    return this._auth!;
  }

  on(endpoint: string) {
    this._query = new QueryParser(endpoint);
    return this;
  }

  by(auth: Auth) {
    this._auth = auth;
    return this;
  }

  protected _assertQuery() {
    if (!this._query) {
      throw new Error(
        "Please provide rpc endpoint before signing (using `on` method)."
      );
    }
  }

  protected _assertAuth() {
    if (!this._auth) {
      throw new Error(
        "Please provide auth info before signing (using `by` method)."
      );
    }
  }

  async createProtoDoc<T extends ProtoT | WrapTypeUrl<ProtoT>>(
    data: PartialProtoDoc<T>
  ): Promise<ProtoDoc<T>> {
    const { msgs, fee, memo, chainId, sequence, accountNumber } = data;
    const signerData = await this.createSignerData({
      chainId,
      sequence,
      accountNumber,
    });

    const protoDoc: ProtoDoc<T> = {
      msgs,
      fee: fee || (await this.estimateFee({ ...data, ...signerData })),
      memo: memo || "",
      chainId: signerData.chainId,
      sequence: signerData.sequence,
      accountNumber: signerData.accountNumber,
    };

    return protoDoc;
  }

  async createSignerData(data: Partial<SignerData>): Promise<SignerData> {
    const { chainId = await this.query.getChainId() } = data;
    if (
      typeof data.sequence === "undefined" ||
      typeof data.accountNumber === "undefined"
    ) {
      const prefix = (prefixJson as any)[chainId];
      if (!prefix) {
        throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
      }
      const {
        account: { sequence, accountNumber },
      } = await this.query.getBaseAccount(
        toBech32(prefix, this.auth.key.address)
      );
      return { chainId, sequence, accountNumber };
    } else {
      const { sequence, accountNumber } = data;
      return { chainId, sequence, accountNumber };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _getParser(protoType: string): MsgParser<any, any> {
    throw new Error("Method not implemented.");
  }

  async estimateFee<T extends ProtoT | WrapTypeUrl<ProtoT>>(
    data: Omit<PartialProtoDoc<T>, "fee">,
    gasPrice?: GasPrice,
    multiplier?: number
  ): Promise<Fee> {
    const { msgs, memo, chainId, sequence, accountNumber } = data;

    const signerData = await this.createSignerData({
      chainId,
      sequence,
      accountNumber,
    });
    const txBytes = TxParser.fromProto({
      body: TxBodyParser.createProtoData({
        messages: msgs.map(
          (msg) =>
            this._getParser((msg as any)["typeUrl"] || this.protoType)
              .fromProto(msg)
              .wrap()
              .encode()
              .pop() as WrapTypeUrl<Uint8Array>
        ),
        memo: memo,
      }),
      authInfo: AuthInfoParser.createProtoData({
        fee: FeeParser.createProtoData({}),
        signerInfos: [
          {
            publicKey: PubKeySecp256k1Parser.fromProto({
              key: this.auth.key.pubkey,
            })
              .wrap()
              .encode()
              .pop() as WrapTypeUrl<Uint8Array>,
            sequence: BigInt(signerData.sequence),
            modeInfo: { single: { mode: SignMode.SIGN_MODE_UNSPECIFIED } },
          },
        ],
      }),
      signatures: [new Uint8Array()],
    })
      .encode()
      .pop() as Uint8Array;
    const gasInfo = await this.query.estimateGas(txBytes);
    const fee = calculateFee(
      Math.round(
        Uint53.fromString(gasInfo.gasUsed.toString()).toNumber() *
          (multiplier || 1.3)
      ),
      gasPrice || getAvgGasPrice(signerData.chainId)
    );
    return fee;
  }

  createAuthInfo({
    pubkey,
    sequence,
    fee,
  }: {
    pubkey: Uint8Array;
    sequence: bigint;
    fee: Fee;
  }): AuthInfo {
    const signers = [
      {
        publicKey: PubKeySecp256k1Parser.fromProto({ key: pubkey })
          .wrap()
          .encode()
          .pop() as WrapTypeUrl<Uint8Array>,
        modeInfo: {
          single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON },
        },
        sequence,
      },
    ];
    return AuthInfoParser.createProtoData({
      signerInfos: signers,
      fee,
    }) as AuthInfo;
  }

  createTxRaw({
    txBody,
    authInfo,
    signatures,
  }: {
    txBody: TxBody;
    authInfo: AuthInfo;
    signatures: Uint8Array[];
  }): TxRaw {
    const txBodyBytes = TxBodyParser.fromProto(txBody)
      .encode()
      .pop() as Uint8Array;
    const authInfoBytes = AuthInfoParser.fromProto(authInfo)
      .encode()
      .pop() as Uint8Array;

    return TxRawParser.fromProto({
      bodyBytes: txBodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: signatures,
    }).pop() as TxRaw;
  }

  async broadcast(
    txRaw: TxRaw,
    checkTx = true,
    commitTx = false
  ): Promise<TxResponse | undefined> {
    const txBytes = TxRawParser.fromProto(txRaw).encode().pop() as Uint8Array;
    const mode =
      checkTx && commitTx
        ? BroadcastMode.BROADCAST_MODE_BLOCK
        : checkTx
        ? BroadcastMode.BROADCAST_MODE_SYNC
        : BroadcastMode.BROADCAST_MODE_ASYNC;
    const { txResponse } = await this.query.broadcast(txBytes, mode);
    return txResponse;
  }
}
