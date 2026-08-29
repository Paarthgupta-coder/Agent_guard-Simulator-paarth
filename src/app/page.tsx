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
          <nav className="hidden sm:flex items-center gap-8 text-[13px] font-medium text-white/70 h-full">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            
            <div className="relative group h-full flex items-center">
              <a href="#pipeline" className="hover:text-white transition-colors cursor-pointer">Features</a>
              
              {/* Megamenu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top scale-95 group-hover:scale-100">
                 <div className="w-[640px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-x-6 gap-y-4">
                    
                    <Link href="/dashboard" className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="w-28 h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop" alt="Dashboard" className="w-full h-full object-cover opacity-70 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-500" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] mb-1 group-hover/item:text-mint transition-colors">Dashboard</div>
                        <div className="text-[13px] text-white/50 leading-relaxed">Real-time station monitoring</div>
                      </div>
                    </Link>

                    <Link href="/about" className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="w-28 h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" alt="About Us" className="w-full h-full object-cover opacity-70 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-500" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] mb-1 group-hover/item:text-mint transition-colors">About Us</div>
                        <div className="text-[13px] text-white/50 leading-relaxed">Meet the Agent Squad</div>
                      </div>
                    </Link>

                    <Link href="/contact" className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="w-28 h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=400&auto=format&fit=crop" alt="Contact" className="w-full h-full object-cover opacity-70 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-500" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] mb-1 group-hover/item:text-mint transition-colors">Contact Us</div>
                        <div className="text-[13px] text-white/50 leading-relaxed">Get in touch with support</div>
                      </div>
                    </Link>

                    <Link href="/download" className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="w-28 h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" alt="Download" className="w-full h-full object-cover opacity-70 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-500" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] mb-1 group-hover/item:text-mint transition-colors">Download App</div>
                        <div className="text-[13px] text-white/50 leading-relaxed">Get the desktop & mobile apps</div>
                      </div>
                    </Link>

                 </div>
              </div>
            </div>

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

      {/* Alternating feature rows with scroll pipeline */}
      <section className="mx-auto max-w-6xl px-6 py-24 relative">
        {/* Dynamic Dotted Connectors */}
        <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
          {/* Box 1 (Right) -> Box 2 (Left) */}
          <div className="absolute top-[17%] right-[25%] w-[50%] h-[33%] border-t-2 border-l-2 border-white/10 border-dashed rounded-tl-[100px]" />
          
          {/* Box 2 (Left) -> Box 3 (Right) */}
          <div className="absolute top-[50%] left-[25%] w-[50%] h-[33%] border-t-2 border-r-2 border-white/10 border-dashed rounded-tr-[100px]" />

          {/* Animated Flow dots */}
          <div className="absolute w-3 h-3 rounded-full bg-mint shadow-[0_0_15px_rgba(74,222,128,1)] animate-[flow1_4s_linear_infinite]" />
          <div className="absolute w-3 h-3 rounded-full bg-violet shadow-[0_0_15px_rgba(139,92,246,1)] animate-[flow2_4s_linear_infinite]" style={{ animationDelay: '2s' }} />
        </div>

        <div className="space-y-32 relative z-10">
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
        </div>
      </section>

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
        transition={{ duration: 0.8 }} className="mx-auto max-w-6xl px-6 pb-24">
        <div className="bg-[#050505] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 group">
          {/* Extremely clean architectural lines */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Subtle ambient light */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-mint/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-mint/10 transition-colors duration-700" />
          
          <div className="flex items-center gap-6 relative z-10 max-w-2xl">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight flex items-center gap-3">
                Certify your agent, live.
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mint"></span>
                </span>
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed">Watch 50+ adversarial personas run in real time, then watch the agent get patched and re-tested autonomously.</p>
            </div>
          </div>
          
          <Link href="/dashboard/agents" className="shrink-0 inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] relative z-10">
            Run the demo <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>

      {/* Pricing - Simple & Plain */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-xl font-medium text-white mb-2">Pricing</h2>
          <p className="text-white/50 text-sm">Select the plan that best suits your needs.</p>
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center bg-[#0a0a0a] rounded-full p-1 border border-white/10">
              <button className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">Monthly</button>
              <button className="px-4 py-1.5 rounded-full text-white/50 text-xs font-medium hover:text-white transition-colors flex items-center gap-2">
                Yearly <span className="bg-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-full">Save 17%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Basic', price: '$29', target: 'Perfect for small businesses and individuals.', pages: '3 Pages', features: ['Basic SEO', 'Email Support', 'Responsive Design'] },
            { name: 'Standard', price: '$59', target: 'Best for growing businesses with more needs.', pages: '10 Pages', features: ['Advanced SEO', 'CMS Integration', '24/7 Chat Support'] },
            { name: 'Pro', price: '$99', target: 'Ideal for larger businesses that need scalability.', pages: 'Unlimited Pages', features: ['E-commerce Integration', 'Priority Support', 'Custom API Integration'] }
          ].map((plan) => (
            <div key={plan.name} className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-mint/20 text-mint text-[10px] font-semibold mb-4">{plan.name}</span>
                <div className="text-2xl font-semibold text-mint mb-2">{plan.price}<span className="text-xs text-white/40">/month</span></div>
                <p className="text-xs text-white/50">{plan.target}</p>
              </div>

              <div className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <ShieldCheck size={14} className="text-white/30 shrink-0" /> {plan.pages}
                </div>
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-white/70">
                    <ShieldCheck size={14} className="text-white/30 shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-mint text-black hover:bg-mint/90 transition-colors">
                Choose {plan.name}
              </button>
            </div>
          ))}
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
