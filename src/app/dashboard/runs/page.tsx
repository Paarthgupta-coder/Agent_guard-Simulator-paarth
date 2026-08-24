"use client";

import Link from "next/link";
import { ArrowRight, ShieldQuestion } from "lucide-react";
import DecisionCard from "@/components/DecisionCard";
import { SectionHeader, EmptyState } from "@/components/ui/Card";
import { CardListSkeleton } from "@/components/ui/Skeleton";
import { buttonClasses } from "@/components/ui/Button";
import { useRunsList } from "@/hooks/useRunSocket";

export default function RunsPage() {
  const runs = useRunsList();
  const loading = runs === undefined;
  const latest = runs?.[0];
  const allResults = latest ? [...latest.results, ...latest.rerunResults] : [];

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Module 05" title="Decision Feed" subtitle="Every synthetic-user transcript, flagged and scored." />

      {loading && <CardListSkeleton count={4} />}

      {!loading && !latest && (
        <EmptyState
          icon={ShieldQuestion}
          message="No decisions yet."
          action={
            <Link href="/dashboard/agents" className={buttonClasses("primary", "md", "gap-2")}>
              Run Demo <ArrowRight size={16} />
            </Link>
          }
        />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {allResults.map((r, i) => (
          <DecisionCard key={`${r.persona.id}-${i}`} result={r} index={i} />
        ))}
      </div>
    </div>
  );
}
