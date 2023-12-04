import { BroadcastTxReq, DeliverTxResponse, TxRpc } from "../../../types";
import { MsgSubmitProposal, MsgExecLegacyContent, MsgVote, MsgVoteWeighted, MsgDeposit, MsgUpdateParams } from "./tx";
/** Msg defines the gov Msg service. */
export interface Msg {
  /** SubmitProposal defines a method to create new proposal given the messages. */
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse>;
  /**
   * ExecLegacyContent defines a Msg to be in included in a MsgSubmitProposal
   * to execute a legacy content-based proposal.
   */
  execLegacyContent(request: BroadcastTxReq<MsgExecLegacyContent>): Promise<DeliverTxResponse>;
  /** Vote defines a method to add a vote on a specific proposal. */
  vote(request: BroadcastTxReq<MsgVote>): Promise<DeliverTxResponse>;
  /** VoteWeighted defines a method to add a weighted vote on a specific proposal. */
  voteWeighted(request: BroadcastTxReq<MsgVoteWeighted>): Promise<DeliverTxResponse>;
  /** Deposit defines a method to add deposit on a specific proposal. */
  deposit(request: BroadcastTxReq<MsgDeposit>): Promise<DeliverTxResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/gov module
   * parameters. The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: TxRpc;
  constructor(rpc: TxRpc) {
    this.rpc = rpc;
    this.submitProposal = this.submitProposal.bind(this);
    this.execLegacyContent = this.execLegacyContent.bind(this);
    this.vote = this.vote.bind(this);
    this.voteWeighted = this.voteWeighted.bind(this);
    this.deposit = this.deposit.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  submitProposal(request: BroadcastTxReq<MsgSubmitProposal>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgSubmitProposal.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
  execLegacyContent(request: BroadcastTxReq<MsgExecLegacyContent>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgExecLegacyContent.typeUrl,
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
  updateParams(request: BroadcastTxReq<MsgUpdateParams>): Promise<DeliverTxResponse> {
    const data = [{
      typeUrl: MsgUpdateParams.typeUrl,
      value: request.message
    }];
    return this.rpc.signAndBroadcast!(request.signerAddress, data, request.fee, request.memo);
  }
}
export const createClientImpl = (rpc: TxRpc) => {
  return new MsgClientImpl(rpc);
};