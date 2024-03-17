# Cosmos

Transaction codec and client to communicate with any cosmos blockchain.

## Usage

```sh
npm install @cosmonauts/cosmos
```

Taking `direct` signing mode as example.

```ts
// import * from "@cosmonauts/cosmos"; // Error: use sub-imports, to ensure small app size
import { DirectSigner } from "@cosmonauts/cosmos/direct";

const signer = new DirectSigner(<auth>, <encoder>[], <rpc-endpoint>); // **ONLY** rpc endpoint is supported for now
const result = await signer.signAndBroadcast(<messages>);
console.log(result.hash); // the hash of TxRaw
```

- See [@cosmonauts/auth](/packages/auth/README.md) to construct `<auth>`
- See [@cosmonauts/cosmos-msgs](/networks/cosmos-msgs/README.md) to construct `<encoder>`s and `<converter>`s, and also different message types.

## Implementations

- **direct signer** from `@cosmonauts/cosmos/direct`
- **amino signer** from `@cosmonauts/cosmos/amino`

## License

MIT License (MIT) & Apache License

Copyright (c) 2024 Cosmology (https://cosmology.zone/)