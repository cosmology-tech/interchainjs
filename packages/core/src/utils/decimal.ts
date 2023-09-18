export class Decimal {
  ground: bigint;
  level: number;

  /**
   * @param ground is the int value without the decimal point
   * @param level is the number of decimal digits
   */
  constructor(ground: bigint, level: number = 0) {
    if (level < 0) {
      throw new Error("Level of Decimal cannot be less than zero.");
    }
    this.ground = ground;
    this.level = level;
  }

  static fromBigInt(n: bigint) {
    return new Decimal(n);
  }

  static fromNumber(n: number) {
    const level = (n.toString().match(/\.\d*/)?.[0].length || 1) - 1;
    const ground = BigInt(n * 10 ** level);
    return new Decimal(ground, level);
  }

  static fromString(n: string) {
    const matchResult = n.match(/(\d+)\.?(\d*)/);
    if (!matchResult) {
      throw new Error("Invalid decimal string");
    }
    const [_, intpart, decpart] = matchResult;
    return new Decimal(BigInt(`${intpart}${decpart}`), decpart.length);
  }

  round(): bigint {
    const gStr = this.ground.toString();
    return Number.parseInt(gStr.at(-this.level) || "0") < 5
      ? this.floor()
      : this.ceil();
  }

  floor(): bigint {
    const gStr = this.ground.toString();
    const r = BigInt(gStr.slice(0, gStr.length - this.level));
    return r;
  }

  ceil(): bigint {
    return this.floor() + 1n;
  }

  multiply(n: bigint | number | Decimal): Decimal {
    const dec: Decimal =
      typeof n === "bigint"
        ? Decimal.fromBigInt(n)
        : typeof n === "number"
        ? Decimal.fromNumber(n)
        : n;
    return new Decimal(this.ground * dec.ground, this.level + dec.level);
  }

  toString() {
    let gStr = this.ground.toString();
    const uidx = gStr.length - this.level; // the unit digit index
    if (uidx <= 0) {
      gStr = gStr.padStart(this.level, "0");
      return `0.${gStr}`;
    }
    return `${gStr.slice(0, uidx)}.${gStr.slice(uidx)}`;
  }
}
