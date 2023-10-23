import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { RequestEcho, ResponseEcho, RequestFlush, ResponseFlush, RequestInfo, ResponseInfo, RequestDeliverTx, ResponseDeliverTx, RequestCheckTx, ResponseCheckTx, RequestQuery, ResponseQuery, RequestCommit, ResponseCommit, RequestInitChain, ResponseInitChain, RequestBeginBlock, ResponseBeginBlock, RequestEndBlock, ResponseEndBlock, RequestListSnapshots, ResponseListSnapshots, RequestOfferSnapshot, ResponseOfferSnapshot, RequestLoadSnapshotChunk, ResponseLoadSnapshotChunk, RequestApplySnapshotChunk, ResponseApplySnapshotChunk, RequestPrepareProposal, ResponsePrepareProposal, RequestProcessProposal, ResponseProcessProposal } from "./types";
export interface ABCIApplication {
  echo(request: RequestEcho): Promise<ResponseEcho>;
  flush(request?: RequestFlush): Promise<ResponseFlush>;
  info(request: RequestInfo): Promise<ResponseInfo>;
  deliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  checkTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  query(request: RequestQuery): Promise<ResponseQuery>;
  commit(request?: RequestCommit): Promise<ResponseCommit>;
  initChain(request: RequestInitChain): Promise<ResponseInitChain>;
  beginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  endBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  listSnapshots(request?: RequestListSnapshots): Promise<ResponseListSnapshots>;
  offerSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  loadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
  applySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
  prepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal>;
  processProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal>;
}
export class ABCIApplicationClientImpl implements ABCIApplication {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.echo = this.echo.bind(this);
    this.flush = this.flush.bind(this);
    this.info = this.info.bind(this);
    this.deliverTx = this.deliverTx.bind(this);
    this.checkTx = this.checkTx.bind(this);
    this.query = this.query.bind(this);
    this.commit = this.commit.bind(this);
    this.initChain = this.initChain.bind(this);
    this.beginBlock = this.beginBlock.bind(this);
    this.endBlock = this.endBlock.bind(this);
    this.listSnapshots = this.listSnapshots.bind(this);
    this.offerSnapshot = this.offerSnapshot.bind(this);
    this.loadSnapshotChunk = this.loadSnapshotChunk.bind(this);
    this.applySnapshotChunk = this.applySnapshotChunk.bind(this);
    this.prepareProposal = this.prepareProposal.bind(this);
    this.processProposal = this.processProposal.bind(this);
  }
  echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Echo", data);
    return promise.then(data => ResponseEcho.decode(new BinaryReader(data)));
  }
  flush(request: RequestFlush = {}): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Flush", data);
    return promise.then(data => ResponseFlush.decode(new BinaryReader(data)));
  }
  info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Info", data);
    return promise.then(data => ResponseInfo.decode(new BinaryReader(data)));
  }
  deliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx> {
    const data = RequestDeliverTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "DeliverTx", data);
    return promise.then(data => ResponseDeliverTx.decode(new BinaryReader(data)));
  }
  checkTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "CheckTx", data);
    return promise.then(data => ResponseCheckTx.decode(new BinaryReader(data)));
  }
  query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Query", data);
    return promise.then(data => ResponseQuery.decode(new BinaryReader(data)));
  }
  commit(request: RequestCommit = {}): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Commit", data);
    return promise.then(data => ResponseCommit.decode(new BinaryReader(data)));
  }
  initChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "InitChain", data);
    return promise.then(data => ResponseInitChain.decode(new BinaryReader(data)));
  }
  beginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock> {
    const data = RequestBeginBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "BeginBlock", data);
    return promise.then(data => ResponseBeginBlock.decode(new BinaryReader(data)));
  }
  endBlock(request: RequestEndBlock): Promise<ResponseEndBlock> {
    const data = RequestEndBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "EndBlock", data);
    return promise.then(data => ResponseEndBlock.decode(new BinaryReader(data)));
  }
  listSnapshots(request: RequestListSnapshots = {}): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ListSnapshots", data);
    return promise.then(data => ResponseListSnapshots.decode(new BinaryReader(data)));
  }
  offerSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "OfferSnapshot", data);
    return promise.then(data => ResponseOfferSnapshot.decode(new BinaryReader(data)));
  }
  loadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "LoadSnapshotChunk", data);
    return promise.then(data => ResponseLoadSnapshotChunk.decode(new BinaryReader(data)));
  }
  applySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ApplySnapshotChunk", data);
    return promise.then(data => ResponseApplySnapshotChunk.decode(new BinaryReader(data)));
  }
  prepareProposal(request: RequestPrepareProposal): Promise<ResponsePrepareProposal> {
    const data = RequestPrepareProposal.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "PrepareProposal", data);
    return promise.then(data => ResponsePrepareProposal.decode(new BinaryReader(data)));
  }
  processProposal(request: RequestProcessProposal): Promise<ResponseProcessProposal> {
    const data = RequestProcessProposal.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ProcessProposal", data);
    return promise.then(data => ResponseProcessProposal.decode(new BinaryReader(data)));
  }
}