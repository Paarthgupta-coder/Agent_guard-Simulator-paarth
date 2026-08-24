import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import Badge from "./ui/Badge";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ScenarioCard({ icon: Icon, title, subtitle, badge, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full text-left rounded-2xl p-4 flex items-center justify-between gap-3 transition-all duration-150 border",
        active ? "bg-mint/10 border-mint/40" : "glass border-border hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={clsx("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", active ? "bg-mint/20 text-mint" : "bg-white/5 text-muted")}>
          <Icon size={18} />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="text-xs text-muted">{subtitle}</div>
        </div>
      </div>
      <Badge tone={active ? "mint" : "muted"}>{badge}</Badge>
    </button>
  );
}
