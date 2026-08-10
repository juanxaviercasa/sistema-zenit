import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-navy-900 text-navy-foreground hover:bg-navy-800 focus-visible:outline-navy-900",
  gold: "bg-gold-500 text-gold-foreground shadow-[0_8px_24px_-8px_var(--color-gold-500)] hover:bg-gold-600 hover:shadow-[0_10px_28px_-6px_var(--color-gold-500)] focus-visible:outline-gold-600",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface-muted focus-visible:outline-navy-900",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonOwnProps & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonOwnProps &
  React.ComponentProps<typeof Link> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
