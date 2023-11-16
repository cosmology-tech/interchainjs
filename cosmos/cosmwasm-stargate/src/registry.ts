import { AminoConverters } from "@sign/cosmos-amino";
import { Registry } from "@sign/cosmos-proto";

import { cosmwasmConsts } from "./cosmwasm";

// @ts-ignore
export const cosmwasmRegistry: Registry = cosmwasmConsts.map((c) => [
  c.typeUrl,
  {
    typeUrl: c.typeUrl,
    encode: c.encode,
    decode: c.decode,
    fromPartial: c.fromPartial,
  },
]);

export const cosmwasmAminoConverters: AminoConverters = Object.fromEntries(
  cosmwasmConsts.map((c) => [
    c.typeUrl,
    { aminoType: c.aminoType, toAmino: c.toAmino, fromAmino: c.fromAmino },
  ])
);
