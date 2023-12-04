import { Auth, defaultHdPath, Secp256k1Auth, toBase64 } from "@cosmonauts/core";
import { StdSignDoc, StdSignDocUtils } from "@cosmonauts/cosmos-amino";
import { CosmosDefaults, SignDoc, toBech32 } from "@cosmonauts/cosmos-proto";

import {
  AccountData,
  AminoSignResponse,
  DirectSignResponse,
  OfflineAminoSigner,
  OfflineDirectSigner,
  Wallet,
  WalletOptions,
} from "./types";

export class Secp256k1Wallet implements Wallet {
  readonly auths: Auth[] = [];
  readonly bech32addrs: string[] = [];

  protected hash = CosmosDefaults.hash;
  protected signatureConverter = CosmosDefaults.signatureConverter;

  constructor(auths: Auth[], prefix: string = "cosmos") {
    this.auths = auths;
    this.auths.forEach((auth) => {
      this.bech32addrs.push(toBech32(prefix, auth.key.address));
    });
  }

  static fromMnemonic(mnemonic: string, options?: WalletOptions) {
    const hdPaths = options?.hdPaths || [defaultHdPath];
    const auths: Auth[] = [];
    hdPaths.forEach((hdPath) => {
      auths.push(
        Secp256k1Auth.fromMnemonic(mnemonic, {
          bip39Password: options.bip39Password,
          hdPath,
        })
      );
    });
    return new Secp256k1Wallet(auths, options?.prefix);
  }

  getAccounts(): AccountData[] {
    const accounts: AccountData[] = [];
    this.auths.forEach((auth, i) => {
      accounts.push({
        address: this.bech32addrs[i],
        algo: "secp256k1",
        pubkey: auth.key.pubkey,
      });
    });
    return accounts;
  }

  private getAuthFromBech32Addr(address: string) {
    const id = this.bech32addrs.findIndex((addr) => addr === address);
    if (id === -1) {
      throw new Error("No such signerAddress been authed.");
    }
    return this.auths[id];
  }

  signDirect(signerAddress: string, signDoc: SignDoc): DirectSignResponse {
    const auth = this.getAuthFromBech32Addr(signerAddress);
    const doc = SignDoc.fromPartial(signDoc);
    const sigObj = auth.sign(this.hash(SignDoc.encode(doc).finish()));
    return {
      signed: doc,
      signature: {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: {
            key: auth.key.pubkey,
          },
        },
        signature: toBase64(this.signatureConverter.toSignature(sigObj)),
      },
    };
  }

  signAmino(signerAddress: string, signDoc: StdSignDoc): AminoSignResponse {
    const auth = this.getAuthFromBech32Addr(signerAddress);
    const sigObj = auth.sign(this.hash(StdSignDocUtils.encode(signDoc)));
    return {
      signed: signDoc,
      signature: {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: {
            key: auth.key.pubkey,
          },
        },
        signature: toBase64(this.signatureConverter.toSignature(sigObj)),
      },
    };
  }

  toOfflineDirectSigner(): OfflineDirectSigner {
    return {
      getAccounts: async () => this.getAccounts(),
      signDirect: async (signerAddress: string, signDoc: SignDoc) =>
        this.signDirect(signerAddress, signDoc),
    };
  }

  toOfflineAminoSigner(): OfflineAminoSigner {
    return {
      getAccounts: async () => this.getAccounts(),
      signAmino: async (signerAddress: string, signDoc: StdSignDoc) =>
        this.signAmino(signerAddress, signDoc),
    };
  }
}
