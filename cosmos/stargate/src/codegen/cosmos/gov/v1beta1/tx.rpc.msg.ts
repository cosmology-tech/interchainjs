import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgSubmitProposal, MsgVote, MsgVoteWeighted, MsgDeposit } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /** SubmitProposal defines a method to create new proposal given a content. */
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse>;
  /** Vote defines a method to add a vote on a specific proposal. */
  vote(request: BroadcastTxReq<MsgVote>): Promise<DeliverTxResponse>;
  /**
   * VoteWeighted defines a method to add a weighted vote on a specific proposal.
   * 
   * Since: cosmos-sdk 0.43
   */
  voteWeighted(request: BroadcastTxReq<MsgVoteWeighted>): Promise<DeliverTxResponse>;
  /** Deposit defines a method to add deposit on a specific proposal. */
  deposit(request: BroadcastTxReq<MsgDeposit>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.submitProposal = this.submitProposal.bind(this);
    this.vote = this.vote.bind(this);
    this.voteWeighted = this.voteWeighted.bind(this);
    this.deposit = this.deposit.bind(this);
  }
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitProposal.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  vote(request: BroadcastTxReq<MsgVote>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgVote.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  voteWeighted(request: BroadcastTxReq<MsgVoteWeighted>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgVoteWeighted.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  deposit(request: BroadcastTxReq<MsgDeposit>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgDeposit.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};