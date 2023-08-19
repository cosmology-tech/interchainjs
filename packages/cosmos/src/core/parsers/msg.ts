import { TxResponse } from "interchain-query/cosmos/base/abci/v1beta1/abci";
import { AuthInfo, TxBody, TxRaw } from "interchain-query/cosmos/tx/v1beta1/tx";

import { TxBodyParser } from "../../const/tx";
import {
  ParserData,
  PartialProtoDoc,
  ProtoDoc,
  StdSignDoc,
  TelescopeData,
  WrapType,
  WrapTypeUrl,
} from "../../types";
import { toBytes } from "../utils/bytes";
import { standardizeFee } from "../utils/fee";
import { toParserArgs } from "../utils/parser";
import { BaseParser } from "./base";
import { MsgBaseParser } from "./msg.base";

export class MsgParser<ProtoT, AminoT> extends MsgBaseParser<ProtoT, AminoT> {
  constructor(args: ParserData<ProtoT, AminoT>) {
    super(args);
  }

  static fromParser<ProtoT, AminoT>(parser: BaseParser<ProtoT, AminoT>) {
    return new MsgParser<ProtoT, AminoT>(parser.args);
  }

  static fromTelescope<ProtoT, AminoT>(data: TelescopeData<ProtoT, AminoT>) {
    return new MsgParser(toParserArgs(data));
  }

  toStdDoc({
    msgs,
    fee,
    memo,
    accountNumber,
    sequence,
    chainId,
  }: ProtoDoc<ProtoT>): StdSignDoc<AminoT> {
    return {
      msgs: msgs.map((msg) => {
        this.protoParser.assertMsg(msg);
        return this.fromProto(msg).toAmino().wrap().pop() as WrapType<AminoT>;
      }),
      fee: standardizeFee(fee),
      memo,
      account_number: accountNumber.toString(),
      sequence: sequence.toString(),
      chain_id: chainId,
    };
  }

  async signOffline(protoDoc: ProtoDoc<ProtoT>): Promise<TxRaw> {
    const { msgs, fee, memo, sequence } = protoDoc;

    const txBody: TxBody = TxBodyParser.createProtoData({
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
      toBytes(this.toStdDoc(protoDoc))
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

  async signAndBroadcast(
    partialProtoDoc: PartialProtoDoc<ProtoT>,
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
