"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Home, Users, ShieldCheck, Bell, LogOut, Sparkles, Mail } from "lucide-react";
import clsx from "clsx";

const ITEMS = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/dashboard/agents", icon: Users, label: "Agents" },
  { href: "/dashboard/runs", icon: ShieldCheck, label: "Decisions" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col items-center w-16 shrink-0 border-r border-border bg-surface/60 py-4 gap-6">
      <Link
        href="/"
        className="w-10 h-10 rounded-xl bg-mint/15 text-mint flex items-center justify-center hover:bg-mint/25 transition-all duration-150"
        title="AgentGuard home"
      >
        <Zap size={20} />
      </Link>

      <nav className="flex flex-col items-center gap-2 flex-1">
        {ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={clsx(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150",
                active ? "bg-mint/15 text-mint" : "text-muted hover:text-foreground hover:bg-white/5"
              )}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard/agents"
        title="Run demo"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-violet hover:bg-white/5 transition-all duration-150"
      >
        <Sparkles size={18} />
      </Link>
      <Link href="/contact" title="Contact" className="w-10 h-10 rounded-xl flex items-center justify-center text-muted hover:text-foreground hover:bg-white/5 transition-all duration-150">
        <Mail size={18} />
      </Link>
      <Link href="/" title="Exit dashboard" className="w-10 h-10 rounded-xl flex items-center justify-center text-muted hover:text-rose hover:bg-white/5 transition-all duration-150">
        <LogOut size={18} />
      </Link>
    </aside>
  );
}
