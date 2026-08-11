import { cn } from "@/lib/utils";

/**
 * Figura de referencia embebida dentro de una demostración (no en la
 * sección "Visualización interactiva"): más pequeña, sin panel de datos,
 * pensada para mirarse junto al paso del razonamiento que ilustra. Usa el
 * mismo tablero JSXGraph de tema fijo claro que FiguraInteractiva.
 */
export function FiguraDemostracion({
  board,
  caption,
  className,
}: {
  board: React.ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("my-6 flex flex-col items-center", className)}>
      <div className="w-full max-w-[22rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        {board}
      </div>
      {caption && (
        <p className="mt-2 max-w-[22rem] text-center text-xs text-foreground/50">
          {caption}
        </p>
      )}
    </div>
  );
}
