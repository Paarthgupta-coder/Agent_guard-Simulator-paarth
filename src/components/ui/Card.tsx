import clsx from "clsx";

export function Card({ className, children, glow }: { className?: string; children: React.ReactNode; glow?: boolean }) {
  return <div className={clsx("glass rounded-2xl p-5", glow && "glow-mint", className)}>{children}</div>;
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
        {eyebrow && <span className="text-[11px] tracking-widest text-mint uppercase">{eyebrow}</span>}
        <h1 className="text-2xl font-semibold mt-1">{title}</h1>
        {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
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
    <div className="glass rounded-2xl p-12 text-center flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted">
        <Icon size={22} />
      </div>
      <p className="text-muted">{message}</p>
      {action}
    </div>
  );
}
