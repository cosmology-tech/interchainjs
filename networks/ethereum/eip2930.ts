import { BaseSigner, assertEmpty } from "@cosmonauts/utils";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import { AccessListEIP2930TxData, TxOptions } from "@ethereumjs/tx";
import Eth from "web3-eth";
import { AccessListEIP2930TransactionExt, LegacyTransactionExt } from "./utils";
import { defaultSignerConfig } from "./defaults";
import { RequestClient } from "./types";

export class AccessListEIP2930Signer extends BaseSigner {
  protected _requestClient?: RequestClient;

  constructor(auth: Auth, endpoint?: string | HttpEndpoint) {
    super(auth, defaultSignerConfig);
    if (Eth.givenProvider) {
      this._requestClient = {
        broadcast: new Eth(Eth.givenProvider).sendSignedTransaction,
      };
    }
  }

  get requestClient() {
    assertEmpty(this._requestClient);
    return this._requestClient;
  }

  signTx(txData: AccessListEIP2930TxData, opts: TxOptions = {}) {
    const tx = AccessListEIP2930TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this.auth.sign(msg);
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
    const receipt = await this.requestClient.broadcast(message);
    return receipt;
  }
}
