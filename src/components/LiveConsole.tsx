"use client";

import { useEffect, useRef } from "react";
import { LogLine } from "@/lib/types";
import { TerminalSquare } from "lucide-react";

const LEVEL_COLOR: Record<LogLine["level"], string> = {
  info: "text-foreground/80",
  warn: "text-amber",
  error: "text-rose",
  success: "text-mint",
};

export default function LiveConsole({ log }: { log: LogLine[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [log.length]);

  return (
    <div className="glass rounded-2xl p-5 flex flex-col h-[420px]">
      <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
        <TerminalSquare size={16} className="text-mint" />
        Live Agent Console
      </div>
      <div ref={ref} className="flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed space-y-1 pr-1">
        <p className="text-muted">&gt; AGENTGUARD Simulation Engine v1.0.0</p>
        <p className="text-muted">&gt; Awaiting demo trigger...</p>
        {log.map((l, i) => (
          <p key={i} className={LEVEL_COLOR[l.level]}>
            &gt; {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}
