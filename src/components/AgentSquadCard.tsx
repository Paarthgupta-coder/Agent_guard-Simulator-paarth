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
    <div className="glass rounded-2xl p-5 flex flex-col gap-4 hover:glow-mint transition-shadow">
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon size={20} />
        </div>
        <span
          className="text-[11px] px-2 py-0.5 rounded-full border"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          {level}
        </span>
      </div>
      <div>
        <div className="font-medium text-foreground">{name}</div>
        <p className="text-sm text-muted mt-1 italic">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  );
}
