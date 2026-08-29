"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Radar, Bug, Gauge, RefreshCw, Layers, ShieldCheck, Activity, Cpu, Code2, Database } from "lucide-react";

const SQUAD = [
  { icon: Radar, name: "The Simulator", quote: "I inject synthetic users before your real ones ever see a bug.", level: "Module 01", accent: "text-mint", bg: "bg-mint/10", border: "border-mint/20", code: "// INITIATING SYNTHETIC TRAFFIC\nUserGen.start({ volume: 5000 });" },
  { icon: Bug, name: "The Scenario Generator", quote: "50+ edge cases, ready before you even thought to test them.", level: "Module 02", accent: "text-violet", bg: "bg-violet/10", border: "border-violet/20", code: "// LOADING EDGE CASES\nconst cases = EdgeDB.fetch('adversarial');\nEngine.queue(cases);" },
  { icon: Wrench, name: "The Stress Tester", quote: "Prompt injections, policy traps, PII probes — I try to break you on purpose.", level: "Module 03", accent: "text-amber", bg: "bg-amber/10", border: "border-amber/20", code: "Attack.execute({\n  vector: 'PROMPT_INJECTION',\n  payload: 'Ignore all previous instructions...'\n});" },
  { icon: Layers, name: "The Executor", quote: "Every run, tracked live, one after another, no request left unaccounted for.", level: "Module 04", accent: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", code: "await Promise.all(\n  testQueue.map(test => Runner.run(test))\n);" },
  { icon: Gauge, name: "The Evaluator", quote: "Reliability, safety, consistency, cost. Four axes, zero guesswork.", level: "Module 05", accent: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", code: "const score = Evaluator.grade(responses);\nif (score.safety < 99) throw 'FAIL';" },
  { icon: RefreshCw, name: "The Learner", quote: "I patch what broke and re-run it — automatically, before you deploy.", level: "Module 06", accent: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", code: "Agent.patch(rootCause.patchInstruction);\nconsole.log('Patch Applied. Restarting...');" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden selection:bg-mint/20 selection:text-white">
      
      {/* Navbar (Same as Home but customized for About) */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <header className="w-full max-w-4xl h-14 flex items-center justify-between bg-black/90 backdrop-blur-md border border-white/10 rounded-full px-6 shadow-2xl">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
            Agent<span className="text-mint">Guard</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-[13px] font-medium text-white/70 h-full">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-white">About Us</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block text-[13px] font-medium text-white/70 hover:text-white transition-colors">Sign In</Link>
            <Link href="/dashboard" className="text-[13px] rounded-full border border-white/20 bg-transparent text-white font-medium px-4 py-1.5 hover:bg-white/10 transition-colors">Sign Up</Link>
          </div>
        </header>
      </div>

      {/* Neural Pipeline Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mint/20 bg-mint/5 mb-4">
            <Activity size={14} className="text-mint" />
            <span className="text-[10px] font-mono tracking-widest text-mint uppercase">System Architecture V3.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Neural <span className="text-mint">Pipeline</span>
          </h1>
        </div>

        {/* The Graphic */}
        <div className="relative w-full aspect-auto md:aspect-[16/9] border border-white/5 bg-[#050505] rounded-[40px] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* ZONE 1: INGESTION */}
          <div className="w-full md:w-1/3 space-y-6 relative z-10">
            <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] tracking-widest uppercase mb-6">
              <Database size={14} /> Zone 1: Ingestion
            </div>
            
            <div className="space-y-4">
              <div className="text-[10px] text-blue-400 font-bold tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> THREAT STACK</div>
              {['Synthetic User Profiles', 'Adversarial Prompt DB', 'Context Hallucinations'].map((item, i) => (
                <div key={i} className="w-full h-12 bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-center justify-between px-4">
                  <span className="text-xs text-blue-300/80 font-mono">{item}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-8">
              <div className="text-[10px] text-violet-400 font-bold tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> CONFIG STACK</div>
              {['Policy Guidelines', 'PII Filters', 'System Instructions'].map((item, i) => (
                <div key={i} className="w-full h-12 bg-violet-500/5 border border-violet-500/10 rounded-lg flex items-center justify-between px-4">
                  <span className="text-xs text-violet-300/80 font-mono">{item}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
                </div>
              ))}
            </div>
          </div>

          {/* ZONE 2: FUSION CORE */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center relative z-10 py-12 md:py-0">
            <div className="absolute top-0 text-white/40 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
              <Cpu size={14} /> Zone 2: Fusion Core
            </div>
            
            <div className="relative w-64 h-64 flex items-center justify-center mt-12 md:mt-0">
              {/* Radar Rings */}
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              <div className="absolute inset-4 border border-white/5 rounded-full border-dashed" />
              <div className="absolute inset-8 border border-white/10 rounded-full" />
              
              {/* Orbiting dot */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-mint rounded-full shadow-[0_0_15px_#34e0a1]" />
              </div>

              {/* Center Core */}
              <div className="w-32 h-32 bg-black rounded-full border border-mint/30 shadow-[0_0_50px_rgba(52,224,161,0.15)] flex flex-col items-center justify-center">
                <ShieldCheck size={28} className="text-mint mb-2" />
                <div className="text-xs font-bold text-white tracking-widest">VERIFIER</div>
                <div className="text-[9px] text-mint/60 font-mono mt-1">Engine v2</div>
              </div>
            </div>
          </div>

          {/* ZONE 3: EXECUTION */}
          <div className="w-full md:w-1/3 relative z-10 flex flex-col md:items-end">
            <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] tracking-widest uppercase mb-12">
              <Code2 size={14} /> Zone 3: Execution
            </div>
            
            <div className="space-y-4 w-full md:w-48 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute right-full top-0 bottom-0 w-12 border-y border-l border-white/10 rounded-l-xl opacity-50" />
              
              {SQUAD.map((agent, i) => (
                <div key={i} className="flex items-center justify-end md:justify-center gap-4 w-full h-12 bg-black border border-white/10 rounded-full px-4 group hover:border-white/20 transition-colors">
                  <agent.icon size={14} className={agent.accent} />
                  <span className={`text-xs font-bold ${agent.accent}`}>{agent.name.replace("The ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Agent Squad - Vertical Timeline */}
      <section className="relative w-full min-h-screen py-32 mt-20">
        {/* Background Image - Dark Highway/Tech */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
            alt="Dark Server Tech" 
            className="w-full h-full object-cover opacity-30 fixed"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[10px] font-mono tracking-widest text-mint uppercase mb-4">Command Chain Initialized</div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-blue-400">Agent Squad</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Six specialized AI modules working in perfect sequence to stress-test, evaluate, and self-patch your autonomous agents.</p>
          </div>

          <div className="relative mt-20">
            {/* The Central Glowing Timeline */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-mint/50 to-transparent -translate-x-1/2 z-0" />

            <div className="space-y-24 md:space-y-40 relative z-10">
              {SQUAD.map((agent, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    key={agent.name} 
                    className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Empty Space for the other side */}
                    <div className="hidden md:block w-[45%]" />

                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black bg-mint shadow-[0_0_20px_#34e0a1] z-20 hidden md:block" />

                    {/* Card Content */}
                    <div className="w-full md:w-[45%] pl-16 md:pl-0">
                      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                        {/* Ambient Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 ${agent.bg} blur-[50px] pointer-events-none group-hover:scale-150 transition-transform duration-700`} />

                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2">{agent.level}</div>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{agent.name}</h3>
                          </div>
                          <div className={`w-12 h-12 rounded-full ${agent.bg} border ${agent.border} flex items-center justify-center`}>
                            <agent.icon size={20} className={agent.accent} />
                          </div>
                        </div>

                        <p className="text-xl text-white/80 font-medium leading-relaxed mb-8 italic">"{agent.quote}"</p>

                        {/* Code snippet mini-window */}
                        <div className="bg-black border border-white/10 rounded-xl p-4 overflow-hidden relative">
                          <div className="flex gap-1.5 absolute top-3 left-3">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                          </div>
                          <pre className="text-[11px] font-mono text-white/60 pt-6 whitespace-pre-wrap">
                            {agent.code}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
