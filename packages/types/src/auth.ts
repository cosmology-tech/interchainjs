import { SignDocResponse } from './wallet';

export type Algo = 'secp256k1' | 'eth_secp256k1';

export interface IKey {
  value: Uint8Array;
  toHex(): string;
  toPrefixedHex(): string;
  toBase64(): string;
  toBigInt(): bigint;
  toNumber(): number;
  toBech32(prefix: string, limit?: number): string;
  slice(start?: number, end?: number): IKey;
  concat(key: IKey): IKey;
}

/**
 * Auth is an interface that represents the authentication method of an account.
 */
export interface Auth {
  /**
   * The algorithm of the authentication method.
   */
  readonly algo?: string;
  /**
   * The HD path of the authentication method.
   */
  readonly hdPath?: string;

  /**
   * Get the public key of the authentication method.
   * @param isCompressed Whether the public key should be compressed.
   * @returns The public key.
   */
  getPublicKey: (isCompressed?: boolean) => IKey;
}

/**
 * ByteAuth is an interface that represents the authentication method of an account that can sign bytes.
 * Use some specific algorithm like secp256k1, eth_secp256k1 to implement this interface.
 * This interface is usually used by signAbitrary method.
 * @template Sig The type of the signature.
 */
export interface ByteAuth<Sig> extends Auth {
  /**
   * Sign the data in bytes.
   * @param data The data in bytes to sign.
   * @returns The signature.
   */
  sign: (data: Uint8Array) => ISignatureWraper<Sig>;
}

/**
 * Check if the authentication object is a ByteAuth.
 * @param auth The object to check
 * @returns Whether the object is a ByteAuth.
 */
export function isByteAuth<Sig>(auth: Auth): auth is ByteAuth<Sig> {
  return 'sign' in auth;
}

/**
 * DocAuth is an interface that represents the authentication method of an account that can sign a document using OfflineSigners.
 * DocAuth is actually a wrapper for offline signers.
 * DocAuth is usually used by signers built from offline signers.
 * @template TDoc The type of the doc.
 * @template TArgs The type of the args.
 * @template TAddr The type of the address.
 */
export interface DocAuth<TDoc, TArgs = unknown, TAddr = string, TSig = IKey, TResp = SignDocResponse<TDoc, TSig>> extends Auth {
  address: TAddr;
  signDoc(doc: TDoc, args?: TArgs): TResp | Promise<TResp>;
}

/**
 * Check if the authentication object is a DocAuth.
 * @param auth The object to check
 * @returns Whether the object is a DocAuth.
 */
export function isDocAuth<TDoc, TArgs = unknown, TAddr = string>(auth: Auth): auth is DocAuth<TDoc, TArgs, TAddr> {
  return 'signDoc' in auth;
}

/**
 * AuthOptions is an interface that represents the options for creating an authentication method.
 */
export interface AuthOptions {
  /**
   * The password for the BIP39 mnemonic.
   */
  bip39Password?: string;
}

/**
 * Base class for Doc Auth.
 */
export abstract class BaseDocAuth<TSigner, TDoc, TArgs = unknown, TAddr = string, TSig = IKey, TResp = SignDocResponse<TDoc, TSig>> implements DocAuth<TDoc, TArgs, TAddr, TSig, TResp> {
  constructor(
    public readonly offlineSigner: TSigner,
    public readonly address: TAddr,
    public readonly algo?: string,
    public readonly pubkey?: Uint8Array,
  ) {
  }

  abstract getPublicKey(): IKey;
  abstract signDoc(doc: TDoc, args?: TArgs): Promise<TResp>;
}

/**
 * ISignatureWraper is an interface that wraps the signature and provides methods to convert the signature to different formats.
 */
export interface ISignatureWraper<Sig> {
  signature: Sig;
  toCompact(): IKey;
}

/**
 * IAccount is an interface that represents an account based on an authentication object.
 */
export interface IAccount<TAddr = string> {
  /**
   * The public key of the account.
   */
  publicKey: IKey;
  /**
   * The address of the account.
   */
  address: TAddr;
  /**
   * auth is the authentication method of the account.
   */
  auth: Auth;
  /**
   * toAccountData converts the account to an AccountData object.
   */
  toAccountData(): AccountData;
}

/**
 * AccountData is an interface that represents the public data of an account.
 */
export interface AccountData {
  address: string;
  algo?: Algo;
  pubkey?: Uint8Array;
}