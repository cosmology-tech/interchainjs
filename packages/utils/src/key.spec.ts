import { Key } from "./key";

describe("class `Key`", () => {
  it("test bigint", () => {
    expect(Key.fromBigInt(12345n).toBigInt()).toEqual(12345n);
  });

  it("test hex", () => {
    expect(Key.fromHex("639eab45").toHex()).toEqual("639eab45");
  });

  it("test base64", () => {
    expect(Key.fromBase64("639eab4=").toBase64()).toEqual("639eab4=");
  });
});
