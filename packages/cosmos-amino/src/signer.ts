import { BaseSigner } from "@sign/core";

import { SignDoc, TxRaw } from "./codegen/cosmos/tx/v1beta1/tx";
import { hash, signatureConverter } from "./defaults";
import { QueryParser } from "./query.parser";
import { Generated, Registry, Signed } from "./types";

export class Signer extends BaseSigner<QueryParser> {
  protected hash = hash;
  protected signatureConverter = signatureConverter;
  protected generated: Generated[] = [];

  constructor(registry?: Registry) {
    super(QueryParser);
    registry && this.register(registry);
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
