# @interchainjs/cosmos-types

<p align="center">
  <img src="https://user-images.githubusercontent.com/545047/188804067-28e67e5e-0214-4449-ab04-2e0c564a6885.svg" width="80">
</p>

<p align="center" width="100%">
  <!-- <a href="https://github.com/cosmology-tech/interchainjs/actions/workflows/run-tests.yaml">
    <img height="20" src="https://github.com/cosmology-tech/interchainjs/actions/workflows/run-tests.yaml/badge.svg" />
  </a> -->
   <a href="https://github.com/cosmology-tech/interchainjs/blob/main/LICENSE-MIT"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
   <a href="https://github.com/cosmology-tech/interchainjs/blob/main/LICENSE-Apache"><img height="20" src="https://img.shields.io/badge/license-Apache-blue.svg"></a>
</p>

Cosmos message codecs (including Cosmos( Stargate ) and CosmWasm messages) and query implementation generated by telescope for cosmos chains

## Usage

```sh
npm install @interchainjs/cosmos-types
```

### Message

Make `Encoder` and `Converter` used by `Cosmos` signers (taking `MsgSend` as example)

```ts
import { MsgSend } from "@interchainjs/cosmos-types/cosmos/bank/v1beta1/tx";
import { toConverter, toEncoder } from "@interchainjs/cosmos/utils";
import { AminoSigner } from "@interchainjs/cosmos/signers/amino";

const encoder = toEncoder(MsgSend);
const converter = toConverter(MsgSend);

const signer = new AminoSigner(<AUTH>, [encoder], [converter], <rpc-endpoint>);
```

- See [@interchainjs/auth](/packages/auth/README.md) to construct `<AUTH>`
- See [@interchainjs/cosmos](/packages/cosmos/README.md) to construct different `<signer>`s

Message groups

```ts
import { Msgs } from "@interchainjs/cosmos-types/cosmos";
import { CosmWasmMsgs } from "@interchainjs/cosmos-types/cosmwasm";
```

### Query

Make queries (taking querying `validators` as example)

```ts
import { RpcQuery } from "@interchainjs/cosmos-types/rpc";

const rpcQuery = new RpcQuery(<rpc-endpoint>);
const { validators } = await rpcQuery.validators({
    status: bondStatusToJSON(BondStatus.BOND_STATUS_BONDED),
});
```

## Implementations

- **query**
  - **rpc query client** from `@interchainjs/cosmos-types/rpc`

## License

MIT License (MIT) & Apache License

Copyright (c) 2024 Cosmology (https://cosmology.zone/)
