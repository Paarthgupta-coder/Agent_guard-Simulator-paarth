import clsx from "clsx";
import { RunPhase } from "@/lib/types";

const PHASES: { key: RunPhase; label: string }[] = [
  { key: "chaos_input", label: "Chaos Input" },
  { key: "failure_detection", label: "Failure Detection" },
  { key: "root_cause", label: "Root Cause" },
  { key: "auto_improve", label: "Auto-Improve" },
  { key: "done", label: "Done" },
];

const ORDER: RunPhase[] = ["queued", "chaos_input", "failure_detection", "root_cause", "auto_improve", "done"];

export default function PhaseBanner({ status }: { status: RunPhase }) {
  const currentIndex = ORDER.indexOf(status);

  return (
    <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-2">
      {PHASES.map((phase, i) => {
        const phaseIndex = ORDER.indexOf(phase.key);
        const isActive = phaseIndex === currentIndex;
        const isDone = phaseIndex < currentIndex;
        return (
          <div key={phase.key} className="flex items-center gap-2">
            <div
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                isActive && "bg-mint text-black border-mint",
                isDone && !isActive && "border-mint/40 text-mint",
                !isActive && !isDone && "border-border text-muted"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {phase.label}
            </div>
            {i < PHASES.length - 1 && <span className="text-muted">→</span>}
          </div>
        );
      })}
    </div>
  );
}
