import { Mountain } from "lucide-react";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy-950 text-navy-foreground/70">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy-foreground">
            <Mountain className="size-4 text-gold-300" strokeWidth={2.5} />
            Sistema <span className="text-gold-300">Zenit</span>
          </p>
          <p className="mt-1 text-sm">
            Preparación de nivel UNI para postulantes que apuntan al punto más alto.
          </p>
        </div>
        <p className="text-xs text-navy-foreground/50">
          &copy; {new Date().getFullYear()} Sistema Zenit. Contenido en construcción.
        </p>
      </Container>
    </footer>
  );
}
