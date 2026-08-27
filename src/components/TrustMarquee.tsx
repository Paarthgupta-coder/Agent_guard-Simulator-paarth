const ITEMS = ["Next.js", "MongoDB", "Socket.IO", "OpenAI", "Redis", "Vercel", "TypeScript", "Tailwind"];

export default function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-border py-8 overflow-hidden">
      <p className="text-center text-[11px] tracking-widest text-muted mb-6">BUILT ON A REAL, PRODUCTION-GRADE STACK</p>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-16 animate-marquee">
          {loop.map((item, i) => (
            <span key={i} className="text-xl font-semibold text-foreground/30 whitespace-nowrap shrink-0">
              {item}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
}
