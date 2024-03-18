import {
  Auth,
  BaseWallet,
  HttpEndpoint,
  SignerConfig,
} from "@cosmonauts/types";
import { defaultSignerConfig } from "./defaults";
import { SignResponseFromAuth, getAccountFromAuth } from "./utils";
import { EthTypedData, EthTypedDataWallet } from "./types";
import { BaseSigner, constructAuthFromWallet } from "@cosmonauts/utils";
import { _TypedDataEncoder } from "@ethersproject/hash";

export function toWallet(
  auth: Auth,
  config: SignerConfig = defaultSignerConfig
): EthTypedDataWallet {
  return {
    getAccount: async () => getAccountFromAuth(auth, config),
    sign: async (doc: EthTypedData) =>
      SignResponseFromAuth.signEip712TypedData(auth, doc, config),
  };
}

export class EthTypedDataSigner extends BaseSigner {
  constructor(
    auth: Auth,
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, config ?? defaultSignerConfig);
  }

  static async fromWallet(
    wallet: BaseWallet<EthTypedData>,
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    const auth: Auth = await constructAuthFromWallet(wallet, config);
    const signer = new EthTypedDataSigner(auth, endpoint, config);
    signer.signDoc = wallet.sign;
    return signer;
  }

  async signDoc(doc: EthTypedData) {
    return SignResponseFromAuth.signEip712TypedData(
      this.auth,
      doc,
      this.config
    );
  }
}
