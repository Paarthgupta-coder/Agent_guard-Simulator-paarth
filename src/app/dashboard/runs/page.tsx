"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DecisionCard from "@/components/DecisionCard";
import { RunState } from "@/lib/types";

export default function RunsPage() {
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
  const allResults = latest ? [...latest.results, ...latest.rerunResults] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Decision Feed</h1>
        <p className="text-muted mt-1">Every synthetic-user transcript, flagged and scored.</p>
      </div>

      {!latest && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-muted mb-4">No decisions yet.</p>
          <Link href="/dashboard/agents" className="inline-flex items-center gap-2 rounded-full bg-mint text-black font-medium px-5 py-2.5">
            Run Demo <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {allResults.map((r, i) => (
          <DecisionCard key={`${r.persona.id}-${i}`} result={r} index={i} />
        ))}
      </div>
    </div>
  );
}
