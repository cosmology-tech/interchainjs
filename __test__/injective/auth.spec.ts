import { chain } from "../data";
import { PrivateKey, getEthereumAddress } from "@injectivelabs/sdk-ts";
import { auth, isPubKeyCompressed, mnemonic, hashPubKey } from "./constants";

describe("vs. Injectivelabs", () => {
  const hisAuth = PrivateKey.fromMnemonic(mnemonic);

  it("should get identical key results", () => {
    expect(auth.privateKey.toPrefixedHex()).toEqual(hisAuth.toPrivateKeyHex());
    expect(auth.getPublicKey(isPubKeyCompressed).toHex()).toEqual(
      hisAuth.toPublicKey().toHex()
    );
  });

  it("should get identical address results", () => {
    const hisAddress = hisAuth.toAddress();
    const myPubKey = auth.getPublicKey(isPubKeyCompressed);
    expect(hashPubKey(myPubKey).toPrefixedHex()).toEqual(hisAddress.toHex());
    expect(hashPubKey(myPubKey).toBech32(chain.injective.prefix)).toEqual(
      hisAddress.toBech32()
    );
  });

  it("should pass test", () => {
    const myHashedPubKey = hashPubKey(auth.getPublicKey(isPubKeyCompressed));
    const bech32Addr = myHashedPubKey.toBech32("inj");
    expect(myHashedPubKey.toPrefixedHex()).toEqual(
      getEthereumAddress(bech32Addr)
    );
  });
});
