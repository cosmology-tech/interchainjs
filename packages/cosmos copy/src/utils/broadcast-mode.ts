import { BroadcastMode } from "../interchain/types";

export function broadcastModeToString(mode: BroadcastMode): string {
  switch (mode) {
    case BroadcastMode.BROADCAST_MODE_ASYNC:
    case BroadcastMode.BROADCAST_MODE_BLOCK:
    case BroadcastMode.BROADCAST_MODE_SYNC:
    case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
    default:
      throw new Error(`Unkown BroadcastMode: ${mode}`);
  }
}
