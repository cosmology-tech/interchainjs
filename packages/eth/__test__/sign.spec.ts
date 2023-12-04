/* eslint-disable @typescript-eslint/no-unused-vars */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/**
 * if met certificate error, run `export NODE_TLS_REJECT_UNAUTHORIZED=0` in terminal
 */

import { Common } from "@ethereumjs/common";
import {
  AccessListEIP2930Transaction,
  BlobEIP4844Transaction,
  FeeMarketEIP1559Transaction,
  LegacyTransaction,
} from "@ethereumjs/tx";
import { fromHex, fromUtf8, Secp256k1Auth, toHex } from "@cosmonauts/core";
import EthCrypto from "eth-crypto";

import { Signer } from "../src";

const signer = new Signer();

const identity = EthCrypto.createIdentity();
const privateKey = fromHex(identity.privateKey.slice(2));
const auth = Secp256k1Auth.fromPrivKey(privateKey);
const rawTx = {
  from: identity.address,
  to: "0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
  value: 1000000000000000000n,
  gasPrice: 5000000000,
  nonce: 0,
  gasLimit: 21000,
};

describe("Sign", () => {
  test("signArbitrary", async () => {
    const msg = "foobar";
    const msgHash = EthCrypto.hash.keccak256(msg);
    const baseline = EthCrypto.sign(toHex(privateKey), msgHash);

    const signature = signer.by(auth).signArbitrary(fromUtf8(msg)).signed;
    const target = `0x${toHex(signature)}`;

    expect(target).toEqual(baseline);
  });

  test("signLegacy", async () => {
    const tx = LegacyTransaction.fromTxData(rawTx);
    const baseline = tx.sign(privateKey).serialize();

    const signed = signer.by(auth).signLegacy(rawTx).signed;
    const target = toHex(signed.serialize());

    expect(target).toEqual(toHex(baseline));
  });

  test("signFeeMarketEIP1559", async () => {
    const { gasPrice, ..._rawTx } = rawTx;
    const tx = FeeMarketEIP1559Transaction.fromTxData(_rawTx);
    const baseline = tx.sign(privateKey).serialize();

    const signed = signer.by(auth).signFeeMarketEIP1559(_rawTx).signed;
    const target = toHex(signed.serialize());

    expect(target).toEqual(toHex(baseline));
  });

  test("signAccessListEIP2930", async () => {
    const tx = AccessListEIP2930Transaction.fromTxData(rawTx);
    const baseline = tx.sign(privateKey).serialize();

    const signed = signer.by(auth).signAccessListEIP2930(rawTx).signed;
    const target = toHex(signed.serialize());

    expect(target).toEqual(toHex(baseline));
  });

  test("signBlobEIP4844", async () => {
    const { gasPrice, ..._rawTx } = rawTx;
    const common = new Common({ eips: [4844], chain: 1 });
    const tx = BlobEIP4844Transaction.fromTxData(_rawTx, {
      common,
    });
    const baseline = tx.sign(privateKey).serialize();

    const signed = signer.by(auth).signBlobEIP4844(_rawTx, {
      common,
    }).signed;
    const target = toHex(signed.serialize());

    expect(target).toEqual(toHex(baseline));
  });
});
