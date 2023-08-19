import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "interchain-query/cosmwasm/wasm/v1/tx";

import { MsgParserPool } from "../core/parsers";
import { MsgParser } from "../core/parsers/msg";

export const MsgClearAdminParser = MsgParser.fromTelescope(MsgClearAdmin);
export const MsgExecuteContractParser =
  MsgParser.fromTelescope(MsgExecuteContract);
export const MsgMigrateContractParser =
  MsgParser.fromTelescope(MsgMigrateContract);
export const MsgStoreCodeParser = MsgParser.fromTelescope(MsgStoreCode);
export const MsgInstantiateContractParser = MsgParser.fromTelescope(
  MsgInstantiateContract
);
export const MsgInstantiateContract2Parser = MsgParser.fromTelescope(
  MsgInstantiateContract2
);
export const MsgUpdateAdminParser = MsgParser.fromTelescope(MsgUpdateAdmin);

// *************************** COLLECTIONS ***************************

export const WasmMsgParserMap = {
  MsgClearAdmin: MsgClearAdminParser,
  MsgExecuteContract: MsgExecuteContractParser,
  MsgMigrateContract: MsgMigrateContractParser,
  MsgStoreCode: MsgStoreCodeParser,
  MsgInstantiateContract: MsgInstantiateContractParser,
  MsgInstantiateContract2: MsgInstantiateContract2Parser,
  MsgUpdateAdmin: MsgUpdateAdminParser,
};

// *************************** POOL ***************************

export const WasmMsgParserPool = MsgParserPool.with(
  ...Object.values(WasmMsgParserMap)
);
