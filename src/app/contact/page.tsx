"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wrench, Users2, Briefcase, CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const TOPICS = ["Technical question", "Team collaboration", "Judging / hackathon inquiry", "Something else"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-16">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">
              We're here to <span className="text-mint">Help &amp; Support</span>
            </h1>
            <div className="mt-10 space-y-6">
              <ContactItem icon={Wrench} text="Technical questions about the pipeline" />
              <ContactItem icon={Users2} text="Team collaboration and access" />
              <ContactItem icon={Briefcase} text="Hackathon judging and demo requests" />
            </div>

            <Card className="mt-10 italic text-foreground/85">
              &ldquo;Every module in this repo actually runs — root cause detection, auto-patch, the whole loop, live.&rdquo;
              <div className="not-italic text-sm text-muted mt-3">Team Rocket · AgentGuard</div>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-muted mb-6">
              This form is a static UI for now — no backend is wired to it yet. Reach the team directly for anything urgent.
            </p>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <CheckCircle2 size={32} className="text-mint" />
                <p className="text-foreground font-medium">Message queued</p>
                <p className="text-sm text-muted max-w-xs">This is a UI-only confirmation — wire up an API route here when you're ready to send for real.</p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" placeholder="Rishit" required />
                  <Field label="Last Name" placeholder="Goswami" required />
                </div>
                <Field label="Email" type="email" placeholder="you@example.com" required />
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Topic</label>
                  <select className="w-full bg-white/[0.03] border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-mint/50 transition-colors">
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="bg-surface">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <Field label="Message" placeholder="What's on your mind?" textarea required />
                <button type="submit" className={buttonClasses("primary", "md", "w-full")}>
                  Send Message
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}

function ContactItem({ icon: Icon, text }: { icon: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-border">
      <Icon size={16} className="text-mint shrink-0" />
      <span className="text-foreground/90 text-sm">{text}</span>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-muted mb-1.5 block">
        {label}
        {required && "*"}
      </label>
      {textarea ? (
        <textarea
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full bg-white/[0.03] border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-mint/50 transition-colors resize-none"
        />
      ) : (
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          className="w-full bg-white/[0.03] border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-mint/50 transition-colors"
        />
      )}
    </div>
  );
}
