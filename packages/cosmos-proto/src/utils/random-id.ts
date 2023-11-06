const numbersWithoutZero = "123456789";

/** generates a random numeric character  */
function randomNumericChar(): string {
  return numbersWithoutZero[
    Math.floor(Math.random() * numbersWithoutZero.length)
  ];
}

/**
 * An (absolutely not cryptographically secure) random integer > 0.
 */
export function randomId(): number {
  return parseInt(
    Array.from({ length: 12 })
      .map(() => randomNumericChar())
      .join(""),
    10
  );
}
