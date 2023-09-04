import {
  AccessListEIP2930TxData,
  BlobEIP4844TxData,
  Capability,
  FeeMarketEIP1559TxData,
  LegacyTransaction,
  LegacyTxData,
} from "@ethereumjs/tx";
import { keccak_256 } from "@noble/hashes/sha3";
import { BaseSigner, fromHex } from "@sign/core";
import Eth from "web3-eth";

import { Signed } from "./types";
import {
  AccessListEIP2930TransactionExt,
  BlobEIP4844TransactionExt,
  FeeMarketEIP1559TransactionExt,
  LegacyTransactionExt,
} from "./utils";

export class Signer extends BaseSigner<Eth> {
  constructor() {
    super(Eth);
    if (Eth.givenProvider) {
      this._query = new Eth(Eth.givenProvider);
    }
  }

  signRaw(raw: Uint8Array): Signed<Uint8Array> {
    const rawHash = keccak_256(raw);
    const sigObj = this.auth.sign(rawHash);
    const signed = new Uint8Array([
      ...sigObj.r,
      ...sigObj.s,
      ...fromHex(sigObj.recoveryId === 1n ? "1c" : "1b"),
    ]);
    return {
      signed,
      broadcast: () => this.broadcast(signed),
    };
  }

  signLegacy(txData: LegacyTxData): Signed<LegacyTransaction> {
    const tx = LegacyTransactionExt.fromTxData(txData);

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
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const signed = tx.processSignature(recoveryId, r, s);

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
      signed,
      broadcast: () => this.broadcast(signed.serialize()),
    };
  }

  signEIP1559(txData: FeeMarketEIP1559TxData): Signed<FeeMarketEIP1559TxData> {
    const tx = FeeMarketEIP1559TransactionExt.fromTxData(txData);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const signed = tx.processSignature(recoveryId, r, s);
    return {
      signed,
      broadcast: () => this.broadcast(signed.serialize()),
    };
  }

  signEIP2930(
    txData: AccessListEIP2930TxData
  ): Signed<AccessListEIP2930TxData> {
    const tx = AccessListEIP2930TransactionExt.fromTxData(txData);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const signed = tx.processSignature(recoveryId, r, s);
    return {
      signed,
      broadcast: () => this.broadcast(signed.serialize()),
    };
  }

  signEIP4844(txData: BlobEIP4844TxData): Signed<BlobEIP4844TxData> {
    const tx = BlobEIP4844TransactionExt.fromTxData(txData);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const signed = tx.processSignature(recoveryId, r, s);
    return {
      signed,
      broadcast: () => this.broadcast(signed.serialize()),
    };
  }

  async broadcast(raw: Uint8Array) {
    const receipt = await this.query.sendSignedTransaction(raw);
    return receipt;
  }
}
