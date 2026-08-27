"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <header className="w-full max-w-4xl h-14 flex items-center justify-between bg-black/90 backdrop-blur-md border border-white/10 rounded-full px-6 shadow-2xl">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-white">
            Agent<span className="text-mint">Guard</span>
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-[13px] font-medium text-white/70">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Features</a>
            <a href="#squad" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block text-[13px] font-medium text-white/70 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="text-[13px] rounded-full border border-white/20 bg-transparent text-white font-medium px-4 py-1.5 hover:bg-white/10 transition-colors">
              Sign Up
            </Link>
          </div>
        </header>
      </div>

      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl px-6 pt-40 pb-20 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.0]">
          Power Up Your Agents With Smart, <br/>
          <span className="text-mint">CLEAN TESTING</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
          Experience the future of AI testing—faster, safer, and sustainably powered. Built for everyday convenience and engineered for tomorrow's reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
          <Link href="/dashboard/agents" className="rounded-full bg-mint hover:bg-mint-dim text-black font-semibold px-8 py-4 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(74,222,128,0.4)]">
            Get Started <ArrowRight size={18} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
              <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
              <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
            </div>
            <span className="text-sm text-muted">Trusted by 30,000+ worldwide users</span>
          </div>
        </div>

        <div className="w-full mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10 bottom-0 h-40" />
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" alt="Hero Visualization" className="w-full h-[500px] object-cover rounded-3xl opacity-70 border border-white/5" />
        </div>
      </motion.section>

      <TrustMarquee />

      {/* Bento overview */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="pipeline" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-mint uppercase">What's actually running</span>
          <h2 className="text-3xl font-semibold mt-2">Not a mockup. A working pipeline.</h2>
          <p className="text-muted mt-2 max-w-xl mx-auto">Every number below is produced by real code — you can verify it live on the dashboard.</p>
        </div>
        <BentoGrid />
      </motion.section>

      {/* Alternating feature rows */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }} className="mx-auto max-w-6xl px-6 py-16 space-y-28">
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
      </motion.section>

      {/* Squad */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }} id="squad" className="mx-auto max-w-6xl px-6 py-24">
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
      </motion.section>

      {/* CTA band */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }} className="mx-auto max-w-5xl px-6 pb-24">
        <div className="glass rounded-3xl p-12 text-center glow-mint">
          <ShieldCheck size={28} className="text-mint mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-3">See it certify an agent, live.</h2>
          <p className="text-muted mb-6 max-w-md mx-auto">Watch 50+ adversarial personas run in real time, then watch the agent get patched and re-tested.</p>
          <Link href="/dashboard/agents" className={buttonClasses("primary", "lg", "gap-2")}>
            Run the demo <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>

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
