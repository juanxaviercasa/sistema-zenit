import Link from "next/link";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

interface CardLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  /** Color CSS (p. ej. "var(--color-geometria)") usado en el borde/realce al hacer hover. */
  accent?: string;
}

export function CardLink({
  className,
  href,
  accent = "var(--color-gold-500)",
  style,
  children,
  ...props
}: CardLinkProps) {
  return (
    <Link
      href={href}
      style={{ ["--card-accent" as string]: accent, ...style }}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:border-[color:var(--card-accent)]/50 hover:shadow-xl",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[color:var(--card-accent)] transition-transform duration-200 ease-out group-hover:scale-x-100"
      />
      {children}
    </Link>
  );
}
