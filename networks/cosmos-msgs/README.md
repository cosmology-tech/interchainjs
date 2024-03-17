# Cosmos Messages

Cosmos message codecs (including Stargate and CosmWasm messages)

## Usage

```sh
npm install @cosmonauts/cosmos-msgs
```

Make `Encoder` and `Converter` used by `Cosmos` signers (taking `MsgSend` as example)

```ts
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { AminoSigner } from "@cosmonauts/cosmos/amino";

const encoder = toEncoder(MsgSend);
const converter = toConverter(MsgSend);

const signer = new AminoSigner(<auth>, [encoder], [converter], <rpc-endpoint>);
```

- See [@cosmonauts/auth](/packages/auth/README.md) to construct `<auth>`
- See [@cosmonauts/cosmos](/packages/cosmos/README.md) to construct different `<signer>`s

## License

MIT License (MIT) & Apache License

Copyright (c) 2024 Cosmology (https://cosmology.zone/)