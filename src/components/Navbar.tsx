"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radar } from "lucide-react";
import clsx from "clsx";

const TABS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/agents", label: "Run Demo" },
  { href: "/dashboard/runs", label: "Decisions" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Radar size={20} className="text-mint" />
          <span>
            Agent<span className="text-mint">Guard</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full glass p-1">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-sm transition-colors",
                  active ? "bg-mint text-black font-medium" : "text-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-mint pulse-dot" />
          System Ready
        </div>
      </div>
    </header>
  );
}
