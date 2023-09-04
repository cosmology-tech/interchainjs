import elliptic from "elliptic";

import { SigObj } from "../types";

function toFixLength(bytes: Uint8Array, length?: number): Uint8Array {
  if (length === undefined) {
    return bytes;
  } else {
    const paddingLength = length - bytes.length;
    if (paddingLength < 0) {
      throw new Error("Length too small to hold parameter s");
    }
    const padding = new Uint8Array(paddingLength);
    return new Uint8Array([...padding, ...bytes]);
  }
}

export function toSigObj({
  r,
  s,
  recoveryParam,
}: elliptic.ec.Signature): SigObj {
  if (typeof recoveryParam !== "number") {
    throw new Error("Recovery param missing");
  }
  if (!Number.isInteger(recoveryParam)) {
    throw new Error("The recovery parameter must be an integer.");
  }
  if (recoveryParam < 0 || recoveryParam > 4) {
    throw new Error("The recovery parameter must be one of 0, 1, 2, 3.");
  }
  const [rbytes, sbytes] = [r, s].map((bn) => {
    const array = Uint8Array.from(bn.toArray());
    if (array.length > 32 || array.length === 0 || array[0] === 0x00) {
      throw new Error(
        "Unsigned integer r/s must be encoded as unpadded big endian."
      );
    }
    return toFixLength(array, 32);
  });
  return {
    r: rbytes,
    s: sbytes,
    recoveryId: BigInt(recoveryParam),
  };
}

export function toSignature(sigObj: SigObj): Uint8Array {
  return new Uint8Array([...sigObj.r, ...sigObj.s]);
}
