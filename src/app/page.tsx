import Link from "next/link";
import { Wrench, Radar, Bug, Gauge, RefreshCw, ArrowRight } from "lucide-react";
import AgentSquadCard from "@/components/AgentSquadCard";

const SQUAD = [
  { icon: Radar, name: "The Simulator", quote: "I inject 1,000 synthetic users before your real ones ever see a bug.", level: "Module 01", accent: "#34e0a1" },
  { icon: Bug, name: "The Scenario Generator", quote: "50+ edge cases, ready before you even thought to test them.", level: "Module 02", accent: "#8b7cf6" },
  { icon: Wrench, name: "The Stress Tester", quote: "Prompt injections, policy traps, PII probes — I try to break you on purpose.", level: "Module 03", accent: "#f5a623" },
  { icon: Gauge, name: "The Evaluator", quote: "Reliability, safety, consistency, cost. Four axes, zero guesswork.", level: "Module 05", accent: "#f4415f" },
  { icon: RefreshCw, name: "The Learner", quote: "I patch what broke and re-run it — automatically, before you deploy.", level: "Module 06", accent: "#34e0a1" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <Radar size={20} className="text-mint" />
          Agent<span className="text-mint">Guard</span>
        </div>
        <Link href="/dashboard" className="text-sm rounded-full bg-mint text-black font-medium px-4 py-2 hover:opacity-90 transition-opacity">
          Open Dashboard
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <span className="inline-block text-xs tracking-widest text-mint border border-mint/30 rounded-full px-3 py-1 mb-6">
          THE RELIABILITY LAYER FOR THE AGENT ECONOMY
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Your agents. <span className="text-mint">Battle-tested.</span>
        </h1>
        <p className="text-muted text-lg mt-6 max-w-2xl mx-auto">
          AgentGuard runs your AI agent against 1,000 synthetic angry users, adversarial prompts, and
          edge cases — then finds the root cause and auto-patches it, before a real customer ever hits it.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            href="/dashboard/agents"
            className="rounded-full bg-mint text-black font-medium px-6 py-3 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Run the demo <ArrowRight size={16} />
          </Link>
          <Link href="/dashboard" className="rounded-full border border-border px-6 py-3 text-foreground/90 hover:bg-white/5 transition-colors">
            View dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-10">
          <span className="text-xs tracking-widest text-mint">SYSTEM ARCHITECTURE V1.0</span>
          <h2 className="text-3xl font-semibold mt-2">Test Pipeline</h2>
          <p className="text-muted mt-2">Six modules, three zones, one automated pass from chaos to a certified agent.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <PipelineZone
            zone="ZONE 1 · GENERATE"
            title="Scenario + Stress"
            color="#8b7cf6"
            items={["Persona Library", "Edge-Case Templates", "Prompt Injection Set", "PII Probe Set"]}
          />
          <PipelineZone
            zone="ZONE 2 · EXECUTE"
            title="Simulate + Run"
            color="#34e0a1"
            items={["Multi-turn Conversations", "Sequential Execution", "Live Console Stream", "Run State Store"]}
            highlighted
          />
          <PipelineZone
            zone="ZONE 3 · LEARN"
            title="Evaluate + Patch"
            color="#f5a623"
            items={["4-Axis Scoring", "Root Cause Clustering", "Auto-Patch Generator", "Re-run + Verify"]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-10">
          <span className="text-xs tracking-widest text-mint">COMMAND CHAIN INITIALIZED</span>
          <h2 className="text-3xl font-semibold mt-2">Meet The Test Squad</h2>
          <p className="text-muted mt-2">Five modules working in sequence to certify your agent safe before deployment.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SQUAD.map((s) => (
            <AgentSquadCard key={s.name} {...s} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PipelineZone({
  zone,
  title,
  color,
  items,
  highlighted,
}: {
  zone: string;
  title: string;
  color: string;
  items: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl p-5 ${highlighted ? "glow-mint" : ""}`}>
      <span className="text-[11px] tracking-widest" style={{ color }}>
        {zone}
      </span>
      <h3 className="text-lg font-medium mt-1 mb-4">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-lg bg-white/[0.03] border border-border px-3 py-2 text-sm text-foreground/85">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
