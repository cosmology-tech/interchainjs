# Cosmos Sign And Broadcast Classes

## Quick Start

### Sign with `MsgParser`

`MsgParser` is used to sign messages with **ONLY** one type.

```ts
import { MsgParser, Secp256k1Auth, Auth } from "@sign/cosmos";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const MsgSendParser = MsgParser.fromTelescope(MsgSend);
const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
const auth: Auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

// Step 1: Prepare `MsgParser` object with `rpcEndpoint` and `auth`.
MsgSendParser.on(rpcEndpoint).by(auth);

// Step 2: Sign messages
const txRaw: TxRaw = await MsgSendParser.sign({ msgs: [{...}] });
```

### Sign with `MsgParserPool`

`MsgParserPool` is used to sign messages with **MORE THAN** one type.

The signing process is same with `MsgParser`

```ts
import { MsgParser, Secp256k1Auth, Auth } from "@sign/cosmos";
import { MsgMultiSend, MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const MsgBankParser = MsgParserPool.fromTelescope(MsgMultiSend, MsgSend);
const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
const auth: Auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

// Step 1: Prepare `MsgParserPool` object with `rpcEndpoint` and `auth`.
MsgBankParser.on(rpcEndpoint).by(auth);

// Step 2: Sign messages
const txRaw: TxRaw = await MsgBankParser.sign({ msgs: [{...}] });
```

### Broadcast

```ts
const txResp: TxResponse | undefined = await MsgSendParser.broadcast(txRaw);
const txResp: TxResponse | undefined = await MsgSendParser.signAndBroadcast({ msgs: [{...}] });
```

## Advanced

### Add New `MsgParser` to Existing `MsgParserPool` Instance

Call `add` method in `MsgParserPool`.

```ts
MyMsgParserPool.addParsers(NewMsgParser1, NewMsgParser2, ...);
```

### Merge New `MsgParserPool` to Existing `MsgParserPool` Instance

Call `merge` method in `MsgParserPool`.

```ts
MyMsgParserPool.mergePools(NewMsgParserPool1, NewMsgParserPool2, ...);
```
