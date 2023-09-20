import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgSend, MsgSendResponse, MsgMultiSend, MsgMultiSendResponse, MsgBurn, MsgBurnResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgSetSendEnabled, MsgSetSendEnabledResponse } from "./tx";
/** Msg defines the bank Msg service. */
export interface Msg {
  /** Send defines a method for sending coins from one account to another account. */
  send(request: MsgSend): Promise<MsgSendResponse>;
  /** MultiSend defines a method for sending coins from some accounts to other accounts. */
  multiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse>;
  /**
   * Burn defines a method for burning coins by an account.
   * 
   * Since: cosmos-sdk 0.51
   */
  burn(request: MsgBurn): Promise<MsgBurnResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/bank module parameters.
   * The authority is defined in the keeper.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * SetSendEnabled is a governance operation for setting the SendEnabled flag
   * on any number of Denoms. Only the entries to add or update should be
   * included. Entries that already exist in the store, but that aren't
   * included in this message, will be left unchanged.
   * 
   * Since: cosmos-sdk 0.47
   */
  setSendEnabled(request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  /* Send defines a method for sending coins from one account to another account. */
  send = async (request: MsgSend): Promise<MsgSendResponse> => {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", data);
    return promise.then(data => MsgSendResponse.decode(new BinaryReader(data)));
  };
  /* MultiSend defines a method for sending coins from some accounts to other accounts. */
  multiSend = async (request: MsgMultiSend): Promise<MsgMultiSendResponse> => {
    const data = MsgMultiSend.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "MultiSend", data);
    return promise.then(data => MsgMultiSendResponse.decode(new BinaryReader(data)));
  };
  /* Burn defines a method for burning coins by an account.
  
   Since: cosmos-sdk 0.51 */
  burn = async (request: MsgBurn): Promise<MsgBurnResponse> => {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Burn", data);
    return promise.then(data => MsgBurnResponse.decode(new BinaryReader(data)));
  };
  /* UpdateParams defines a governance operation for updating the x/bank module parameters.
   The authority is defined in the keeper.
  
   Since: cosmos-sdk 0.47 */
  updateParams = async (request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> => {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  };
  /* SetSendEnabled is a governance operation for setting the SendEnabled flag
   on any number of Denoms. Only the entries to add or update should be
   included. Entries that already exist in the store, but that aren't
   included in this message, will be left unchanged.
  
   Since: cosmos-sdk 0.47 */
  setSendEnabled = async (request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse> => {
    const data = MsgSetSendEnabled.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "SetSendEnabled", data);
    return promise.then(data => MsgSetSendEnabledResponse.decode(new BinaryReader(data)));
  };
}