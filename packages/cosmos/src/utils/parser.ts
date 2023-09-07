import { TelescopeConst } from "../../types";

export function toParserArgs<ProtoT, AminoT>(
  data: TelescopeConst<ProtoT, AminoT>
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
