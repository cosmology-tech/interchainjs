import { Auth, Bech32Address, toBase64 } from "@cosmonauts/core";
import { StdSignDoc, StdSignDocUtils } from "@cosmonauts/cosmos-amino";
import {
  defaultHdPath,
  Secp256k1Auth,
  SignDoc,
  toBech32,
} from "@cosmonauts/cosmos-proto";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";

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
  readonly addrs: Bech32Address[] = [];

  constructor(auths: Auth[], prefix: string = "cosmos") {
    this.auths = auths;
    this.auths.forEach((auth) => {
      this.addrs.push(toBech32(prefix, ripemd160(sha256(auth.keys.pubkey))));
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
        address: this.addrs[i],
        algo: "secp256k1",
        pubkey: auth.keys.pubkey,
      });
    });
    return accounts;
  }

  private getAuthFromBech32Addr(address: string) {
    const id = this.addrs.findIndex((addr) => addr === address);
    if (id === -1) {
      throw new Error("No such signerAddress been authed.");
    }
    return this.auths[id];
  }

  signDirect(signerAddress: string, signDoc: SignDoc): DirectSignResponse {
    const auth = this.getAuthFromBech32Addr(signerAddress);
    const doc = SignDoc.fromPartial(signDoc);
    const signature = auth.signMessage(SignDoc.encode(doc).finish());
    return {
      signed: doc,
      signature: {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: {
            key: auth.keys.pubkey,
          },
        },
        signature: toBase64(signature),
      },
    };
  }

  signAmino(signerAddress: string, signDoc: StdSignDoc): AminoSignResponse {
    const auth = this.getAuthFromBech32Addr(signerAddress);
    const signature = auth.signMessage(
      StdSignDocUtils.encode(StdSignDocUtils.fromPartial(signDoc))
    );
    return {
      signed: signDoc,
      signature: {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: {
            key: auth.keys.pubkey,
          },
        },
        signature: toBase64(signature),
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
