import { SignerConfig } from "@cosmonauts/types";
import { Auth } from "@cosmonauts/types";
import { defaultSignerConfig } from "./defaults";
import { InjectiveAccount } from "./types";

export function getAccountFromAuth(
  auth: Auth,
  config: SignerConfig = defaultSignerConfig.Cosmos
): InjectiveAccount {
  const publicKey = auth.getPublicKey(config.publicKey.isCompressed);
  const pubKeyHash = config.publicKey.hash(publicKey);
  return {
    algo: auth.algo,
    publicKey,
    cosmosAddress: pubKeyHash.toBech32("inj"),
    ethereumAddress: pubKeyHash.toPrefixedHex(),
  };
}
