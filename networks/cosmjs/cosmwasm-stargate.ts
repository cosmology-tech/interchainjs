import { AminoSigner } from "@cosmonauts/cosmos/amino";
import { StargateMsgs } from "@cosmonauts/cosmos-msgs/stargate";
import { CosmWasmMsgs } from "@cosmonauts/cosmos-msgs/cosmwasm";
import { TxImpl } from "@cosmonauts/cosmos-msgs/stargate-cosmwasm.tx";
import { SigningClient } from "./signing-client";
import { OfflineSigner } from "./types/wallet";
import { SignerOptions } from "./types/signing-client";
import { HttpEndpoint } from "@cosmonauts/types";
import { toConverter, toEncoder } from "@cosmonauts/cosmos/utils";
import { authTemplate } from "./utils";

export class CosmWasmSigningClient extends SigningClient {
  readonly helpers: TxImpl;

  constructor(
    aminoSigner: AminoSigner,
    offlineSigner: OfflineSigner,
    options: SignerOptions = {}
  ) {
    super(aminoSigner, offlineSigner, options);
    this.aminoSigner.addEncoders(
      [...StargateMsgs, ...CosmWasmMsgs].map((g) => toEncoder(g))
    );
    this.aminoSigner.addConverters(
      [...StargateMsgs, ...CosmWasmMsgs].map((g) => toConverter(g))
    );
    this.helpers = new TxImpl();
    this.helpers.init(this.txRpc);
  }

  static connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SignerOptions = {}
  ): CosmWasmSigningClient {
    const aminoSigner = new AminoSigner(authTemplate, [], []);
    const signingClient = new CosmWasmSigningClient(
      aminoSigner,
      signer,
      options
    );
    signingClient.setEndpoint(endpoint);
    return signingClient;
  }
}
