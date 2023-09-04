/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BN from "bn.js";
import elliptic from "elliptic";

import { Auth, SigObj } from "./types";
import { getCompressedPubkey, toAddress } from "./utils/key";
import { getSeedFromMnemonic } from "./utils/mnemonic";
import { toSigObj } from "./utils/signature";
import {
  HdPath,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
  stringToPath,
} from "./utils/slip10";

const secp256k1 = new elliptic.ec("secp256k1");
const secp256k1N = new BN(
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
  "hex"
);
const derTagInteger = 0x02;

export const defaultHdPath = [
  Slip10RawIndex.hardened(44),
  Slip10RawIndex.hardened(118),
  Slip10RawIndex.hardened(0),
  Slip10RawIndex.normal(0),
  Slip10RawIndex.normal(0),
];

interface KeyPair {
  fromPrivKey?: elliptic.ec.KeyPair;
  fromPubKey?: elliptic.ec.KeyPair;
}

interface Key {
  pubkey: Uint8Array;
  address: Uint8Array;
}

export class Secp256k1Auth implements Auth {
  protected _keyPair: KeyPair = {};
  protected _key: Key;
  protected _privkey?: Uint8Array;
  protected _seed?: Uint8Array;
  protected _hdPath?: HdPath;

  readonly algo = "secp256k1";

  constructor() {}

  static fromMnemonic(mnemonic: string, password?: string) {
    const auth = new Secp256k1Auth();
    auth.updateSeed(getSeedFromMnemonic(mnemonic, password));
    auth.updateHdPath(defaultHdPath);
    return auth;
  }

  static fromPrivKey(privkey: Uint8Array) {
    const auth = new Secp256k1Auth();
    auth.updatePrivKey(privkey);
    return auth;
  }

  static fromPubKey(pubkey: Uint8Array) {
    const auth = new Secp256k1Auth();
    auth.updatePubKey(pubkey);
    return auth;
  }

  get key() {
    return this._key;
  }

  updateSeed(seed: Uint8Array) {
    this._seed = seed;
    if (this._hdPath) {
      this.updateHdPath(this._hdPath);
    }
  }

  /**
   *
   * @param hdPath string format example: "m/0'/1/2'/2/1000000000"
   */
  updateHdPath(hdPath: HdPath | string) {
    if (typeof hdPath === "string") {
      this._hdPath = stringToPath(hdPath);
    } else {
      this._hdPath = hdPath;
    }
    if (this._seed) {
      const { privkey } = Slip10.derivePath(
        Slip10Curve.Secp256k1,
        this._seed,
        this._hdPath
      );
      this.updatePrivKey(privkey);
    }
  }

  updatePrivKey(privkey: Uint8Array) {
    this._assertPrivKey(privkey);
    this._privkey = privkey;

    const keypair = secp256k1.keyFromPrivate(privkey);
    if (keypair.validate().result !== true) {
      throw new Error("input data is not a valid secp256k1 private key");
    }
    this._keyPair["fromPrivKey"] = keypair;

    const pubkey = getCompressedPubkey(secp256k1, keypair);
    this.updatePubKey(pubkey);
  }

  updatePubKey(pubkey: Uint8Array) {
    const keypair = secp256k1.keyFromPublic(pubkey);
    this._keyPair["fromPubKey"] = keypair;
    this._key = {
      pubkey,
      address: toAddress(pubkey),
    };
  }

  protected _assertPrivKey(privkey: Uint8Array) {
    if (privkey.length !== 32) {
      throw new Error("Input data is not a valid secp256k1 private key");
    }
    const privkeyAsBigInteger = new BN(privkey);
    if (privkeyAsBigInteger.gte(secp256k1N)) {
      throw new Error("Input data is not a valid secp256k1 private key");
    }
  }

  protected _assertHash(hash: Uint8Array) {
    if (hash.length === 0) {
      throw new Error("Message hash must not be empty");
    }
    if (hash.length > 32) {
      throw new Error("Message hash length must not exceed 32 bytes");
    }
  }

  protected _toDer(r: Uint8Array, s: Uint8Array): Uint8Array {
    // DER supports negative integers but our data is unsigned. Thus we need to prepend
    // a leading 0 byte when the higest bit is set to differentiate nagative values
    const rEncoded = r[0] >= 0x80 ? new Uint8Array([0, ...r]) : r;
    const sEncoded = s[0] >= 0x80 ? new Uint8Array([0, ...s]) : s;

    const rLength = rEncoded.length;
    const sLength = sEncoded.length;
    const data = new Uint8Array([
      derTagInteger,
      rLength,
      ...rEncoded,
      derTagInteger,
      sLength,
      ...sEncoded,
    ]);

    return new Uint8Array([0x30, data.length, ...data]);
  }

  sign(hash: Uint8Array): SigObj {
    if (!this._keyPair.fromPrivKey) {
      throw new Error(
        "No keyPair from private key initialized. Please try `updateSeed`, `updateHdPath` or `updatePrivKey` before signing."
      );
    }
    this._assertHash(hash);
    const sigObj: elliptic.ec.Signature = this._keyPair.fromPrivKey.sign(hash, {
      // the `canonical` option ensures creation of lowS signature representations
      canonical: true,
    });
    return toSigObj(sigObj);
  }

  verify(hash: Uint8Array, sigObj: SigObj) {
    if (!this._keyPair.fromPubKey) {
      throw new Error(
        "No keyPair from public key initialized. Please try `updateSeed`, `updateHdPath` or `updatePrivKey` before signing."
      );
    }
    this._assertHash(hash);
    try {
      return this._keyPair.fromPubKey.verify(
        hash,
        this._toDer(sigObj.r, sigObj.s)
      );
    } catch (error) {
      return false;
    }
  }
}
