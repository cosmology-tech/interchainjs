import { DirectSigner } from "./direct";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import {
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  SignerOptions,
} from "./types/direct";
import { AminoConverter, StdSignDoc } from "./types/amino";
import { Fee, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import {
  encodeStdSignDoc,
  toAminoMsgs,
  toFee,
  toMessages,
  toStdFee,
} from "./utils/amino";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
} from "./utils/direct";
import { isEmpty, BaseSigner } from "@cosmonauts/utils";
import { defaultSignerConfig } from "./defaults";

export class AminoSigner extends BaseSigner {
  readonly converters: AminoConverter[];
  readonly directSigner: DirectSigner;

  constructor(
    auth: Auth,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint
  ) {
    super(auth, defaultSignerConfig);
    this.converters = converters;
    this.directSigner = new DirectSigner(auth, encoders, endpoint);
  }

  get requestClient() {
    return this.directSigner.requestClient;
  }

  addEncoders(encoders: Encoder[]) {
    this.directSigner.addEncoders(encoders);
  }

  getEncoder(typeUrl: string) {
    return this.directSigner.getEncoder(typeUrl);
  }

  addConverters(converters: AminoConverter[]) {
    this.converters.push(...converters);
  }

  getConverter(aminoType: string) {
    const converter = this.converters.find(
      (converter) => converter.aminoType === aminoType
    );
    if (!converter) {
      throw new Error(
        `No such Converter for type ${aminoType}, please add corresponding Converter with method \`addConverters\``
      );
    }
    return converter;
  }

  getConverterFromTypeUrl(typeUrl: string) {
    const converter = this.converters.find(
      (converter) => converter.typeUrl === typeUrl
    );
    if (!converter) {
      throw new Error(
        `No such Converter for typeUrl ${typeUrl}, please add corresponding Converter with method \`addConverter\``
      );
    }
    return converter;
  }

  async signMessages(
    messages: Message[],
    fee?: Fee,
    memo?: string,
    options?: FeeOptions & SignerOptions
  ) {
    let _fee: Fee = fee;
    if (isEmpty(_fee)) {
      const { txBody } = constructTxBody(messages, this.getEncoder, memo);
      const { signerInfo } = constructSignerInfo(
        "secp256k1",
        this.auth.getPublicKey(),
        options?.sequence ?? (await this.requestClient.getSequence())
      );
      _fee = await this.requestClient.estimateFee(
        txBody,
        [signerInfo],
        options
      );
    }

    const stdSignDoc: StdSignDoc = {
      chain_id: options?.chainId ?? (await this.requestClient.getChainId()),
      account_number: (
        options?.accountNumber ?? (await this.requestClient.getAccountNumber())
      ).toString(),
      sequence: (
        options?.sequence ?? (await this.requestClient.getSequence())
      ).toString(),
      fee: toStdFee(_fee),
      msgs: toAminoMsgs(messages, this.getConverterFromTypeUrl),
      memo: memo ?? "",
    };
    return this.signDoc(stdSignDoc);
  }

  async signDoc(doc: StdSignDoc) {
    const encoded = encodeStdSignDoc(doc);
    const signature = this.sign(encoded);
    const toTxRaw = () => {
      const bodyBytes = constructTxBody(
        toMessages(doc.msgs, this.getConverter),
        this.getEncoder,
        doc.memo
      ).encode();

      const { signerInfo } = constructSignerInfo(
        "secp256k1",
        this.auth.getPublicKey(),
        BigInt(doc.sequence)
      );

      const authInfoBytes = constructAuthInfo(
        [signerInfo],
        toFee(doc.fee)
      ).encode();

      const txRaw = TxRaw.fromPartial({
        bodyBytes,
        authInfoBytes,
        signatures: [signature.value],
      });
      return {
        txRaw,
        broadcast: async (options?: BroadcastOptions) => {
          return this.broadcastTxRaw(txRaw, options);
        },
      };
    };
    return {
      signed: doc,
      signature,
      toTxRaw,
    };
  }

  async broadcastTxRaw(txRaw: TxRaw, options?: BroadcastOptions) {
    return await this.directSigner.broadcastTxRaw(txRaw, options);
  }

  async broadcast(message: Uint8Array, options?: BroadcastOptions) {
    return await this.directSigner.broadcast(message, options);
  }
}
