import { LogLine, RunState } from "./types";
import { getDb, isDbConfigured } from "./db";
import { RunModel } from "./models/Run";

/**
 * Dual-mode run store:
 *  - MONGODB_URI set  -> real persistence via Mongoose (survives restarts,
 *    shareable across serverless instances, safe for judges to poke at)
 *  - MONGODB_URI unset -> in-memory Map (zero-setup local dev / demo)
 *
 * Every function is async and every call site awaits it, so swapping modes
 * never requires touching the API routes or the simulation pipeline.
 */

declare global {
  // eslint-disable-next-line no-var
  var __agentguardRuns: Map<string, RunState> | undefined;
}
const memory: Map<string, RunState> = global.__agentguardRuns ?? new Map();
global.__agentguardRuns = memory;

function toRunState(doc: any): RunState {
  return {
    id: doc._id,
    status: doc.status,
    createdAt: doc.createdAt,
    log: doc.log ?? [],
    results: doc.results ?? [],
    rerunResults: doc.rerunResults ?? [],
    rootCause: doc.rootCause ?? undefined,
    patchApplied: doc.patchApplied ?? undefined,
    scoresBefore: doc.scoresBefore ?? undefined,
    scoresAfter: doc.scoresAfter ?? undefined,
    totalPersonas: doc.totalPersonas,
  };
}

export async function createRun(id: string, totalPersonas: number): Promise<RunState> {
  const run: RunState = {
    id,
    status: "queued",
    createdAt: Date.now(),
    log: [],
    results: [],
    rerunResults: [],
    totalPersonas,
  };

  if (isDbConfigured) {
    await getDb();
    await RunModel.create({ _id: id, ...run });
    return run;
  }
  memory.set(id, run);
  return run;
}

export async function getRun(id: string): Promise<RunState | undefined> {
  if (isDbConfigured) {
    await getDb();
    const doc = await RunModel.findById(id).lean();
    return doc ? toRunState(doc) : undefined;
  }
  return memory.get(id);
}

export async function listRuns(limit = 20): Promise<RunState[]> {
  if (isDbConfigured) {
    await getDb();
    const docs = await RunModel.find().sort({ createdAt: -1 }).limit(limit).lean();
    return docs.map(toRunState);
  }
  return [...memory.values()].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
}

export async function updateRun(id: string, patch: Partial<RunState>): Promise<void> {
  if (isDbConfigured) {
    await getDb();
    await RunModel.findByIdAndUpdate(id, { $set: patch });
    return;
  }
  const run = memory.get(id);
  if (run) Object.assign(run, patch);
}

export async function appendLog(id: string, text: string, level: LogLine["level"] = "info"): Promise<void> {
  const entry: LogLine = { t: Date.now(), text, level };
  if (isDbConfigured) {
    await getDb();
    await RunModel.findByIdAndUpdate(id, { $push: { log: entry } });
    return;
  }
  const run = memory.get(id);
  if (run) run.log.push(entry);
}

export async function storeMode(): Promise<"mongodb" | "memory"> {
  return isDbConfigured ? "mongodb" : "memory";
}
