import { GeneratedType } from "../types";

export function toParserArgs<ProtoT, AminoT>(
  data: GeneratedType<ProtoT, AminoT>
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
