// random number with 12 digits
export function randomId(): number {
  return Math.floor(Math.random() * (10 ** 12 - 10 ** 11) + 10 ** 11);
}
