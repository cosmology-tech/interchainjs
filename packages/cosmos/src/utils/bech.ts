import { bech32 } from "bech32";

export function toBech32(
  prefix: string,
  data: Uint8Array,
  limit?: number
): string {
  const address = bech32.encode(prefix, bech32.toWords(data), limit);
  return address;
}
