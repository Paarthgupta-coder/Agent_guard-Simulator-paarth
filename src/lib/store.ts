import { LogLine, RunState } from "./types";
import { getDb, isDbConfigured } from "./db";
import { RunModel } from "./models/Run";
import { emitRunProgress, emitRunsChanged } from "./socket";

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
  var __agentguardRuns: Map<string, RunState> | undefined;
}
const memory: Map<string, RunState> = global.__agentguardRuns ?? new Map();
global.__agentguardRuns = memory;

/** Shape of a run document as it comes back from Mongoose's `.lean()` — `_id` instead of `id`, everything else optional until read. */
interface RunDoc {
  _id: string;
  status: RunState["status"];
  createdAt: number;
  log?: LogLine[];
  results?: RunState["results"];
  rerunResults?: RunState["rerunResults"];
  rootCause?: RunState["rootCause"];
  patchApplied?: string;
  scoresBefore?: RunState["scoresBefore"];
  scoresAfter?: RunState["scoresAfter"];
  totalPersonas: number;
  agentVersionBefore?: number;
  agentVersionAfter?: number;
}

function toRunState(doc: RunDoc): RunState {
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
    agentVersionBefore: doc.agentVersionBefore,
    agentVersionAfter: doc.agentVersionAfter,
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
  } else {
    memory.set(id, run);
  }
  emitRunsChanged();
  emitRunProgress(id, run);
  return run;
}

export async function getRun(id: string): Promise<RunState | undefined> {
  if (isDbConfigured) {
    await getDb();
    const doc = await RunModel.findById(id).lean<RunDoc>();
    return doc ? toRunState(doc) : undefined;
  }
  return memory.get(id);
}

export async function listRuns(limit = 20): Promise<RunState[]> {
  if (isDbConfigured) {
    await getDb();
    const docs = await RunModel.find().sort({ createdAt: -1 }).limit(limit).lean<RunDoc[]>();
    return docs.map(toRunState);
  }
  return [...memory.values()].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
}

export async function updateRun(id: string, patch: Partial<RunState>): Promise<void> {
  if (isDbConfigured) {
    await getDb();
    await RunModel.findByIdAndUpdate(id, { $set: patch });
  } else {
    const run = memory.get(id);
    if (run) Object.assign(run, patch);
  }
  const updated = await getRun(id);
  if (updated) {
    emitRunProgress(id, updated);
    if (patch.status === "done") emitRunsChanged();
  }
}

export async function appendLog(id: string, text: string, level: LogLine["level"] = "info"): Promise<void> {
  const entry: LogLine = { t: Date.now(), text, level };
  if (isDbConfigured) {
    await getDb();
    await RunModel.findByIdAndUpdate(id, { $push: { log: entry } });
  } else {
    const run = memory.get(id);
    if (run) run.log.push(entry);
  }
  const updated = await getRun(id);
  if (updated) emitRunProgress(id, updated);
}

export async function storeMode(): Promise<"mongodb" | "memory"> {
  return isDbConfigured ? "mongodb" : "memory";
}
