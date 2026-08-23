"use client";

interface Props {
  label: string;
  value: number; // 0-100
  color: string;
  sublabel?: string;
}

export default function ScoreDonut({ label, value, color, sublabel }: Props) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(value, 0), 100) / 100) * c;

  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
          <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="72"
            cy="72"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold" style={{ color }}>
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
