# Sign

```ts
import { Secp256k1Auth } from "@sign/core";
const auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

// Signer from "@sign/cosmos"

import { Signer as CosmosSigner } from "@sign/cosmos";
import { MsgSend, MsgMultiSend } from "interchain/cosmos/bank/v1beta1/tx";

const cosmosSigner = new CosmosSigner(MsgSend, MsgMultiSend, ...);
await cosmosSigner.on("http://").by(auth).sign(tx).broadcast();

// Signer from "@sign/cosmos-const"

import { stargateSigner, cosmWasmSigner } from "@sign/cosmos-const";

await stargateSigner.on("http://").by(auth).sign(tx).broadcast();
await cosmWasmSigner.on("http://").by(auth).sign(tx).broadcast();

// Signer from "@sign/eth"

import { Signer as EthSigner } from "@sign/eth";

const ethSigner = new EthSigner();
await ethSigner.on("ws://").by(auth).signRaw(tx).broadcast();
await ethSigner.on("ws://").by(auth).signLegacy(tx).broadcast();
await ethSigner.on("ws://").by(auth).signEIP1559(tx).broadcast();
await ethSigner.on("ws://").by(auth).signEIP2930(tx).broadcast();
await ethSigner.on("ws://").by(auth).signEIP4844(tx).broadcast();
```

> Make sure method `by` is called at least once before `sign` is called.

> Make sure method `on` is called at least once before `broadcast` is called.

Get the signed tx:

```ts
const signedTx = await cosmosSigner.on("http://").by(auth).sign(tx).signed;
const signedTx = ethSigner.on("ws://").by(auth).signLegacy(tx).signed;
```

> Note `signed` is a **Promise** with `CosmosSigner`.
