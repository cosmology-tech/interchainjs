import { assertEmpty, isEmpty, BaseSigner } from "@cosmonauts/utils";
import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import { Fee, SignDoc, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import {
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  QueryClient,
  SignerOptions,
} from "./types/direct";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
} from "./utils/direct";
import { defaultSignerConfig } from "./defaults";
import { RpcClient } from "./query/rpc";
import { StdFee } from "./types/amino";
import { toFee } from "./utils";
import { SignMode } from "./types";

export class DirectSigner extends BaseSigner {
  protected _queryClient?: QueryClient;
  readonly encoders: Encoder[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, config ?? defaultSignerConfig);
    this.encoders = encoders;
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

  async sign(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions
  ) {
    const { txBody, encode } = constructTxBody(messages, this.getEncoder, memo);

    const { signerInfo } = constructSignerInfo(
      "secp256k1",
      this.auth.getPublicKey(),
      options?.sequence ?? (await this.queryClient.getSequence()),
      SignMode.SIGN_MODE_DIRECT
    );

    const _fee: Fee = toFee(
      fee ?? (await this.queryClient.estimateFee(txBody, [signerInfo], options))
    );

    const doc = SignDoc.fromPartial({
      bodyBytes: encode(),
      authInfoBytes: constructAuthInfo([signerInfo], _fee).encode(),
      chainId: options?.chainId ?? (await this.queryClient.getChainId()),
      accountNumber:
        options?.accountNumber ?? (await this.queryClient.getAccountNumber()),
    });

    return this.signDoc(doc);
  }

  async signAndBroadcast(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & BroadcastOptions
  ) {
    const { broadcast } = await this.sign(messages, fee, memo, options);
    return await broadcast(options);
  }

  signDoc(doc: SignDoc) {
    const signDoc = SignDoc.fromPartial(doc);
    const signature = this.signArbitrary(SignDoc.encode(signDoc).finish());
    const toTxRaw = () => {
      const txRaw = TxRaw.fromPartial({
        bodyBytes: doc.bodyBytes,
        authInfoBytes: doc.authInfoBytes,
        signatures: [signature.value],
      });
      return txRaw;
    };
    const txRaw = toTxRaw();
    return {
      signature,
      signed: signDoc,
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
