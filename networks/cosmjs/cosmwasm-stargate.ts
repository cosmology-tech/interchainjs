import { AminoSigner } from "@uni-sign/cosmos/amino";
import { StargateMsgs } from "@uni-sign/cosmos-msgs/stargate";
import { CosmWasmMsgs } from "@uni-sign/cosmos-msgs/cosmwasm";
import { TxImpl } from "@uni-sign/cosmos-msgs/stargate-cosmwasm.tx";
import { SigningClient } from "./signing-client";
import { OfflineSigner } from "./types/wallet";
import { SignerOptions } from "./types/signing-client";
import { HttpEndpoint } from "@uni-sign/types";
import { toConverter, toEncoder } from "@uni-sign/cosmos/utils";
import { defaultAuth } from "./utils";

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
    const aminoSigner = new AminoSigner(defaultAuth, [], []);
    const signingClient = new CosmWasmSigningClient(
      aminoSigner,
      signer,
      options
    );
    signingClient.setEndpoint(endpoint);
    return signingClient;
  }
}
