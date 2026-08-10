import { Lightbulb } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const dificultadLabel: Record<"basico" | "intermedio" | "uni", string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  uni: "Nivel UNI",
};

const dificultadVariant: Record<"basico" | "intermedio" | "uni", BadgeVariant> = {
  basico: "basico",
  intermedio: "intermedio",
  uni: "uni",
};

export function EjemploResuelto({
  numero,
  dificultad = "basico",
  children,
}: {
  numero: number;
  dificultad?: "basico" | "intermedio" | "uni";
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-muted px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="size-4 text-gold-600" strokeWidth={2.25} />
          <h4 className="font-display text-base font-semibold">Ejemplo {numero}</h4>
        </div>
        <Badge variant={dificultadVariant[dificultad]}>
          {dificultadLabel[dificultad]}
        </Badge>
      </div>
      <div className="p-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
