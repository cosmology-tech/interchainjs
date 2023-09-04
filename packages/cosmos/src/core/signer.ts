import { BaseSigner, Decimal } from "@sign/core";

import { PubKeySecp256k1Parser } from "../const";
import {
  AuthInfoParser,
  FeeParser,
  TxBodyParser,
  TxParser,
  TxRawParser,
} from "../const/tx";
import { AuthInfo, Fee, TxBody, TxRaw } from "../interchain/proto/tx";
import { BroadcastMode, SignMode, TxResponse } from "../interchain/types";
import {
  OfflineTxData,
  Signed,
  SignerData,
  StdSignDoc,
  TelescopeConst as TelescopeConst,
  TxData,
  WrapType,
  WrapTypeUrl,
} from "../types";
import prefixJson from "./config/prefix.json";
import { MsgParser } from "./parsers/msg";
import { QueryParser } from "./query.parser";
import { toBech32 } from "./utils/bech";
import { calculateFee, GasPrice, getAvgGasPrice, toStdFee } from "./utils/fee";
import { toBytes } from "./utils/json";

export class Signer extends BaseSigner<QueryParser> {
  protected _pool: Record<string, MsgParser<any, any>> = {};

  constructor(...data: TelescopeConst<any, any>[]) {
    super(QueryParser);
    const parsers = data.map((d) => {
      return MsgParser.fromTelescope(d);
    });
    this.setParsers(parsers);
  }

  static fromParsers(...parsers: MsgParser<any, any>[]) {
    const signer = new Signer();
    signer.setParsers(parsers);
    return signer;
  }

  setParsers(parsers: MsgParser<any, any>[]) {
    this._pool = Object.fromEntries(
      parsers.map((parser) => [parser.protoType, parser])
    );
  }

  get supportedMsgTypes() {
    return Array.from(Object.keys(this._pool));
  }

  get parsers() {
    return Array.from(Object.values(this._pool));
  }

  protected _getParser(protoType: string) {
    const parser = this._pool[protoType];
    if (!parser) {
      throw new Error(
        `Please add the parser with typeUrl: ${protoType} in the pool (using \`add\` method).`
      );
    }
    return parser;
  }

  protected async _createProtoDoc<T>(
    data: TxData<T>
  ): Promise<OfflineTxData<T>> {
    const { msgs, fee, memo, chainId, sequence, accountNumber } = data;
    const signerData = await this._createSignerData({
      chainId,
      sequence,
      accountNumber,
    });

    const protoDoc: OfflineTxData<T> = {
      msgs,
      fee: fee || (await this.estimateFee({ ...data, ...signerData })),
      memo: memo || "",
      chainId: signerData.chainId,
      sequence: signerData.sequence,
      accountNumber: signerData.accountNumber,
    };

    return protoDoc;
  }

  protected async _createSignerData(
    data: Partial<SignerData>
  ): Promise<SignerData> {
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

  protected _createAuthInfo({
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

  protected _createTxRaw({
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

  protected _toStdDoc({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: OfflineTxData<WrapTypeUrl<any>>): StdSignDoc<any> {
    return {
      msgs: msgs.map((msg) => {
        const parser = this._getParser(msg.typeUrl);
        return parser.fromProto(msg).toAmino().pop() as WrapType<any>;
      }),
      fee: toStdFee(fee),
      memo,
      account_number: accountNumber.toString(),
      sequence: sequence.toString(),
      chain_id: chainId,
    };
  }

  /**
   *
   * @param txData txData that don't need to request more info from web server
   * @returns TxRaw
   */
  protected _signOffline(txData: OfflineTxData<WrapTypeUrl<any>>): TxRaw {
    const { msgs, fee, memo, sequence } = txData;

    const txBody: TxBody = TxBodyParser.createProtoData({
      messages: msgs.map((msg) => {
        return this._getParser(msg.typeUrl)
          .fromProto(msg)
          .encode()
          .pop() as WrapTypeUrl<Uint8Array>;
      }),
      memo,
    }) as TxBody;

    const authInfo: AuthInfo = this._createAuthInfo({
      pubkey: this.auth.key.pubkey,
      sequence,
      fee,
    });

    const sigObj = this.auth.sign(toBytes(this._toStdDoc(txData)));
    const signature = new Uint8Array([...sigObj.r, ...sigObj.s]);

    return this._createTxRaw({
      txBody,
      authInfo,
      signatures: [signature],
    });
  }

  async estimateFee<T>(
    data: Omit<TxData<T>, "fee">,
    gasPrice?: GasPrice,
    multiplier: number = 1.3
  ): Promise<Fee> {
    const { msgs, memo, chainId, sequence, accountNumber } = data;

    const signerData = await this._createSignerData({
      chainId,
      sequence,
      accountNumber,
    });
    const txBytes = TxParser.fromProto({
      body: TxBodyParser.createProtoData({
        messages: msgs.map(
          (msg) =>
            this._getParser(msg.typeUrl)
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
      Decimal.fromBigInt(gasInfo.gasUsed).multiply(multiplier).round(),
      gasPrice || getAvgGasPrice(signerData.chainId)
    );
    return fee;
  }

  sign(txData: TxData<any>): Signed<Promise<TxRaw>> {
    const getSigned = async () => {
      const protoDoc = await this._createProtoDoc(txData);
      return this._signOffline(protoDoc);
    };
    return {
      signed: getSigned(),
      broadcast: async (checkTx = true, commitTx = false) => {
        const signed = await getSigned();
        return this.broadcast(signed, checkTx, commitTx);
      },
    };
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
