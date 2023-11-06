import { bech32 } from "bech32";

import { Bech32Address } from "../types";

export function toBech32(
  prefix: string,
  data: Uint8Array,
  limit?: number
): Bech32Address {
  const address = bech32.encode(prefix, bech32.toWords(data), limit);
  return address;
}
