import { AuthConfig, PublicKeyType, SignatureType } from "@cosmonauts/types";
import { Key } from "@cosmonauts/utils";
import { computeAddress } from "@ethersproject/transactions";

export const defaultAuthConfig: AuthConfig = {
  hdPath: "m/44'/60'/0'/0/0",
  computeAddress: (args: PublicKeyType) =>
    Key.fromHex(computeAddress(args.toPublicKey(true).value)),
  computeSignature: (args: SignatureType) => args.toCompact(),
};
