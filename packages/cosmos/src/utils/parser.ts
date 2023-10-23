import { TelescopeGeneratedType } from "../types";

export function toParserArgs<ProtoT, AminoT>(
  data: TelescopeGeneratedType<ProtoT, AminoT>
) {
  const {
    typeUrl,
    aminoType,
    encode,
    decode,
    fromAmino,
    toAmino,
    fromPartial,
  } = data;
  return {
    protoType: typeUrl,
    proto: { encode, decode, fromPartial },
    aminoType: aminoType,
    converter: {
      toAmino,
      toProto: fromAmino,
    },
  };
}
