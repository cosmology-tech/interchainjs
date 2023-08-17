import {
  escapeCharacters,
  sortedJsonStringify,
} from "@cosmjs/amino/build/signdoc";
import { toBech32, toUtf8 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import { coins } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { chains } from "chain-registry";
import { SignMode } from "interchain-query/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  Fee,
  TxBody,
  TxRaw,
} from "interchain-query/cosmos/tx/v1beta1/tx";

import { Query } from "../query";
import { QueryParser } from "../query.parser";
import {
  AuthInfoParser,
  FeeParser,
  PubKeySecp256k1Parser,
  TxBodyParser,
  TxParser,
  TxRawParser,
} from "../sign.config";
import {
  Auth,
  ParserData,
  PartialProtoDoc,
  ProtoDoc,
  SignerData,
  WrapTypeUrl,
} from "../types";
import { BaseParser } from "./base";

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
    this._query = QueryParser.fromQuery(new Query(endpoint));
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

    let sequence = data.sequence;
    let accountNumber = data.accountNumber;
    if (
      typeof data.sequence === "undefined" ||
      typeof data.accountNumber === "undefined"
    ) {
      const prefix = chains.find((chain) => chain.chain_id === chainId)
        ?.bech32_prefix;
      if (!prefix) {
        throw new Error(
          `Cannot find bech32_prefix for chain ${chainId} in chain-registry`
        );
      }
      const { account } = await this.query.getBaseAccount(
        toBech32(prefix, this.auth.key.address)
      );
      sequence = account.sequence;
      accountNumber = account.accountNumber;
    }
    return { chainId, sequence, accountNumber };
  }

  private _getAvgGasPrice(chainId: string) {
    const feeToken = chains.find((chain) => chain.chain_id === chainId)?.fees
      ?.fee_tokens?.[0];
    if (typeof feeToken?.average_gas_price === "undefined") {
      throw new Error(`No average_gas_price found for chain ${chainId}`);
    }
    return GasPrice.fromString(
      `${feeToken.average_gas_price}${feeToken.denom}`
    );
  }

  private _calculateFee(gasLimit: number, gasPrice: GasPrice | string): Fee {
    const processedGasPrice =
      typeof gasPrice === "string" ? GasPrice.fromString(gasPrice) : gasPrice;
    const { denom, amount: gasPriceAmount } = processedGasPrice;
    const amount = gasPriceAmount
      .multiply(new Uint53(gasLimit))
      .ceil()
      .toString();
    return FeeParser.createProtoData({
      amount: coins(amount, denom),
      gasLimit: BigInt(gasLimit.toString()),
    }) as Fee;
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
            this.fromProto(msg).wrap().encode().pop() as WrapTypeUrl<Uint8Array>
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
    const fee = this._calculateFee(
      Math.round(
        Uint53.fromString(gasInfo.gasUsed.toString()).toNumber() *
          (multiplier || 1.3)
      ),
      gasPrice || this._getAvgGasPrice(signerData.chainId)
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

  protected _toBytes(obj: object) {
    return toUtf8(escapeCharacters(sortedJsonStringify(obj)));
  }
}
