import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { StargateMsgs } from "@cosmonauts/cosmos-msgs/stargate";
import { SigningClient } from "./signing-client";
import { OfflineSigner } from "./types/wallet";
import { SignerOptions } from "./types/signing-client";
import { HttpEndpoint } from "@cosmonauts/types";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { authTemplate } from "./utils";

export class StargateSigningClient extends SigningClient {
  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    super(aminoSigner, offlineSigner, options);
    this.aminoSigner.addEncoders(StargateMsgs.map((g) => toEncoder(g)));
    this.aminoSigner.addConverters(StargateMsgs.map((g) => toConverter(g)));
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): StargateSigningClient {
    const aminoSigner = new AminoSigner(authTemplate, [], []);
    const signingClient = new StargateSigningClient(
      aminoSigner,
      signer,
      options
    );
    signingClient.setEndpoint(endpoint);
    return signingClient;
  }
}
