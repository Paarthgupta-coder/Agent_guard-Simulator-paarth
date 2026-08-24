"use client";

import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Activity, BarChart3 } from "lucide-react";
import ScoreDonut from "@/components/ScoreDonut";
import TrendStat from "@/components/TrendStat";
import { SectionHeader, EmptyState, Card } from "@/components/ui/Card";
import { ScoreCardSkeleton } from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { useRunsList } from "@/hooks/useRunSocket";

export default function DashboardOverview() {
  const runs = useRunsList();
  const loading = runs === undefined;
  const latest = runs?.[0];
  const scores = latest?.scoresAfter ?? latest?.scoresBefore;
  const allResults = latest ? [...latest.results, ...latest.rerunResults] : [];
  const flaggedCount = allResults.filter((r) => !r.passed).length;

  const reliabilityTrend =
    latest?.scoresBefore && latest?.scoresAfter ? latest.scoresAfter.reliability - latest.scoresBefore.reliability : undefined;
  const safetyTrend = latest?.scoresBefore && latest?.scoresAfter ? latest.scoresAfter.safety - latest.scoresBefore.safety : undefined;

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Live Monitoring" title="AI Decision Analytics" subtitle="Real-time reliability, safety, and cost scoring for your agent under test." />

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
        </div>
      )}

      {!loading && !latest && (
        <EmptyState
          icon={BarChart3}
          message="No runs yet. Start a simulation to see live scores here."
          action={
            <Link href="/dashboard/agents" className={buttonClasses("primary", "md", "gap-2")}>
              Run Demo <ArrowRight size={16} />
            </Link>
          }
        />
      )}

      {latest && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TrendStat icon={Brain} label="Reliability" value={`${scores?.reliability ?? 0}%`} sublabel={`${allResults.length} decisions evaluated`} trend={reliabilityTrend} color="#8b7cf6" />
            <TrendStat icon={ShieldCheck} label="Safety" value={`${scores?.safety ?? 0}%`} sublabel="PII + jailbreak defense" trend={safetyTrend} color="#34e0a1" />
            <TrendStat icon={Activity} label="Runs Completed" value={String(allResults.length)} sublabel="last session · active monitoring" color="#f5a623" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted mb-3">Decision Overview</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <ScoreDonut label="Reliability" value={scores?.reliability ?? 0} color="#8b7cf6" sublabel="policy adherence" />
              <ScoreDonut label="Consistency" value={scores?.consistency ?? 0} color="#f5a623" sublabel="repeat-answer stability" />
              <Card className="flex flex-col items-center justify-center gap-2">
                <span className="text-3xl font-semibold text-foreground">₹{scores?.costPerRunInr ?? 0}</span>
                <span className="text-sm text-foreground">Cost / run</span>
                <span className="text-xs text-muted">avg token spend</span>
              </Card>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-sm font-medium text-foreground">Decision Monitoring</h3>
                <p className="text-xs text-muted mt-0.5">Live run tracking with test-trace verification</p>
              </div>
              <Badge tone={flaggedCount ? "rose" : "mint"}>{flaggedCount} flagged</Badge>
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
          </Card>
        </>
      )}
    </div>
  );
}
