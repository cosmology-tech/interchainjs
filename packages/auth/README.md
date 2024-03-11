# Auth

Authentication for web3 accounts.

## Usage

```sh
npm install @cosmonauts/auth
```

Taking `secp256k1` as example.

```ts
// import * from "@cosmonauts/auth"; // Error: use sub-imports, to ensure small app size
import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";

const auth = Secp256k1Auth.fromMnemonic("<mnemonic words>", "<HD path>");
const signature = auth.sign(Uint8Array.from([1, 2, 3]));
console.log(signature.toHex());
```

## Implementations

- **secp256k1 auth** from `@cosmonauts/auth/secp256k1`
- **ed25519 auth** from `@cosmonauts/auth/ed25519` (`Not fully implemented yet`)

## License

MIT License (MIT) & Apache License

Copyright (c) 2024 Cosmology (https://cosmology.zone/)