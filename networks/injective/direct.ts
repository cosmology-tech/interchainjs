import { Auth, HttpEndpoint, SignerConfig } from "@cosmonauts/types";
import { defaultSignerConfig } from "./defaults";
import { DirectSigner as CosmosDirectSigner } from "@cosmonauts/cosmos/direct";
import {
  EncodedMessage,
  Encoder,
  Secp256k1PubKey,
} from "@cosmonauts/cosmos/types";

export class DirectSigner extends CosmosDirectSigner {
  constructor(
    auth: Auth,
    encoders: Encoder[],
    endpoint?: string | HttpEndpoint,
    config?: SignerConfig
  ) {
    super(auth, encoders, endpoint, config ?? defaultSignerConfig);
  }

  protected get encodedPublicKey(): EncodedMessage {
    switch (this.auth.algo) {
      case "secp256k1":
        return {
          typeUrl: "/injective.crypto.v1beta1.ethsecp256k1.PubKey",
          value: Secp256k1PubKey.encode(
            Secp256k1PubKey.fromPartial({ key: this.publicKey.value })
          ).finish(),
        };
      case "ed25519":
        throw new Error(
          "Ed25519 signer info construction is not implemented yet"
        );
      default:
        throw new Error(`Unsupported public key algorithm: ${this.auth.algo}`);
    }
  }
}
