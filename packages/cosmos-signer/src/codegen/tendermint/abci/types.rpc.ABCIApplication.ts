import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { RequestEcho, ResponseEcho, RequestFlush, ResponseFlush, RequestInfo, ResponseInfo, RequestDeliverTx, ResponseDeliverTx, RequestCheckTx, ResponseCheckTx, RequestQuery, ResponseQuery, RequestCommit, ResponseCommit, RequestInitChain, ResponseInitChain, RequestBeginBlock, ResponseBeginBlock, RequestEndBlock, ResponseEndBlock, RequestListSnapshots, ResponseListSnapshots, RequestOfferSnapshot, ResponseOfferSnapshot, RequestLoadSnapshotChunk, ResponseLoadSnapshotChunk, RequestApplySnapshotChunk, ResponseApplySnapshotChunk, RequestPrepareProposal, ResponsePrepareProposal, RequestProcessProposal, ResponseProcessProposal } from "./types";
export interface ABCIApplication {
  Echo(request: RequestEcho): Promise<ResponseEcho>;
  Flush(request?: RequestFlush): Promise<ResponseFlush>;
  Info(request: RequestInfo): Promise<ResponseInfo>;
  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  Query(request: RequestQuery): Promise<ResponseQuery>;
  Commit(request?: RequestCommit): Promise<ResponseCommit>;
  InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  ListSnapshots(request?: RequestListSnapshots): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
  PrepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal>;
  ProcessProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal>;
}
export class ABCIApplicationClientImpl implements ABCIApplication {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Echo = this.Echo.bind(this);
    this.Flush = this.Flush.bind(this);
    this.Info = this.Info.bind(this);
    this.DeliverTx = this.DeliverTx.bind(this);
    this.CheckTx = this.CheckTx.bind(this);
    this.Query = this.Query.bind(this);
    this.Commit = this.Commit.bind(this);
    this.InitChain = this.InitChain.bind(this);
    this.BeginBlock = this.BeginBlock.bind(this);
    this.EndBlock = this.EndBlock.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.OfferSnapshot = this.OfferSnapshot.bind(this);
    this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
    this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
    this.PrepareProposal = this.PrepareProposal.bind(this);
    this.ProcessProposal = this.ProcessProposal.bind(this);
  }
  Echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Echo", data);
    return promise.then(data => ResponseEcho.decode(new BinaryReader(data)));
  }
  Flush(request: RequestFlush = {}): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Flush", data);
    return promise.then(data => ResponseFlush.decode(new BinaryReader(data)));
  }
  Info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Info", data);
    return promise.then(data => ResponseInfo.decode(new BinaryReader(data)));
  }
  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx> {
    const data = RequestDeliverTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "DeliverTx", data);
    return promise.then(data => ResponseDeliverTx.decode(new BinaryReader(data)));
  }
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "CheckTx", data);
    return promise.then(data => ResponseCheckTx.decode(new BinaryReader(data)));
  }
  Query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Query", data);
    return promise.then(data => ResponseQuery.decode(new BinaryReader(data)));
  }
  Commit(request: RequestCommit = {}): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Commit", data);
    return promise.then(data => ResponseCommit.decode(new BinaryReader(data)));
  }
  InitChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "InitChain", data);
    return promise.then(data => ResponseInitChain.decode(new BinaryReader(data)));
  }
  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock> {
    const data = RequestBeginBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "BeginBlock", data);
    return promise.then(data => ResponseBeginBlock.decode(new BinaryReader(data)));
  }
  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock> {
    const data = RequestEndBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "EndBlock", data);
    return promise.then(data => ResponseEndBlock.decode(new BinaryReader(data)));
  }
  ListSnapshots(request: RequestListSnapshots = {}): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ListSnapshots", data);
    return promise.then(data => ResponseListSnapshots.decode(new BinaryReader(data)));
  }
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "OfferSnapshot", data);
    return promise.then(data => ResponseOfferSnapshot.decode(new BinaryReader(data)));
  }
  LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "LoadSnapshotChunk", data);
    return promise.then(data => ResponseLoadSnapshotChunk.decode(new BinaryReader(data)));
  }
  ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ApplySnapshotChunk", data);
    return promise.then(data => ResponseApplySnapshotChunk.decode(new BinaryReader(data)));
  }
  PrepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal> {
    const data = RequestPrepareProposal.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "PrepareProposal", data);
    return promise.then(data => ResponsePrepareProposal.decode(new BinaryReader(data)));
  }
  ProcessProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal> {
    const data = RequestProcessProposal.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ProcessProposal", data);
    return promise.then(data => ResponseProcessProposal.decode(new BinaryReader(data)));
  }
}