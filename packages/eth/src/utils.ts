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

export class LegacyTransactionExt extends LegacyTransaction {
  constructor(txData: LegacyTxData, opts: TxOptions = {}) {
    super(txData, opts);
  }

  static fromTxData(txData: LegacyTxData, opts: TxOptions = {}) {
    return new LegacyTransactionExt(txData, opts);
  }

  addActiveCapabilities(capability: Capability) {
    this.activeCapabilities.push(capability);
  }

  getActiveCapabilityIndex(capability: Capability) {
    return this.activeCapabilities.indexOf(capability);
  }

  removeActiveCapabilityIndex(index: number) {
    this.activeCapabilities.splice(index, 1);
  }

  get processSignature() {
    return this._processSignature;
  }
}

export class FeeMarketEIP1559TransactionExt extends FeeMarketEIP1559Transaction {
  constructor(txData: FeeMarketEIP1559TxData, opts: TxOptions = {}) {
    super(txData, opts);
  }

  static fromTxData(txData: FeeMarketEIP1559TxData, opts: TxOptions = {}) {
    return new FeeMarketEIP1559TransactionExt(txData, opts);
  }

  get processSignature() {
    return this._processSignature;
  }
}

export class AccessListEIP2930TransactionExt extends AccessListEIP2930Transaction {
  constructor(txData: AccessListEIP2930TxData, opts: TxOptions = {}) {
    super(txData, opts);
  }

  static fromTxData(txData: AccessListEIP2930TxData, opts: TxOptions = {}) {
    return new AccessListEIP2930TransactionExt(txData, opts);
  }

  get processSignature() {
    return this._processSignature;
  }
}

export class BlobEIP4844TransactionExt extends BlobEIP4844Transaction {
  constructor(txData: BlobEIP4844TxData, opts: TxOptions = {}) {
    super(txData, opts);
  }

  static fromTxData(txData: BlobEIP4844TxData, opts: TxOptions = {}) {
    return new BlobEIP4844TransactionExt(txData, opts);
  }

  get processSignature() {
    return this._processSignature;
  }
}
