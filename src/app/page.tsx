import Link from "next/link";
import { Wrench, Radar, Bug, Gauge, RefreshCw, ArrowRight, Layers, ShieldCheck } from "lucide-react";
import AgentSquadCard from "@/components/AgentSquadCard";
import { buttonClasses } from "@/components/ui/Button";
import TrustMarquee from "@/components/TrustMarquee";
import BentoGrid from "@/components/BentoGrid";
import FeatureRow from "@/components/FeatureRow";
import { LightStreakPanel, NeuralOrbPanel, GridFlowPanel } from "@/components/visuals/AbstractPanels";
import Footer from "@/components/Footer";
import CountUp from "@/components/CountUp";

const SQUAD = [
  { icon: Radar, name: "The Simulator", quote: "I inject synthetic users before your real ones ever see a bug.", level: "Module 01", accent: "#34e0a1" },
  { icon: Bug, name: "The Scenario Generator", quote: "50+ edge cases, ready before you even thought to test them.", level: "Module 02", accent: "#8b7cf6" },
  { icon: Wrench, name: "The Stress Tester", quote: "Prompt injections, policy traps, PII probes — I try to break you on purpose.", level: "Module 03", accent: "#f5a623" },
  { icon: Layers, name: "The Executor", quote: "Every run, tracked live, one after another, no request left unaccounted for.", level: "Module 04", accent: "#38bdf8" },
  { icon: Gauge, name: "The Evaluator", quote: "Reliability, safety, consistency, cost. Four axes, zero guesswork.", level: "Module 05", accent: "#f4415f" },
  { icon: RefreshCw, name: "The Learner", quote: "I patch what broke and re-run it — automatically, before you deploy.", level: "Module 06", accent: "#34e0a1" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <Radar size={20} className="text-mint" />
          Agent<span className="text-mint">Guard</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
          <a href="#pipeline" className="hover:text-foreground transition-colors">Pipeline</a>
          <a href="#squad" className="hover:text-foreground transition-colors">Test Squad</a>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden sm:block text-sm text-muted hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/dashboard" className={buttonClasses("primary", "sm")}>
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center bg-grid">
        <span className="inline-block text-xs tracking-widest text-mint border border-mint/30 rounded-full px-3 py-1 mb-6">
          THE RELIABILITY LAYER FOR THE AGENT ECONOMY
        </span>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Your agents. <span className="text-gradient">Battle-tested.</span>
        </h1>
        <p className="text-muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          AgentGuard runs your AI agent against synthetic angry users, adversarial prompts, and
          edge cases — then finds the root cause and auto-patches it, before a real customer ever hits it.
        </p>
        <div className="flex items-center justify-center gap-3 mt-9">
          <Link href="/dashboard/agents" className={buttonClasses("primary", "lg", "gap-2")}>
            Run the demo <ArrowRight size={16} />
          </Link>
          <Link href="/dashboard" className={buttonClasses("secondary", "lg")}>
            View dashboard
          </Link>
        </div>

        <div className="flex items-center justify-center gap-10 mt-14 flex-wrap">
          <Stat value={50} suffix="+" label="attack vectors" />
          <Stat value={6} suffix="" label="pipeline modules" />
          <Stat value={4} suffix="" label="scoring axes" />
        </div>
      </section>

      <TrustMarquee />

      {/* Bento overview */}
      <section id="pipeline" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-mint uppercase">What's actually running</span>
          <h2 className="text-3xl font-semibold mt-2">Not a mockup. A working pipeline.</h2>
          <p className="text-muted mt-2 max-w-xl mx-auto">Every number below is produced by real code — you can verify it live on the dashboard.</p>
        </div>
        <BentoGrid />
      </section>

      {/* Alternating feature rows */}
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-28">
        <FeatureRow
          title="Zero-setup testing"
          visual={<LightStreakPanel accent="#34e0a1" />}
          description={
            <>
              No API key, no database, no config. AgentGuard ships with a self-contained mock agent that behaves
              realistically — imperfectly, like a real model — so the full pipeline runs the moment you clone the repo.
              Drop in <code className="text-mint">OPENAI_API_KEY</code> later to point it at a real model with zero code changes.
            </>
          }
        />
        <FeatureRow
          reverse
          title="Agentic stress testing"
          visual={<NeuralOrbPanel accent="#8b7cf6" />}
          description={
            <>
              50 adversarial personas probe for prompt injection, PII leakage, policy contradictions, and hallucinated
              promises. Each one runs a real multi-turn conversation against your agent — not a canned script.
            </>
          }
        />
        <FeatureRow
          title="Root-cause reliability"
          visual={<GridFlowPanel accent="#f5a623" />}
          description={
            <>
              When failures cluster around one root cause, AgentGuard patches the agent's instructions for every
              category found, re-runs the failed cases live, and shows you the before/after — verified over a real
              WebSocket connection, not a page refresh.
            </>
          }
        />
      </section>

      {/* Squad */}
      <section id="squad" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-10">
          <span className="text-xs tracking-widest text-mint">COMMAND CHAIN INITIALIZED</span>
          <h2 className="text-3xl font-semibold mt-2">Meet The Test Squad</h2>
          <p className="text-muted mt-2">Six modules working in sequence to certify your agent safe before deployment.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SQUAD.map((s) => (
            <AgentSquadCard key={s.name} {...s} />
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="glass rounded-3xl p-12 text-center glow-mint">
          <ShieldCheck size={28} className="text-mint mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-3">See it certify an agent, live.</h2>
          <p className="text-muted mb-6 max-w-md mx-auto">Watch 50+ adversarial personas run in real time, then watch the agent get patched and re-tested.</p>
          <Link href="/dashboard/agents" className={buttonClasses("primary", "lg", "gap-2")}>
            Run the demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-foreground">
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}
