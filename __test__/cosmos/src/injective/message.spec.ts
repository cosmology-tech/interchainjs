import { Secp256k1Auth, authConfig } from "@cosmonauts/core";
import { seed } from "../setup/data";
import { PrivateKey, createTransaction } from "@injectivelabs/sdk-ts";

const mnemonic = seed.genesis;
const myAuth = Secp256k1Auth.fromMnemonic(mnemonic, authConfig["injective"]);

describe("Injective Messages", () => {
  // const { txRaw } = createTransaction({
  //   pubKey: myAuth.publicKeyCompressed.toBase64(),
  //   message: msgs,
  //   memo: aminoSignResponse.signed.memo,
  //   signMode: SIGN_AMINO,
  //   fee: aminoSignResponse.signed.fee,
  //   sequence: parseInt(aminoSignResponse.signed.sequence, 10),
  //   timeoutHeight: parseInt(
  //     (aminoSignResponse.signed as any).timeout_height,
  //     10
  //   ),
  //   accountNumber: parseInt(aminoSignResponse.signed.account_number, 10),
  //   chainId,
  // });
});
