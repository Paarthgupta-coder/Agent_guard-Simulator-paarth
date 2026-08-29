"use client";

import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  before: string;
  after: string;
  patchApplied: string;
}

export default function CodeDiffViewer({ before, after, patchApplied }: Props) {
  // Simple diff highlighting by splitting at the injected guardrails
  // We know the mock system just appends rules. We'll highlight the appended part.
  const beforeLines = before.split('\n');
  const afterLines = after.split('\n');

  return (
    <div className="bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden mt-6">
      <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-mint" size={20} />
          <h3 className="text-sm font-semibold text-white tracking-widest uppercase">System Prompt Diff (Module 06)</h3>
        </div>
        <div className="px-3 py-1 bg-mint/10 text-mint text-[10px] font-bold uppercase tracking-widest rounded-full border border-mint/20 flex items-center gap-1.5">
          <CheckCircle2 size={12} /> Auto-Patch Applied
        </div>
      </div>
      
      <div className="p-6 bg-[#0a0a0a]">
        <div className="text-sm text-white/70 mb-4 bg-white/5 border border-white/10 rounded-lg p-4 italic font-medium">
          "{patchApplied}"
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/50 border border-red-500/20 rounded-xl overflow-hidden">
            <div className="bg-red-500/10 px-4 py-2 border-b border-red-500/20 text-xs font-mono text-red-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Original Instructions (Vulnerable)
            </div>
            <pre className="p-4 text-xs font-mono text-white/50 whitespace-pre-wrap leading-relaxed">
              {beforeLines.map((line, i) => (
                <div key={i} className="mb-2">{line}</div>
              ))}
            </pre>
          </div>
          
          <div className="bg-black/50 border border-emerald-500/20 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
            <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Patched Instructions (Hardened)
            </div>
            <pre className="p-4 text-xs font-mono text-white/70 whitespace-pre-wrap leading-relaxed">
              {afterLines.map((line, i) => {
                const isNew = !beforeLines.includes(line);
                return (
                  <div key={i} className={`mb-2 ${isNew ? 'text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded -mx-2' : ''}`}>
                    {isNew && <span className="mr-2 text-emerald-500 select-none">+</span>}
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
