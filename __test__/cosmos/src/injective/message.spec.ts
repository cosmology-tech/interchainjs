import { Secp256k1Auth, authConfig } from "@cosmonauts/core";
import { seed } from "../setup/data";
import { PrivateKey } from "@injectivelabs/sdk-ts";
import { Wallet } from "ethers";

const mnemonic = seed.genesis;
const myAuth = Secp256k1Auth.fromMnemonic(mnemonic, authConfig["injective"]);

describe("Ethers", () => {
  it("should have identical key pair", () => {
    const hisAuth = Wallet.fromMnemonic(
      mnemonic,
      authConfig["injective"].hdPath
    );
    expect(myAuth.privateKey.toHex()).toEqual(hisAuth.privateKey);
    expect(myAuth.publicKey.toHex()).toEqual(hisAuth.publicKey);
  });
});

describe("Injective", () => {
  const hisAuth = PrivateKey.fromMnemonic(mnemonic);

  it("should get identical key results", () => {
    expect(myAuth.privateKey.toHex()).toEqual(hisAuth.toPrivateKeyHex());
    expect(myAuth.publicKeyCompressed.toHex()).toEqual(
      `0x${hisAuth.toPublicKey().toHex()}`
    );
  });

  it("should get identical address results", () => {
    const hisAddress = hisAuth.toAddress();
    expect(myAuth.address.toHex()).toEqual(hisAddress.toHex());
    expect(myAuth.address.toBech32("inj")).toEqual(hisAddress.toBech32());
  });
});
