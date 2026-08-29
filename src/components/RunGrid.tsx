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
    <div className="flex flex-col h-full w-full">
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-14 gap-3 relative z-10">
        {Array.from({ length: total }).map((_, i) => {
          const result = results[i];
          const pending = !result;
          const isNext = pending && (i === 0 || !!results[i - 1]);
          return (
            <div
              key={i}
              title={result ? `${result.persona.name}: ${result.passed ? "passed" : result.flags.map(f => typeof f === 'string' ? f : f.category).join(", ")}` : "queued"}
              className={clsx(
                "aspect-square rounded-lg transition-all duration-300 relative overflow-hidden",
                pending && !isNext && "bg-white/5 border border-white/5",
                isNext && "bg-white/10 border-2 border-mint/50 animate-pulse shadow-[0_0_15px_rgba(74,222,128,0.2)]",
                result && result.passed && "bg-mint/80 border border-mint shadow-[0_0_10px_rgba(74,222,128,0.15)]",
                result && !result.passed && "bg-rose/80 border border-rose shadow-[0_0_10px_rgba(244,63,94,0.15)]"
              )}
            >
              {isNext && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint/20 to-transparent animate-[scan_1.5s_linear_infinite]" />
              )}
              {result && (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] font-mono text-white/90">{i + 1}</span>
                </div>
              )}
            </div>
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
