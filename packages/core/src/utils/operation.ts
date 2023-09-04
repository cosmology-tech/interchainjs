function getMultiplier(n: number): number {
  return (n.toString().match(/\.\d*/)?.[0].length || 1) - 1;
}

function divide10s(n: bigint, i: number): bigint {
  const nStr = n.toString();
  const r = BigInt(nStr.slice(0, nStr.length - i));
  return Number.parseInt(nStr.at(-i) || "0") < 5 ? r : r + 1n;
}

export function multiply(a: bigint | number, b: bigint | number): bigint {
  if (typeof a === "bigint" && typeof b === "bigint") {
    return a * b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return BigInt((a * b).toFixed());
  }
  if (typeof a === "bigint" && typeof b === "number") {
    const m = getMultiplier(b);
    return divide10s(a * BigInt(b * 10 ** m), m);
  }
  if (typeof a === "number" && typeof b === "bigint") {
    const m = getMultiplier(a);
    return divide10s(BigInt(a * 10 ** m) * b, m);
  }
  throw new Error("Wrong argument type.");
}
