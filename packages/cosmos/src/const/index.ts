import { accountParsers } from "./account";
import { msgParsers } from "./msg";
import { msgPoolParsers } from "./msg.pool";
import { pubKeyParsers } from "./pubkey";
import { txParsers } from "./tx";

export * from "./account";
export * from "./msg";
export * from "./msg.pool";
export * from "./pubkey";
export * from "./tx";

// -------------------- COLLECTIONS -----------------------

export const parsers = {
  ...accountParsers,
  ...pubKeyParsers,
  ...msgParsers,
  ...msgPoolParsers,
  ...txParsers,
};
