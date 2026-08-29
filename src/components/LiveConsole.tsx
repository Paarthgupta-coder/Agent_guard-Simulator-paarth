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
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [log.length]);

  return (
    <div className="bg-[#050505] rounded-2xl p-5 flex flex-col h-[420px] border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-mint/5 to-transparent -translate-y-full group-hover:animate-[scan_3s_ease-in-out_infinite] pointer-events-none z-0" />
      
      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/90 uppercase tracking-widest">
          <TerminalSquare size={16} className="text-mint" />
          Live Telemetry Stream
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-mint/80" />
        </div>
      </div>
      
      <div ref={ref} className="flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed space-y-1.5 pr-2 relative z-10 scrollbar-hide">
        <p className="text-mint/60">&gt; INITIALIZING AGENTGUARD ENGINE v2.0.0...</p>
        <p className="text-mint/60">&gt; SECURE KERNEL LOADED. STANDBY FOR PIPELINE TRIGGER.</p>
        {log.map((l, i) => (
          <div key={i} className={`flex gap-3 ${LEVEL_COLOR[l.level]} rise-in`}>
            <span className="opacity-50 shrink-0">[{new Date(l.t).toISOString().split('T')[1].slice(0, -1)}]</span>
            <span>&gt; {l.text}</span>
          </div>
        ))}
        {log.length > 0 && <div className="w-2 h-4 bg-mint animate-pulse mt-2" />}
      </div>
    </div>
  );
}
