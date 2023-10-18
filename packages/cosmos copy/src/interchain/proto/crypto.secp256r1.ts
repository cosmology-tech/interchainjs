import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial } from "../helpers";
/** PubKey defines a secp256r1 ECDSA public key. */
export interface PubKey {
  /**
   * Point on secp256r1 curve in a compressed representation as specified in section
   * 4.3.6 of ANSI X9.62: https://webstore.ansi.org/standards/ascx9/ansix9621998
   */
  key: Uint8Array;
}
/** PubKey defines a secp256r1 ECDSA public key. */
export interface PubKeyAmino {
  /**
   * Point on secp256r1 curve in a compressed representation as specified in section
   * 4.3.6 of ANSI X9.62: https://webstore.ansi.org/standards/ascx9/ansix9621998
   */
  key: Uint8Array;
}
function createBasePubKey(): PubKey {
  return {
    key: new Uint8Array(),
  };
}
export const PubKey = {
  typeUrl: "/cosmos.crypto.secp256r1.PubKey",
  aminoType: "cosmos-sdk/PubKey",
  encode(
    message: PubKey,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PubKey {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PubKey>): PubKey {
    const message = createBasePubKey();
    message.key = object.key ?? new Uint8Array();
    return message;
  },
  fromAmino(object: PubKeyAmino): PubKey {
    return {
      key: object.key,
    };
  },
  toAmino(message: PubKey): PubKeyAmino {
    const obj: any = {};
    obj.key = message.key;
    return obj;
  },
};
