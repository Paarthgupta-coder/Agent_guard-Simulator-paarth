import clsx from "clsx";

export function Card({ className, children, glow }: { className?: string; children: React.ReactNode; glow?: boolean }) {
  return (
    <div className={clsx("bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden transition-all duration-300", glow && "shadow-[0_0_30px_rgba(74,222,128,0.15)] border-mint/30", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
      <div>
        {eyebrow && <span className="text-[11px] font-bold tracking-widest text-mint uppercase">{eyebrow}</span>}
        <h1 className="text-3xl font-bold mt-1 text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-white/50 mt-1.5 text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  message,
  action,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-16 text-center flex flex-col items-center gap-5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet/5 blur-[80px] pointer-events-none" />
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 border border-white/5">
        <Icon size={28} />
      </div>
      <p className="text-white/50 text-sm font-medium">{message}</p>
      {action}
    </div>
  );
}
