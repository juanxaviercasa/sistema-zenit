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
    <div className="my-6 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-semibold">Ejemplo {numero}</h4>
        <Badge variant={dificultadVariant[dificultad]}>
          {dificultadLabel[dificultad]}
        </Badge>
      </div>
      <div className="mt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
