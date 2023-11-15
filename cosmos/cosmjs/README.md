## Signer Structure

> `CosmjsSigner` is meant for swift migration from `cosmjs`. Note some returned `number` are changed to `bigint` in `CosmjsSigner` compared to `cosmjs`

```sh
├── `@sign/core`
│   ├── class `BaseSigner`
│   │   ├── method `signBytes` (sign `Uint8Array`)
│   │   ├── method `verifyBytes` (verify `Uint8Array`)
│   │
├── `@sign/cosmos-proto`
│   ├── class `Signer` extends `BaseSigner`
│   │   ├── method (query) `getChainId`
│   │   ├── method (query) `getSequence`
│   │   ├── method `signDoc` (sign `SignDoc` with DIRECT signing)
│   │   ├── method `signMessages` (sign messages of type `EncodeObject[]` with DIRECT signing)
│   │   ├── method `broadcast` (broadcast `TxRaw`)
│   │   ├── method `broadcastBytes` (broadcast `Uint8Array`)
│   │   ├── method `estimateGas`
│   │   └── method `estimateFee`
│   │
├── `@sign/cosmos-amino`
│   ├── class `AminoSigner` extends `Signer`
│   │   ├── method `signDocWithAmino` (sign `StdDoc` with AMINO signing)
│   │   └── method `signMessagesWithAmino` (sign messages of type `EncodeObject[]` with AMINO signing)
│   │
├── `@sign/cosmos-cosmjs`
│   ├── class `CosmjsSigner` (with `AminoSigner` used inside)
│   │   │
│   │   ├── \* Shared methods with `signingStargateClient` *\
│   │   ├── method (static) `connectWithSigner`
│   │   ├── method `simulate` (return `bigint` rather than `number`)
│   │   ├── method `sign`
│   │   ├── method `signAndBroadcast`
│   │   ├── method `signAndBroadcastSync`
│   │   │
│   │   ├── \* Shared methods with `stargateClient` *\
│   │   ├── method (query) `getChainId`
│   │   ├── method (query) `getSequence`
│   │   ├── method (query) `getTx`
│   │   ├── method `broadcastTx`
│   │   └── method `broadcastTxSync`
│   │
├── `@sign/cosmos-stargate`
│   ├── const `cosmwasmSigner` (an `AminoSigner` instance with `stargate` registries registered)
│   │
├── `@sign/cosmos-cosmwasm-stargate`
│   └── const `cosmwasmSigner` (an `AminoSigner` instance with `cosmwasm` and `stargate` registries registered)
```
