import {
  fromHex,
  getSeedFromMnemonic,
  Secp256k1AuthBase,
  SigObj,
} from "@sign/core";

export class Secp256k1Auth extends Secp256k1AuthBase {
  constructor(seed: Uint8Array) {
    super(seed);
  }

  static async fromMnemonic(mnemonic: string, password?: string) {
    return new Secp256k1AuthBase(await getSeedFromMnemonic(mnemonic, password));
  }

  protected _toSignature(sigObj: SigObj): Uint8Array {
    const recoveryId = sigObj.recoveryId === 1 ? "1c" : "1b";
    return new Uint8Array([...sigObj.r, ...sigObj.s, ...fromHex(recoveryId)]);
  }
}
