import * as _119 from "./applications/interchain_accounts/controller/v1/controller";
import * as _120 from "./applications/interchain_accounts/controller/v1/query";
import * as _121 from "./applications/interchain_accounts/controller/v1/tx";
import * as _122 from "./applications/interchain_accounts/genesis/v1/genesis";
import * as _123 from "./applications/interchain_accounts/host/v1/host";
import * as _124 from "./applications/interchain_accounts/host/v1/query";
import * as _125 from "./applications/interchain_accounts/host/v1/tx";
import * as _126 from "./applications/interchain_accounts/v1/account";
import * as _127 from "./applications/interchain_accounts/v1/metadata";
import * as _128 from "./applications/interchain_accounts/v1/packet";
import * as _129 from "./applications/transfer/v1/authz";
import * as _130 from "./applications/transfer/v1/genesis";
import * as _131 from "./applications/transfer/v1/query";
import * as _132 from "./applications/transfer/v1/transfer";
import * as _133 from "./applications/transfer/v1/tx";
import * as _134 from "./applications/transfer/v2/packet";
import * as _135 from "./core/channel/v1/channel";
import * as _136 from "./core/channel/v1/genesis";
import * as _137 from "./core/channel/v1/query";
import * as _138 from "./core/channel/v1/tx";
import * as _139 from "./core/client/v1/client";
import * as _140 from "./core/client/v1/genesis";
import * as _141 from "./core/client/v1/query";
import * as _142 from "./core/client/v1/tx";
import * as _143 from "./core/commitment/v1/commitment";
import * as _144 from "./core/connection/v1/connection";
import * as _145 from "./core/connection/v1/genesis";
import * as _146 from "./core/connection/v1/query";
import * as _147 from "./core/connection/v1/tx";
import * as _148 from "./lightclients/localhost/v2/localhost";
import * as _149 from "./lightclients/solomachine/v2/solomachine";
import * as _150 from "./lightclients/solomachine/v3/solomachine";
import * as _151 from "./lightclients/tendermint/v1/tendermint";
import * as _245 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _246 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _247 from "./applications/transfer/v1/tx.amino";
import * as _248 from "./core/channel/v1/tx.amino";
import * as _249 from "./core/client/v1/tx.amino";
import * as _250 from "./core/connection/v1/tx.amino";
import * as _251 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _252 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _253 from "./applications/transfer/v1/tx.registry";
import * as _254 from "./core/channel/v1/tx.registry";
import * as _255 from "./core/client/v1/tx.registry";
import * as _256 from "./core/connection/v1/tx.registry";
import * as _257 from "./applications/interchain_accounts/controller/v1/query.lcd";
import * as _258 from "./applications/interchain_accounts/host/v1/query.lcd";
import * as _259 from "./applications/transfer/v1/query.lcd";
import * as _260 from "./core/channel/v1/query.lcd";
import * as _261 from "./core/client/v1/query.lcd";
import * as _262 from "./core/connection/v1/query.lcd";
import * as _263 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _264 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _265 from "./applications/transfer/v1/query.rpc.Query";
import * as _266 from "./core/channel/v1/query.rpc.Query";
import * as _267 from "./core/client/v1/query.rpc.Query";
import * as _268 from "./core/connection/v1/query.rpc.Query";
import * as _269 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _270 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _271 from "./applications/transfer/v1/tx.rpc.msg";
import * as _272 from "./core/channel/v1/tx.rpc.msg";
import * as _273 from "./core/client/v1/tx.rpc.msg";
import * as _274 from "./core/connection/v1/tx.rpc.msg";
import * as _283 from "./lcd";
import * as _284 from "./rpc.query";
import * as _285 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._119,
          ..._120,
          ..._121,
          ..._245,
          ..._251,
          ..._257,
          ..._263,
          ..._269
        };
      }
      export namespace genesis {
        export const v1 = {
          ..._122
        };
      }
      export namespace host {
        export const v1 = {
          ..._123,
          ..._124,
          ..._125,
          ..._246,
          ..._252,
          ..._258,
          ..._264,
          ..._270
        };
      }
      export const v1 = {
        ..._126,
        ..._127,
        ..._128
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._129,
        ..._130,
        ..._131,
        ..._132,
        ..._133,
        ..._247,
        ..._253,
        ..._259,
        ..._265,
        ..._271
      };
      export const v2 = {
        ..._134
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._135,
        ..._136,
        ..._137,
        ..._138,
        ..._248,
        ..._254,
        ..._260,
        ..._266,
        ..._272
      };
    }
    export namespace client {
      export const v1 = {
        ..._139,
        ..._140,
        ..._141,
        ..._142,
        ..._249,
        ..._255,
        ..._261,
        ..._267,
        ..._273
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._143
      };
    }
    export namespace connection {
      export const v1 = {
        ..._144,
        ..._145,
        ..._146,
        ..._147,
        ..._250,
        ..._256,
        ..._262,
        ..._268,
        ..._274
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v2 = {
        ..._148
      };
    }
    export namespace solomachine {
      export const v2 = {
        ..._149
      };
      export const v3 = {
        ..._150
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._151
      };
    }
  }
  export const ClientFactory = {
    ..._283,
    ..._284,
    ..._285
  };
}