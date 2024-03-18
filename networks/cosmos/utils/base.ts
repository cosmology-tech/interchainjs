import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import {
  Key,
  BaseSigner as _BaseSigner,
  assertEmpty,
  isEmpty,
} from "@cosmonauts/utils";
import { defaultSignerConfig } from "../defaults";
import {
  BroadcastOptions,
  BroadcastResult,
  EncodedMessage,
  FeeOptions,
  Message,
  QueryClient,
  Secp256k1PubKey,
  SignerOptions,
  StdFee,
  TxBodyOptions,
  TxRaw,
} from "../types";
import { RpcClient } from "../query/rpc";

export abstract class BaseSigner<Doc> extends _BaseSigner {
  protected _queryClient?: QueryClient;

  constructor(
    auth: Auth,
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, config ?? defaultSignerConfig);
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

  get encodedPublicKey(): EncodedMessage {
    switch (this.auth.algo) {
      case "secp256k1":
        return {
          typeUrl: Secp256k1PubKey.typeUrl,
          value: Secp256k1PubKey.encode(
            Secp256k1PubKey.fromPartial({ key: this.publicKey.value })
          ).finish(),
        };
      case "ed25519":
        throw new Error(
          "Ed25519 signer info construction is not implemented yet"
        );
      default:
        throw new Error(`Unsupported public key algorithm: ${this.auth.algo}`);
    }
  }

  setSignDoc(signDoc: (doc: Doc) => Promise<{ signature: Key; signed: Doc }>) {
    this.signDoc = signDoc;
  }

  protected abstract signDoc: (
    doc: Doc
  ) => Promise<{ signature: Key; signed: Doc }>;

  abstract sign(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & TxBodyOptions
  ): Promise<{
    signature: Key;
    signed: Doc;
    txRaw: TxRaw;
    broadcast: (options?: BroadcastOptions) => Promise<BroadcastResult>;
  }>;

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

  async signAndBroadcast(
    messages: Message[],
    fee?: StdFee,
    memo?: string,
    options?: FeeOptions & SignerOptions & TxBodyOptions & BroadcastOptions
  ) {
    const { broadcast } = await this.sign(messages, fee, memo, options);
    return await broadcast(options);
  }
}
