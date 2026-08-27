import Link from "next/link";
import { Radar, ArrowRight, Code2, AtSign, Link2, Mail } from "lucide-react";

const COLUMNS = [
  { heading: "Product", links: [{ label: "Overview", href: "/dashboard" }, { label: "Run Demo", href: "/dashboard/agents" }, { label: "Decisions", href: "/dashboard/runs" }] },
  { heading: "Company", links: [{ label: "About", href: "/#squad" }, { label: "Contact", href: "/contact" }, { label: "GitHub", href: "https://github.com" }] },
  { heading: "Resources", links: [{ label: "Documentation", href: "/#pipeline" }, { label: "API Health", href: "/api/health" }, { label: "Team Rocket", href: "/#squad" }] },
];

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-50" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-mint/20 blur-3xl opacity-30 rounded-full" />
      
      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-[1.5fr_2fr] gap-12 lg:gap-8">
          
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-semibold tracking-tight text-white mb-4 text-xl">
                <Radar size={24} className="text-mint" />
                Agent<span className="text-mint">Guard</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-6">
                The reliability layer for the agent economy. Engineered to ensure AI acts flawlessly before real customers encounter it.
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-4">Stay Updated</h4>
              <div className="flex items-center max-w-sm relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-mint/50 focus:bg-white/10 transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 aspect-square bg-mint text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-semibold text-white mb-5">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-20 pt-8 border-t border-white/10">
          <p className="text-[11px] tracking-wide text-white/40">
            © 2026 AgentGuard · Team Rocket · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Code2, AtSign, Link2, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-white/40 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
