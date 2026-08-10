import Link from "next/link";
import { Mountain } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { pruebas } from "@/lib/curriculum";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gold-500 text-gold-foreground transition-transform group-hover:scale-105">
            <Mountain className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Sistema <span className="text-gold-600">Zenit</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {pruebas.map((prueba) => (
              <Link
                key={prueba.slug}
                href={`/${prueba.slug}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {prueba.nombre}
                {!prueba.disponible && (
                  <span className="ml-1.5 text-xs text-foreground/40">
                    próx.
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="ml-1 h-5 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
