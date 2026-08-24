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
      <SectionHeader title="Live Notifications" subtitle="Failures, patches, and recoveries surfaced as they happen." />

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
        <Card className="divide-y divide-border p-0">
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
        </Card>
      )}
    </div>
  );
}
