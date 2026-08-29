import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Basic",
    price: "$29",
    description: "Perfect for small businesses and individuals.",
    features: ["3 Pages", "Basic SEO", "Email Support", "Responsive Design"],
    button: "Choose Basic",
  },
  {
    name: "Standard",
    price: "$59",
    description: "Best for growing businesses with more needs.",
    features: ["10 Pages", "Advanced SEO", "CMS Integration", "24/7 Chat Support"],
    button: "Choose Standard",
    popular: true,
  },
  {
    name: "Pro",
    price: "$99",
    description: "Ideal for larger businesses that need scalability.",
    features: ["Unlimited Pages", "E-commerce Integration", "Priority Support", "Custom API Integration"],
    button: "Choose Pro",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-[#050505] text-white py-24 rounded-t-[40px]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium">Pricing</span>
          <h2 className="text-3xl md:text-4xl mt-4 font-semibold text-white/90">Select the plan that best suits your needs.</h2>
          <div className="mt-8 inline-flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button className="px-6 py-2 rounded-full bg-white/10 text-sm font-medium">Monthly</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2">
              Yearly <span className="bg-mint/20 text-mint text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors flex flex-col">
              <div className="flex justify-center mb-4">
                <span className="bg-mint text-black text-xs font-bold px-3 py-1 rounded-full">{plan.name}</span>
              </div>
              <div className="text-center mb-2">
                <span className="text-3xl font-bold text-mint">{plan.price}</span>
                <span className="text-mint/60">/month</span>
              </div>
              <p className="text-sm text-white/50 text-center mb-8 h-10">{plan.description}</p>
              
              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <Check size={16} className="text-white/40" />
                    {f}
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-mint hover:bg-mint/90 text-black font-semibold rounded-lg py-3 transition-colors">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
