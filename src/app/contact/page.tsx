"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lightbulb, BatteryCharging, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const TOPICS = ["Technical question", "Team collaboration", "Judging / hackathon inquiry", "Something else"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-black text-foreground relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-20">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-12">
              We're here to <br />
              <span className="text-mint">Help &amp; Support</span>
            </h1>

            <div className="space-y-6">
              <ContactItem icon={ArrowUpRight} text="Technical support for charging stations" />
              <ContactItem icon={Lightbulb} text="Billing and payment inquiries" />
              <ContactItem icon={BatteryCharging} text="Partnership and fleet integration" />
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-mint" />
              <p className="italic text-white/70 text-sm leading-relaxed mb-6">
                &ldquo;The support team at VOLTIX is incredible. Any technical issues are resolved within minutes, keeping our fleet moving.&rdquo;
              </p>
              <div className="font-semibold text-white text-sm">
                Fleet Manager <span className="text-white/40 font-normal">/ RAPID TRANSIT CORP.</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Soft backdrop panel */}
            <div className="absolute inset-0 bg-mint/10 rounded-[32px] -m-4 blur-xl" />
            
            <div className="bg-[#0a0a0a] rounded-[24px] p-8 md:p-10 border border-white/5 relative shadow-2xl">
              <h2 className="text-2xl font-semibold mb-3 text-white">Send us a message</h2>
              <p className="text-sm text-white/50 mb-8">
                Need assistance? Fill out the form below and our support team will get back to you shortly.
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-mint" />
                  </div>
                  <p className="text-white font-semibold text-lg">Message Sent</p>
                  <p className="text-sm text-white/50 max-w-xs">Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid grid-cols-2 gap-5">
                    <Field placeholder="First Name*" required />
                    <Field placeholder="Last Name*" required />
                  </div>
                  <Field type="email" placeholder="Work Email*" required />
                  <Field placeholder="Company Name*" required />
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-white/40 text-sm">+91</span>
                    <input
                      required
                      type="tel"
                      className="w-full bg-transparent border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mint/50 transition-colors"
                    />
                  </div>
                  <div>
                    <select defaultValue="" className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-white/30 appearance-none focus:outline-none focus:border-mint/50 transition-colors">
                      <option value="" disabled>Topic of inquiry</option>
                      {TOPICS.map((t) => (
                        <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-mint hover:bg-mint-dim text-black font-semibold rounded-xl py-3.5 transition-colors mt-2">
                    Send Message
                  </button>
                  <p className="text-[11px] text-white/30 text-center mt-6">
                    By clicking Send Message, you agree with VOLTIX's Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function ContactItem({ icon: Icon, text }: { icon: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-4 pb-5 border-b border-white/10">
      <Icon size={18} className="text-mint shrink-0" />
      <span className="text-white/80 text-[15px]">{text}</span>
    </div>
  );
}

function Field({
  placeholder,
  type = "text",
  required,
}: {
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mint/50 transition-colors"
    />
  );
}
