import { TelescopeGeneratedType } from "../../../../types";
import { MsgCreateClient, MsgUpdateClient, MsgUpgradeClient, MsgSubmitMisbehaviour } from "./tx";
export const registry: ReadonlyArray<[string, TelescopeGeneratedType<any, any, any>]> = [["/ibc.core.client.v1.MsgCreateClient", MsgCreateClient], ["/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient], ["/ibc.core.client.v1.MsgUpgradeClient", MsgUpgradeClient], ["/ibc.core.client.v1.MsgSubmitMisbehaviour", MsgSubmitMisbehaviour]];