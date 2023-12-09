import { HttpEndpoint } from "@cosmonauts/core";
import { AminoConverters, AminoSigner } from "@cosmonauts/cosmos-amino";
import {
  CosmjsSigner,
  OfflineSigner,
  SignerOptions,
} from "@cosmonauts/cosmos-cosmjs";
import { Registry, Signer } from "@cosmonauts/cosmos-proto";
import {
  stargateAminoConverters,
  StargateCosmjsSigner,
  stargateRegistry,
} from "@cosmonauts/cosmos-stargate";

import { CosmWasmImpl } from "./codegen/service-ops";
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

export interface CosmWasmCosmjsSigner
  extends StargateCosmjsSigner,
    CosmWasmImpl {}

export class CosmWasmCosmjsSigner extends StargateCosmjsSigner {
  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    super(aminoSigner, offlineSigner, options);
    this.aminoSigner.registerWithAmino(
      cosmwasmRegistry,
      cosmwasmAminoConverters
    );
    const stargateImpl = new CosmWasmImpl();
    stargateImpl.init({
      ...this.aminoSigner.query.abciQuery,
      signAndBroadcast: this.signAndBroadcast,
    });
    Object.assign(this, stargateImpl);
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): CosmjsSigner {
    const aminoSigner = new AminoSigner().on(endpoint);
    const cosmWasmSigner = new CosmWasmCosmjsSigner(
      aminoSigner,
      signer,
      options
    );
    return cosmWasmSigner;
  }
}
