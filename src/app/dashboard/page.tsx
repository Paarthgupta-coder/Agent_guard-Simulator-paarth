"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Activity } from "lucide-react";
import ScoreDonut from "@/components/ScoreDonut";
import TrendStat from "@/components/TrendStat";
import { RunState } from "@/lib/types";

export default function DashboardOverview() {
  const [runs, setRuns] = useState<RunState[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/runs");
      const data = await res.json();
      if (!cancelled) setRuns(data.runs ?? []);
    }
    load();
    const interval = setInterval(load, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const latest = runs[0];
  const scores = latest?.scoresAfter ?? latest?.scoresBefore;
  const allResults = latest ? [...latest.results, ...latest.rerunResults] : [];
  const flaggedCount = allResults.filter((r) => !r.passed).length;

  const reliabilityTrend =
    latest?.scoresBefore && latest?.scoresAfter ? latest.scoresAfter.reliability - latest.scoresBefore.reliability : undefined;
  const safetyTrend = latest?.scoresBefore && latest?.scoresAfter ? latest.scoresAfter.safety - latest.scoresBefore.safety : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">AI Decision Analytics</h1>
        <p className="text-muted mt-1">Real-time reliability, safety, and cost scoring for your agent under test.</p>
      </div>

      {!latest && (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-muted mb-4">No runs yet. Start a simulation to see live scores here.</p>
          <Link href="/dashboard/agents" className="inline-flex items-center gap-2 rounded-full bg-mint text-black font-medium px-5 py-2.5">
            Run Demo <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {latest && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TrendStat
              icon={Brain}
              label="Reliability"
              value={`${scores?.reliability ?? 0}%`}
              sublabel={`${allResults.length} decisions evaluated`}
              trend={reliabilityTrend}
              color="#8b7cf6"
            />
            <TrendStat
              icon={ShieldCheck}
              label="Safety"
              value={`${scores?.safety ?? 0}%`}
              sublabel="PII + jailbreak defense"
              trend={safetyTrend}
              color="#34e0a1"
            />
            <TrendStat
              icon={Activity}
              label="Runs Completed"
              value={String(allResults.length)}
              sublabel="last session · active monitoring"
              color="#f5a623"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted mb-3">Decision Overview</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <ScoreDonut label="Reliability" value={scores?.reliability ?? 0} color="#8b7cf6" sublabel="policy adherence" />
              <ScoreDonut label="Consistency" value={scores?.consistency ?? 0} color="#f5a623" sublabel="repeat-answer stability" />
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl font-semibold text-foreground">₹{scores?.costPerRunInr ?? 0}</span>
                <span className="text-sm text-foreground">Cost / run</span>
                <span className="text-xs text-muted">avg token spend</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-sm font-medium text-foreground">Decision Monitoring</h3>
                <p className="text-xs text-muted mt-0.5">Live run tracking with test-trace verification</p>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full border border-rose/40 text-rose">
                {flaggedCount} flagged
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="text-muted">Run ID</span>
                <div className="font-mono">{latest.id}</div>
              </div>
              <div>
                <span className="text-muted">Status</span>
                <div className="capitalize">{latest.status.replace("_", " ")}</div>
              </div>
              <div>
                <span className="text-muted">Personas tested</span>
                <div>
                  {latest.results.length}/{latest.totalPersonas}
                </div>
              </div>
              {latest.rootCause && (
                <div className="flex-1 min-w-[240px]">
                  <span className="text-muted">Root cause</span>
                  <div className="text-amber">{latest.rootCause.summary}</div>
                </div>
              )}
            </div>
            <Link href="/dashboard/runs" className="inline-flex items-center gap-1.5 text-mint text-sm mt-4">
              View full decision feed <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
