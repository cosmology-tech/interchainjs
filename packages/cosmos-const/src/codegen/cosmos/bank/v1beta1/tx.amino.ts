import { MsgSend, MsgMultiSend, MsgBurn, MsgUpdateParams, MsgSetSendEnabled } from "./tx";
export const AminoConverter = {
  "/cosmos.bank.v1beta1.MsgSend": {
    aminoType: "cosmos-sdk/MsgSend",
    toAmino: MsgSend.toAmino,
    fromAmino: MsgSend.fromAmino
  },
  "/cosmos.bank.v1beta1.MsgMultiSend": {
    aminoType: "cosmos-sdk/MsgMultiSend",
    toAmino: MsgMultiSend.toAmino,
    fromAmino: MsgMultiSend.fromAmino
  },
  "/cosmos.bank.v1beta1.MsgBurn": {
    aminoType: "cosmos-sdk/MsgBurn",
    toAmino: MsgBurn.toAmino,
    fromAmino: MsgBurn.fromAmino
  },
  "/cosmos.bank.v1beta1.MsgUpdateParams": {
    aminoType: "cosmos-sdk/x/bank/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/cosmos.bank.v1beta1.MsgSetSendEnabled": {
    aminoType: "cosmos-sdk/MsgSetSendEnabled",
    toAmino: MsgSetSendEnabled.toAmino,
    fromAmino: MsgSetSendEnabled.fromAmino
  }
};