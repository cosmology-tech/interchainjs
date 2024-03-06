import { Key } from "./key";

export class Signature {
  constructor(
    public readonly r: Key,
    public readonly s: Key,
    public readonly recovery?: number
  ) {}

  toCompact() {
    return this.r.concat(this.s);
  }
}
