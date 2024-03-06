import { BaseSigner } from "@cosmonauts/utils";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import { BlobEIP4844TxData, TxOptions } from "@ethereumjs/tx";
import Eth from "web3-eth";
import { BlobEIP4844TransactionExt, LegacyTransactionExt } from "./utils";
import { defaultSignerConfig } from "./defaults";

export class BlobEIP4844Signer extends BaseSigner {
  constructor(auth: Auth, endpoint?: string | HttpEndpoint) {
    super(auth, defaultSignerConfig);
  }

  signTx(txData: BlobEIP4844TxData, opts: TxOptions = {}) {
    const tx = BlobEIP4844TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const v = BigInt(recoveryId! + 27n);
    const signed = tx.processSignature(v, r, s);
    return {
      signature,
      signed: tx,
      broadcast: () => this.broadcastTx(signed),
    };
  }

  async broadcastTx(tx: LegacyTransactionExt) {
    return this.broadcast(tx.serialize());
  }

  async broadcast(data: Uint8Array) {
    const receipt = await this.query.sendSignedTransaction(raw);
    return receipt;
  }
}
