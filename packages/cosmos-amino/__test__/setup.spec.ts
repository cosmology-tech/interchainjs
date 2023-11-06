import { Auth, Secp256k1Auth } from "@sign/core";
import { toBech32 } from "@sign/cosmos";

const mnemonic =
  "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley";

export const auth: Auth = Secp256k1Auth.fromMnemonic(mnemonic);

export const osmosisAddr = toBech32("osmo", auth.key.address);
export const gaiaAddr = toBech32("cosmos", auth.key.address);
