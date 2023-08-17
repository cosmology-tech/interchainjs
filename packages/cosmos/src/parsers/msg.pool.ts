/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthInfo, TxBody, TxRaw } from "interchain-query/cosmos/tx/v1beta1/tx";

import {
  PartialProtoDoc,
  ProtoDoc,
  StdSignDoc,
  WrapType,
  WrapTypeUrl,
} from "../types";
import { MsgParser } from "./msg";
import { MsgBaseParser } from "./msg.base";
import { msgParsers } from "./msg.const";
import { txBodyParser } from "./tx.const";

export class MsgPoolParser extends MsgBaseParser<any, any> {
  private _pool: Record<string, MsgParser<any, any>> = {};

  constructor(parsers: MsgParser<any, any>[]) {
    super(parsers[0].args);
    this._pool = Object.fromEntries(
      parsers.map((parser) => [parser.protoType, parser])
    );
  }

  static with(...parsers: (MsgParser<any, any> | string)[]) {
    const _parsers = parsers.map((parser) => {
      if (typeof parser === "string") {
        const _parser = (msgParsers as any)[parser];
        if (!_parser) {
          throw new Error(`No such parser found with name ${parser}`);
        }
        return _parser;
      } else {
        return parser;
      }
    });
    return new MsgPoolParser(_parsers);
  }

  add(parser: MsgParser<any, any>) {
    this._pool[parser.protoType] = parser;
  }

  private _getParser(type: string) {
    const parser = this._pool[type];
    if (!parser) {
      throw new Error(
        `Please add the parser with typeUrl: ${type} in the pool (using \`add\` method).`
      );
    }
    return parser;
  }

  toStdDoc({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: ProtoDoc<WrapTypeUrl<any>>): StdSignDoc<any> {
    const _fee = { ...fee, gas: fee.gasLimit.toString() };
    delete _fee.gasLimit;
    _fee.payer === "" && delete _fee.payer;
    _fee.granter === "" && delete _fee.granter;

    return {
      msgs: msgs.map((msg) => {
        const parser = this._getParser(msg.typeUrl);
        return parser.fromProto(msg).toAmino().pop() as WrapType<any>;
      }),
      fee: _fee,
      memo,
      // account_number: Uint53.fromString(accountNumber.toString()).toString(),
      // sequence: Uint53.fromString(sequence.toString()).toString(),
      account_number: accountNumber.toString(),
      sequence: sequence.toString(),
      chain_id: chainId,
    };
  }

  async signOffline(protoDoc: ProtoDoc<WrapTypeUrl<any>>): Promise<TxRaw> {
    const { msgs, fee, memo, sequence } = protoDoc;

    const txBody: TxBody = txBodyParser.createProtoData({
      messages: msgs.map((msg) => {
        const parser = this._pool[msg.typeUrl];
        if (!parser) {
          throw new Error(`No parser provided for typeUrl ${this.protoType}`);
        }
        return parser.fromProto(msg).encode().pop() as WrapTypeUrl<Uint8Array>;
      }),
      memo,
    }) as TxBody;

    const authInfo: AuthInfo = this.createAuthInfo({
      pubkey: this.auth.key.pubkey,
      sequence,
      fee,
    });

    const signature = this.auth.sign(this._toBytes(this.toStdDoc(protoDoc)));

    return this.createTxRaw({
      txBody,
      authInfo,
      signatures: [signature],
    });
  }

  async sign(
    partialProtoDoc: PartialProtoDoc<WrapTypeUrl<any>>
  ): Promise<TxRaw> {
    const protoDoc = await this.createProtoDoc(partialProtoDoc);
    return await this.signOffline(protoDoc);
  }
}
