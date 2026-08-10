import { cn } from "@/lib/utils";

const variants = {
  neutral: "bg-surface-muted text-foreground border-border",
  gold: "bg-gold-500/15 text-gold-600 border-gold-500/30",
  navy: "bg-navy-900/10 text-navy-900 border-navy-900/20",
  basico: "bg-success/10 text-success border-success/30",
  intermedio: "bg-warning/10 text-warning border-warning/30",
  uni: "bg-danger/10 text-danger border-danger/30",
} as const;

export type BadgeVariant = keyof typeof variants;

export function Badge({
  variant = "neutral",
  className,
  ...props
}: { variant?: BadgeVariant } & React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
