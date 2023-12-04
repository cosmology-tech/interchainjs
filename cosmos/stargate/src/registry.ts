import { AminoConverters } from "@cosmonauts/cosmos-amino";
import { Registry } from "@cosmonauts/cosmos-proto";

import { stargateConsts } from "./stargate";

// @ts-ignore
export const stargateRegistry: Registry = stargateConsts.map((c) => [
  c.typeUrl,
  {
    typeUrl: c.typeUrl,
    encode: c.encode,
    decode: c.decode,
    fromPartial: c.fromPartial,
  },
]);

export const stargateAminoConverters: AminoConverters = Object.fromEntries(
  stargateConsts.map((c) => [
    c.typeUrl,
    { aminoType: c.aminoType, toAmino: c.toAmino, fromAmino: c.fromAmino },
  ])
);
