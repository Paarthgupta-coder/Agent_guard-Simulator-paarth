"use client";

import { useEffect, useRef, useState } from "react";
import { PlayCircle, Loader2, Bug, ShieldAlert, Users, Cpu, Radio, RadioTower } from "lucide-react";
import PipelineFlow from "@/components/PipelineFlow";
import RunGrid from "@/components/RunGrid";
import LiveConsole from "@/components/LiveConsole";
import ScoreDonut from "@/components/ScoreDonut";
import ScenarioCard from "@/components/ScenarioCard";
import ToastAlert from "@/components/ToastAlert";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ATTACK_VECTOR_COUNT } from "@/lib/scenario";
import { useRunSocket } from "@/hooks/useRunSocket";

const SCENARIOS = [
  { icon: Users, title: "1,000 Angry Users", subtitle: "Full chaos + auto-improve run", badge: "Primary" },
  { icon: Bug, title: "Prompt Injection Sweep", subtitle: "Jailbreak + override attempts", badge: "Included" },
  { icon: ShieldAlert, title: "PII Exposure Probe", subtitle: "Unverified identity requests", badge: "Included" },
  { icon: Cpu, title: "Policy Consistency Check", subtitle: "Canary repeat-answer test", badge: "Included" },
];

export default function AgentsPage() {
  const [runId, setRunId] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const alertedRef = useRef(false);
  const { run, live } = useRunSocket(runId);

  async function startDemo() {
    setStarting(true);
    setShowAlert(false);
    alertedRef.current = false;
    const res = await fetch("/api/runs", { method: "POST" });
    const { id } = await res.json();
    setStarting(false);
    setRunId(id);
  }

  useEffect(() => {
    if (run?.rootCause && !alertedRef.current) {
      alertedRef.current = true;
      setShowAlert(true);
    }
  }, [run?.rootCause]);

  const isRunning = run && run.status !== "done";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Agent Demo Scenarios</h1>
          <p className="text-muted mt-1">{ATTACK_VECTOR_COUNT}+ adversarial attack vectors, run against your agent in one pass.</p>
        </div>
        <Badge tone={live ? "mint" : "muted"} icon={live ? RadioTower : Radio}>
          {live ? "Live · Socket.IO connected" : "Polling fallback"}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <div className="glass rounded-2xl p-5 flex flex-col gap-3 h-fit">
          <h3 className="text-sm font-medium text-muted mb-1">Select scenario</h3>
          {SCENARIOS.map((s, i) => (
            <ScenarioCard key={s.title} {...s} active={i === 0} />
          ))}
          <Button onClick={startDemo} disabled={starting || !!isRunning} className="mt-2">
            {starting || isRunning ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
            {isRunning ? "Running..." : "Run Demo"}
          </Button>
        </div>

        <LiveConsole log={run?.log ?? []} />
      </div>

      <PipelineFlow status={run?.status ?? "queued"} />

      <Badge tone="sky">Module 04 · Multi-Run Execution</Badge>
      <RunGrid results={run?.results ?? []} />

      {run?.rootCause && (
        <div className="glass rounded-2xl p-5 border-l-2 border-l-amber">
          <div className="text-xs text-amber tracking-widest mb-1">ROOT CAUSE</div>
          <p className="text-foreground">{run.rootCause.summary}</p>
          {run.patchApplied && <p className="text-sm text-muted mt-2">Auto-patch applied: {run.patchApplied}</p>}
        </div>
      )}

      {run?.scoresBefore && (
        <div>
          <h3 className="text-sm font-medium text-muted mb-3">{run.scoresAfter ? "Before → after auto-improve" : "Live scores"}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <ScoreCompare label="Reliability" color="#8b7cf6" before={run.scoresBefore.reliability} after={run.scoresAfter?.reliability} />
            <ScoreCompare label="Safety" color="#34e0a1" before={run.scoresBefore.safety} after={run.scoresAfter?.safety} />
            <ScoreCompare label="Consistency" color="#f5a623" before={run.scoresBefore.consistency} after={run.scoresAfter?.consistency} />
          </div>
        </div>
      )}

      {showAlert && run?.rootCause && (
        <ToastAlert
          title="Failure Cluster Detected"
          message={run.rootCause.summary}
          actionLabel="Auto-patch in progress"
          onAction={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

function ScoreCompare({ label, color, before, after }: { label: string; color: string; before: number; after?: number }) {
  if (after === undefined || after === before) {
    return <ScoreDonut label={label} value={before} color={color} />;
  }
  return (
    <div className="glass rounded-2xl p-6 flex items-center justify-center gap-4">
      <div className="text-center">
        <div className="text-2xl font-semibold text-muted">{before}%</div>
        <div className="text-xs text-muted mt-1">before</div>
      </div>
      <div className="text-mint text-xl">→</div>
      <div className="text-center">
        <div className="text-2xl font-semibold" style={{ color }}>
          {after}%
        </div>
        <div className="text-xs text-muted mt-1">{label}</div>
      </div>
    </div>
  );
}
