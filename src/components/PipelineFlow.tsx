"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bug, Zap, Play, Gauge, RefreshCw, Sparkles } from "lucide-react";
import { RunPhase } from "@/lib/types";

const NODES = [
  { key: "generate", label: "Generate", icon: Bug, phases: ["chaos_input"] },
  { key: "stress", label: "Stress", icon: Zap, phases: ["chaos_input"] },
  { key: "execute", label: "Execute", icon: Play, phases: ["chaos_input", "failure_detection"] },
  { key: "evaluate", label: "Evaluate", icon: Gauge, phases: ["failure_detection", "root_cause"] },
  { key: "learn", label: "Learn", icon: RefreshCw, phases: ["auto_improve"] },
  { key: "verify", label: "Verify", icon: Sparkles, phases: ["auto_improve", "done"] },
] as const;

const PHASE_ORDER: RunPhase[] = ["queued", "chaos_input", "failure_detection", "root_cause", "auto_improve", "done"];

export default function PipelineFlow({ status }: { status: RunPhase }) {
  const currentIdx = PHASE_ORDER.indexOf(status);

  return (
    <div className="glass rounded-2xl p-6 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-[640px]">
        {NODES.map((node, i) => {
          const nodeMaxIdx = Math.max(...node.phases.map((p) => PHASE_ORDER.indexOf(p as RunPhase)));
          const nodeMinIdx = Math.min(...node.phases.map((p) => PHASE_ORDER.indexOf(p as RunPhase)));
          const active = currentIdx >= nodeMinIdx && currentIdx <= nodeMaxIdx;
          const done = currentIdx > nodeMaxIdx;

          return (
            <div key={node.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <motion.div
                  animate={{
                    scale: active ? [1, 1.08, 1] : 1,
                    borderColor: active ? "#34e0a1" : done ? "rgba(52,224,161,0.4)" : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
                  className="w-12 h-12 rounded-xl border-2 flex items-center justify-center"
                  style={{
                    background: active ? "rgba(52,224,161,0.12)" : done ? "rgba(52,224,161,0.06)" : "rgba(255,255,255,0.02)",
                  }}
                >
                  <node.icon size={18} className={active ? "text-mint" : done ? "text-mint/60" : "text-muted"} />
                </motion.div>
                <span className={`text-[11px] font-medium ${active ? "text-mint" : done ? "text-mint/60" : "text-muted"}`}>{node.label}</span>
              </div>

              {i < NODES.length - 1 && (
                <div className="flex-1 h-px mx-1 relative overflow-hidden bg-white/10">
                  <AnimatePresence>
                    {(done || active) && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-mint/60"
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
