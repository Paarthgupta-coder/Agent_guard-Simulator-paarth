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
    <Card className="rise-in hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {result.passed ? <ShieldCheck size={18} className="text-mint shrink-0" /> : <ShieldAlert size={18} className="text-rose shrink-0" />}
          <div>
            <div className="font-medium text-foreground flex items-center gap-2 flex-wrap">
              RUN_{String(index + 1).padStart(6, "0")}
              <Badge tone={severityTone}>{severity}</Badge>
            </div>
            <div className="text-xs text-muted mt-0.5">
              {CATEGORY_LABEL[result.persona.category] ?? result.persona.category} · {result.persona.name} · {result.mocked ? "mock agent" : "live model"}
            </div>
          </div>
        </div>
        <span className={`text-xs font-medium shrink-0 ${result.passed ? "text-mint" : "text-rose"}`}>{result.passed ? "Passed" : "Flagged"}</span>
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
        <Badge tone="mint">Verified</Badge>
      </div>
    </Card>
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
