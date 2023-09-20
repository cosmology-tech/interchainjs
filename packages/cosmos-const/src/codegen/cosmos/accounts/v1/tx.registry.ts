//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgInit, MsgExecute } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/cosmos.accounts.v1.MsgInit", MsgInit], ["/cosmos.accounts.v1.MsgExecute", MsgExecute]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    init(value: MsgInit) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgInit",
        value: MsgInit.encode(value).finish()
      };
    },
    execute(value: MsgExecute) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgExecute",
        value: MsgExecute.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    init(value: MsgInit) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgInit",
        value
      };
    },
    execute(value: MsgExecute) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgExecute",
        value
      };
    }
  },
  fromPartial: {
    init(value: MsgInit) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgInit",
        value: MsgInit.fromPartial(value)
      };
    },
    execute(value: MsgExecute) {
      return {
        typeUrl: "/cosmos.accounts.v1.MsgExecute",
        value: MsgExecute.fromPartial(value)
      };
    }
  }
};