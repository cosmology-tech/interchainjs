import { MsgInit, MsgExecute } from "./tx";
export const AminoConverter = {
  "/cosmos.accounts.v1.MsgInit": {
    aminoType: "cosmos-sdk/MsgInit",
    toAmino: MsgInit.toAmino,
    fromAmino: MsgInit.fromAmino
  },
  "/cosmos.accounts.v1.MsgExecute": {
    aminoType: "cosmos-sdk/MsgExecute",
    toAmino: MsgExecute.toAmino,
    fromAmino: MsgExecute.fromAmino
  }
};