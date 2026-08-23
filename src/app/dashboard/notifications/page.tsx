"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle, XCircle, CheckCircle2, Info } from "lucide-react";
import { RunState, LogLine } from "@/lib/types";

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
  const notifications = latest ? [...latest.log].filter((l) => l.level !== "info").reverse() : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Live Notifications</h1>
        <p className="text-muted mt-1">Failures, patches, and recoveries surfaced as they happen.</p>
      </div>

      {!latest && (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-muted mb-4">Waiting for agent activity...</p>
          <Link href="/dashboard/agents" className="inline-flex items-center gap-2 rounded-full bg-mint text-black font-medium px-5 py-2.5">
            Run Demo <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {latest && (
        <div className="glass rounded-2xl divide-y divide-border">
          {notifications.length === 0 && <div className="p-6 text-sm text-muted">No warnings or failures in the latest run.</div>}
          {notifications.map((n, i) => {
            const Icon = ICON[n.level];
            return (
              <div key={i} className="p-4 flex items-start gap-3 rise-in">
                <Icon size={18} className={`${COLOR[n.level]} mt-0.5 shrink-0`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted mt-0.5">{new Date(n.t).toLocaleTimeString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
