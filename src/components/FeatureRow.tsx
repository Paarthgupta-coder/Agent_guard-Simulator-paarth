"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description: React.ReactNode;
  visual: React.ReactNode;
  reverse?: boolean;
}

export default function FeatureRow({ title, description, visual, reverse }: Props) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ direction: "ltr" }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/10 transition-colors" />
        <div className="relative z-10 rounded-[32px] overflow-hidden p-2 bg-white/[0.02] border border-white/5 shadow-2xl">
          {visual}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{ direction: "ltr" }}
        className="px-4"
      >
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white leading-tight">
          {title}
        </h3>
        <div className="text-white/60 leading-relaxed text-lg font-medium">{description}</div>
      </motion.div>
    </div>
  );
}
