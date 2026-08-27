"use client";

/** Animated light-streak panel — echoes Voltix's "Zero-Wait Energy" image. */
export function LightStreakPanel({ accent = "#34e0a1" }: { accent?: string }) {
  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#05070a] border border-white/10">
      <div className="absolute inset-0 opacity-40 bg-grid" />
      <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="streakGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="50%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={-20 + i * 15}
            y1={260}
            x2={420 + i * 15}
            y2={-10}
            stroke="url(#streakGrad)"
            strokeWidth={i === 1 ? 3 : 1}
            className="animate-[streak_2.8s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full" style={{ background: accent }} />
    </div>
  );
}

/** Animated neural-orb panel — echoes Voltix's "Agentic Intelligence" image. */
export function NeuralOrbPanel({ accent = "#34e0a1" }: { accent?: string }) {
  const nodes = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const r = 60 + (i % 3) * 20;
    return { x: 200 + Math.cos(angle) * r, y: 125 + Math.sin(angle) * r };
  });
  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#05070a] border border-white/10">
      <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <line key={i} x1={200} y1={125} x2={n.x} y2={n.y} stroke={accent} strokeOpacity={0.25} strokeWidth={0.8} />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={2} fill={accent} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        <circle cx={200} cy={125} r={22} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.6} />
        <circle cx={200} cy={125} r={10} fill={accent} opacity={0.85} className="animate-pulse" />
      </svg>
    </div>
  );
}

/** Animated grid-flow panel — for a third rotating visual, echoes Voltix's "Grid-Aware Reliability" imagery. */
export function GridFlowPanel({ accent = "#8b7cf6" }: { accent?: string }) {
  return (
    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#05070a] border border-white/10">
      <div className="absolute inset-0 opacity-50 bg-grid" />
      <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full">
        <rect x="60" y="90" width="80" height="70" rx="6" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
        <rect x="260" y="90" width="80" height="70" rx="6" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
        <path d="M140 125 H260" stroke={accent} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />
        </path>
        <circle cx="100" cy="125" r="5" fill={accent} />
        <circle cx="300" cy="125" r="5" fill={accent} />
      </svg>
    </div>
  );
}
