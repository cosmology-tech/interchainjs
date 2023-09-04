import { Signer } from "@sign/cosmos";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "interchain-query/cosmwasm/wasm/v1/tx";

export const wasmSigner = new Signer(
  MsgClearAdmin,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgUpdateAdmin
);
