"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Bell, Moon, Radar, Database, Cpu, PanelLeft } from "lucide-react";
import clsx from "clsx";
import Badge from "./ui/Badge";
import { useSidebar } from "./SidebarProvider";

const TABS = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/agents", label: "Agents" },
  { href: "/dashboard/runs", label: "Decisions" },
  { href: "/dashboard/notifications", label: "Notifications" },
];

interface Health {
  storage: "mongodb" | "memory";
  agentMode: "live-model" | "mock-agent";
}

export default function Topbar() {
  const pathname = usePathname();
  const [health, setHealth] = useState<Health | null>(null);
  const { toggle } = useSidebar();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => !cancelled && setHealth(d))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="border-b border-border">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={toggle} className="p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors shrink-0">
            <PanelLeft size={20} />
          </button>
          <span className="text-lg font-semibold ml-1">
            Welcome <span className="text-white">User !</span>
          </span>
          {health && (
            <div className="hidden lg:flex items-center gap-2">
              <Badge tone={health.storage === "mongodb" ? "mint" : "muted"} icon={Database}>
                {health.storage === "mongodb" ? "MongoDB" : "In-memory"}
              </Badge>
              <Badge tone={health.agentMode === "live-model" ? "violet" : "muted"} icon={Cpu}>
                {health.agentMode === "live-model" ? "Live model" : "Mock agent"}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-muted">
          <Link href="/contact" title="Contact" className="hover:text-foreground transition-colors">
            <MessageSquare size={18} />
          </Link>
          <Bell size={18} className="hover:text-foreground transition-colors cursor-pointer" />
          <Moon size={18} className="hover:text-foreground transition-colors cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-mint/20 text-mint flex items-center justify-center text-xs font-semibold">TR</div>
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
                  "px-4 py-1.5 rounded-full text-sm transition-all duration-150",
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
