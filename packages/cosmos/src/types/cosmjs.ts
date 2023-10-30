import { IBinaryReader, IBinaryWriter } from "../codegen/binary";
import { DeepPartial } from "../codegen/helpers";

export interface AminoConverter<ProtoT, AminoT> {
  readonly aminoType: string;
  readonly toAmino: (value: ProtoT) => AminoT;
  readonly fromAmino: (value: AminoT) => ProtoT;
}

/** A map from protobuf type URL to the AminoConverter implementation if supported on chain */
export type AminoConverters = Record<string, AminoConverter<any, any>>;

export interface GeneratedType<T> {
  encode(message: T, writer?: IBinaryWriter): IBinaryWriter;
  decode(input: IBinaryReader | Uint8Array, length?: number): T;
  fromPartial(object: DeepPartial<T>): T;
}

export type RegistryTypes = ReadonlyArray<[string, GeneratedType<any>]>;
