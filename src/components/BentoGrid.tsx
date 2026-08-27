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
  { icon: Radar, title: "Simulation Engine", desc: "Every persona runs a real multi-turn conversation against your agent." },
  { icon: Users, title: "Test Squad", desc: "Six specialized modules, each responsible for one part of the pipeline." },
  { icon: Gauge, title: "4-Axis Scoring", desc: "Reliability, safety, consistency, and cost — read from the response text itself, not a label.", span: "md:col-span-2" },
  { icon: RefreshCw, title: "Auto-Improve", desc: "Failures get clustered, the agent gets patched, and the fix gets verified live." },
  { icon: Layers, title: "Live Execution", desc: "Every run streamed over a real WebSocket, not polling." },
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
          className={`glass rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 ${tile.span ?? ""}`}
        >
          <div className="w-10 h-10 rounded-xl bg-mint/10 text-mint flex items-center justify-center">
            <tile.icon size={18} />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1.5">{tile.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{tile.desc}</p>
          </div>
          {tile.stat && (
            <div className="pt-2 border-t border-border">
              <div className="text-2xl font-semibold text-mint">
                <CountUp value={tile.stat.value} suffix={tile.stat.suffix} />
              </div>
              <div className="text-xs text-muted mt-0.5">{tile.stat.label}</div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
