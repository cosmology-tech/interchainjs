import { Signer } from "@sign/cosmos";

import { stargateSigner } from "./stargate";
import { wasmSigner } from "./wasm";

export * from "./stargate";

export const cosmwasmSigner = Signer.fromParsers(
  ...stargateSigner.parsers,
  ...wasmSigner.parsers
);
