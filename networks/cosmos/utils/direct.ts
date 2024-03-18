import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
} from "../codegen/cosmos/tx/v1beta1/tx";
import {
  DirectWallet,
  EncodedMessage,
  Encoder,
  Message,
  TxBodyOptions,
  Wallet,
} from "../types";
import { assertEmpty } from "@cosmonauts/utils";
import { SignMode } from "../codegen/cosmos/tx/signing/v1beta1/signing";
import { TelescopeGeneratedType } from "../codegen/types";
import { Auth } from "@cosmonauts/types";
import { defaultSignerConfig } from "../defaults";

export function constructTxBody(
  messages: Message[],
  getEncoder: (typeUrl: string) => { encode: (data: any) => Uint8Array },
  memo?: string,
  options?: TxBodyOptions
) {
  const encoded = messages.map(({ typeUrl, value }) => {
    return {
      typeUrl,
      value: getEncoder(typeUrl).encode(value),
    };
  });
  const txBody = TxBody.fromPartial({
    messages: encoded,
    memo,
    timeoutHeight: options?.timeoutHeight,
    extensionOptions: options?.extensionOptions,
    nonCriticalExtensionOptions: options?.nonCriticalExtensionOptions,
  });
  return {
    txBody,
    encode: () => TxBody.encode(txBody).finish(),
  };
}

export function constructSignerInfo(
  publicKey: EncodedMessage,
  sequence: bigint,
  signMode: SignMode
) {
  const signerInfo = SignerInfo.fromPartial({
    publicKey,
    sequence,
    modeInfo: { single: { mode: signMode } },
  });

  return {
    signerInfo,
    encode: () => SignerInfo.encode(signerInfo).finish(),
  };
}

export function constructAuthInfo(signerInfos: SignerInfo[], fee: Fee) {
  const authInfo = AuthInfo.fromPartial({ signerInfos, fee });
  return {
    authInfo,
    encode: () => AuthInfo.encode(authInfo).finish(),
  };
}

export function toEncoder(
  generated: TelescopeGeneratedType<any, any, any>
): Encoder {
  return {
    typeUrl: generated.typeUrl,
    encode: (data: any) => {
      assertEmpty(generated.encode);
      return generated.encode(generated.fromPartial(data)).finish();
    },
  };
}

export async function constructAuthFromWallet(wallet: Wallet<any>) {
  const account = await wallet.getAccount();
  const isPubkeyCompressed = defaultSignerConfig.publicKey.isCompressed;
  const auth: Auth = {
    algo: account.algo,
    getPublicKey(isCompressed?: boolean) {
      if (isCompressed && isPubkeyCompressed) {
        return account.publicKey;
      }
      if (!isCompressed && !isPubkeyCompressed) {
        return account.publicKey;
      }
      throw new Error(
        `Failed to get ${
          isCompressed ? "compressed" : "uncompressed"
        } public key`
      );
    },
    sign(_data: Uint8Array) {
      throw new Error("Not implemented yet");
    },
  };
  return auth;
}

export async function getAccountFromAuth(auth: Auth) {
  return {
    algo: auth.algo,
    publicKey: auth.getPublicKey(defaultSignerConfig.publicKey.isCompressed),
  };
}
