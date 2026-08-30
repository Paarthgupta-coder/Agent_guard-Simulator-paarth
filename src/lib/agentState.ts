import { AGENT_SYSTEM_PROMPT_V1 } from "./agent";
import { getDb, isDbConfigured } from "./db";
import { AgentStateModel } from "./models/AgentState";
import { emitAgentStateChanged } from "./socket";

export interface PatchHistoryEntry {
  version: number;
  reason: string;
  at: number;
}

export interface AgentState {
  prompt: string;
  version: number;
  history: PatchHistoryEntry[];
}

const SINGLETON_ID = "agent-under-test";

function defaultState(): AgentState {
  return {
    prompt: AGENT_SYSTEM_PROMPT_V1,
    version: 1,
    history: [{ version: 1, reason: "Initial baseline — no hardening applied yet.", at: Date.now() }],
  };
}

declare global {
  // eslint-disable-next-line no-var
  var __agentguardAgentState: AgentState | undefined;
}
let memory: AgentState = global.__agentguardAgentState ?? defaultState();
global.__agentguardAgentState = memory;

/**
 * The whole point of this module: the agent's system prompt is no longer
 * rebuilt from scratch on every run. Whatever the Learning Loop (Module 06)
 * patched last time is what the NEXT run starts from — so running the demo
 * twice genuinely shows the agent starting with fewer failures the second
 * time, not just repeating the same fix.
 */
export async function getAgentState(): Promise<AgentState> {
  if (isDbConfigured) {
    await getDb();
    const doc = await AgentStateModel.findById(SINGLETON_ID).lean<AgentState & { _id: string }>();
    if (!doc) {
      const initial = defaultState();
      await AgentStateModel.create({ _id: SINGLETON_ID, ...initial });
      return initial;
    }
    return { prompt: doc.prompt, version: doc.version, history: doc.history };
  }
  return memory;
}

export async function commitAgentPatch(newPrompt: string, reason: string): Promise<AgentState> {
  const current = await getAgentState();
  const next: AgentState = {
    prompt: newPrompt,
    version: current.version + 1,
    history: [...current.history, { version: current.version + 1, reason, at: Date.now() }],
  };
  if (isDbConfigured) {
    await getDb();
    await AgentStateModel.findByIdAndUpdate(SINGLETON_ID, { $set: next }, { upsert: true });
  } else {
    memory = next;
    global.__agentguardAgentState = memory;
  }
  emitAgentStateChanged();
  return next;
}

export async function resetAgentState(): Promise<AgentState> {
  const initial = defaultState();
  if (isDbConfigured) {
    await getDb();
    await AgentStateModel.findByIdAndUpdate(SINGLETON_ID, { $set: initial }, { upsert: true });
  } else {
    memory = initial;
    global.__agentguardAgentState = memory;
  }
  emitAgentStateChanged();
  return initial;
}
