import Link from "next/link";
import { Container } from "@/components/ui/container";
import { pruebas } from "@/lib/curriculum";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight">
            Sistema <span className="text-gold-600">Zenit</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {pruebas.map((prueba) => (
            <Link
              key={prueba.slug}
              href={prueba.disponible ? `/${prueba.slug}` : `/${prueba.slug}`}
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
      </Container>
    </header>
  );
}
