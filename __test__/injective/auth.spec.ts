import { chain } from "../data";
import { PrivateKey } from "@injectivelabs/sdk-ts";
import { Wallet } from "ethers";
import { auth, isCompressed, mnemonic, toAddress } from "./constants";

describe("vs. Ethers", () => {
  it("should have identical key pair", () => {
    const hisAuth = Wallet.fromMnemonic(mnemonic);
    expect(`0x${auth.privateKey.toHex()}`).toEqual(hisAuth.privateKey);
    expect(`0x${auth.getPublicKey(isCompressed).toHex()}`).toEqual(
      hisAuth.publicKey
    );
  });
});

describe("vs. Injectivelabs", () => {
  const hisAuth = PrivateKey.fromMnemonic(mnemonic);

  it("should get identical key results", () => {
    expect(`0x${auth.privateKey.toHex()}`).toEqual(hisAuth.toPrivateKeyHex());
    expect(auth.getPublicKey(true).toHex()).toEqual(
      hisAuth.toPublicKey().toHex()
    );
  });

  it("should get identical address results", () => {
    const hisAddress = hisAuth.toAddress();
    const myPubKey = auth.getPublicKey(true);
    expect(`0x${toAddress(myPubKey).toHex()}`).toEqual(hisAddress.toHex());
    expect(toAddress(myPubKey).toBech32(chain.injective.prefix)).toEqual(
      hisAddress.toBech32()
    );
  });
});
