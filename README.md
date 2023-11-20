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
