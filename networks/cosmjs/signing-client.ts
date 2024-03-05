import { Auth, HttpEndpoint, Price } from "@cosmonauts/types";
import { fromBase64, Key } from "@cosmonauts/utils";

import {
  DeliverTxResponse,
  EncodeObject,
  SignerData,
  SignerOptions,
} from "./types/signing-client";
import {
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
  OfflineSigner,
} from "./types/wallet";
import { BroadcastTxError, sleep, TimeoutError } from "./utils";
import {
  AuthInfo,
  Secp256k1PubKey,
  SignDoc,
  SignMode,
  SignerInfo,
  StdFee,
  StdSignDoc,
  TxBody,
  TxRaw,
} from "@cosmonauts/cosmos/types";
import {
  constructAuthInfo,
  constructSignerInfo,
  constructTxBody,
  toAminoMsgs,
  toFee,
  toMessages,
  toStdFee,
} from "@cosmonauts/cosmos/utils";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { BaseAccount } from "./codegen/cosmos/auth/v1beta1/auth";
import { defaultAuthConfig } from "@cosmonauts/cosmos/defaults";
import { IBinaryWriter } from "./codegen/binary";
import { Any } from "./codegen/google/protobuf/any";

const authTemplate: Auth = {
  bech32Address: "",
  getPublicKey: (isCompressed?: boolean) => {
    throw new Error("Not implemented.");
  },
  sign: (_data: Uint8Array) => {
    throw new Error("Not implemented.");
  },
  verify: (_data: Uint8Array, _signature: Key) => {
    throw new Error("Not implemented.");
  },
  address: Key.fromHex(""),
};

/**
 * implement the same methods as what in `cosmjs` signingClient
 */
export class SigningClient {
  readonly offlineSigner: OfflineSigner;
  readonly broadcastTimeoutMs: number | undefined;
  readonly broadcastPollIntervalMs: number | undefined;

  readonly aminoSigner: AminoSigner;
  private readonly _getAccounts: OfflineSigner["getAccounts"];
  private readonly _signAmino?: OfflineAminoSigner["signAmino"];
  private readonly _signDirect?: OfflineDirectSigner["signDirect"];
  private readonly gasPrice?: Price | string;

  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    aminoSigner.addEncoders(options.registry.map(([, g]) => g));
    aminoSigner.addConverters(Object.values(options.aminoConverters));
    this.aminoSigner = aminoSigner;
    this.offlineSigner = offlineSigner;
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
  ): SigningClient {
    const aminoSigner = new AminoSigner(authTemplate, [], [], endpoint);
    return new SigningClient(aminoSigner, signer, options);
  }

  private async initAuth(address: string) {
    const { pubkey } = await this.getAccountData(address);
    const getPublicKey = (isCompressed?: boolean) => {
      if (!isCompressed) {
        return Key.from(pubkey);
      }
      throw new Error("Getting compressed public key is not implemented");
    };
    const auth: Auth = {
      ...authTemplate,
      bech32Address: address,
      getPublicKey,
      address: defaultAuthConfig.computeAddress({ toPublicKey: getPublicKey }),
    };
    this.aminoSigner.setAuth(auth);
  }

  private async getAccountData(address: string): Promise<AccountData> {
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
    const account = await this.getAccountData(address);
    let typeUrl: string;
    let PubKey: {
      encode(
        message: { key: Uint8Array },
        writer?: IBinaryWriter
      ): IBinaryWriter;
    };
    switch (account.algo) {
      case "secp256k1":
        typeUrl = Secp256k1PubKey.typeUrl;
        PubKey = Secp256k1PubKey;
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

  private signWithAutoFee = async (
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<TxRaw> => {
    let usedFee: StdFee;
    if (fee == "auto" || typeof fee === "number") {
      await this.initAuth(signerAddress);
      const feeEstimation = await this.aminoSigner.estimateFee(messages, memo, {
        multiplier: typeof fee === "number" ? fee : void 0,
        gasPrice: this.gasPrice,
      });
      usedFee = toStdFee(feeEstimation);
    } else {
      usedFee = fee;
    }
    const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
    return txRaw;
  };

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
    const broadcasted = await this.aminoSigner.broadcast(tx, {
      checkTx: true,
      deliverTx: false,
    });
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

  signAndBroadcast = async (
    signerAddress: string,
    messages: EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> => {
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
  };

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
    const { txBody } = constructTxBody(
      messages,
      this.aminoSigner.getEncoder,
      memo
    );
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
      fee: toFee(fee),
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
      msgs: toAminoMsgs(messages, this.aminoSigner.getConverterFromTypeUrl),
      memo,
    };
    const { signature, signed } = await this._signAmino(signerAddress, doc);
    const bodyBytes = constructTxBody(
      toMessages(signed.msgs, this.aminoSigner.getConverter),
      this.aminoSigner.getEncoder,
      doc.memo
    ).encode();

    const { signerInfo } = constructSignerInfo(
      "secp256k1",
      this.aminoSigner.auth.getPublicKey(),
      BigInt(signed.sequence)
    );

    const authInfoBytes = constructAuthInfo(
      [signerInfo],
      toFee(signed.fee)
    ).encode();

    const txRaw = TxRaw.fromPartial({
      bodyBytes,
      authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
    return txRaw;
  }
}
