import { TelescopeGeneratedType } from "../../../../types";
import { MsgConnectionOpenAck, MsgConnectionOpenConfirm, MsgConnectionOpenInit, MsgConnectionOpenTry, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/ibc.core.connection.v1.MsgConnectionOpenInit", MsgConnectionOpenInit], ["/ibc.core.connection.v1.MsgConnectionOpenTry", MsgConnectionOpenTry], ["/ibc.core.connection.v1.MsgConnectionOpenAck", MsgConnectionOpenAck], ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", MsgConnectionOpenConfirm], ["/ibc.core.connection.v1.MsgUpdateParams", MsgUpdateParams]];