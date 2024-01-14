import { HttpEndpoint } from "@cosmonauts/core";
import { AminoConverters, AminoSigner } from "@cosmonauts/cosmos-amino";
import {
  CosmjsSigner,
  OfflineSigner,
  SignerOptions,
} from "@cosmonauts/cosmos-cosmjs";
import { Registry, Signer } from "@cosmonauts/cosmos-proto";

import { StargateImpl } from "./codegen/service-ops";
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

export interface StargateCosmjsSigner extends CosmjsSigner, StargateImpl {}

export class StargateCosmjsSigner extends CosmjsSigner {
  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    super(aminoSigner, offlineSigner, options);
    this.aminoSigner.registerWithAmino(
      stargateRegistry,
      stargateAminoConverters
    );
    const stargateImpl = new StargateImpl();
    stargateImpl.init({
      ...this.aminoSigner.request.abciQuery,
      signAndBroadcast: this.signAndBroadcast,
    });
    Object.assign(this, stargateImpl);
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): StargateCosmjsSigner {
    const aminoSigner = new AminoSigner().on(endpoint);
    const stargateSigner = new StargateCosmjsSigner(
      aminoSigner,
      signer,
      options
    );
    return stargateSigner;
  }

  get sendTokens() {
    return this.send;
  }
  get delegateTokens() {
    return this.delegate;
  }
  get undelegateTokens() {
    return this.undelegate;
  }
  get withdrawRewards() {
    return this.withdrawDelegatorReward;
  }
  get sendIbcTokens() {
    return this.transfer;
  }
}
