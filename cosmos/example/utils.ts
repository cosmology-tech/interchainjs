import { toBase64 } from "@cosmonauts/core";

export function printJSON(json: object) {
  const str = JSON.stringify(
    json,
    (key: string, value: any) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      if (value instanceof Uint8Array) {
        return toBase64(value);
      }
      if (key === "events") {
        return [];
      }
      return value;
    },
    2
  );
  const unquotedKey = str.replace(/"([^"]+)":/g, "$1:");
  const result = unquotedKey.replaceAll('\\"', "'").replaceAll("\\", "");
  return result + "\n";
}
