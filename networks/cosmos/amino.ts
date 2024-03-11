import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import {
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  QueryClient,
  SignerOptions,
} from "./types/direct";
import { AminoConverter, StdFee, StdSignDoc } from "./types/amino";
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
import { isEmpty, BaseSigner, assertEmpty } from "@cosmonauts/utils";
import { defaultSignerConfig } from "./defaults";
import { SignMode } from "./types";
import { RpcClient } from "./query/rpc";

export class AminoSigner extends BaseSigner {
  protected _queryClient?: QueryClient;
  readonly encoders: Encoder[];
  readonly converters: AminoConverter[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, config ?? defaultSignerConfig);
    this.encoders = encoders;
    this.converters = converters;
    if (!isEmpty(endpoint)) {
      this.setEndpoint(endpoint);
    }
  }

  setEndpoint(endpoint: string | HttpEndpoint) {
    this._queryClient = new RpcClient(endpoint, this.address);
  }

  get queryClient() {
    assertEmpty(this._queryClient);
    return this._queryClient;
  }

  addEncoders = (encoders: Encoder[]) => {
    this.encoders.push(...encoders);
  };

  getEncoder = (typeUrl: string) => {
    const encoder = this.encoders.find(
      (encoder) => encoder.typeUrl === typeUrl
    );
    if (!encoder) {
      throw new Error(
        `No such Encoder for typeUrl ${typeUrl}, please add corresponding Encoder with method \`addEncoder\``
      );
    }
    return encoder;
  };

  addConverters = (converters: AminoConverter[]) => {
    this.converters.push(...converters);
  };

  getConverter = (aminoType: string) => {
    const converter = this.converters.find(
      (converter) => converter.aminoType === aminoType
    );
    if (!converter) {
      throw new Error(
        `No such Converter for type ${aminoType}, please add corresponding Converter with method \`addConverters\``
      );
    }
    return converter;
  };

  getConverterFromTypeUrl = (typeUrl: string) => {
    const converter = this.converters.find(
      (converter) => converter.typeUrl === typeUrl
    );
    if (!converter) {
      throw new Error(
        `No such Converter for typeUrl ${typeUrl}, please add corresponding Converter with method \`addConverter\``
      );
    }
    return converter;
  };

  async sign(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions
  ) {
    let _fee: Fee;
    if (isEmpty(fee)) {
      const { txBody } = constructTxBody(messages, this.getEncoder, memo);
      const { signerInfo } = constructSignerInfo(
        "secp256k1",
        this.auth.getPublicKey(),
        options?.sequence ?? (await this.queryClient.getSequence()),
        SignMode.SIGN_MODE_LEGACY_AMINO_JSON
      );
      _fee = toFee(
        await this.queryClient.estimateFee(txBody, [signerInfo], options)
      );
    } else {
      _fee = toFee(fee);
    }

    const stdSignDoc: StdSignDoc = {
      chain_id: options?.chainId ?? (await this.queryClient.getChainId()),
      account_number: (
        options?.accountNumber ?? (await this.queryClient.getAccountNumber())
      ).toString(),
      sequence: (
        options?.sequence ?? (await this.queryClient.getSequence())
      ).toString(),
      fee: toStdFee(_fee),
      msgs: toAminoMsgs(messages, this.getConverterFromTypeUrl),
      memo: memo ?? "",
    };
    return this.signDoc(stdSignDoc);
  }

  async signAndBroadcast(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & BroadcastOptions
  ) {
    const { broadcast } = await this.sign(messages, fee, memo, options)
    return await broadcast(options)
  }

  async signDoc(doc: StdSignDoc) {
    const encoded = encodeStdSignDoc(doc);
    const signature = this.signArbitrary(encoded);
    const toTxRaw = () => {
      const bodyBytes = constructTxBody(
        toMessages(doc.msgs, this.getConverter),
        this.getEncoder,
        doc.memo
      ).encode();

      const { signerInfo } = constructSignerInfo(
        this.auth.algo,
        this.auth.getPublicKey(),
        BigInt(doc.sequence),
        SignMode.SIGN_MODE_LEGACY_AMINO_JSON
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
      return txRaw;
    };
    const txRaw = toTxRaw();
    return {
      signature,
      signed: doc,
      txRaw,
      broadcast: async (options?: BroadcastOptions) => {
        return this.broadcast(txRaw, options);
      },
    };
  }

  async broadcast(txRaw: TxRaw, options?: BroadcastOptions) {
    return this.broadcastArbitrary(
      TxRaw.encode(TxRaw.fromPartial(txRaw)).finish(),
      options
    );
  }

  async broadcastArbitrary(message: Uint8Array, options?: BroadcastOptions) {
    const result = await this.queryClient.broadcast(message, options);
    return result;
  }
}
