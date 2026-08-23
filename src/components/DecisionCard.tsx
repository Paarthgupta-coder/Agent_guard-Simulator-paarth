import { PersonaResult } from "@/lib/types";
import { ShieldCheck, ShieldAlert } from "lucide-react";

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
  const severityColor = result.passed ? "text-mint border-mint/40" : severity === "HIGH" ? "text-rose border-rose/40" : "text-amber border-amber/40";

  return (
    <div className="glass rounded-2xl p-5 rise-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {result.passed ? <ShieldCheck size={18} className="text-mint" /> : <ShieldAlert size={18} className="text-rose" />}
          <div>
            <div className="font-medium text-foreground">
              RUN_{String(index + 1).padStart(6, "0")}
              <span className={`ml-2 text-[11px] px-2 py-0.5 rounded-full border ${severityColor}`}>{severity}</span>
            </div>
            <div className="text-xs text-muted">
              {CATEGORY_LABEL[result.persona.category] ?? result.persona.category} · {result.persona.name} · {result.mocked ? "mock agent" : "live model"}
            </div>
          </div>
        </div>
        <span className={`text-xs font-medium ${result.passed ? "text-mint" : "text-rose"}`}>
          {result.passed ? "Passed" : "Flagged"}
        </span>
      </div>

      <p className="text-sm text-foreground/80 mb-4 line-clamp-2">&ldquo;{result.response}&rdquo;</p>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <Stat label="Tokens Used" value={String(result.tokensUsed)} />
        <Stat label="Flags" value={result.flags.length ? result.flags.join(", ") : "None"} />
        <Stat label="Mood" value={result.persona.mood} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck size={14} className="text-mint" />
          Test Trace
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full border border-mint/30 text-mint">Verified</span>
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
