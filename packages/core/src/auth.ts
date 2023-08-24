/* eslint-disable @typescript-eslint/no-unused-vars */
// import { HdPath, Slip10, Slip10Curve, Slip10RawIndex } from "@cosmjs/crypto";
import { sha256 } from "@noble/hashes/sha256";
import BN from "bn.js";
import elliptic from "elliptic";

import { Auth, SigObj } from "./types";
import { getCompressedPubkey, toAddress } from "./utils/key";
import { getSeedFromMnemonic } from "./utils/mnemonic";
import { toSigObj } from "./utils/signature";
import { HdPath, Slip10, Slip10Curve, Slip10RawIndex } from "./utils/slip10";

const secp256k1 = new elliptic.ec("secp256k1");
const secp256k1N = new BN(
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
  "hex"
);

const defaultHdPath = [
  Slip10RawIndex.hardened(44),
  Slip10RawIndex.hardened(118),
  Slip10RawIndex.hardened(0),
  Slip10RawIndex.normal(0),
  Slip10RawIndex.normal(0),
];

interface KeyData {
  keypair: elliptic.ec.KeyPair;
  privkey: Uint8Array;
  pubkey: Uint8Array;
  address: Uint8Array;
}

export class Secp256k1AuthBase implements Auth {
  private _seed: Uint8Array;
  private _keyData!: KeyData;
  algo = "secp256k1";

  static async fromMnemonic(mnemonic: string, password?: string) {
    return new Secp256k1AuthBase(await getSeedFromMnemonic(mnemonic, password));
  }

  constructor(seed: Uint8Array) {
    this._seed = seed;
    this.deriveFrom(defaultHdPath);
  }

  deriveFrom(path: HdPath) {
    this._updateKeyData(path);
    return this;
  }

  get key() {
    return {
      pubkey: this._keyData.pubkey,
      address: this._keyData.address,
    };
  }

  private _assertPrivateKey(privkey: Uint8Array) {
    if (privkey.length !== 32) {
      throw new Error("input data is not a valid secp256k1 private key");
    }
    const privkeyAsBigInteger = new BN(privkey);
    if (privkeyAsBigInteger.gte(secp256k1N)) {
      throw new Error("input data is not a valid secp256k1 private key");
    }
  }

  private _updateKeyData(hdPath: HdPath) {
    const { privkey } = Slip10.derivePath(
      Slip10Curve.Secp256k1,
      this._seed,
      hdPath
    );
    this._assertPrivateKey(privkey);

    const keypair = secp256k1.keyFromPrivate(privkey);
    if (keypair.validate().result !== true) {
      throw new Error("input data is not a valid secp256k1 private key");
    }
    const pubkey = getCompressedPubkey(secp256k1, keypair);

    this._keyData = {
      keypair,
      privkey,
      pubkey,
      address: toAddress(pubkey),
    };
  }

  private _assertMessageHash(hash: Uint8Array) {
    if (hash.length === 0) {
      throw new Error("Message hash must not be empty");
    }
    if (hash.length > 32) {
      throw new Error("Message hash length must not exceed 32 bytes");
    }
  }

  protected _toSignature(sigObj: SigObj): Uint8Array {
    throw new Error("Protected method `_toSignature` not implemented yet.");
  }

  sign(message: Uint8Array) {
    const { keypair: keyClient } = this._keyData;
    const messageHash = sha256(message);
    this._assertMessageHash(messageHash);
    const sigObj: elliptic.ec.Signature = keyClient.sign(messageHash, {
      canonical: true,
    });
    return this._toSignature(toSigObj(sigObj));
  }
}
