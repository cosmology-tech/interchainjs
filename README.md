# Sign

## Main Packages

- [@cosmonauts/auth](/packages/auth/README.md)
- [@cosmonauts/cosmos](/networks/cosmos/README.md)
- [@cosmonauts/cosmos-msgs](/networks/cosmos-msgs/README.md)

## Usage

```sh
npm install @cosmonauts/auth @cosmonauts/cosmos @cosmonauts/cosmos-msgs
```

```ts
// use sub-imports, to ensure small app size
import { DirectSigner } from "@cosmonauts/cosmos/direct";
import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import { MsgSend } from "@cosmonauts/cosmos-msgs/cosmos/bank/v1beta1/tx";

const auth = Secp256k1Auth.fromMnemonic("<mnemonic words>", "cosmos");

// direct signer
const signer = new DirectSigner(auth, [toEncoder(MsgSend)], <rpc endpoint>);

// amino signer
const signer = new AminoSigner(auth, [toEncoder(MsgSend)], [toConverter(MsgSend)], <rpc endpoint>);

const result = await signer.signAndBroadcast(<send token messages>);
console.log(result.hash); // the hash of TxRaw
```

## Migration from `@cosmjs`

We created a specific package to make it easy to migrate from `@cosmjs`.

- [@cosmonauts/cosmjs](/networks/cosmjs/README.md)