import { SignerConfig } from "@uni-sign/types";
import { Auth } from "@uni-sign/types";
import { defaultSignerConfig } from "./defaults";
import { EthTypedData, InjectiveAccount } from "./types";
import { objectKeysToEip712Types } from "./eth-utils/map";

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

export function toEthTypes<AminoType>(
  message: AminoType
): EthTypedData["types"] {
  const map = objectKeysToEip712Types({ object: message });
  return Object.fromEntries(map.entries());
}
