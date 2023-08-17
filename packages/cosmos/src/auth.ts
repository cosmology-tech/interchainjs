import {
  ExtendedSecp256k1Signature,
  HdPath,
  ripemd160,
  Secp256k1,
  sha256,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
} from "@cosmjs/crypto";
import { pbkdf2Sha512 } from "@cosmjs/crypto/build/pbkdf2";
import { toUtf8 } from "@cosmjs/encoding";
import BN from "bn.js";
import elliptic from "elliptic";

import { Auth } from "./types";

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

interface KeyPair {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyClient: any;
  algo: string;
  privkey: Uint8Array;
  pubkey: Uint8Array;
  address: Uint8Array;
}

export class Secp256k1Auth implements Auth {
  private _seed: Uint8Array;
  private _keypair!: KeyPair;

  static async fromMnemonic(mnemonic: string, password?: string) {
    const mnemonicBytes = toUtf8(mnemonic.normalize("NFKD"));
    const salt = "mnemonic" + (password ? password.normalize("NFKD") : "");
    const seed = await pbkdf2Sha512(mnemonicBytes, toUtf8(salt), 2048, 64);
    return new Secp256k1Auth(seed);
  }

  constructor(seed: Uint8Array) {
    this._seed = seed;
    this.deriveFrom(defaultHdPath);
  }

  deriveFrom(path: HdPath) {
    this._keypair = this._getKeyPair(path);
    return this;
  }

  get key() {
    return {
      algo: "secp256k1",
      pubkey: this._keypair.pubkey,
      address: this._keypair.address,
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

  private _pubKeyToAddress(pubKey: Uint8Array) {
    if (pubKey.length !== 33) {
      throw new Error(
        `Invalid Secp256k1 pubkey length (compressed): ${pubKey.length}`
      );
    }
    return ripemd160(sha256(pubKey));
  }

  private _getKeyPair(hdPath: HdPath): KeyPair {
    const { privkey } = Slip10.derivePath(
      Slip10Curve.Secp256k1,
      this._seed,
      hdPath
    );
    this._assertPrivateKey(privkey);

    const keyClient = secp256k1.keyFromPrivate(privkey);
    if (keyClient.validate().result !== true) {
      throw new Error("input data is not a valid secp256k1 private key");
    }

    const pubkey = Secp256k1.compressPubkey(
      Uint8Array.from(keyClient.getPublic("array"))
    );
    return {
      keyClient,
      algo: "secp256k1" as const,
      privkey,
      pubkey,
      address: this._pubKeyToAddress(pubkey),
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

  sign(message: Uint8Array) {
    const { keyClient } = this._keypair;
    const messageHash = sha256(message);
    this._assertMessageHash(messageHash);
    const { r, s, recoveryParam } = keyClient.sign(messageHash, {
      canonical: true,
    });
    if (typeof recoveryParam !== "number") {
      throw new Error("Recovery param missing");
    }
    const signature = new ExtendedSecp256k1Signature(
      Uint8Array.from(r.toArray()),
      Uint8Array.from(s.toArray()),
      recoveryParam
    );
    const signatureBytes = new Uint8Array([
      ...signature.r(32),
      ...signature.s(32),
    ]);

    return signatureBytes;
  }
}
