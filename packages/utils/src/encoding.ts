import { Buffer } from "buffer";

export function fromUtf8(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "utf-8"));
}

export function toUtf8(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("utf-8");
}

export function fromBase64(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "base64"));
}

export function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function fromHex(str: string): Uint8Array {
  return str.startsWith("0x")
    ? Uint8Array.from(Buffer.from(str.slice(2), "hex"))
    : Uint8Array.from(Buffer.from(str, "hex"));
}

export function toHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

export function toBigInt(bytes: Uint8Array): bigint {
  return BigInt(`0x${toHex(bytes)}`);
}

export function fromBigInt(i: bigint): Uint8Array {
  return fromHex(i.toString(16));
}

export function fromAscii(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "ascii"));
}

export function toAscii(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("ascii");
}
