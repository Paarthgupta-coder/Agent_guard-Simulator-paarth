"use client";

import { motion } from "framer-motion";
import { LucideIcon, Radar, Bug, Users, Gauge, RefreshCw, Layers } from "lucide-react";
import CountUp from "./CountUp";

interface Tile {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat?: { value: number; suffix: string; label: string };
  span?: string;
}

const TILES: Tile[] = [
  { icon: Bug, title: "Attack Vectors", desc: "Prompt injection, PII probing, policy traps — pre-authored and ready.", stat: { value: 50, suffix: "+", label: "adversarial personas" }, span: "md:col-span-2" },
  { icon: Radar, title: "Simulation Engine", desc: "Every persona runs a real multi-turn conversation against your agent.", stat: { value: 1000, suffix: "+", label: "synthetic requests" } },
  { icon: Users, title: "Test Squad", desc: "Six specialized modules, each responsible for one part of the pipeline.", stat: { value: 6, suffix: "", label: "core neural modules" } },
  { icon: Gauge, title: "4-Axis Scoring", desc: "Reliability, safety, consistency, and cost — read from the response text itself, not a label.", stat: { value: 100, suffix: "%", label: "automated scoring" }, span: "md:col-span-2" },
  { icon: RefreshCw, title: "Auto-Improve", desc: "Failures get clustered, the agent gets patched, and the fix gets verified live.", stat: { value: 98, suffix: "%", label: "patch success rate" } },
  { icon: Layers, title: "Live Execution", desc: "Every run streamed over a real WebSocket, not polling.", stat: { value: 12, suffix: "ms", label: "avg socket latency" }, span: "md:col-span-2" },
];

export default function BentoGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {TILES.map((tile, i) => (
        <motion.div
          key={tile.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className={`bg-[#050505] rounded-[20px] p-6 flex flex-col h-full border border-white/5 border-l-[3px] border-l-white/10 hover:border-l-mint hover:bg-[#080808] transition-all duration-300 relative overflow-hidden group ${tile.span ?? ""}`}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 text-mint flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <tile.icon size={16} />
            </div>
            <h3 className="font-semibold text-[15px] text-white tracking-tight">{tile.title}</h3>
          </div>
          
          <p className="text-[13px] text-white/40 leading-relaxed relative z-10 mb-6">{tile.desc}</p>
          
          {/* Compact Telemetry Stat Block */}
          {tile.stat && (
            <div className="mt-auto relative z-10 pt-4 border-t border-white/[0.03] flex items-end justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">{tile.stat.label}</div>
                <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
                  <CountUp value={tile.stat.value} suffix={tile.stat.suffix} />
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse mb-1" />
                </div>
              </div>
              
              {/* Creative Telemetry Graph */}
              <div className="flex items-end gap-[2px] h-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen">
                {[40, 70, 30, 90, 50, 100, 60, 80].map((h, j) => (
                  <div key={j} className="w-1 bg-mint rounded-t-[1px]" style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
