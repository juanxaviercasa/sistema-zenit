"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function TantoPorCiento() {
  const [p, setP] = useState(35);
  const [base, setBase] = useState(200);

  const tantoPorUno = p / 100;
  const tantoPorMil = p * 10;
  const parte = tantoPorUno * base;

  return (
    <FiguraInteractiva
      titulo="Tanto por ciento y tanto por uno"
      board={
        <div className="flex flex-col justify-center gap-6 px-2 py-8">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500">
              {p}% de {base}
            </p>
            <div className="h-8 w-full overflow-hidden rounded-md bg-slate-100">
              <div
                className="h-full rounded-md bg-blue-600 transition-all"
                style={{ width: `${p}%` }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <ControlDeslizante etiqueta="Porcentaje (p%)" valor={p} min={0} max={100} onChange={setP} />
            <ControlDeslizante etiqueta="Cantidad base" valor={base} min={10} max={500} step={10} onChange={setBase} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label={`${p} por ciento`} valor={`${p}%`} />
          <EstadisticaFila label="Tanto por uno" valor={tantoPorUno.toFixed(3)} />
          <EstadisticaFila label="Tanto por mil" valor={tantoPorMil.toFixed(1)} />
          <EstadisticaFila label={`${p}% de ${base}`} valor={parte.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            &quot;Tanto por ciento&quot; (p%), &quot;tanto por mil&quot; (p‰) y &quot;tanto
            por uno&quot; (p/100) son la misma proporción escrita en distintas unidades de
            referencia (100, 1000, 1).
          </p>
        </div>
      }
      instrucciones="Cambia el porcentaje y la cantidad base para ver las equivalencias y la parte resultante."
    />
  );
}
