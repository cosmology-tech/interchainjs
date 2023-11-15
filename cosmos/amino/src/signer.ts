import {
  calculateFee,
  EncodeObject,
  Fee,
  GasPrice,
  getAvgGasPrice,
  Parser,
  Registry,
  Signed,
  Signer,
  TxRaw,
} from "@sign/cosmos-proto";

import { AminoConverters, StdFee, StdSignDoc } from "./types";
import { EncodeObjectUtils, StdFeeUtils, StdSignDocUtils } from "./utils";

export class AminoSigner extends Signer {
  constructor(registry: Registry, aminoConverters: AminoConverters) {
    super();
    this.registerWithAmino(registry, aminoConverters);
  }

  registerWithAmino(registry: Registry, aminoConverters: AminoConverters) {
    registry.forEach(([typeUrl, type]) => {
      this.generated.push({
        ...type,
        typeUrl,
        amino: aminoConverters[typeUrl],
      });
    });
  }

  getParserFromAminoType = (type: string): Parser => {
    const generated = this.generated.find((g) => g.amino?.aminoType === type);
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
      const gas = await this.estimateGas(messages, memo);
      _fee = StdFeeUtils.fromFee(
        calculateFee(
          gas.gasUsed * BigInt(options?.multiplier || 1.4),
          options?.gasPrice || getAvgGasPrice(this.accountData.chainId)
        )
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
      this.publicKey,
      this.getParserFromAminoType
    );
    const signed = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [signature],
    });
    return {
      signed,
      broadcast: async (checkTx = true, deliverTx = false) => {
        return this.broadcast(signed, checkTx, deliverTx);
      },
    };
  }
}
