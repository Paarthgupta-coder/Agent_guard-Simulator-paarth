"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <Link
      href="/dashboard/agents"
      title="Run a new simulation"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-mint text-black flex items-center justify-center shadow-lg shadow-mint/30 hover:scale-105 transition-transform"
    >
      <Zap size={22} fill="black" />
    </Link>
  );
}
