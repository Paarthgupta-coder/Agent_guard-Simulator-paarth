import type { Server } from "socket.io";
import { RunState } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __io: Server | undefined;
}

/** Returns the live Socket.IO server, or undefined if none is attached (e.g. on Vercel). */
export function getIO(): Server | undefined {
  return global.__io;
}

/** Push the latest state of one run to everyone subscribed to it. */
export function emitRunProgress(runId: string, run: RunState) {
  getIO()?.to(`run:${runId}`).emit("run:progress", run);
}

/** Tell every connected client "the run list changed, go refetch". */
export function emitRunsChanged() {
  getIO()?.emit("runs:changed");
}
