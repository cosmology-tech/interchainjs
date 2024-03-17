# Auth

The main purpose of the `@cosmonauts/auth` is to offer developers a way to have different wallet algorithm implementations on Blockchain, including `secp256k1`, `ed25519`, etc. All of these algorithms implementations are exposing the same `Auth` interface which means that `Signer`s can just use these methods without the need to know the underlying implementation for specific algorithms as they are abstracted away.

To start, you have to make an instance of the `*Auth` (i.e. `Secp256k1Auth`) class which gives you the ability to use different algorithms out of the box.

Usually it can be instantiated from three static methods

- `fromMnemonic` makes an instance from a mnemonic words string. This instance can both `sign` and `verify`.
- `fromPrivateKey` makes an instance from a private key. This instance can both `sign` and `verify`.
- `fromPublicKey` makes an instance from a public key. This instance can only `verify` but no `sign` since the private key necessary for signing can not be derived from public key.

Let's have a look at the properties and methods that `Auth` interface exposes and what they mean:

- `algo` implies the algorithm name, i.e. `secp256k1`, `ed25519`.
- `getPublicKey` gets the public key. This method returns the compressed or uncompressed public key according to the value of argument `isCompressed`.
- `sign` signs binary data that can be any piece of information or message that needs to be digitally signed, and returns a `Signature` typed object. Note: this method itself usually does not inherently involve any hash method.
- `verify` verifies the authenticity of given signature, that is checking if the signature is valid for the provided binary data. Same with `sign`, this method itself usually doesn't apply any hash function to the signed data.

It's important to note that for a specific cryptographic algorithms, the corresponding `*Auth` class implements `Auth` interface in a way that can be universally applied on different networks. That's why both `sign` and `verify` methods usually don't apply any hash function to the targeted message data. Those various hashing processes will be configured in different `Signer`s. That is:

- `*Auth` classes differs across algorithms but independent of networks
- `*Signer` classes differs across networks but independent of algorithms