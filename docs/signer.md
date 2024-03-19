# Signer

The main purpose of the `@uni-sign/cosmos`, `@uni-sign/ethereum`, `@uni-sign/injective` is to offer developers a way to have different `Signer` implementations on different types of Blockchains. All of these `*Signer`s are extending the same `BaseSigner` class which with `Auth` object being utilized in construction.

Implemented `Signer`s:

- `DirectSigner` from `@uni-sign/cosmos/direct`
- `AminoSigner` from `@uni-sign/cosmos/amino`
- `Eip712Signer` from `@uni-sign/ethereum/eip712`

The `*Signer` class is a way to sign and broadcast transactions on blockchains with ease. With it, you can just pass a Message that you want to be packed in a transaction and the transaction will be prepared, signed and broadcasted.

## Signer + Auth

As we know, `Auth` object can be used to sign any piece of binary data. However, combining with the `*Signer` class allows you to sign human-readable messages or transactions using one function call.