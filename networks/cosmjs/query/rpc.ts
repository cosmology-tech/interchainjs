import { createTxRpc } from "@cosmonauts/cosmos/utils";
import { QueryImpl } from "@cosmonauts/cosmos-query";
import { HttpEndpoint } from "@cosmonauts/types";
import { toHttpEndpoint } from "@cosmonauts/utils";

export class RpcQuery extends QueryImpl {
  constructor(endpoint: string | HttpEndpoint) {
    super();
    this.init(createTxRpc(toHttpEndpoint(endpoint)));
  }
}
