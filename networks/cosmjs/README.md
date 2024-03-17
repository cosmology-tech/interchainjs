# Cosmjs

Wrapper of `@cosmonauts/auth` and `@cosmonauts/cosmos` to fit corresponding interfaces in `@cosmjs` 

## Usage

```sh
npm install @cosmonauts/cosmjs
```

To sign messages (taking `stargate` signing client as example)

```ts
// import * from "@cosmonauts/cosmjs"; // Error: use sub-imports, to ensure small app size
import { StargateSigningClient } from "@cosmonauts/cosmjs/stargate";

const client = StargateSigningClient.connectWithSigner(<rpc-endpoint>, <offline signer>);
const result = await client.signAndBroadcast(<address>, <messages>, "auto");
// or you can use helper functions to do `signAndBroadcast`. taking send tokens as example
const result = await client.helpers.send(<address>, <MsgSend message>, "auto", "");

console.log(result.transactionHash); // the hash of TxRaw
```

To construct an offline signer (taking `direct` signer as example)

```ts
import { Secp256k1Wallet } from "@cosmonauts/cosmjs/wallets/secp256k1";

const wallet = Secp256k1Wallet.fromMnemonic("<mnemonic-words>", { prefix: "<prefix>" });
const directOfflineSigner = wallet.toOfflineDirectSigner();
```

## Implementations

- **signing client**
  - **signing client** from `@cosmonauts/cosmjs/signing-client`
  - **stargate signing client** from `@cosmonauts/cosmjs/stargate`
  - **cosmwasm signing client** from `@cosmonauts/cosmjs/cosmwasm-stargate`
- **wallet**
  - **secp256k1 wallet** from `@cosmonauts/cosmjs/wallets/secp256k1`

## License

MIT License (MIT) & Apache License

Copyright (c) 2024 Cosmology (https://cosmology.zone/)