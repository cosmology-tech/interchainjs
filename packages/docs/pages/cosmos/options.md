# Signer Options

## Signer & AminoSigner

The `SignerOptions` exported from `@sign/cosmos-proto` is used for construction of `Signer` and `AminoSigner`. It has following properties.

- **hash**: A function used for hash sign data before generating signature. By default is `sha256`.
- **signatureConverter**: Provides functions to convert between Signature Object and Signature Uint8Array.
- **encodePubKey**: A funtion to generate `Any` type of public key in `SingerInfo`. By default using `secp256k1` key.

All options are configured default values, which are stored in [cosmos/proto/src/defaults.ts](https://github.com/cosmology-tech/sign/blob/main/cosmos/proto/src/defaults.ts).

`SignerOptions` can be modified in construction so that it allows for the use of different network-specific keys to be supported by the signer.

## CosmjsSigner

The `SignerOptions` exported from `@sign/cosmos-cosmjs` is basically the same with `SignerOptions` from `@cosmjs`
