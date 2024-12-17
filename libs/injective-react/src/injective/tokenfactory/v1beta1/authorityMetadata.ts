import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial } from "../../../helpers";
import { GlobalDecoderRegistry } from "../../../registry";
/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadata {
  /** Can be empty for no admin, or a valid injective address */
  admin: string;
}
export interface DenomAuthorityMetadataProtoMsg {
  typeUrl: "/injective.tokenfactory.v1beta1.DenomAuthorityMetadata";
  value: Uint8Array;
}
/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadataAmino {
  /** Can be empty for no admin, or a valid injective address */
  admin: string;
}
export interface DenomAuthorityMetadataAminoMsg {
  type: "/injective.tokenfactory.v1beta1.DenomAuthorityMetadata";
  value: DenomAuthorityMetadataAmino;
}
function createBaseDenomAuthorityMetadata(): DenomAuthorityMetadata {
  return {
    admin: ""
  };
}
export const DenomAuthorityMetadata = {
  typeUrl: "/injective.tokenfactory.v1beta1.DenomAuthorityMetadata",
  is(o: any): o is DenomAuthorityMetadata {
    return o && (o.$typeUrl === DenomAuthorityMetadata.typeUrl || typeof o.admin === "string");
  },
  isAmino(o: any): o is DenomAuthorityMetadataAmino {
    return o && (o.$typeUrl === DenomAuthorityMetadata.typeUrl || typeof o.admin === "string");
  },
  encode(message: DenomAuthorityMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DenomAuthorityMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomAuthorityMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DenomAuthorityMetadata>): DenomAuthorityMetadata {
    const message = createBaseDenomAuthorityMetadata();
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: DenomAuthorityMetadataAmino): DenomAuthorityMetadata {
    const message = createBaseDenomAuthorityMetadata();
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    return message;
  },
  toAmino(message: DenomAuthorityMetadata): DenomAuthorityMetadataAmino {
    const obj: any = {};
    obj.admin = message.admin === "" ? undefined : message.admin;
    return obj;
  },
  fromAminoMsg(object: DenomAuthorityMetadataAminoMsg): DenomAuthorityMetadata {
    return DenomAuthorityMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: DenomAuthorityMetadataProtoMsg): DenomAuthorityMetadata {
    return DenomAuthorityMetadata.decode(message.value);
  },
  toProto(message: DenomAuthorityMetadata): Uint8Array {
    return DenomAuthorityMetadata.encode(message).finish();
  },
  toProtoMsg(message: DenomAuthorityMetadata): DenomAuthorityMetadataProtoMsg {
    return {
      typeUrl: "/injective.tokenfactory.v1beta1.DenomAuthorityMetadata",
      value: DenomAuthorityMetadata.encode(message).finish()
    };
  }
};
GlobalDecoderRegistry.register(DenomAuthorityMetadata.typeUrl, DenomAuthorityMetadata);