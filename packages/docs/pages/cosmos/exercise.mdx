# Hands-on Exercise

## @sign/cosmos-proto

### Preset

Before `@sign/cosmos-proto` or `@sign/cosmos-amino` exercise, let's prepare the `auth` object.

```ts
import { Secp256k1Auth } from "@sign/core";
const auth = Secp256k1Auth.fromMnemonic("word1 word2 word3...");
```

### Sign and Broadcast

```ts
import { Signer } from "@sign/cosmos-proto";
import { registry } from "interchain/cosmos/bank/v1beta1/tx.registry";

const signer = new Signer(registry);
await signer.on("http://").by(auth).signMessages(messages).broadcast();
await signer.on("http://").by(auth).signDoc(doc).broadcast();
```

### Get `TxRaw`

```ts
const txRaw = await signer.on("http://").by(auth).signMessages(messages).signed;
const txRaw = signer.by(auth).signDoc(doc).signed;
```

## @sign/cosmos-amino

### Preset

Before `@sign/cosmos-proto` or `@sign/cosmos-amino` exercise, let's prepare the `auth` object.

```ts
import { Secp256k1Auth } from "@sign/core";
const auth = Secp256k1Auth.fromMnemonic("word1 word2 word3...");
```

### Sign and Broadcast

Except for sign and broadcast methods (with proto/direct) in `Signer`, `AminoSigner` provides extra methods doing sign and broadcast with amino.

```ts
import { Signer } from "@sign/cosmos-proto";
import { registry } from "interchain/cosmos/bank/v1beta1/tx.registry";
import { AminoConverter } from "interchain/cosmos/bank/v1beta1/tx.amino";

const aminoSigner = new AminoSigner(registry, AminoConverter);
await aminoSigner
  .on("http://")
  .by(auth)
  .signMessagesWithAmino(messages)
  .broadcast();
await aminoSigner.on("http://").by(auth).signDocWithAmino(stdDoc).broadcast();
```

### Get `TxRaw`

```ts
const txRaw = await signer
  .on("http://")
  .by(auth)
  .signMessagesWithAmino(messages).signed;
const txRaw = signer.by(auth).signDocWithAmino(stdDoc).signed;
```

## @sign/cosmos-cosmjs

### Preset

Before `@sign/cosmos-cosmjs` exercise, let's prepare the `offlineSigner` object.

```ts
import { Secp256k1Wallet } from "@sign/cosmjs";
const wallet = await Secp256k1Wallet.fromMnemonic("word1 word2 word3...");
const offlineDirectSigner = wallet.toOfflineDirectSigner();
const offlineAminoSigner = wallet.toOfflineAminoSigner();
```

### Sign and Broadcast

Except for sign and broadcast methods (with proto/direct) in `Signer`, `AminoSigner` provides extra methods doing sign and broadcast with amino.

```ts
import { CosmjsSigner } from "@sign/cosmos-cosmjs";
import { registry } from "interchain/cosmos/bank/v1beta1/tx.registry";
import { AminoConverter } from "interchain/cosmos/bank/v1beta1/tx.amino";

const cosmjsSigner = CosmjsSigner.connectWithSigner(
  "http://",
  offlineDirectSigner, // or `offlineAminoSigner`
  {
    registry,
    aminoConverters: AminoConverter,
  }
);
await cosmjsSigner.signAndBroadcast(messages);
await cosmjsSigner.signAndBroadcastSync(messages);
```

### Get `TxRaw`

```ts
const txRaw = await cosmjsSigner.sign(messages);
```

## @sign/cosmos-stargate

- `StargateSigner` with same exercise as [`Signer`](#signcosmos-proto)
- `StargateAminoSigner` with same exercise as [`AminoSigner`](#signcosmos-amino)
- `StargateCosmjsSigner` with same exercise as [`CosmjsSigner`](#signcosmos-cosmjs)

## @sign/cosmos-stargate-cosmwasm

- `CosmWasmSigner` with same exercise as [`Signer`](#signcosmos-proto)
- `CosmWasmAminoSigner` with same exercise as [`AminoSigner`](#signcosmos-amino)
- `CosmWasmCosmjsSigner` with same exercise as [`CosmjsSigner`](#signcosmos-cosmjs)
