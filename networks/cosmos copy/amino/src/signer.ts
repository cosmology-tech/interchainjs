import { Price } from "@cosmonauts/core";
import {
  EncodeObject,
  Generated,
  Registry,
  Signed,
  Signer,
  SignerOptions,
} from "@cosmonauts/cosmos-proto";
import { Fee, TxRaw } from "@cosmonauts/cosmos-proto";

import { AminoConverters, StdFee, StdSignDoc } from "./types";
import { EncodeObjectUtils, StdFeeUtils, StdSignDocUtils } from "./utils";

export class AminoSigner extends Signer {
  constructor(
    registry?: Registry,
    aminoConverters?: AminoConverters,
    options?: SignerOptions
  ) {
    super(void 0, options);
    this.registerAmino(registry, aminoConverters);
  }

  registerAmino(registry?: Registry, aminoConverters?: AminoConverters) {
    registry?.forEach(([typeUrl, type]) => {
      this.generated.push({
        ...type,
        typeUrl,
        amino: aminoConverters[typeUrl],
      });
    });
  }

  getGeneratedFromAminoType = (type: string): Generated => {
    const generated = this.generated.find((g) => g.amino?.aminoType === type);
    if (!generated) {
      throw new Error(
        `No such Generated corresponding to aminoType ${type} registered`
      );
    }
    return generated;
  };

  async signAminoMessages(
    messages: EncodeObject[],
    fee?: Fee,
    memo: string = "",
    options?: {
      multiplier?: number;
      gasPrice?: Price | string;
    }
  ): Promise<Signed<StdSignDoc, StdSignDoc>> {
    if (!this._accountData) {
      await this.prepareAccountData();
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
      chain_id: this._accountData.chainId,
      account_number: this._accountData.accountNumber.toString(),
      sequence: this._accountData.sequence.toString(),
      fee: _fee,
      msgs: EncodeObjectUtils.toAminoMsg(
        messages,
        this.getGeneratedFromTypeUrl
      ),
      memo,
    };

    return this.signAminoDoc(doc);
  }

  signAminoDoc(doc: StdSignDoc): Signed<StdSignDoc, StdSignDoc> {
    const signDoc = StdSignDocUtils.fromPartial(doc);
    const signature = this.signRawBytes(StdSignDocUtils.encode(signDoc));
    const { bodyBytes, authInfoBytes } = StdSignDocUtils.toSignDoc(
      doc,
      this.encodePubKey(this.auth.getPublicKey()),
      this.getGeneratedFromAminoType
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [signature],
    });
    return {
      visualDoc: signDoc,
      signDoc,
      execDoc: txRaw,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(txRaw, checkTx, deliverTx);
      },
    };
  }
}
