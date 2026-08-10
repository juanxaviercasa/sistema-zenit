import { Children, isValidElement } from "react";
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
    <div className="my-6 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-semibold">Problema {numero}</h4>
        <Badge variant={nivelVariant[nivel]}>{nivelLabel[nivel]}</Badge>
      </div>
      <div className="mt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {enunciado}
      </div>
      {solucion && (
        <details className="group mt-4 rounded-xl border border-border bg-surface-muted open:pb-4">
          <summary className="cursor-pointer select-none list-none px-4 py-3 text-sm font-medium text-navy-900 marker:content-none">
            <span className="inline-flex items-center gap-2">
              <span className="text-gold-600 transition-transform group-open:rotate-90">
                ▶
              </span>
              Ver solución
            </span>
          </summary>
          <div className="border-t border-border px-4 pt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {solucion}
          </div>
        </details>
      )}
    </div>
  );
}
