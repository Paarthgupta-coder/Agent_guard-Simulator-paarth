export default function AlternatingRows() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full bg-slate-50 p-6 rounded-[40px] shadow-sm border border-slate-100">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-black flex items-center justify-center">
               <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(52,224,161,0.4),transparent)] animate-[scan_2s_linear_infinite]" />
               <div className="w-full h-8 bg-mint blur-[20px] rotate-[-15deg] scale-150" />
               <div className="w-full h-2 bg-white blur-[2px] rotate-[-15deg] scale-150 relative z-10" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Zero-Wait Energy</h3>
            <p className="text-slate-500 leading-relaxed">
              Forget waiting 45 minutes to charge. Swap your depleted battery for a fully charged one in under <strong className="text-mint font-semibold">180 seconds</strong> and get back on the road instantly. Our automated pit-stop mechanism ensures you never queue for power again—it's faster than filling a gas tank.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 w-full bg-slate-50 p-6 rounded-[40px] shadow-sm border border-slate-100">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-black flex items-center justify-center">
               <div className="absolute inset-0 grid place-items-center opacity-40">
                  <div className="w-32 h-32 rounded-full border border-mint animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="w-48 h-48 rounded-full border border-mint/50 absolute animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
               </div>
               <div className="w-16 h-16 bg-mint rounded-full blur-[10px] relative z-10" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Agentic Intelligence</h3>
            <p className="text-slate-500 leading-relaxed">
              Our 5-Agent Neural Squad monitors every volt. From <strong className="text-mint font-semibold">Self-Healing</strong> broken chargers to <strong className="text-mint font-semibold">Bribing</strong> drivers to balance traffic, the system solves problems before you see them. It is not just maintenance; it is an autonomous immune system for your infrastructure.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
