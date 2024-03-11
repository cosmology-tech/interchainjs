import { secp256k1 } from "@noble/curves/secp256k1";
import { HDKey } from "@scure/bip32";

import { AuthOptions, Auth, Signature, Network } from "@cosmonauts/types";
import { getSeedFromMnemonic } from "./utils";
import { Key, isEmpty } from "@cosmonauts/utils";
import { defaultHdPaths } from "./defaults";

const hdPaths = defaultHdPaths.filter(({ algo }) => algo === "secp256k1");

export class Secp256k1Auth implements Auth {
  protected seed: HDKey;
  protected hdkey: HDKey;

  readonly algo = "secp256k1";

  constructor(seed: Uint8Array, hdPath?: string | Network) {
    this.seed = HDKey.fromMasterSeed(seed);
    this.derive(hdPath);
  }

  static fromMnemonic(
    mnemonic: string,
    hdPath?: string | Network,
    options?: AuthOptions
  ) {
    const seed = getSeedFromMnemonic(mnemonic, options?.bip39Password);
    return new Secp256k1Auth(seed, hdPath);
  }

  static fromSeed(seed: Key, hdPath?: string | Network) {
    return new Secp256k1Auth(seed.value, hdPath);
  }

  derive(hdPath?: string | Network) {
    switch (hdPath) {
      case "cosmos":
      case "injective":
      case "ethereum":
        const path = hdPaths.find(({ network }) => network === hdPath)?.path;
        if (isEmpty(path)) {
          throw new Error(`No such HD Path found for network ${hdPath}`);
        }
        this.hdkey = this.seed.derive(path);
        break;
      default:
        this.hdkey = hdPath ? this.seed.derive(hdPath) : this.seed;
        break;
    }
    return this;
  }

  get privateKey() {
    if (!this.hdkey || !this.hdkey.privateKey) {
      throw new Error("privateKey is undefined");
    }
    return Key.from(this.hdkey.privateKey);
  }

  getPublicKey(isCompressed?: boolean) {
    return Key.from(
      secp256k1.getPublicKey(this.privateKey!.value, isCompressed)
    );
  }

  sign(data: Uint8Array): Signature {
    if (!this.privateKey) {
      throw new Error("No privateKey set!");
    }
    const signature = secp256k1.sign(data, this.privateKey!.toBigInt());
    return {
      r: Key.fromBigInt(signature.r),
      s: Key.fromBigInt(signature.s),
      recovery: signature.recovery,
    };
  }

  verify(data: Uint8Array, signature: Signature) {
    return secp256k1.verify(
      { r: signature.r.toBigInt(), s: signature.s.toBigInt() },
      data,
      this.getPublicKey(true).toHex()
    );
  }
}