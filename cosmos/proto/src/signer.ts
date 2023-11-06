import { BaseSigner } from "@sign/core";

import { PubKey as PubKeySecp256k1 } from "./codegen/cosmos/crypto/secp256k1/keys";
import { SignMode } from "./codegen/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  Fee,
  SignDoc,
  SignerInfo,
  Tx,
  TxBody,
  TxRaw,
} from "./codegen/cosmos/tx/v1beta1/tx";
import prefixJson from "./config/prefix.json";
import { CosmosDefaults } from "./defaults";
import { QueryParser } from "./query.parser";
import {
  Bech32Address,
  EncodeObject,
  Generated,
  Registry,
  Signed,
} from "./types";
import { toBech32 } from "./utils/bech";
import { EncodeObjectUtils } from "./utils/utils";

export class Signer extends BaseSigner<QueryParser> {
  protected hash = CosmosDefaults.hash;
  protected signatureConverter = CosmosDefaults.signatureConverter;
  protected generated: Generated[] = [];

  constructor(registry?: Registry) {
    super(QueryParser);
    registry && this.register(registry);
  }

  getBech32Address(chainId: string): Bech32Address {
    const prefix = (prefixJson as any)[chainId];
    if (!prefix) {
      throw new Error(`Cannot find bech32_prefix for chain ${chainId}.`);
    }
    return toBech32(prefix, this.auth.key.address);
  }

  async getChainId(): Promise<string> {
    return this.query.getChainId();
  }

  async getSequence(address: Bech32Address) {
    const {
      account: { sequence, accountNumber },
    } = await this.query.getBaseAccount(address);
    return { sequence, accountNumber };
  }

  async estimateGas(tx: Tx) {
    return this.query.estimateGas(Tx.encode(tx).finish());
  }

  async mockTx(messages: EncodeObject[], fee?: Fee, memo: string = "") {
    const chainId = await this.getChainId();
    const { sequence } = await this.getSequence(this.getBech32Address(chainId));
    const txBody: TxBody = TxBody.fromPartial({
      messages: EncodeObjectUtils.encode(
        messages,
        this.getGeneratedFromTypeUrl
      ),
      memo,
    });
    const signerInfo: SignerInfo = SignerInfo.fromPartial({
      publicKey: {
        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
        value: PubKeySecp256k1.encode({
          key: this.auth.key.pubkey,
        }).finish(),
      },
      sequence: BigInt(sequence),
      modeInfo: { single: { mode: SignMode.SIGN_MODE_UNSPECIFIED } },
    });

    return Tx.fromPartial({
      body: txBody,
      authInfo: AuthInfo.fromPartial({
        fee: Fee.fromPartial(fee || {}),
        signerInfos: [signerInfo],
      }),
      signatures: [new Uint8Array()],
    });
  }

  getGeneratedFromTypeUrl = (typeUrl: string): Generated => {
    const generated = this.generated.find((g) => g.typeUrl === typeUrl);
    if (!generated) {
      throw new Error(
        `No such Generated corresponding to typeUrl ${typeUrl} registered`
      );
    }
    return generated;
  };

  register(registry: Registry) {
    registry.forEach(([typeUrl, type]) => {
      this.generated.push({ ...type, typeUrl });
    });
  }

  sign(doc: SignDoc): Signed<TxRaw> {
    const signature = this.signBytes(
      SignDoc.encode(SignDoc.fromPartial(doc)).finish()
    );
    const signed = TxRaw.fromPartial({
      bodyBytes: doc.bodyBytes,
      authInfoBytes: doc.authInfoBytes,
      signatures: [signature],
    });
    return {
      signed,
      broadcast: async (checkTx = true, commitTx = false) => {
        return this.broadcast(signed, checkTx, commitTx);
      },
    };
  }

  async signMessages(messages: EncodeObject[], fee?: Fee, memo: string = "") {
    const tx = await this.mockTx(messages, fee, memo);
    const gas = await this.estimateGas(tx)
    const estimatedFee: Fee = 
    const { accountNumber } = await this.getSequence(this.getBech32Address(chainId));
    const doc: SignDoc = SignDoc.fromPartial({
      bodyBytes: TxBody.encode(tx.body),
      authInfoBytes: AuthInfo.encode(AuthInfo.fromPartial({
        fee: estimatedFee,
        signerInfos: tx.authInfo.signerInfos
      })),
      chainId: await this.getChainId(),
      accountNumber
    })
  }

  async broadcast(txRaw: TxRaw, checkTx = true, commitTx = false) {
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastBytes(txBytes, checkTx, commitTx);
  }

  async broadcastBytes(raw: Uint8Array, checkTx = true, commitTx = false) {
    const mode =
      checkTx && commitTx
        ? "broadcast_tx_commit"
        : checkTx
        ? "broadcast_tx_sync"
        : "broadcast_tx_async";
    const txResponse = await this.query.broadcast(raw, mode);
    return txResponse;
  }
}
