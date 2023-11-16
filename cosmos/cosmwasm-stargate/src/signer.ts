import { HttpEndpoint } from "@sign/core";
import { AminoConverters, AminoSigner } from "@sign/cosmos-amino";
import {
  CosmjsSigner,
  OfflineSigner,
  SignerOptions,
} from "@sign/cosmos-cosmjs";
import { Registry, Signer } from "@sign/cosmos-proto";
import {
  stargateAminoConverters,
  stargateRegistry,
} from "@sign/cosmos-stargate";

import { cosmwasmAminoConverters, cosmwasmRegistry } from "./registry";

export class CosmWasmSigner extends Signer {
  constructor(registry?: Registry) {
    super([...cosmwasmRegistry, ...stargateRegistry]);
    this.register(registry);
  }
}

export class CosmWasmAminoSigner extends AminoSigner {
  constructor(registry?: Registry, aminoConverters?: AminoConverters) {
    super([...cosmwasmRegistry, ...stargateRegistry], {
      ...cosmwasmAminoConverters,
      ...stargateAminoConverters,
    });
    this.registerWithAmino(registry, aminoConverters);
  }
}

export class CosmWasmCosmjsSigner extends CosmjsSigner {
  constructor(offlineSigner: OfflineSigner, options: SignerOptions = {}) {
    const aminoSigner = new AminoSigner(
      [...cosmwasmRegistry, ...stargateRegistry],
      {
        ...cosmwasmAminoConverters,
        ...stargateAminoConverters,
      }
    );
    super(aminoSigner, offlineSigner, options);
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): CosmjsSigner {
    const stargateSigner = new CosmWasmCosmjsSigner(signer, options);
    stargateSigner.aminoSigner.on(endpoint);
    return stargateSigner;
  }
}
