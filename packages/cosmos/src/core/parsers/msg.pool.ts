import { TxBodyParser } from "../../const/tx";
import { AuthInfo, TxBody, TxRaw } from "../../interchain/proto/tx";
import { TxResponse } from "../../interchain/types";
import {
  PartialProtoDoc,
  ProtoDoc,
  StdSignDoc,
  TelescopeData,
  WrapType,
  WrapTypeUrl,
} from "../../types";
import { toStdFee } from "../utils/fee";
import { toBytes } from "../utils/json";
import { MsgParser } from "./msg";
import { MsgBaseParser } from "./msg.base";

export class MsgParserPool extends MsgBaseParser<any, any> {
  private _pool: Record<string, MsgParser<any, any>> = {};

  constructor(parsers: MsgParser<any, any>[]) {
    super(parsers[0].args);
    this._pool = Object.fromEntries(
      parsers.map((parser) => [parser.protoType, parser])
    );
  }

  static fromParser(parser: MsgParser<any, any>) {
    return new MsgParserPool([parser]);
  }

  static fromParsers(...parsers: MsgParser<any, any>[]) {
    return new MsgParserPool(parsers);
  }

  static fromTelescope(...data: TelescopeData<any, any>[]) {
    const parsers = data.map((d) => {
      return MsgParser.fromTelescope(d);
    });
    return new MsgParserPool(parsers);
  }

  static fromPools(...pools: MsgParserPool[]) {
    return new MsgParserPool(pools.map((pool) => pool.parsers).flat());
  }

  addParsers(...parsers: MsgParser<any, any>[]) {
    parsers.forEach((parser) => {
      this._pool[parser.protoType] = parser;
    });
  }

  addTelescope(...data: TelescopeData<any, any>[]) {
    data.forEach((d) => {
      this._pool[d.typeUrl] = MsgParser.fromTelescope(d);
    });
  }

  mergePools(...pools: MsgParserPool[]) {
    pools.forEach((pool) => {
      this.addParsers(...pool.parsers);
    });
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

  toStdDoc({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: ProtoDoc<WrapTypeUrl<any>>): StdSignDoc<any> {
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

  async signOffline(protoDoc: ProtoDoc<WrapTypeUrl<any>>): Promise<TxRaw> {
    const { msgs, fee, memo, sequence } = protoDoc;

    const txBody: TxBody = TxBodyParser.createProtoData({
      messages: msgs.map((msg) => {
        return this._getParser(msg.typeUrl)
          .fromProto(msg)
          .encode()
          .pop() as WrapTypeUrl<Uint8Array>;
      }),
      memo,
    }) as TxBody;

    const authInfo: AuthInfo = this.createAuthInfo({
      pubkey: this.auth.key.pubkey,
      sequence,
      fee,
    });

    const signature = this.auth.sign(toBytes(this.toStdDoc(protoDoc)));

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

  async signAndBroadcast(
    partialProtoDoc: PartialProtoDoc<WrapTypeUrl<any>>,
    checkTx = true,
    commitTx = false
  ): Promise<TxResponse | undefined> {
    return await this.broadcast(
      await this.sign(partialProtoDoc),
      checkTx,
      commitTx
    );
  }
}
