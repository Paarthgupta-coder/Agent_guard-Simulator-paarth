export default function TrustMarquee() {
  const logos = [
    <span key="cursor" className="font-semibold text-2xl tracking-tighter text-white opacity-80">CURSOR</span>,
    <span key="gemini" className="font-medium text-2xl tracking-tight text-blue-400 opacity-90">Gemini</span>,
    <span key="github" className="font-bold text-2xl tracking-tight text-white opacity-90">GitHub</span>,
    <span key="grok" className="font-semibold text-2xl tracking-tight text-white opacity-90"><span className="font-light italic mr-1">Ø</span>Grok</span>,
    <span key="google" className="font-medium text-2xl tracking-tight opacity-90">
      <span className="text-blue-500">G</span>
      <span className="text-red-500">o</span>
      <span className="text-yellow-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </span>
  ];
  
  const loop = [...logos, ...logos, ...logos];

  return (
    <div className="py-20 overflow-hidden bg-black">
      <p className="text-center text-xs tracking-[0.2em] text-muted mb-12">TRUSTED BY THE WORLD'S MOST CREATIVE COMPANIES.</p>
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <div className="flex w-max gap-20 animate-marquee items-center justify-center">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              {item}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>
    </div>
  );
}
