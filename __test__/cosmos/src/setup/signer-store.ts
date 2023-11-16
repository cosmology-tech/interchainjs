import { CosmjsSigner, OfflineSigner } from "@sign/cosmos-cosmjs";
import { CosmWasmCosmjsSigner } from "@sign/cosmos-cosmwasm-stargate";
import { StargateCosmjsSigner } from "@sign/cosmos-stargate";

import { chain } from "./data";
import {
  getOfflineAminoSigner,
  getOfflineDirectSigner,
} from "./offline-signer";

export class SignerStore {
  private offlineSigner: OfflineSigner;
  private _cosmjsSigner?: CosmjsSigner;

  constructor(
    public readonly chainData: typeof chain.osmosis,
    public readonly seed: string,
    public readonly signType: "direct" | "amino" = "direct",
    public readonly scope: "stargate" | "cosmwasm" = "stargate"
  ) {
    this.offlineSigner =
      signType === "direct"
        ? getOfflineDirectSigner(this.chainData, this.seed)
        : getOfflineAminoSigner(this.chainData, this.seed);
  }

  get cosmjsSigner() {
    if (!this._cosmjsSigner) {
      this._cosmjsSigner =
        this.scope === "stargate"
          ? StargateCosmjsSigner.connectWithSigner(
              this.chainData.rpc,
              this.offlineSigner
            )
          : CosmWasmCosmjsSigner.connectWithSigner(
              this.chainData.rpc,
              this.offlineSigner
            );
    }
    return this._cosmjsSigner;
  }
}
