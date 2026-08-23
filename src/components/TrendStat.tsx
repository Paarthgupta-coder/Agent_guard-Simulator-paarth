import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel: string;
  trend?: number;
  color: string;
}

export default function TrendStat({ icon: Icon, label, value, sublabel, trend, color }: Props) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}22`, color }}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-mint" : "text-rose"}`}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold text-foreground">{value}</div>
      <div className="text-sm text-foreground/80 mt-1">{label}</div>
      <div className="text-xs text-muted mt-0.5">{sublabel}</div>
    </div>
  );
}
