import { Children, isValidElement } from "react";
import { PenTool, ChevronRight } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const nivelLabel: Record<"basico" | "intermedio" | "uni", string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  uni: "Nivel UNI",
};

const nivelVariant: Record<"basico" | "intermedio" | "uni", BadgeVariant> = {
  basico: "basico",
  intermedio: "intermedio",
  uni: "uni",
};

export function Solucion({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Problema({
  numero,
  nivel = "basico",
  children,
}: {
  numero: number;
  nivel?: "basico" | "intermedio" | "uni";
  children: React.ReactNode;
}) {
  const items = Children.toArray(children);
  const solucion = items.find((c) => isValidElement(c) && c.type === Solucion);
  const enunciado = items.filter((c) => c !== solucion);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-muted px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <PenTool className="size-4 text-info" strokeWidth={2.25} />
          <h4 className="font-display text-base font-semibold">Problema {numero}</h4>
        </div>
        <Badge variant={nivelVariant[nivel]}>{nivelLabel[nivel]}</Badge>
      </div>
      <div className="p-6">
        <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {enunciado}
        </div>
        {solucion && (
          <details className="group mt-4 rounded-xl border border-border bg-surface-muted open:pb-4">
            <summary className="flex cursor-pointer select-none items-center gap-1.5 px-4 py-3 text-sm font-medium text-navy-900 marker:content-none">
              <ChevronRight className="size-3.5 text-gold-600 transition-transform group-open:rotate-90" />
              Ver solución
            </summary>
            <div className="border-t border-border px-4 pt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              {solucion}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
