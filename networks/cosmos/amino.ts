import {
  Auth,
  BaseWallet,
  HttpEndpoint,
  SignerConfig,
} from "@cosmonauts/types";
import {
  AminoWallet,
  Encoder,
  FeeOptions,
  Message,
  SignerOptions,
  TxBodyOptions,
  AminoConverter,
  StdFee,
  StdSignDoc,
} from "./types";
import { toAminoMsgs } from "./utils/amino";
import { BaseSigner, getAccountFromAuth, SignResponseFromAuth } from "./utils";
import { SignMode } from "./types";
import { defaultSignerConfig } from "./defaults";
import { constructAuthFromWallet } from "@cosmonauts/utils";

export function toWallet(
  auth: Auth,
  config: SignerConfig = defaultSignerConfig
): AminoWallet {
  return {
    getAccount: async () => getAccountFromAuth(auth, config),
    sign: async (doc: StdSignDoc) =>
      SignResponseFromAuth.signAmino(auth, doc, config),
  };
}

export class AminoSigner extends BaseSigner<StdSignDoc> {
  readonly converters: AminoConverter[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, encoders, endpoint, config);
    this.converters = converters;
  }

  static async fromWallet(
    wallet: BaseWallet<StdSignDoc>,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    const auth: Auth = await constructAuthFromWallet(wallet, config);
    const signer = new AminoSigner(
      auth,
      encoders,
      converters,
      endpoint,
      config
    );
    signer.signDoc = wallet.sign;
    return signer;
  }

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

  async createDoc(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & TxBodyOptions
  ) {
    const { txRaw, fee: _fee } = await this.createTxRaw(
      messages,
      SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
      fee,
      memo,
      options
    );

    const signDoc: StdSignDoc = {
      chain_id: options?.chainId ?? (await this.queryClient.getChainId()),
      account_number: (
        options?.accountNumber ?? (await this.queryClient.getAccountNumber())
      ).toString(),
      sequence: (
        options?.sequence ?? (await this.queryClient.getSequence())
      ).toString(),
      fee,
      msgs: toAminoMsgs(messages, this.getConverterFromTypeUrl),
      memo: memo ?? "",
    };
    return { signDoc, txRaw };
  }

  signDoc = async (doc: StdSignDoc) => {
    return SignResponseFromAuth.signAmino(this.auth, doc, this.config);
  };
}
