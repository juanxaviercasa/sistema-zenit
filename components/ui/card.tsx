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

export function CardLink({
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
