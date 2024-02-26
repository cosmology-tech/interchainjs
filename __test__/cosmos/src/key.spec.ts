import { Slip10, Slip10Curve, Slip10RawIndex } from "@cosmjs/crypto";
import { fromUtf8, getSeedFromMnemonic, toBase64 } from "@cosmonauts/core";
import { Secp256k1Auth } from "@cosmonauts/cosmos-proto";

import { seed } from "./setup/data";

const auth = Secp256k1Auth.fromMnemonic(seed.genesis);

const expected = Slip10.derivePath(
  Slip10Curve.Secp256k1,
  getSeedFromMnemonic(seed.genesis),
  [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(0),
  ]
);

describe("Test Key", () => {
  const privkey = toBase64(auth.privateKey);

  it("should match private key", () => {
    expect(privkey).toEqual(toBase64(expected.privkey));
  });
});

describe("Verify", () => {
  const msg = fromUtf8("foolala");
  const msg2 = fromUtf8("foolalaa");

  test("derive private key", () => {
    const signature = auth.signMessage(msg);
    expect(auth.verifyMessage(msg, signature)).toBe(true);
    expect(auth.verifyMessage(msg, auth.signMessage(msg2))).toBe(false);
  });
});
