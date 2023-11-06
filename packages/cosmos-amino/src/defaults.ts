import { sha256 } from "@noble/hashes/sha256";
import { SigObj } from "@sign/core";

export const hash = (msg: Uint8Array) => sha256(msg);

export const signatureConverter = {
  toSignature: (sigObj: SigObj) => new Uint8Array([...sigObj.r, ...sigObj.s]),
  fromSignature: (signature: Uint8Array): SigObj => ({
    r: signature.slice(0, 32),
    s: signature.slice(32, 64),
    recoveryId: void 0,
  }),
};
