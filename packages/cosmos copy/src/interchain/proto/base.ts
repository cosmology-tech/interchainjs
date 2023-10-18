import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial } from "../helpers";
/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
  denom: string;
  amount: string;
}
/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface CoinAmino {
  denom: string;
  amount: string;
}
function createBaseCoin(): Coin {
  return {
    denom: "",
    amount: "",
  };
}
export const Coin = {
  typeUrl: "/cosmos.base.v1beta1.Coin",
  aminoType: "cosmos-sdk/Coin",
  encode(
    message: Coin,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Coin {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Coin>): Coin {
    const message = createBaseCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: CoinAmino): Coin {
    return {
      denom: object.denom,
      amount: object.amount,
    };
  },
  toAmino(message: Coin): CoinAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.amount = message.amount;
    return obj;
  },
};
