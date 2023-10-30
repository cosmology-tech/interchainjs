import { sha256 } from "@noble/hashes/sha256";
import { BaseSigner, Decimal, SigObj } from "@sign/core";

import { SignMode } from "./codegen/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, Fee, TxBody, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import prefixJson from "./config/prefix.json";
import { PubKeySecp256k1Parser } from "./const/pubkey";
import {
  AuthInfoParser,
  FeeParser,
  SignDocParser,
  TxBodyParser,
  TxParser,
  TxRawParser,
} from "./const/tx";
import { MsgParser } from "./parsers/msg";
import { QueryParser } from "./query.parser";
import {
  AminoTxData,
  DirectTxData,
  OfflineAminoTxData,
  OfflineDirectTxData,
  OfflineTxData,
  Signed,
  SignerData,
  TelescopeGeneratedType,
  TxData,
  WrapType,
  WrapTypeUrl,
} from "./types";
import { AminoConverters, RegistryTypes } from "./types/cosmjs";
import { toBech32 } from "./utils/bech";
import {
  calculateFee,
  GasPrice,
  getLowGasPrice,
  toAminoFee,
} from "./utils/fee";
import { toBytes } from "./utils/json";

export class Signer extends BaseSigner<QueryParser> {
  protected _pool: Record<string, MsgParser<any, any>> = {};

  constructor(...data: TelescopeGeneratedType<any, any>[]) {
    super(QueryParser);
    const parsers = data.map((d) => {
      return MsgParser.fromTelescopeGeneratedType(d);
    });
    this.addParsers(parsers);
  }

  /**
   * using argument interfaces like cosmjs
   */
  register(registry: RegistryTypes, aminoConverters: AminoConverters) {
    registry.forEach(([typeUrl, type]) => {
      this._pool[typeUrl] = MsgParser.fromRegistry(
        typeUrl,
        type,
        aminoConverters[typeUrl]
      );
    });
  }

  // static connectWithSigner(rpcEndpoint, signer, {
  //   registry: (registry as any),
  //   aminoTypes
  // }) {

  //   return
  // }

  static fromParsers(...parsers: MsgParser<any, any>[]) {
    const signer = new Signer();
    signer.addParsers(parsers);
    return signer;
  }

  addParsers(parsers: MsgParser<any, any>[]) {
    this._pool = {
      ...this._pool,
      ...Object.fromEntries(
        parsers.map((parser) => [parser.protoType, parser])
      ),
    };
  }

  get supportedMsgTypes() {
    return Array.from(Object.keys(this._pool));
  }

  get parsers() {
    return Array.from(Object.values(this._pool));
  }

  protected _getParserFromProto(protoType: string) {
    const parser = this._pool[protoType];
    if (!parser) {
      throw new Error(
        `Please add the parser with typeUrl: ${protoType} in the pool (using \`addParsers\` method).`
      );
    }
    return parser;
  }

  protected _getParserFromAmino(aminoType: string) {
    const parser = this._pool[aminoType];
    if (!parser) {
      throw new Error(
        `Please add the parser with type: ${aminoType} in the pool (using \`addParsers\` method).`
      );
    }
    return parser;
  }

  protected _hash(msg: Uint8Array): Uint8Array {
    return sha256(msg);
  }

  protected _toSignature(sigObj: SigObj): Uint8Array {
    return new Uint8Array([...sigObj.r, ...sigObj.s]);
  }

  protected _toSigObj(signature: Uint8Array): SigObj {
    return {
      r: signature.slice(0, 32),
      s: signature.slice(32, 64),
      recoveryId: null,
    };
  }

  protected async _fetchSignerData(
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

  protected _toTx(tx: AminoTxData<any>): TxData<any> {
    return {
      msgs: tx.msgs.map((msg) => {
        const parser = this._getParserFromAmino(msg.type);
        return {
          typeUrl: parser.protoType,
          value: parser.converter.toProto(msg.value),
        };
      }),
      fee:
        typeof tx.fee !== "undefined"
          ? {
              amount: tx.fee.amount,
              gasLimit: BigInt(tx.fee.gas),
              payer: tx.fee.payer || "",
              granter: tx.fee.granter || "",
            }
          : void 0,
      memo: tx.memo,
      accountNumber:
        typeof tx.account_number !== "undefined"
          ? BigInt(tx.account_number)
          : void 0,
      sequence:
        typeof tx.sequence !== "undefined" ? BigInt(tx.sequence) : void 0,
      chainId: tx.chain_id,
    };
  }

  protected _toOfflineAminoTx({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: OfflineTxData<WrapTypeUrl<any>>): OfflineAminoTxData<any> {
    return {
      msgs: msgs.map((msg) => {
        const parser = this._getParserFromProto(msg.typeUrl);
        return parser.fromProto(msg).toAmino().pop() as WrapType<any>;
      }),
      fee: toAminoFee(fee),
      memo,
      account_number: accountNumber.toString(),
      sequence: sequence.toString(),
      chain_id: chainId,
    };
  }

  protected async _toOfflineTx<T>(data: TxData<T>): Promise<OfflineTxData<T>> {
    const { msgs, fee, memo, chainId, sequence, accountNumber } = data;
    const signerData = await this._fetchSignerData({
      chainId,
      sequence,
      accountNumber,
    });

    const offlineTx: OfflineTxData<T> = {
      msgs,
      fee: fee || (await this.estimateFee({ ...data, ...signerData })),
      memo: memo || "",
      chainId: signerData.chainId,
      sequence: signerData.sequence,
      accountNumber: signerData.accountNumber,
    };

    return offlineTx;
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
        return this._getParserFromProto(msg.typeUrl)
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

    const signature = this._signArbitrary(
      toBytes(this._toOfflineAminoTx(txData))
    );

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

    const signerData = await this._fetchSignerData({
      chainId,
      sequence,
      accountNumber,
    });
    const txBytes = TxParser.fromProto({
      body: TxBodyParser.createProtoData({
        messages: msgs.map(
          (msg) =>
            this._getParserFromProto(msg.typeUrl)
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
      gasPrice || this.getGasPrice(signerData.chainId)
    );
    return fee;
  }

  getGasPrice(chainId: string) {
    return getLowGasPrice(chainId);
    // return getAvgGasPrice(chainId);
    // return getHighGasPrice(chainId);
  }

  sign(tx: TxData<any>): Signed<Promise<TxRaw>> {
    const getSigned = async () => {
      const offlineTx = await this._toOfflineTx(tx);
      return this._signOffline(offlineTx);
    };
    return {
      signed: getSigned(),
      broadcast: async (checkTx = true, commitTx = false) => {
        const signed = await getSigned();
        return this.broadcast(signed, checkTx, commitTx);
      },
    };
  }

  signAmino(tx: AminoTxData<any>): Signed<Promise<TxRaw>> {
    const txData: TxData<any> = this._toTx(tx);
    return this.sign(txData);
  }

  signDirect(tx: DirectTxData): Signed<Promise<TxRaw>> {
    const getSigned = async () => {
      const { bodyBytes, authInfoBytes, chainId, accountNumber } = tx;
      let offlineTx: OfflineDirectTxData;
      if (chainId == void 0 || accountNumber == void 0) {
        const signerData = await this._fetchSignerData({
          chainId,
          accountNumber,
        });
        offlineTx = {
          ...tx,
          chainId: signerData.chainId,
          accountNumber: signerData.accountNumber,
        };
      } else {
        offlineTx = tx as OfflineDirectTxData;
      }
      const signature = this._signArbitrary(
        SignDocParser.fromProto(offlineTx).encode().pop() as Uint8Array
      );
      return TxRawParser.fromProto({
        bodyBytes,
        authInfoBytes,
        signatures: [signature],
      }).pop() as TxRaw;
    };
    return {
      signed: getSigned(),
      broadcast: async (checkTx = true, commitTx = false) => {
        const signed = await getSigned();
        return this.broadcast(signed, checkTx, commitTx);
      },
    };
  }

  signArbitrary(raw: Uint8Array): Signed<Uint8Array> {
    const signed = this._signArbitrary(raw);
    return {
      signed,
      broadcast: (checkTx = true, commitTx = false) =>
        this.broadcastArbitrary(signed, checkTx, commitTx),
    };
  }

  async broadcast(txRaw: TxRaw, checkTx = true, commitTx = false) {
    const txBytes = TxRawParser.fromProto(txRaw).encode().pop() as Uint8Array;
    return this.broadcastArbitrary(txBytes, checkTx, commitTx);
  }

  async broadcastArbitrary(raw: Uint8Array, checkTx = true, commitTx = false) {
    const mode =
      checkTx && commitTx
        ? "broadcast_tx_commit"
        : checkTx
        ? "broadcast_tx_sync"
        : "broadcast_tx_async";
    const txResponse = await this.query.broadcast(raw, mode);
    return txResponse;
  }
}
