import { Secp256k1Auth, toBase64 } from "@sign/core";
import { StdSignDoc } from "@sign/cosmos-amino";
import { OfflineAminoSigner, OfflineDirectSigner } from "@sign/cosmos-cosmjs";
import { SignDoc, toBech32 } from "@sign/cosmos-proto";
import { StargateAminoSigner, StargateSigner } from "@sign/cosmos-stargate";

import { chain } from "./data";

export function getOfflineDirectSigner(
  chainData: typeof chain.osmosis,
  seed: string
) {
  const auth = Secp256k1Auth.fromMnemonic(seed);
  const offlineDirectSigner: OfflineDirectSigner = {
    getAccounts: async () => {
      return [
        {
          address: toBech32(chainData.prefix, auth.key.address),
          algo: "secp256k1",
          pubkey: auth.key.pubkey,
        },
      ];
    },
    signDirect: async (signerAddress: string, signDoc: SignDoc) => {
      const accounts = await offlineDirectSigner.getAccounts();
      const { algo, pubkey } = accounts.find(
        (a) => a.address === signerAddress
      );
      const signer = new StargateSigner().by(auth);
      const { signed } = signer.signDoc(signDoc);
      return {
        signed: signDoc,
        signature: {
          pub_key: {
            type: algo,
            value: pubkey,
          },
          signature: toBase64(signed.signatures[0]),
        },
      };
    },
  };
  return offlineDirectSigner;
}

export function getOfflineAminoSigner(
  chainData: typeof chain.osmosis,
  seed: string
) {
  const auth = Secp256k1Auth.fromMnemonic(seed);
  const offlineAminoSigner: OfflineAminoSigner = {
    getAccounts: async () => {
      return [
        {
          address: toBech32(chainData.prefix, auth.key.address),
          algo: "secp256k1",
          pubkey: auth.key.pubkey,
        },
      ];
    },
    signAmino: async (signerAddress: string, signDoc: StdSignDoc) => {
      const accounts = await offlineAminoSigner.getAccounts();
      const { algo, pubkey } = accounts.find(
        (a) => a.address === signerAddress
      );
      const aminoSigner = new StargateAminoSigner().by(auth);
      const { signed } = aminoSigner.signDocWithAmino(signDoc);
      return {
        signed: signDoc,
        signature: {
          pub_key: {
            type: algo,
            value: pubkey,
          },
          signature: toBase64(signed.signatures[0]),
        },
      };
    },
  };
  return offlineAminoSigner;
}
