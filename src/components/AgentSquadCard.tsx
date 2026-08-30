import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  name: string;
  quote: string;
  level: string;
  accent: string;
  index?: number;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", // Simulator
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", // Generator
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop", // Stress Tester (Server Room)
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", // Executor
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", // Evaluator
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop", // Learner
];

export default function AgentSquadCard({ icon: Icon, name, quote, level, accent, index = 0 }: Props) {
  const imageUrl = IMAGES[index % IMAGES.length];

  return (
    <div 
      className="bg-[#050505] border border-white/10 rounded-[32px] p-2 flex flex-col hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-300 group"
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      
      {/* High-res Image Container */}
      <div className="w-full h-48 bg-[#111] rounded-[24px] mb-6 overflow-hidden relative border border-white/5">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
        />
        
        {/* Crisp Top-Right Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest border border-white/10 uppercase shadow-lg transition-colors duration-300 group-hover:text-[var(--card-accent)] text-white">
          {level}
        </div>

        {/* Icon overlay bottom-left */}
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 group-hover:text-[var(--card-accent)] text-white">
          <Icon size={18} />
        </div>
      </div>

      {/* Structured Content Area */}
      <div className="px-4 pb-4">
        <h3 className="font-bold text-xl mb-2 tracking-tight transition-colors duration-300 group-hover:text-[var(--card-accent)] text-white">
          {name}
        </h3>
        <p className="text-[14px] leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-white/70 text-white/50">
          {quote}
        </p>
      </div>

    </div>
  );
}
