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
    <div className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        style={{ direction: "ltr" }}
      >
        {visual}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ direction: "ltr" }}
      >
        <h3 className="text-3xl font-semibold tracking-tight mb-4">{title}</h3>
        <div className="text-muted leading-relaxed">{description}</div>
      </motion.div>
    </div>
  );
}
