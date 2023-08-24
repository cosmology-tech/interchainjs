import { Rpc } from "../../types";
import { BinaryReader } from "../binary";
import {
  BroadcastTxRequest,
  BroadcastTxResponse,
  SimulateRequest,
  SimulateResponse,
} from "./tx.proto";
/** Service defines a gRPC service for interacting with transactions. */
export interface Service {
  /** Simulate simulates executing a transaction for estimating gas usage. */
  simulate(request: SimulateRequest): Promise<SimulateResponse>;
  /** BroadcastTx broadcast transaction. */
  broadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse>;
}
export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.simulate = this.simulate.bind(this);
    this.broadcastTx = this.broadcastTx.bind(this);
  }
  simulate(request: SimulateRequest): Promise<SimulateResponse> {
    const data = SimulateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "Simulate",
      data
    );
    return promise.then((data: any) =>
      SimulateResponse.decode(new BinaryReader(data))
    );
  }
  broadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse> {
    const data = BroadcastTxRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "BroadcastTx",
      data
    );
    return promise.then((data: any) =>
      BroadcastTxResponse.decode(new BinaryReader(data))
    );
  }
}
