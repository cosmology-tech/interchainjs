import { MsgParser, MsgParserPool } from "@sign/cosmos";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "interchain-query/cosmwasm/wasm/v1/tx";

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

// *************************** POOL ***************************

export const MsgWasmParser = MsgParserPool.fromTelescope(
  MsgClearAdmin,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgUpdateAdmin
);
