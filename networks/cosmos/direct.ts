import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import { Fee, SignDoc, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import {
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  SignerOptions,
  TxBodyOptions,
} from "./types";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
  BaseSigner,
} from "./utils";
import { StdFee } from "./types/amino";
import { toFee } from "./utils";
import { SignMode } from "./types";

export class DirectSigner extends BaseSigner<SignDoc> {
  readonly encoders: Encoder[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, endpoint, config);
    this.encoders = encoders;
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

  protected signDoc = (doc: SignDoc) => {
    const signDoc = SignDoc.fromPartial(doc);
    const signature = this.signArbitrary(SignDoc.encode(signDoc).finish());
    return {
      signature,
      signed: signDoc,
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

    const { signature, signed } = await this.signDoc(doc);
    const txRaw = TxRaw.fromPartial({
      bodyBytes: doc.bodyBytes,
      authInfoBytes: doc.authInfoBytes,
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
