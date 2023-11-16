import { HttpEndpoint } from "@sign/core";
import { AminoConverters, AminoSigner } from "@sign/cosmos-amino";
import {
  CosmjsSigner,
  OfflineSigner,
  SignerOptions,
} from "@sign/cosmos-cosmjs";
import { Registry, Signer } from "@sign/cosmos-proto";

import { stargateAminoConverters, stargateRegistry } from "./registry";

export class StargateSigner extends Signer {
  constructor(registry?: Registry) {
    super(stargateRegistry);
    this.register(registry);
  }
}

export class StargateAminoSigner extends AminoSigner {
  constructor(registry?: Registry, aminoConverters?: AminoConverters) {
    super(stargateRegistry, stargateAminoConverters);
    this.registerWithAmino(registry, aminoConverters);
  }
}

export class StargateCosmjsSigner extends CosmjsSigner {
  constructor(offlineSigner: OfflineSigner, options: SignerOptions = {}) {
    const aminoSigner = new AminoSigner(
      stargateRegistry,
      stargateAminoConverters
    );
    super(aminoSigner, offlineSigner, options);
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): CosmjsSigner {
    const stargateSigner = new StargateCosmjsSigner(signer, options);
    stargateSigner.aminoSigner.on(endpoint);
    return stargateSigner;
  }
}
