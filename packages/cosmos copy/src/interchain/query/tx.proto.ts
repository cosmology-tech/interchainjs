import { BinaryReader, BinaryWriter } from "../binary";
import { DeepPartial } from "../helpers";
import { GasInfo, Result, TxResponse } from "../proto/abci";
import { Tx } from "../proto/tx";
import { BroadcastMode } from "../types";
/**
 * BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
 * RPC method.
 */
export interface BroadcastTxRequest {
  /** tx_bytes is the raw transaction. */
  txBytes: Uint8Array;
  mode: BroadcastMode;
}
/**
 * BroadcastTxResponse is the response type for the
 * Service.BroadcastTx method.
 */
export interface BroadcastTxResponse {
  /** tx_response is the queried TxResponses. */
  txResponse: TxResponse | undefined;
}
/**
 * SimulateRequest is the request type for the Service.Simulate
 * RPC method.
 */
export interface SimulateRequest {
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   */
  /** @deprecated */
  tx: Tx | undefined;
  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   */
  txBytes: Uint8Array;
}
/**
 * SimulateResponse is the response type for the
 * Service.SimulateRPC method.
 */
export interface SimulateResponse {
  /** gas_info is the information about gas used in the simulation. */
  gasInfo: GasInfo | undefined;
  /** result is the result of the simulation. */
  result: Result | undefined;
}
function createBaseBroadcastTxRequest(): BroadcastTxRequest {
  return {
    txBytes: new Uint8Array(),
    mode: 0,
  };
}
export const BroadcastTxRequest = {
  typeUrl: "/cosmos.tx.v1beta1.BroadcastTxRequest",
  aminoType: "cosmos-sdk/BroadcastTxRequest",
  encode(
    message: BroadcastTxRequest,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.txBytes.length !== 0) {
      writer.uint32(10).bytes(message.txBytes);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): BroadcastTxRequest {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txBytes = reader.bytes();
          break;
        case 2:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BroadcastTxRequest>): BroadcastTxRequest {
    const message = createBaseBroadcastTxRequest();
    message.txBytes = object.txBytes ?? new Uint8Array();
    message.mode = object.mode ?? 0;
    return message;
  },
};
function createBaseBroadcastTxResponse(): BroadcastTxResponse {
  return {
    txResponse: TxResponse.fromPartial({}),
  };
}
export const BroadcastTxResponse = {
  typeUrl: "/cosmos.tx.v1beta1.BroadcastTxResponse",
  aminoType: "cosmos-sdk/BroadcastTxResponse",
  encode(
    message: BroadcastTxResponse,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.txResponse !== undefined) {
      TxResponse.encode(message.txResponse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): BroadcastTxResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txResponse = TxResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BroadcastTxResponse>): BroadcastTxResponse {
    const message = createBaseBroadcastTxResponse();
    message.txResponse =
      object.txResponse !== undefined && object.txResponse !== null
        ? TxResponse.fromPartial(object.txResponse)
        : undefined;
    return message;
  },
};
function createBaseSimulateRequest(): SimulateRequest {
  return {
    tx: Tx.fromPartial({}),
    txBytes: new Uint8Array(),
  };
}
export const SimulateRequest = {
  typeUrl: "/cosmos.tx.v1beta1.SimulateRequest",
  aminoType: "cosmos-sdk/SimulateRequest",
  encode(
    message: SimulateRequest,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.txBytes.length !== 0) {
      writer.uint32(18).bytes(message.txBytes);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SimulateRequest {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.txBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimulateRequest>): SimulateRequest {
    const message = createBaseSimulateRequest();
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    message.txBytes = object.txBytes ?? new Uint8Array();
    return message;
  },
};
function createBaseSimulateResponse(): SimulateResponse {
  return {
    gasInfo: GasInfo.fromPartial({}),
    result: Result.fromPartial({}),
  };
}
export const SimulateResponse = {
  typeUrl: "/cosmos.tx.v1beta1.SimulateResponse",
  aminoType: "cosmos-sdk/SimulateResponse",
  encode(
    message: SimulateResponse,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.gasInfo !== undefined) {
      GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Result.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SimulateResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gasInfo = GasInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.result = Result.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimulateResponse>): SimulateResponse {
    const message = createBaseSimulateResponse();
    message.gasInfo =
      object.gasInfo !== undefined && object.gasInfo !== null
        ? GasInfo.fromPartial(object.gasInfo)
        : undefined;
    message.result =
      object.result !== undefined && object.result !== null
        ? Result.fromPartial(object.result)
        : undefined;
    return message;
  },
};
