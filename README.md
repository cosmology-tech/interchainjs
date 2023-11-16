# Sign

## How to Use It

```ts
import { Secp256k1Auth } from "@sign/core";
const auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

// Signer from "@sign/cosmos"

import { Signer as CosmosSigner } from "@sign/cosmos";
import { MsgSend, MsgMultiSend } from "interchain/cosmos/bank/v1beta1/tx";

const cosmosSigner = new CosmosSigner(MsgSend, MsgMultiSend, ...);
await cosmosSigner.on("http://").by(auth).signArbitrary(raw).broadcast();
await cosmosSigner.on("http://").by(auth).sign(tx).broadcast();
await cosmosSigner.on("http://").by(auth).signAmino(tx).broadcast();
await cosmosSigner.on("http://").by(auth).signDirect(tx).broadcast();

// Signer from "@sign/eth"

import { Signer as EthSigner } from "@sign/eth";

const ethSigner = new EthSigner();
await ethSigner.on("ws://").by(auth).signArbitrary(raw).broadcast();
await ethSigner.on("ws://").by(auth).signLegacy(tx).broadcast();
await ethSigner.on("ws://").by(auth).signFeeMarketEIP1559(tx).broadcast();
await ethSigner.on("ws://").by(auth).signAccessListEIP2930(tx).broadcast();
await ethSigner.on("ws://").by(auth).signBlobEIP4844(tx).broadcast();
```

> Make sure method `by` is called at least once before `sign` is called.

> Make sure method `on` is called at least once before `broadcast` is called.

### Get `signed`

```ts
const signedRaw = cosmosSigner.by(auth).signArbitrary(raw).signed;
const signedTx = await cosmosSigner.by(auth).sign(tx).tx;

const signedRaw = ethSigner.by(auth).signArbitrary(raw).signed;
const signedTx = ethSigner.by(auth).signLegacy(tx).signed;
```

> Note `signed` is a **Promise** with `CosmosSigner` when sign `Tx`.

### Verify `signedRaw`

```ts
const isValid = signer.by(auth).verifyArbitrary(raw, signedRaw);
```

## Signer Instances

Considering people need to provide `Meta` type constants in `CosmosSigner` constructor, we provide some preset `CosmosSigner` instances in `"@sign/cosmos-const"` for user convenience.

```ts
import { stargateSigner, cosmwasmSigner } from "@sign/cosmos-const";
```

## Cosmos Signer Structure

Here to briefly introduce the new structure of `@signer/\*` packages, which is designed around the core functionality of `sign` and `broadcast` .

Dependency Order: `@sign/core` -> `@sign/cosmos-proto` -> `@sign/cosmos-amino` -> `@sign/cosmos-cosmjs` -> `@sign/cosmos-stargate` -> `@sign/cosmos-cosmwasm-stargate`

> hint: `a -> b` means b is dependent on a

There’re several types of `Signer` , and they’re

- `BaseSigner` from `@sign/core`, which defines common methods independent of network i.e. cosmos or eth
- `Signer` from `@sign/cosmos-proto`, which implements `proto/direct` signing process
- `AminoSigner` from `@sign/cosmos-amino`, which extends `Signer` above and implements `amino` signing process
- `CosmjsSigner` from `@sign/cosmos-cosmjs`, is meant for swift migration from cosmjs. It provides methods that are basically the same with `signingStargateClient` and `stargateClient` in `@cosmjs/stargate`
- `StargateSigner`, `StargateAminoSigner`, `StargateCosmjsSigner`, from `@sign/cosmos-stargate` are signer classes with **stargate message types** being registered by default in construction.
- `CosmWasmSigner`, `CosmWasmAminoSigner`, `CosmWasmCosmjsSigner`, from `@sign/cosmos-cosmwasm-stargate` are signer classes with **stargate and cosmwasm message types** being registered by default in construction.

Below is the structure displayed in a tree

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
│   ├── class `StargateSigner` extends `Signer`
│   ├── class `StargateAminoSigner` extends `AminoSigner`
│   ├── class `StargateCosmjsSigner` extends `CosmjsSigner`
│   │
├── `@sign/cosmos-cosmwasm-stargate`
│   ├── class `CosmWasmSigner` extends `Signer`
│   ├── class `CosmWasmAminoSigner` extends `AminoSigner`
│   └── class `CosmWasmCosmjsSigner` extends `CosmjsSigner`
```
