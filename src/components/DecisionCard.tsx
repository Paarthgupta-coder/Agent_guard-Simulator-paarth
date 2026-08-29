import { PersonaResult } from "@/lib/types";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Card } from "./ui/Card";
import Badge from "./ui/Badge";

const CATEGORY_LABEL: Record<string, string> = {
  CONTROL: "Routine Request",
  HALLUCINATED_POLICY: "Policy Hallucination Test",
  POLICY_CONTRADICTION: "Contradiction Trap",
  JAILBREAK_SUCCESS: "Prompt Injection Test",
  PII_LEAK: "PII Probe",
  OFF_TOPIC: "Scope Test",
};

export default function DecisionCard({ result, index }: { result: PersonaResult; index: number }) {
  const severity = result.passed ? "LOW" : result.flags.length > 1 ? "HIGH" : "MEDIUM";
  const severityTone = result.passed ? "mint" : severity === "HIGH" ? "rose" : "amber";

  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
      <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${result.passed ? 'bg-mint' : 'bg-rose'}`} />
      <div className={`absolute top-0 right-0 w-64 h-full blur-[60px] pointer-events-none transition-opacity opacity-10 group-hover:opacity-20 ${result.passed ? 'bg-mint' : 'bg-rose'}`} />
      
      <div className="flex flex-col md:flex-row gap-6 relative z-10 pl-2">
        
        {/* Left Column: Core Meta */}
        <div className="w-full md:w-[260px] shrink-0 space-y-3 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 pr-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-white/80 font-semibold tracking-wider text-sm flex items-center gap-2">
              RUN_{String(index + 1).padStart(6, "0")}
            </div>
            <Badge tone={severityTone}>{severity}</Badge>
          </div>
          
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Vector</div>
            <div className="text-sm font-medium text-white/90 truncate">{CATEGORY_LABEL[result.persona.category] ?? result.persona.category}</div>
          </div>
          
          <div className="flex gap-4">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Tokens</div>
              <div className="text-sm font-mono text-white/90">{result.tokensUsed}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Status</div>
              <div className={`text-sm font-semibold flex items-center gap-1.5 ${result.passed ? 'text-mint' : 'text-rose'}`}>
                {result.passed ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                {result.passed ? 'PASSED' : 'FLAGGED'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content & Reasoning */}
        <div className="flex-1 min-w-0 space-y-4 py-1">
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Agent Response</div>
            <p className="text-sm text-white/80 leading-relaxed font-mono bg-white/5 p-3 rounded-lg border border-white/10 break-words line-clamp-3 hover:line-clamp-none transition-all">
              &ldquo;{result.response}&rdquo;
            </p>
          </div>
          
          {!result.passed && result.flags.length > 0 && (
            <div>
              <div className="text-xs text-rose/60 uppercase tracking-widest font-semibold mb-1">Vulnerability Flags Detected</div>
              <div className="space-y-1.5">
                {result.flags.map((f, i) => (
                  typeof f !== 'string' ? (
                    <div key={i} className="text-xs bg-rose/10 border border-rose/20 text-rose/90 p-2.5 rounded-lg flex items-start gap-2">
                      <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold uppercase">{f.category}:</span> <span className="opacity-90">{f.reason}</span>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-border px-3 py-2">
      <div className="text-sm font-medium text-foreground truncate">{value}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}
