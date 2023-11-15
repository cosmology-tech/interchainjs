import { Auth, fromBase64, HttpEndpoint, SigObj } from "@sign/core";
import {
  AminoSigner,
  EncodeObjectUtils,
  StdFee,
  StdFeeUtils,
  StdSignDoc,
  StdSignDocUtils,
} from "@sign/cosmos-amino";
import {
  Any,
  AuthInfo,
  BinaryWriter,
  Ed25519PubKey,
  EncodeObject,
  GasPrice,
  Secp256k1PubKey,
  SignDoc,
  SignerData,
  SignerInfo,
  TxBody,
  TxRaw,
} from "@sign/cosmos-proto";
import { SignMode } from "@sign/cosmos-proto/src/codegen/cosmos/tx/signing/v1beta1/signing";

import {
  AccountData,
  DeliverTxResponse,
  IndexedTx,
  OfflineAminoSigner,
  OfflineDirectSigner,
  OfflineSigner,
  Options,
  SequenceResponse,
  SignerOptions,
} from "./types";
import { BroadcastTxError, sleep, TimeoutError } from "./utils";

/**
 * implement the same methods as what in `cosmjs` signingClient
 */
export class CosmjsSigner {
  readonly aminoSigner: AminoSigner;
  readonly broadcastTimeoutMs: number | undefined;
  readonly broadcastPollIntervalMs: number | undefined;

  private readonly _getAccounts: OfflineSigner["getAccounts"];
  private readonly _signAmino?: OfflineAminoSigner["signAmino"];
  private readonly _signDirect?: OfflineDirectSigner["signDirect"];
  private readonly gasPrice: GasPrice | undefined;

  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: Options = {}
  ) {
    this.aminoSigner = aminoSigner;
    this._getAccounts = offlineSigner.getAccounts;
    this._signAmino = (offlineSigner as OfflineAminoSigner).signAmino;
    this._signDirect = (offlineSigner as OfflineDirectSigner).signDirect;
    this.broadcastTimeoutMs = options.broadcastTimeoutMs;
    this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
    this.gasPrice = options.gasPrice;
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): CosmjsSigner {
    const aminoSigner = new AminoSigner(
      options.registry || [],
      options.aminoConverters || {}
    ).on(endpoint);
    return new CosmjsSigner(aminoSigner, signer, options);
  }

  private async initAuth(address: string) {
    const { pubkey } = await this.getAccount(address);
    const auth: Auth = {
      key: {
        pubkey,
        bech32address: address,
      },
      sign: (_data: Uint8Array) => {
        throw new Error("Not implemented.");
      },
      verify: (_data: Uint8Array, _sigObj: SigObj) => {
        throw new Error("Not implemented.");
      },
    };
    this.aminoSigner.by(auth);
  }

  private async getAccount(address: string): Promise<AccountData> {
    const accounts = await this._getAccounts();
    const account = accounts.find((account) => account.address === address);
    if (!account) {
      throw new Error(
        `No such account found in OfflineSigner for address ${address}`
      );
    }
    return account;
  }

  private async getPubkey(address: string): Promise<Any> {
    const account = await this.getAccount(address);
    let typeUrl: string;
    let PubKey: {
      encode(message: { key: Uint8Array }, writer?: BinaryWriter): BinaryWriter;
    };
    switch (account.algo) {
      case "secp256k1":
        typeUrl = Secp256k1PubKey.typeUrl;
        PubKey = Secp256k1PubKey;
        break;
      case "ed25519":
        typeUrl = Ed25519PubKey.typeUrl;
        PubKey = Ed25519PubKey;
        break;
      default:
        throw new Error(`${account.algo} not supported.`);
    }
    const publicKey: Any = {
      typeUrl,
      value: PubKey.encode({
        key: account.pubkey,
      }).finish(),
    };
    return publicKey;
  }

  async getChainId(): Promise<string> {
    return await this.aminoSigner.getChainId();
  }

  async getSequence(address: string): Promise<SequenceResponse> {
    return await this.aminoSigner.getSequence(address);
  }

  async sign(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const { accountNumber, sequence } = await this.getSequence(signerAddress);
      const chainId = await this.getChainId();
      signerData = {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
      };
    }
    return this._signDirect
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signWithAutoFee(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<TxRaw> {
    let usedFee: StdFee;
    if (fee == "auto" || typeof fee === "number") {
      await this.initAuth(signerAddress);
      const feeEstimation = await this.aminoSigner.estimateFee(messages, memo, {
        multiplier: typeof fee === "number" ? fee : 1.4,
        gasPrice: this.gasPrice,
      });
      usedFee = StdFeeUtils.fromFee(feeEstimation);
    } else {
      usedFee = fee;
    }
    const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
    return txRaw;
  }

  async simulate(
    signerAddress: string,
    messages: EncodeObject[],
    memo: string | undefined
  ): Promise<bigint> {
    await this.initAuth(signerAddress);
    const gas = await this.aminoSigner.estimateGas(messages, memo);
    return gas.gasUsed;
  }

  async broadcastTxSync(tx: Uint8Array): Promise<string> {
    const broadcasted = await this.aminoSigner.broadcastBytes(tx, true, false);
    if (broadcasted.check_tx?.code) {
      return Promise.reject(
        new BroadcastTxError(
          broadcasted.check_tx?.code,
          broadcasted.check_tx?.codespace ?? "",
          broadcasted.check_tx?.log
        )
      );
    }
    const transactionId = broadcasted.hash.toUpperCase();
    return transactionId;
  }

  public async signAndBroadcastSync(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<string> {
    const txRaw = await this.signWithAutoFee(
      signerAddress,
      messages,
      fee,
      memo
    );
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTxSync(txBytes);
  }

  async getTx(id: string): Promise<IndexedTx | null> {
    const tx = await this.aminoSigner.query.getTx(id);
    if (!tx) return null;
    const txRaw = TxRaw.decode(fromBase64(tx.tx));
    const txBody = TxBody.decode(txRaw.bodyBytes);
    return {
      height: tx.height,
      txIndex: tx.index,
      hash: tx.hash,
      code: tx.tx_result.code,
      events: tx.tx_result.events,
      rawLog: tx.tx_result.log,
      tx: fromBase64(tx.tx),
      msgResponses: txBody.messages,
      gasUsed: BigInt(tx.tx_result.gas_used),
      gasWanted: BigInt(tx.tx_result.gas_wanted),
    };
  }

  public async broadcastTx(
    tx: Uint8Array,
    timeoutMs = 60_000,
    pollIntervalMs = 3_000
  ): Promise<DeliverTxResponse> {
    let timedOut = false;
    const txPollTimeout = setTimeout(() => {
      timedOut = true;
    }, timeoutMs);

    const pollForTx = async (txId: string): Promise<DeliverTxResponse> => {
      if (timedOut) {
        throw new TimeoutError(
          `Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later. There was a wait of ${
            timeoutMs / 1000
          } seconds.`,
          txId
        );
      }
      await sleep(pollIntervalMs);
      const result = await this.getTx(txId);
      return result
        ? {
            code: result.code,
            height: result.height,
            txIndex: result.txIndex,
            events: result.events,
            rawLog: result.rawLog,
            transactionHash: txId,
            msgResponses: result.msgResponses,
            gasUsed: result.gasUsed,
            gasWanted: result.gasWanted,
          }
        : pollForTx(txId);
    };

    const transactionId = await this.broadcastTxSync(tx);

    return new Promise((resolve, reject) =>
      pollForTx(transactionId).then(
        (value) => {
          clearTimeout(txPollTimeout);
          resolve(value);
        },
        (error) => {
          clearTimeout(txPollTimeout);
          reject(error);
        }
      )
    );
  }

  async signAndBroadcast(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const txRaw = await this.signWithAutoFee(
      signerAddress,
      messages,
      fee,
      memo
    );
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs
    );
  }

  private async signDirect(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    if (!this._signDirect) {
      throw new Error("`signDirect` not implemented in provided OfflineSigner");
    }
    const txBody = TxBody.fromPartial({
      messages: EncodeObjectUtils.encode(
        messages,
        this.aminoSigner.getParserFromTypeUrl
      ),
      memo,
    });
    const authInfo = AuthInfo.fromPartial({
      signerInfos: [
        SignerInfo.fromPartial({
          publicKey: await this.getPubkey(signerAddress),
          sequence: BigInt(sequence),
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT,
            },
          },
        }),
      ],
      fee: StdFeeUtils.toFee(fee),
    });
    const doc: SignDoc = {
      bodyBytes: TxBody.encode(txBody).finish(),
      authInfoBytes: AuthInfo.encode(authInfo).finish(),
      chainId,
      accountNumber,
    };
    const { signature, signed } = await this._signDirect(signerAddress, doc);
    const txRaw = TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
    return txRaw;
  }

  private async signAmino(
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    if (!this._signAmino) {
      throw new Error("`signAmino` not implemented in provided OfflineSigner");
    }
    const doc: StdSignDoc = {
      chain_id: chainId,
      account_number: accountNumber.toString(),
      sequence: sequence.toString(),
      fee,
      msgs: EncodeObjectUtils.toAminoMsg(
        messages,
        this.aminoSigner.getParserFromTypeUrl
      ),
      memo,
    };
    const { signature, signed } = await this._signAmino(signerAddress, doc);
    const { bodyBytes, authInfoBytes } = StdSignDocUtils.toSignDoc(
      signed,
      await this.getPubkey(signerAddress),
      this.aminoSigner.getParserFromAminoType
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
    return txRaw;
  }
}
