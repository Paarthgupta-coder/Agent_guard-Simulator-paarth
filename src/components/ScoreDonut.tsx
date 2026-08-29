"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  label: string;
  value: number; // 0-100
  color: string;
  sublabel?: string;
  icon?: LucideIcon;
  trend?: number;
}

export default function ScoreDonut({ label, value, color, sublabel, icon: Icon, trend }: Props) {
  const r = 50;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(value, 0), 100) / 100) * c;

  return (
    <div className="flex flex-col gap-3 h-full justify-center">
      {(Icon || trend !== undefined) && (
        <div className="flex items-center justify-between">
          {Icon ? (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}22`, color }}>
              <Icon size={15} />
            </div>
          ) : (
            <span />
          )}
          {trend !== undefined && (
            <span className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-mint" : "text-rose"}`}>
              {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {trend >= 0 ? "+" : ""}
              {trend}%
            </span>
          )}
        </div>
      )}
      <div className="relative w-32 h-32 mx-auto">
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold" style={{ color }}>
            {value}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {sublabel && <div className="text-xs text-muted mt-0.5">{sublabel}</div>}
      </div>
    </div>
  );
}
