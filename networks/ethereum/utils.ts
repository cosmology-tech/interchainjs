import { SignResponse, SignerConfig } from "@cosmonauts/types";
import { Auth } from "@cosmonauts/types";
import { defaultSignerConfig } from "./defaults";
import { _TypedDataEncoder } from "@ethersproject/hash";
import { EthTypedData, EthereumAccount } from "./types";
import { fromHex } from "@cosmonauts/utils";

export function getAccountFromAuth(
  auth: Auth,
  config: SignerConfig = defaultSignerConfig
): EthereumAccount {
  const publicKey = auth.getPublicKey(config.publicKey.isCompressed);
  const addrKey = config.publicKey.hash(publicKey);
  return {
    algo: auth.algo,
    publicKey,
    address: addrKey.toPrefixedHex(),
  };
}

export class SignResponseFromAuth {
  static signEip712TypedData(
    auth: Auth,
    doc: EthTypedData,
    config: SignerConfig = defaultSignerConfig
  ): SignResponse<EthTypedData> {
    const encoded = _TypedDataEncoder.encode(
      doc.domain,
      doc.types,
      doc.message
    );
    const signature = auth.sign(config.message.hash(fromHex(encoded)));
    return {
      signature: config.signature.toCompact(signature, auth.algo),
      signed: doc,
    };
  }
}
