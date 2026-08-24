import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tone = "mint" | "amber" | "rose" | "violet" | "sky" | "muted";

const TONE_CLASSES: Record<Tone, string> = {
  mint: "border-mint/40 text-mint",
  amber: "border-amber/40 text-amber",
  rose: "border-rose/40 text-rose",
  violet: "border-violet/40 text-violet",
  sky: "border-sky-400/40 text-sky-400",
  muted: "border-border text-muted",
};

interface Props {
  tone?: Tone;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ tone = "muted", icon: Icon, children, className }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border w-fit",
        TONE_CLASSES[tone],
        className
      )}
    >
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}
