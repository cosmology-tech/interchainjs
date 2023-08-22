# Cosmos Sign

## Quick Start

### Sign with `MsgParser`

Take `Tx` sign with `MsgSend` as example.

```ts
// Step 1: Get the target `MsgParser` instance.
import { MsgSendParser, Secp256k1Auth, Auth } from "@sign/cosmos";

// Step 2: Prepare the `rpcEndpoint` and the `Auth` object.
const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
const auth: Auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

MsgSendParser.on(rpcEndpoint).by(auth);

// Step 3: Sign messages
const txRaw: TxRaw = await MsgSendParser.sign({ msgs: [{...}] });
```

Check `MsgParser` instances collections.

- `MsgParserMap`: including all instances.
- `StargateMsgParserMap`: including all instances in `Stargate`.

```ts
import { MsgParserMap, StargateMsgParserMap } from "@sign/cosmos";
```

> Hint: The name of `MsgParser` instance always starts with **`Msg`**.

### Sign with `MsgParserPool`

`MsgParserPool` is used to sign messages with more than one type.

The signing process is the same with `MsgParser`. Just replace the `MsgParser` instance with the `MsgParserPool` instance.

Check `MsgParserPool` instances.

- `AllMsgParserPool`: supporting all message types.
- `StargateMsgParserPool`: supporting message types in `Stargate`.
- `WasmMsgParserPool`: supporting message types in `Wasm` (not include `Stargate`).

```ts
import {
  AllMsgParserPool,
  StargateMsgParserPool,
  WasmMsgParserPool,
} from "@sign/cosmos";
```

Also two `SignClient` exported by `"@sign/cosmos"`.

```ts
export const StargateSignClient = StargateMsgParserPool;
export const CosmWasmSignClient =
  StargateMsgParserPool.merge(WasmMsgParserPool);
```

### Difference Between `MsgParserPool` and `MsgParserMap`

`MsgParserPool` is an instance of class, you can `sign` and `broadcast` with it. While `MsgParserMap` is an object which maps name (of type `string`) to `MsgParser` instance.

## Advanced

### Customize `MsgParser` Instance

Except normal construction, you can also construct your own `MsgParser` instance with `Telescope` constant.

```ts
import { MsgParser } from "@sign/cosmos";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const MyMsgSendParser = MsgParser.fromTelescope(MsgSend);
```

### Customize `MsgParserPool` Instance

1. Construct your own `MsgParserPool` instance with specified message parsers.

```ts
import { MsgParserPool, MsgSendParser, MsgMultiSendParser } from "@sign/cosmos";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const MyMsgParserPool = MsgParserPool.with(MsgSendParser, MsgMultiSendParser);
```

Or you can do it with MsgParser names (Valid MsgParser names can be find in keys of `MsgParserMap`).

```ts
const MyMsgParserPool = MsgParserPool.with("MsgSend", "MsgMultiSend");
```

2. Construct your own `MsgParserPool` instance with `telescope` constant.

```ts
import { MsgParserPool } from "@sign/cosmos";
import { MsgSend, MsgMultiSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const MyMsgParserPool = MsgParserPool.withTelescope(MsgSend, MsgMultiSend);
```

### Add New `MsgParser` to `MsgParserPool` Instance

Call `add` method in `MsgParserPool`.

```ts
MyMsgParserPool.add(NewMsgParser1, NewMsgParser2, ...);
```

If new parser is in `MsgParserMap`, you can directly add `MsgParser` name string (Valid MsgParser names can be find in keys of `MsgParserMap`).

### Merge New `MsgParserPool` to `MsgParserPool` Instance

Call `merge` method in `MsgParserPool`.

```ts
MyMsgParserPool.merge(NewMsgParserPool1, NewMsgParserPool2, ...);
```

If new parser is in `MsgParserPoolMap`, you can directly add `MsgParserPool` name string (Valid MsgParser names can be find in keys of `MsgParserPoolMap`).

### Broadcast

```ts
// ...
// Step 3: Sign messages
const txRaw: TxRaw = await MsgSendParser.sign({ msgs: [{...}] });

// Step 4: Broadcast txRaw
const txResp: TxResponse | undefined = await MsgSendParser.broadcast(txRaw);
```

Or you can directly broadcast messages

```ts
// ...
// Step 3: Sign and broadcast messages
const txResp: TxResponse | undefined = await MsgSendParser.signAndBroadcast({ msgs: [{...}] });
```
