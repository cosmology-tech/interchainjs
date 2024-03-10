import { Secp256k1Auth } from "@cosmonauts/auth/secp256k1";
import {
  defaultSignerConfig,
  defaultHdPath,
} from "@cosmonauts/injective/defaults";
import { seed } from "../data";
import { PrivateKey } from "@injectivelabs/sdk-ts";
import { Wallet } from "ethers";

const mnemonic = seed.genesis;
const myAuth = Secp256k1Auth.fromMnemonic(mnemonic, defaultHdPath.secp256k1);

const toAddress = defaultSignerConfig.publicKey.toAddress;
const isCompressed = defaultSignerConfig.publicKey.isCompressed;

describe("vs. Ethers", () => {
  it("should have identical key pair", () => {
    const hisAuth = Wallet.fromMnemonic(mnemonic, defaultHdPath.secp256k1);
    expect(`0x${myAuth.privateKey.toHex()}`).toEqual(hisAuth.privateKey);
    expect(`0x${myAuth.getPublicKey(isCompressed).toHex()}`).toEqual(
      hisAuth.publicKey
    );
  });
});

describe("vs. Injectivelabs", () => {
  const hisAuth = PrivateKey.fromMnemonic(mnemonic);

  it("should get identical key results", () => {
    expect(`0x${myAuth.privateKey.toHex()}`).toEqual(hisAuth.toPrivateKeyHex());
    expect(myAuth.getPublicKey(true).toHex()).toEqual(
      hisAuth.toPublicKey().toHex()
    );
  });

  it("should get identical address results", () => {
    const hisAddress = hisAuth.toAddress();
    const myPubKey = myAuth.getPublicKey(true);
    expect(`0x${toAddress(myPubKey).toHex()}`).toEqual(hisAddress.toHex());
    expect(toAddress(myPubKey).toBech32("inj")).toEqual(hisAddress.toBech32());
  });
});
