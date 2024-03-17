# Signer

The main purpose of the `@cosmonauts/cosmos`, `@cosmonauts/ethereum`, `@cosmonauts/injective` is to offer developers a way to have different `Signer` implementations on different types of Blockchains. All of these `*Signer`s are extending the same `BaseSigner` class which with `Auth` object being utilized in construction.

Implemented `Signer`s:

- `DirectSigner` from `@cosmonauts/cosmos/direct`
- `AminoSigner` from `@cosmonauts/cosmos/amino`
- `Eip712Signer` from `@cosmonauts/ethereum/eip712`

The `*Signer` class is a way to sign and broadcast transactions on blockchains with ease. With it, you can just pass a Message that you want to be packed in a transaction and the transaction will be prepared, signed and broadcasted.

## Signer + Auth

As we know, `Auth` object can be used to sign any piece of binary data. However, combining with the `*Signer` class allows you to sign human-readable messages or transactions using one function call.