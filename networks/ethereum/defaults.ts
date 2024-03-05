import { AuthConfig, PublicKeyType, SignatureType } from "@cosmonauts/types";
import { Key } from "@cosmonauts/utils";
import { computeAddress } from "@ethersproject/transactions";

export const defaultAuthConfig: AuthConfig = {
  hdPath: "",
  computeAddress: (args: PublicKeyType) =>
    Key.fromHex(computeAddress(args.toPublicKey(true).value)),
  computeSignature: (args: SignatureType) => args.toDER(),
};
