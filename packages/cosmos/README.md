# Cosmos Sign

## Quick Start

### Sign with `MsgParser`

Take `Tx` sign with `MsgSend` as example.

```ts
// Step 1: Get the target `MsgParser` instance.
import { msgSendParser, Secp256k1Auth, Auth } from "@sign/cosmos";

// Step 2: Prepare the `rpcEndpoint` and the `Auth` object.
const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
const auth: Auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

msgSendParser.on(rpcEndpoint).by(auth);

// Step 3: Sign messages
const txRaw: TxRaw = await msgSendParser.sign({ msgs: [{...}] });
```

Check `MsgParser` instances collections.

- `msgParsers`: including all instances.
- `stargateMsgParsers`: including all instances in `Stargate`.

```ts
import { msgParsers, stargateMsgParsers } from "@sign/cosmos";
```

### Sign with `MsgPoolParser`

`MsgPoolParser` is used to sign messages with more than one type.

The signing process is the same with `MsgParser`. Just replace the `MsgParser` instance with the `MsgPoolParser` instance.

Check `MsgPoolParser` instances.

- `msgPoolParser`: supporting all message types.
- `stargateMsgPoolParser`: supporting all message types in `Stargate`.

```ts
import { msgPoolParser, stargateMsgPoolParser } from "@sign/cosmos";
```

## Advanced

### Customize `MsgParser` Instance

Except normal construction, you can also construct your own `MsgParser` instance with `telescope` constant.

```ts
import { MsgParser, BaseParser } from "@sign/cosmos";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const myMsgSendParser = MsgParser.fromParser(BaseParser.fromTelescope(MsgSend));
```

### Customize `MsgPoolParser` Instance

Construct your own `MsgPoolParser` instance with specified message types.

```ts
import { MsgPoolParser, msgSendParser, msgMultiSendParser } from "@sign/cosmos";
import { MsgSend } from "interchain-query/cosmos/bank/v1beta1/tx";

const myMsgPoolParser = MsgPoolParser.with(msgSendParser, msgMultiSendParser);
```

Or you can do it with parser names (Valid parser names can be find in keys of `msgParsers`).

```ts
const myMsgPoolParser = MsgPoolParser.with("MsgSend", "MsgMultiSend");
```

### Broadcast

TODO
