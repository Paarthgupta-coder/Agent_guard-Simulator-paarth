"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle, XCircle, CheckCircle2, Info, BellOff } from "lucide-react";
import { LogLine } from "@/lib/types";
import { SectionHeader, EmptyState, Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonClasses } from "@/components/ui/Button";
import { useRunsList } from "@/hooks/useRunSocket";

const ICON: Record<LogLine["level"], typeof Info> = {
  info: Info,
  warn: AlertTriangle,
  error: XCircle,
  success: CheckCircle2,
};
const COLOR: Record<LogLine["level"], string> = {
  info: "text-foreground/70",
  warn: "text-amber",
  error: "text-rose",
  success: "text-mint",
};

export default function NotificationsPage() {
  const runs = useRunsList();
  const loading = runs === undefined;
  const latest = runs?.[0];
  const notifications = latest ? [...latest.log].filter((l) => l.level !== "info").reverse() : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 relative z-10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-2">
          <span className="text-xs font-mono text-white/70 uppercase tracking-widest">System Alerts</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
          Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-amber">Notifications</span>
        </h1>
        <p className="text-white/50 text-sm max-w-xl leading-relaxed">
          Real-time failures, zero-day patches, and systemic recoveries surfaced exactly as they happen.
        </p>
      </div>

      {loading && (
        <Card className="divide-y divide-border p-0">
          {[0, 1, 2].map((i) => (
            <div key={i} className="p-4 flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </Card>
      )}

      {!loading && !latest && (
        <EmptyState
          icon={BellOff}
          message="Waiting for agent activity..."
          action={
            <Link href="/dashboard/agents" className={buttonClasses("primary", "md", "gap-2")}>
              Run Demo <ArrowRight size={16} />
            </Link>
          }
        />
      )}

      {latest && (
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl relative p-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose via-amber to-mint" />
          
          <div className="relative pl-8">
            <div className="absolute top-4 bottom-4 left-[15px] w-px bg-white/10" />
            
            {notifications.length === 0 && (
              <div className="py-8 text-sm text-white/50 text-center font-medium">No warnings or failures in the latest telemetry feed.</div>
            )}
            
            <div className="space-y-8">
              {notifications.map((n, i) => {
                const Icon = ICON[n.level];
                const isLatest = i === 0;
                
                return (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[32px] top-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${isLatest ? 'bg-mint animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-white/20'}`} />
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                      {isLatest && <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 blur-[40px] pointer-events-none" />}
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl bg-white/5 ${COLOR[n.level]} shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-widest">{n.level === 'warn' ? 'Anomaly Detected' : n.level === 'error' ? 'Critical Failure' : 'System Event'}</h4>
                            <div className="text-xs text-white/40 font-mono tracking-wider bg-black/40 px-2 py-1 rounded-md border border-white/5">
                              {new Date(n.t).toLocaleTimeString()}
                            </div>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{n.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
