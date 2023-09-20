import { LCDClient } from "@cosmology/lcd";
import { ConfigRequest, ConfigResponseSDKType, StatusRequest, StatusResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
  }
  /* Config queries for the operator configuration. */
  config = async (_params: ConfigRequest = {}): Promise<ConfigResponseSDKType> => {
    const endpoint = `cosmos/base/node/v1beta1/config`;
    return await this.req.get<ConfigResponseSDKType>(endpoint);
  };
  /* Status queries for the node status. */
  status = async (_params: StatusRequest = {}): Promise<StatusResponseSDKType> => {
    const endpoint = `cosmos/base/node/v1beta1/status`;
    return await this.req.get<StatusResponseSDKType>(endpoint);
  };
}