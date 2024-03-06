import { BaseSigner } from "@cosmonauts/utils";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import { FeeMarketEIP1559TxData, TxOptions } from "@ethereumjs/tx";
import Eth from "web3-eth";
import { FeeMarketEIP1559TransactionExt, LegacyTransactionExt } from "./utils";
import { defaultSignerConfig } from "./defaults";

export class FeeMarketEIP1559Signer extends BaseSigner {
  constructor(auth: Auth, endpoint?: string | HttpEndpoint) {
    super(auth, defaultSignerConfig);
  }

  signTx(txData: FeeMarketEIP1559TxData, opts: TxOptions = {}) {
    const tx = FeeMarketEIP1559TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const v = BigInt(recoveryId! + 27n);
    const signature = tx.processSignature(v, r, s);
    return {
      signature,
      signed: tx,
      broadcast: () => this.broadcastTx(signed),
    };
  }

  async broadcastTx(tx: LegacyTransactionExt) {
    return this.broadcast(tx.serialize());
  }

  async broadcast(message: Uint8Array) {
    const receipt = await this.query.sendSignedTransaction(message);
    return receipt;
  }
}
