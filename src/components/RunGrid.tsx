"use client";

import clsx from "clsx";
import { PersonaResult } from "@/lib/types";
import { buildRunSet } from "@/lib/scenario";

interface Props {
  results: PersonaResult[];
}

export default function RunGrid({ results }: Props) {
  const total = buildRunSet().length;
  const doneIds = new Set(results.map((r) => r.persona.id));

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Synthetic User Runs</h3>
        <span className="text-xs text-muted">
          {results.length}/{total} complete
        </span>
      </div>
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-14 gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const result = results[i];
          const pending = !result;
          return (
            <div
              key={i}
              title={result ? `${result.persona.name}: ${result.passed ? "passed" : result.flags.join(", ")}` : "queued"}
              className={clsx(
                "aspect-square rounded-md rise-in",
                pending && "bg-white/5",
                result && result.passed && "bg-mint/70",
                result && !result.passed && "bg-rose/80"
              )}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-mint/70" /> Passed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose/80" /> Flagged
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/10" /> Queued
        </span>
      </div>
      {doneIds.size === 0 && <p className="text-xs text-muted mt-3">Click &ldquo;Run Demo&rdquo; to start injecting synthetic users.</p>}
    </div>
  );
}
