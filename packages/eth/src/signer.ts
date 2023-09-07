import {
  AccessListEIP2930Transaction,
  AccessListEIP2930TxData,
  BlobEIP4844Transaction,
  BlobEIP4844TxData,
  Capability,
  FeeMarketEIP1559Transaction,
  FeeMarketEIP1559TxData,
  LegacyTransaction,
  LegacyTxData,
  TxOptions,
} from "@ethereumjs/tx";
import { keccak_256 } from "@noble/hashes/sha3";
import { BaseSigner, fromHex, SigObj, toHex } from "@sign/core";
import Eth from "web3-eth";

import { Signed, TxData } from "./types";
import {
  AccessListEIP2930TransactionExt,
  BlobEIP4844TransactionExt,
  constructTransactionExt,
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

  protected _hash(msg: Uint8Array): Uint8Array {
    return keccak_256(msg);
  }

  protected _toSignature(sigObj: SigObj): Uint8Array {
    return new Uint8Array([
      ...sigObj.r,
      ...sigObj.s,
      ...fromHex(sigObj.recoveryId === 1n ? "1c" : "1b"),
    ]);
  }

  protected _toSigObj(signature: Uint8Array): SigObj {
    return {
      r: signature.slice(0, 32),
      s: signature.slice(32, 64),
      recoveryId: toHex(signature.slice(64)) === "1c" ? 1n : null,
    };
  }

  signArbitrary(raw: Uint8Array): Signed<Uint8Array> {
    const signed = this._signArbitrary(raw);
    return {
      signed,
      broadcast: () => this.broadcastArbitrary(signed),
    };
  }

  signLegacy(
    txData: LegacyTxData,
    opts: TxOptions = {}
  ): Signed<LegacyTransaction> {
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
    const { recoveryId, r, s } = this._auth.sign(msgHash);
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
      signed,
      broadcast: () => this.broadcastArbitrary(signed.serialize()),
    };
  }

  signFeeMarketEIP1559(
    txData: FeeMarketEIP1559TxData,
    opts: TxOptions = {}
  ): Signed<FeeMarketEIP1559Transaction> {
    const tx = FeeMarketEIP1559TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const v = BigInt(recoveryId! + 27n);
    const signed = tx.processSignature(v, r, s);
    return {
      signed,
      broadcast: () => this.broadcastArbitrary(signed.serialize()),
    };
  }

  signAccessListEIP2930(
    txData: AccessListEIP2930TxData,
    opts: TxOptions = {}
  ): Signed<AccessListEIP2930Transaction> {
    const tx = AccessListEIP2930TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const v = BigInt(recoveryId! + 27n);
    const signed = tx.processSignature(v, r, s);
    return {
      signed,
      broadcast: () => this.broadcastArbitrary(signed.serialize()),
    };
  }

  signBlobEIP4844(
    txData: BlobEIP4844TxData,
    opts: TxOptions = {}
  ): Signed<BlobEIP4844Transaction> {
    const tx = BlobEIP4844TransactionExt.fromTxData(txData, opts);
    const msg = tx.getHashedMessageToSign();
    const { recoveryId, r, s } = this._auth.sign(msg);
    const v = BigInt(recoveryId! + 27n);
    const signed = tx.processSignature(v, r, s);
    return {
      signed,
      broadcast: () => this.broadcastArbitrary(signed.serialize()),
    };
  }

  async broadcastArbitrary(raw: Uint8Array) {
    const receipt = await this.query.sendSignedTransaction(raw);
    return receipt;
  }

  async broadcast(data: Uint8Array | TxData) {
    if (data instanceof Uint8Array) {
      return this.broadcastArbitrary(data);
    } else {
      const tx = constructTransactionExt(data);
      return this.broadcastArbitrary(tx.serialize());
    }
  }
}
