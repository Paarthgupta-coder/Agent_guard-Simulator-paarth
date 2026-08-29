"use client";

import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Activity, BarChart3, ChevronRight, FileText } from "lucide-react";
import ScoreDonut from "@/components/ScoreDonut";
import TrendStat from "@/components/TrendStat";
import { EmptyState } from "@/components/ui/Card";
import { ScoreCardSkeleton } from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";
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
    <div className="space-y-10 relative">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-2">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="text-xs font-mono text-white/70 uppercase tracking-widest">Live Monitoring</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Real-time <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-violet">Agent Telemetry</span>
          </h1>
          <p className="text-white/50 text-sm max-w-xl leading-relaxed">
            Monitor your autonomous agent's decision quality, safety guardrails, and token consumption via live pipeline verification.
          </p>
        </div>
        
        {latest && (
          <Link 
            href="/dashboard/report" 
            target="_blank"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-white/90 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <FileText size={16} /> Generate SOC2 Report
          </Link>
        )}
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
        </div>
      )}

      {!loading && !latest && (
        <EmptyState
          icon={BarChart3}
          message="No telemetry data available. Initialize a simulation to stream live decisions."
          action={
            <Link href="/dashboard/agents" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-mint text-black font-semibold hover:bg-mint-dim transition-all shadow-[0_0_20px_rgba(74,222,128,0.2)]">
              Initialize Run <ArrowRight size={16} />
            </Link>
          }
        />
      )}

      {latest && (
        <div className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TrendStat icon={Brain} label="Reliability Score" value={`${scores?.reliability ?? 0}%`} sublabel={`${allResults.length} decisions evaluated`} trend={reliabilityTrend} color="#8b7cf6" />
            <TrendStat icon={ShieldCheck} label="Safety Rating" value={`${scores?.safety ?? 0}%`} sublabel="PII + jailbreak defense" trend={safetyTrend} color="#34e0a1" />
            <TrendStat icon={Activity} label="Processed Vectors" value={String(allResults.length)} sublabel="last session · active monitoring" color="#f5a623" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Decision Overview</h3>
              <Link href="/dashboard/runs" className="text-xs text-mint hover:text-white transition-colors flex items-center gap-1">
                View logs <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden group hover:border-violet/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 blur-[50px] group-hover:bg-violet/20 transition-colors" />
                <ScoreDonut label="Reliability" value={scores?.reliability ?? 0} color="#8b7cf6" sublabel="policy adherence" icon={Brain} trend={reliabilityTrend} />
              </div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden group hover:border-amber/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber/10 blur-[50px] group-hover:bg-amber/20 transition-colors" />
                <ScoreDonut label="Consistency" value={scores?.consistency ?? 0} color="#f5a623" sublabel="repeat-answer stability" icon={Activity} />
              </div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-8 shadow-2xl flex flex-col justify-center relative overflow-hidden group hover:border-mint/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 blur-[50px] group-hover:bg-mint/20 transition-colors" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint">
                    <BarChart3 size={20} />
                  </div>
                  <Badge tone="mint">Optimized</Badge>
                </div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white tracking-tight mb-1">₹{scores?.costPerRunInr ?? 0}</div>
                  <div className="text-sm font-medium text-white/80">Avg. Cost / Execution</div>
                  <div className="text-xs text-white/40 mt-1">Based on token consumption rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Threat Intelligence</h3>
                <Badge tone="rose">Active Vectors</Badge>
              </div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose/5 blur-[100px] pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  {['JAILBREAK_SUCCESS', 'PII_LEAK', 'POLICY_CONTRADICTION', 'HALLUCINATED_POLICY'].map((cat, i) => {
                    const total = allResults.filter(r => r.persona.category === cat).length;
                    const failed = allResults.filter(r => r.persona.category === cat && !r.passed).length;
                    const rate = total > 0 ? (failed / total) * 100 : 0;
                    
                    return (
                      <div key={cat} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-white/80 font-medium">{cat.replace(/_/g, ' ')}</span>
                          <span className="text-white/40 font-mono">{failed} / {total} compromised</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ 
                              width: `${Math.max(rate, 2)}%`,
                              background: rate > 50 ? '#f43f5e' : rate > 0 ? '#fbbf24' : '#4ade80'
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 w-1/3 animate-[streak_2s_linear_infinite]" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">System Integrity</h3>
                <Badge tone="mint">Online</Badge>
              </div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl flex flex-col justify-center h-[264px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-mint/10 blur-[50px] pointer-events-none" />
                
                <div className="flex flex-col items-center justify-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full border border-mint/20 flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-mint/40 border-t-mint animate-spin" style={{ animationDuration: '3s' }} />
                    <ShieldCheck size={32} className="text-mint" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Protection Active</div>
                  <div className="text-sm text-white/50">Continuous monitoring engaged. All traffic is being routed through verification layer.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mint via-violet to-amber" />
            
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Live Pipeline Status</h3>
                <p className="text-sm text-white/50 mt-1">Real-time simulation tracking with cryptographic verification</p>
              </div>
              <Badge tone={flaggedCount ? "rose" : "mint"} className="text-sm px-3 py-1">
                {flaggedCount} anomalies detected
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">Session ID</div>
                <div className="font-mono text-sm text-white/90 truncate">{latest.id}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">Pipeline State</div>
                <div className="text-sm text-white/90 capitalize flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${latest.status === 'done' ? 'bg-mint' : 'bg-amber animate-pulse'}`} />
                  {latest.status.replace("_", " ")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">Coverage</div>
                <div className="text-sm text-white/90 font-medium">
                  {latest.results.length} / {latest.totalPersonas} vectors
                </div>
              </div>
              {latest.rootCause && (
                <div className="space-y-1">
                  <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">Critical Vulnerability</div>
                  <div className="text-sm text-rose/90 line-clamp-1" title={latest.rootCause.summary}>{latest.rootCause.summary}</div>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link href="/dashboard/runs" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors gap-2 text-sm">
                Open Full Decision Ledger <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
