import Link from "next/link";
import { Radar, Code2, AtSign, Link2, Mail } from "lucide-react";

const COLUMNS = [
  { heading: "Product", links: [{ label: "Overview", href: "/dashboard" }, { label: "Run Demo", href: "/dashboard/agents" }, { label: "Decisions", href: "/dashboard/runs" }] },
  { heading: "Company", links: [{ label: "About", href: "/#squad" }, { label: "Contact", href: "/contact" }, { label: "GitHub", href: "https://github.com" }] },
  { heading: "Resources", links: [{ label: "Documentation", href: "/#pipeline" }, { label: "API Health", href: "/api/health" }, { label: "Team Rocket", href: "/#squad" }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2 font-semibold tracking-tight mb-3">
              <Radar size={20} className="text-mint" />
              Agent<span className="text-mint">Guard</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              The reliability layer for the agent economy. Built by Team Rocket for the AgentGuard Agent Flight Simulator.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-medium text-foreground mb-3">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-border">
          <p className="text-xs text-muted">© 2026 AgentGuard · Team Rocket · Built for Build with भारत 2.0</p>
          <div className="flex items-center gap-3">
            {[Code2, AtSign, Link2, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-mint hover:border-mint/40 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
