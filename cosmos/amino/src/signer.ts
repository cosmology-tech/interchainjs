import {
  EncodeObject,
  Fee,
  GasPrice,
  Parser,
  Registry,
  Signed,
  Signer,
  SignerOptions,
  TxRaw,
} from "@cosmonauts/cosmos-proto";

import { AminoConverters, StdFee, StdSignDoc } from "./types";
import { EncodeObjectUtils, StdFeeUtils, StdSignDocUtils } from "./utils";

export class AminoSigner extends Signer {
  constructor(
    registry?: Registry,
    aminoConverters?: AminoConverters,
    options?: SignerOptions
  ) {
    super(void 0, options);
    this.registerWithAmino(registry, aminoConverters);
  }

  registerWithAmino(registry?: Registry, aminoConverters?: AminoConverters) {
    registry?.forEach(([typeUrl, type]) => {
      this.parsers.push({
        ...type,
        typeUrl,
        amino: aminoConverters[typeUrl],
      });
    });
  }

  getParserFromAminoType = (type: string): Parser => {
    const generated = this.parsers.find((g) => g.amino?.aminoType === type);
    if (!generated) {
      throw new Error(
        `No such Generated corresponding to aminoType ${type} registered`
      );
    }
    return generated;
  };

  async signMessagesWithAmino(
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

    let _fee: StdFee;
    if (!fee) {
      _fee = StdFeeUtils.fromFee(
        await this.estimateFee(messages, memo, options)
      );
    } else {
      _fee = StdFeeUtils.fromFee(fee);
    }

    const doc: StdSignDoc = {
      chain_id: this.accountData.chainId,
      account_number: this.accountData.accountNumber.toString(),
      sequence: this.accountData.sequence.toString(),
      fee: _fee,
      msgs: EncodeObjectUtils.toAminoMsg(messages, this.getParserFromTypeUrl),
      memo,
    };

    return this.signDocWithAmino(doc);
  }

  signDocWithAmino(doc: StdSignDoc): Signed<TxRaw> {
    const signature = this.signBytes(StdSignDocUtils.encode(doc));
    const { bodyBytes, authInfoBytes } = StdSignDocUtils.toSignDoc(
      doc,
      this.encodePubKey(this.auth.key.pubkey),
      this.getParserFromAminoType
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [signature],
    });
    return {
      signed: txRaw,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(txRaw, checkTx, deliverTx);
      },
    };
  }
}
