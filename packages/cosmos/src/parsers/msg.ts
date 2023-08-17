import { AuthInfo, TxBody, TxRaw } from "interchain-query/cosmos/tx/v1beta1/tx";

import {
  ParserData,
  PartialProtoDoc,
  ProtoDoc,
  StdSignDoc,
  WrapType,
  WrapTypeUrl,
} from "../types";
import { BaseParser } from "./base";
import { MsgBaseParser } from "./msg.base";
import { txBodyParser } from "./tx.const";

export class MsgParser<ProtoT, AminoT> extends MsgBaseParser<ProtoT, AminoT> {
  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new MsgParser<ProtoT, AminoT>(parser.args);
  }

  toStdDoc({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: ProtoDoc<ProtoT>): StdSignDoc<AminoT> {
    if (!this.aminoParser) {
      throw new Error(
        `No such aminoType and converter for typeUrl "${this.protoType}".`
      );
    }

    const _fee = { ...fee, gas: fee.gasLimit.toString() };
    delete _fee.gasLimit;
    _fee.payer === "" && delete _fee.payer;
    _fee.granter === "" && delete _fee.granter;

    return {
      msgs: msgs.map((msg) => {
        this.protoParser.assertMsg(msg);
        return this.fromProto(msg).toAmino().pop() as WrapType<AminoT>;
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

  async signOffline(protoDoc: ProtoDoc<ProtoT>): Promise<TxRaw> {
    const { msgs, fee, memo, sequence } = protoDoc;

    const txBody: TxBody = txBodyParser.createProtoData({
      messages: msgs.map((msg) => {
        return this.fromProto(msg)
          .encode()
          .wrap()
          .pop() as WrapTypeUrl<Uint8Array>;
      }),
      memo,
    }) as TxBody;

    const authInfo: AuthInfo = this.createAuthInfo({
      pubkey: this.auth.key.pubkey,
      sequence,
      fee,
    });

    const signature: Uint8Array = this.auth.sign(
      this._toBytes(this.toStdDoc(protoDoc))
    );

    return this.createTxRaw({
      txBody,
      authInfo,
      signatures: [signature],
    });
  }

  async sign(partialProtoDoc: PartialProtoDoc<ProtoT>): Promise<TxRaw> {
    const protoDoc = await this.createProtoDoc(partialProtoDoc);
    return await this.signOffline(protoDoc);
  }
}
