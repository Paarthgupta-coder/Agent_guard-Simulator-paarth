import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-mint text-black hover:opacity-90 shadow-[0_0_0_1px_rgba(52,224,161,0.4)]",
  secondary: "glass text-foreground hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
  danger: "bg-rose/15 text-rose border border-rose/40 hover:bg-rose/25",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 disabled:opacity-45 disabled:cursor-not-allowed active:scale-[0.98]";

/** Shared with any element that needs to *look* like a button — e.g. a Next.js <Link>. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return clsx(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref
) {
  return (
    <button ref={ref} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
});

export default Button;
