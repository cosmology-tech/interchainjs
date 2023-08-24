# Cosmos Sign And Broadcast Instances

`@sign/cosmos-client` package exports dozens of message parsers, including `MsgStargateParser` and `MsgCosmWasmParser`.

## Quick Start

```ts
import { Secp256k1Auth } from "@sign/cosmos";
import { MsgStargateParser } from "@sign/cosmos-client";

const rpcEndpoint = "https://rpc-cosmoshub.blockapsis.com";
const auth = await Secp256k1Auth.fromMnemonic("word1 word2 word3...");

MsgStargateParser.on(rpcEndpoint).by(auth);

const txRaw = await MsgStargateParser.sign({ msgs: [{...}] });
const txResp: TxResponse | undefined = await MsgStargateParser.broadcast(txRaw);
// OR
const txResp: TxResponse | undefined = await MsgStargateParser.signAndBroadcast({ msgs: [{...}] });
```

If you want to check the supported message typeUrls for a particular Client, visit property `supportedMsgTypes` in client.

i.e. `MsgStargateParser.supportedMsgTypes`
