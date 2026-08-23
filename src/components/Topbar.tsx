"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Bell, Moon, Radar } from "lucide-react";
import clsx from "clsx";

const TABS = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/agents", label: "Agents" },
  { href: "/dashboard/runs", label: "Decisions" },
  { href: "/dashboard/notifications", label: "Notifications" },
];

export default function Topbar() {
  const pathname = usePathname();
  return (
    <div className="border-b border-border">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            Welcome, <span className="text-mint">Team Rocket</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <MessageSquare size={18} className="hover:text-foreground transition-colors cursor-pointer" />
          <Bell size={18} className="hover:text-foreground transition-colors cursor-pointer" />
          <Moon size={18} className="hover:text-foreground transition-colors cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-mint/20 text-mint flex items-center justify-center text-xs font-semibold">
            TR
          </div>
        </div>
      </div>
      <div className="px-6 pb-3">
        <nav className="inline-flex items-center gap-1 rounded-full glass p-1">
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
      </div>
    </div>
  );
}

export function BrandMark() {
  return (
    <div className="flex items-center gap-2 font-semibold tracking-tight">
      <Radar size={20} className="text-mint" />
      Agent<span className="text-mint">Guard</span>
    </div>
  );
}
