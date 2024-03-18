import {
  Auth,
  BaseWallet,
  HttpEndpoint,
  SignerConfig,
} from "@cosmonauts/types";
import { defaultEthTypedData, defaultSignerConfig } from "./defaults";
import {
  AminoConverter,
  Encoder,
  FeeOptions,
  Message,
  SignerOptions,
  StdFee,
  TxBodyOptions,
} from "@cosmonauts/cosmos/types";
import { getAccountFromAuth } from "./utils";
import { SignResponseFromAuth } from "@cosmonauts/ethereum/utils";
import { BaseSigner } from "@cosmonauts/cosmos/utils";
import { EthTypedDataWallet, EthTypedData } from "./types";
import { constructAuthFromWallet } from "@cosmonauts/utils";
import { AminoSigner } from "./amino";

export function toWallet(
  auth: Auth,
  config: SignerConfig = defaultSignerConfig.Ethereum
): EthTypedDataWallet {
  return {
    getAccount: async () => getAccountFromAuth(auth, config),
    sign: async (doc: EthTypedData) =>
      SignResponseFromAuth.signEip712TypedData(auth, doc, config),
  };
}

export class EthTypedDataSigner extends BaseSigner<EthTypedData> {
  readonly aminoSigner: AminoSigner;

  constructor(
    auth: Auth,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, encoders, endpoint, config ?? defaultSignerConfig.Ethereum);
    this.aminoSigner = new AminoSigner(
      auth,
      encoders,
      converters,
      endpoint,
      config
    );
  }

  static async fromWallet(
    wallet: BaseWallet<EthTypedData>,
    encoders: Encoder[],
    converters: AminoConverter[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    const auth: Auth = await constructAuthFromWallet(wallet, config);
    const signer = new EthTypedDataSigner(
      auth,
      encoders,
      converters,
      endpoint,
      config
    );
    signer.signDoc = wallet.sign;
    return signer;
  }

  get converters() {
    return this.aminoSigner.converters;
  }
  addConverters = (converters: AminoConverter[]) =>
    this.aminoSigner.addConverters(converters);
  getConverter = (aminoType: string) =>
    this.aminoSigner.getConverter(aminoType);
  getConverterFromTypeUrl = (typeUrl: string) =>
    this.aminoSigner.getConverterFromTypeUrl(typeUrl);

  async createDoc(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & TxBodyOptions
  ) {
    const created = await this.aminoSigner.createDoc(
      messages,
      fee,
      memo,
      options
    );
    const signDoc: EthTypedData = {
      ...defaultEthTypedData,
      message: created.signDoc,
    };
    return { signDoc, txRaw: created.txRaw };
  }

  signDoc = async (doc: EthTypedData) => {
    return SignResponseFromAuth.signEip712TypedData(
      this.auth,
      doc,
      this.config
    );
  };
}
