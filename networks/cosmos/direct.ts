import { BaseSigner } from "@cosmonauts/base";
import { assertEmpty, isEmpty } from "@cosmonauts/utils";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import { Fee, SignDoc, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import {
  BroadcastOptions,
  Encoder,
  FeeOptions,
  Message,
  RequestClient,
  SignerOptions,
} from "./types/direct";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
} from "./utils/direct";
import { defaultBroadcastOptions, defaultMessageHash } from "./defaults";
import { RpcClient } from "./request/rpc";

export class DirectSigner extends BaseSigner {
  protected _requestClient?: RequestClient;
  readonly encoders: Encoder[];

  constructor(
    auth: Auth,
    encoders: Encoder[],
    endpoint?: string | HttpEndpoint
  ) {
    super(auth, defaultMessageHash);
    this.encoders = encoders;
    if (!isEmpty(endpoint)) {
      this._requestClient = new RpcClient(endpoint, auth.address);
    }
  }

  get requestClient() {
    assertEmpty(this._requestClient);
    return this._requestClient;
  }

  addEncoders(encoders: Encoder[]) {
    this.encoders.push(...encoders);
  }

  getEncoder(typeUrl: string) {
    const encoder = this.encoders.find(
      (encoder) => encoder.typeUrl === typeUrl
    );
    if (!encoder) {
      throw new Error(
        `No such Encoder for typeUrl ${typeUrl}, please add corresponding Encoder with method \`addEncoder\``
      );
    }
    return encoder;
  }

  async signMessages(
    messages: Message[],
    fee?: Fee,
    memo?: string,
    options?: FeeOptions & SignerOptions
  ) {
    const { txBody, encode } = constructTxBody(messages, this.getEncoder, memo);

    const { signerInfo } = constructSignerInfo(
      "secp256k1",
      this.auth.getPublicKey(),
      options?.sequence ?? (await this.requestClient.getSequence())
    );

    const doc = SignDoc.fromPartial({
      bodyBytes: encode(),
      authInfoBytes: constructAuthInfo(
        [signerInfo],
        fee ??
          (await this.requestClient.estimateFee(txBody, [signerInfo], options))
      ).encode(),
      chainId: options?.chainId ?? (await this.requestClient.getChainId()),
      accountNumber:
        options?.accountNumber ?? (await this.requestClient.getAccountNumber()),
    });

    return this.signDoc(doc);
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
      return {
        txRaw,
        broadcast: async (options?: BroadcastOptions) => {
          return this.broadcastTxRaw(txRaw, options);
        },
      };
    };
    return {
      signature,
      signed: signDoc,
      toTxRaw,
    };
  }

  async broadcastTxRaw(txRaw: TxRaw, options?: BroadcastOptions) {
    return this.broadcast(
      TxRaw.encode(TxRaw.fromPartial(txRaw)).finish(),
      options
    );
  }

  async broadcast(data: Uint8Array, options?: BroadcastOptions) {
    const _options = options || defaultBroadcastOptions;
    const mode =
      _options.checkTx && _options.deliverTx
        ? "broadcast_tx_commit"
        : _options.checkTx
        ? "broadcast_tx_sync"
        : "broadcast_tx_async";
    const txResponse = await this.requestClient.broadcast(data, mode);
    return txResponse;
  }
}
