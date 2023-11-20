# Code Structure

Here to briefly introduce the structure of `@sign/cosmos-*` packages, which is designed around the core functionality of `sign` and `broadcast` .

## Packages

| Package                            | Meant For                                   |
| :--------------------------------- | :------------------------------------------ |
| **@sign/cosmos-proto**             | proto/direct signing                        |
| **@sign/cosmos-amino**             | amino signing                               |
| **@sign/cosmos-cosmjs**            | signing with cosmjs signingClient interface |
| **@sign/cosmos-stargate**          | stargate signing                            |
| **@sign/cosmos-cosmwasm-stargate** | cosmwasm and stargate signing               |

> Dependency Order (`a -> b` means _b_ is dependent on _a_):
>
> `@sign/core` -> `@sign/cosmos-proto` -> `@sign/cosmos-amino` -> `@sign/cosmos-cosmjs` -> `@sign/cosmos-stargate` -> `@sign/cosmos-cosmwasm-stargate`

> Registered messages types and `TelescopeGeneratedType` constants also be exported by `@sign/cosmos-stargate` and `@sign/cosmos-cosmwasm-stargate` to facilitate code developing.

## Signer Classes

There’re several types of signer class, and they’re

|          Class           | Package                          | Description                                                                                                                                                                                                                                                     |
| :----------------------: | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      **BaseSigner**      | _@sign/core_                     | defines common methods independent of network i.e. _cosmos_ or _eth_                                                                                                                                                                                            |
|        **Signer**        | _@sign/cosmos-proto_             | implements _proto/direct_ signing process                                                                                                                                                                                                                       |
|     **AminoSigner**      | _@sign/cosmos-amino_             | extends Signer above and implements _amino_ signing process                                                                                                                                                                                                     |
|     **CosmjsSigner**     | _@sign/cosmos-cosmjs_            | is meant for swift migration from _cosmjs_. It provides methods that are basically the same with _signingStargateClient_ and _stargateClient_ in _@cosmjs/stargate_. Note some returned _number_ are changed to _bigint_ in _CosmjsSigner_ compared to _cosmjs_ |
|    **StargateSigner**    | _@sign/cosmos-stargate_          | is **Signer** that with _stargate_ message types being registered by default                                                                                                                                                                                    |
| **StargateAminoSigner**  | _@sign/cosmos-stargate_          | is **AminoSigner** that with _stargate_ message types being registered by default                                                                                                                                                                               |
| **StargateCosmjsSigner** | _@sign/cosmos-stargate_          | is **CosmjsSigner** that with _stargate_ message types being registered by default                                                                                                                                                                              |
|    **CosmWasmSigner**    | _@sign/cosmos-cosmwasm-stargate_ | is **Signer** that with _stargate_ and _cosmwasm_ message types being registered by default                                                                                                                                                                     |
| **CosmWasmAminoSigner**  | _@sign/cosmos-cosmwasm-stargate_ | is **AminoSigner** that with _stargate_ and _cosmwasm_ message types being registered by default                                                                                                                                                                |
| **CosmWasmCosmjsSigner** | _@sign/cosmos-cosmwasm-stargate_ | is **CosmjsSigner** that with _stargate_ and _cosmwasm_ message types being registered by default                                                                                                                                                               |

> See more information of _stargate_ and _cosmwasm_ messages types: [Registered Messages](/cosmos/messages)

## Structure Tree

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
│   ├── class `StargateSigner` extends `Signer`
│   ├── class `StargateAminoSigner` extends `AminoSigner`
│   ├── class `StargateCosmjsSigner` extends `CosmjsSigner`
│   │
├── `@sign/cosmos-cosmwasm-stargate`
│   ├── class `CosmWasmSigner` extends `Signer`
│   ├── class `CosmWasmAminoSigner` extends `AminoSigner`
│   └── class `CosmWasmCosmjsSigner` extends `CosmjsSigner`
```
