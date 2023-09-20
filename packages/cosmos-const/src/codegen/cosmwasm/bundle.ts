import * as _159 from "./wasm/v1/authz";
import * as _160 from "./wasm/v1/genesis";
import * as _161 from "./wasm/v1/ibc";
import * as _162 from "./wasm/v1/proposal";
import * as _163 from "./wasm/v1/query";
import * as _164 from "./wasm/v1/tx";
import * as _165 from "./wasm/v1/types";
import * as _275 from "./wasm/v1/tx.amino";
import * as _276 from "./wasm/v1/tx.registry";
import * as _277 from "./wasm/v1/query.lcd";
import * as _278 from "./wasm/v1/query.rpc.Query";
import * as _279 from "./wasm/v1/tx.rpc.msg";
import * as _286 from "./lcd";
import * as _287 from "./rpc.query";
import * as _288 from "./rpc.tx";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._159,
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._164,
      ..._165,
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._279
    };
  }
  export const ClientFactory = {
    ..._286,
    ..._287,
    ..._288
  };
}