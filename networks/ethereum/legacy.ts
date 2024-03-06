import { BaseSigner } from "@cosmonauts/utils";
import { Auth, HttpEndpoint } from "@cosmonauts/types";
import { Capability, LegacyTxData, TxOptions } from "@ethereumjs/tx";
import Eth from "web3-eth";
import { LegacyTransactionExt } from "./utils";
import { defaultSignerConfig } from "./defaults";

export class LegacySigner extends BaseSigner {
  constructor(auth: Auth, endpoint?: string | HttpEndpoint) {
    super(auth, defaultSignerConfig);
  }

  signTx(txData: LegacyTxData, opts: TxOptions = {}) {
    const tx = LegacyTransactionExt.fromTxData(txData, opts);

    // Hack for the constellation that we have got a legacy tx after spuriousDragon with a non-EIP155 conforming signature
    // and want to recreate a signature (where EIP155 should be applied)
    // Leaving this hack lets the legacy.spec.ts -> sign(), verifySignature() test fail
    let hackApplied = false;
    if (
      tx.common.gteHardfork("spuriousDragon") &&
      !tx.supports(Capability.EIP155ReplayProtection)
    ) {
      tx.addActiveCapabilities(Capability.EIP155ReplayProtection);
      hackApplied = true;
    }
    const msgHash = tx.getHashedMessageToSign();
    const signature = this.auth.sign(msgHash);

    const v = BigInt(recoveryId! + 27n);

    const signed = tx.processSignature(v, r, s);

    // Hack part 2
    if (hackApplied) {
      const index = tx.getActiveCapabilityIndex(
        Capability.EIP155ReplayProtection
      );
      if (index > -1) {
        tx.removeActiveCapabilityIndex(index);
      }
    }

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
