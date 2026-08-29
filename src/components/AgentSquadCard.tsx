import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  name: string;
  quote: string;
  level: string;
  accent: string;
}

export default function AgentSquadCard({ icon: Icon, name, quote, level, accent }: Props) {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] pointer-events-none transition-opacity opacity-20 group-hover:opacity-60" style={{ background: accent }} />
      <div className="flex items-center justify-between relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110"
          style={{ background: `${accent}15`, color: accent }}
        >
          <Icon size={22} />
        </div>
        <span
          className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border bg-black/50"
          style={{ borderColor: `${accent}40`, color: accent }}
        >
          {level}
        </span>
      </div>
      <div className="relative z-10 pt-2">
        <div className="font-semibold text-lg text-white mb-2">{name}</div>
        <p className="text-[13px] leading-relaxed text-white/50">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  );
}
