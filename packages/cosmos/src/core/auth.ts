import { getSeedFromMnemonic, Secp256k1AuthBase, SigObj } from "@sign/core";

import { toBech32 } from "./utils/bech";

export class Secp256k1Auth extends Secp256k1AuthBase {
  constructor(seed: Uint8Array) {
    super(seed);
  }

  static async fromMnemonic(mnemonic: string, password?: string) {
    return new Secp256k1Auth(await getSeedFromMnemonic(mnemonic, password));
  }

  protected _toSignature(sigObj: SigObj): Uint8Array {
    return new Uint8Array([...sigObj.r, ...sigObj.s]);
  }

  getBech32(prefix: string): string {
    return toBech32(prefix, this.key.address);
  }
}
