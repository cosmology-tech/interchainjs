import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import {
  AminoWallet,
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  SignerOptions,
  TxBodyOptions,
  AminoConverter,
  StdFee,
  StdSignDoc,
} from "./types";
import { Fee, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import { encodeStdSignDoc, toAminoMsgs, toFee, toStdFee } from "./utils/amino";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
  BaseSigner,
  getAccountFromAuth,
  constructAuthFromWallet,
} from "./utils";
import { SignMode } from "./types";
import { defaultSignerConfig } from "./defaults";

export function toWallet(auth: Auth): AminoWallet {
  return {
    getAccount: () => getAccountFromAuth(auth),
    async sign(doc: StdSignDoc) {
      const encoded = encodeStdSignDoc(doc);
      const signature = auth.sign(defaultSignerConfig.message.hash(encoded));
      return {
        signature: defaultSignerConfig.signature.toCompact(
          signature,
          auth.algo
        ),
        signed: doc,
      };
    },
  };
}

export class AminoSigner extends BaseSigner<StdSignDoc> {
  readonly encoders: Encoder[];
  readonly converters: AminoConverter[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, endpoint, config);
    this.encoders = encoders;
    this.converters = converters;
  }

  static async fromWallet(
    wallet: AminoWallet,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint
  ) {
    const auth: Auth = await constructAuthFromWallet(wallet);
    const signer = new AminoSigner(auth, encoders, converters, endpoint);
    signer.setSignDoc(wallet.sign);
    return signer;
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

  protected signDoc = async (doc: StdSignDoc) => {
    const encoded = encodeStdSignDoc(doc);
    const signature = this.signArbitrary(encoded);
    return {
      signature,
      signed: doc,
    };
  };

  async sign(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & TxBodyOptions
  ) {
    const { txBody, encode } = constructTxBody(
      messages,
      this.getEncoder,
      memo,
      options
    );
    const { signerInfo } = constructSignerInfo(
      this.encodedPublicKey,
      options?.sequence ?? (await this.queryClient.getSequence()),
      SignMode.SIGN_MODE_LEGACY_AMINO_JSON
    );

    const _fee: Fee = toFee(
      fee ?? (await this.queryClient.estimateFee(txBody, [signerInfo], options))
    );

    const doc: StdSignDoc = {
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

    const { signature, signed } = await this.signDoc(doc);
    const txRaw = TxRaw.fromPartial({
      bodyBytes: encode(),
      authInfoBytes: constructAuthInfo([signerInfo], _fee).encode(),
      signatures: [signature.value],
    });
    return {
      signature,
      signed,
      txRaw,
      broadcast: async (options?: BroadcastOptions) => {
        return this.broadcast(txRaw, options);
      },
    };
  }
}
