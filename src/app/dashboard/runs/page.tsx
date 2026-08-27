"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldQuestion, Search, Filter } from "lucide-react";
import DecisionCard from "@/components/DecisionCard";
import { SectionHeader, EmptyState, Card } from "@/components/ui/Card";
import { CardListSkeleton } from "@/components/ui/Skeleton";
import { buttonClasses } from "@/components/ui/Button";
import { useRunsList } from "@/hooks/useRunSocket";

const CATEGORY_OPTIONS = ["All Categories", "CONTROL", "HALLUCINATED_POLICY", "POLICY_CONTRADICTION", "JAILBREAK_SUCCESS", "PII_LEAK", "OFF_TOPIC"];
const STATUS_OPTIONS = ["All Status", "Passed", "Flagged"];

export default function RunsPage() {
  const runs = useRunsList();
  const loading = runs === undefined;
  const latest = runs?.[0];
  const allResults = latest ? [...latest.results, ...latest.rerunResults] : [];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);

  const filtered = useMemo(() => {
    return allResults.filter((r) => {
      if (category !== "All Categories" && r.persona.category !== category) return false;
      if (status === "Passed" && !r.passed) return false;
      if (status === "Flagged" && r.passed) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${r.persona.name} ${r.response} ${r.persona.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [allResults, category, status, query]);

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

      {latest && (
        <Card className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white/[0.03] border border-border rounded-lg px-3 py-2">
            <Search size={14} className="text-muted shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search decisions, personas, responses..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted/60 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted hidden sm:block" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/[0.03] border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-mint/50"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c} className="bg-surface">
                  {c}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white/[0.03] border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-mint/50"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-surface">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {latest && (
        <p className="text-xs text-muted">
          Showing {filtered.length} of {allResults.length} decisions
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((r, i) => (
          <DecisionCard key={`${r.persona.id}-${i}`} result={r} index={i} />
        ))}
      </div>
    </div>
  );
}
