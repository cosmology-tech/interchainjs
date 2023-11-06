import { AminoMsg } from "@sign/cosmos-amino";
import {
  EncodeObject,
  EncodeObjectUtils as _EncodeObjectUtils,
  Generated,
} from "@sign/cosmos-proto";

export const EncodeObjectUtils = {
  ..._EncodeObjectUtils,
  toAminoMsg(
    msgs: EncodeObject[],
    getGeneratedFromTypeUrl: (typeUrl: string) => Generated
  ): AminoMsg[] {
    return msgs.map((msg) => {
      const generated = getGeneratedFromTypeUrl(msg.typeUrl);
      if (!generated.amino) {
        throw new Error(
          `No such aminoConverter provided for typeUrl ${msg.typeUrl}`
        );
      }
      return {
        type: generated.amino.aminoType,
        value: generated.amino.toAmino(msg.value),
      };
    });
  },
};
