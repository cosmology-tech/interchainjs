/* eslint-disable @typescript-eslint/no-unused-vars */

export interface AbciQueryRequest {
  request: (
    service: string,
    method: string,
    data: Uint8Array
  ) => Promise<Uint8Array>;
}

export interface BroadcastRequest {
  request: (method: string, data: Uint8Array) => Promise<unknown>;
}

export type SearchTxQuery =
  | string
  | ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }>;
