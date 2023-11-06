import { Any } from "../codegen/google/protobuf/any";
import { EncodeObject, Generated } from "../types";

export const EncodeObjectUtils = {
  encode(
    msgs: EncodeObject[],
    getGeneratedFromTypeUrl: (typeUrl: string) => Generated
  ): Any[] {
    return msgs.map((msg) => {
      const generated = getGeneratedFromTypeUrl(msg.typeUrl);
      return {
        typeUrl: generated.typeUrl,
        value: generated.encode(generated.fromPartial(msg.value)).finish(),
      };
    });
  },
};
