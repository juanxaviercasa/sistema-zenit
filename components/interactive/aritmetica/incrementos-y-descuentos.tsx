"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function IncrementosYDescuentos() {
  const [base, setBase] = useState(100);
  const [p1, setP1] = useState(20);
  const [p2, setP2] = useState(-10);

  const trasP1 = base * (1 + p1 / 100);
  const trasP2 = trasP1 * (1 + p2 / 100);
  const porcentajeUnico = ((trasP2 - base) / base) * 100;

  const maxBarra = base * 1.4;

  return (
    <FiguraInteractiva
      titulo="Aumentos y descuentos sucesivos"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {[
            { etiqueta: "Valor inicial", valor: base },
            { etiqueta: `Tras ${p1 >= 0 ? "aumento" : "descuento"} de ${Math.abs(p1)}%`, valor: trasP1 },
            { etiqueta: `Tras ${p2 >= 0 ? "aumento" : "descuento"} de ${Math.abs(p2)}%`, valor: trasP2 },
          ].map((fila) => (
            <div key={fila.etiqueta} className="space-y-1">
              <p className="text-xs text-slate-500">
                {fila.etiqueta}: <span className="font-mono font-semibold">{fila.valor.toFixed(2)}</span>
              </p>
              <div className="h-6 rounded bg-blue-600" style={{ width: `${(fila.valor / maxBarra) * 100}%` }} />
            </div>
          ))}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Valor inicial" valor={base} min={20} max={200} step={10} onChange={setBase} />
            <ControlDeslizante
              etiqueta="Primer cambio (% — negativo = descuento)"
              valor={p1}
              min={-50}
              max={50}
              onChange={setP1}
            />
            <ControlDeslizante
              etiqueta="Segundo cambio (% — negativo = descuento)"
              valor={p2}
              min={-50}
              max={50}
              onChange={setP2}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Valor final" valor={trasP2.toFixed(2)} />
          <EstadisticaFila label="Cambio porcentual único equivalente" valor={`${porcentajeUnico.toFixed(2)}%`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Los porcentajes sucesivos NO se suman directamente: un +20% seguido de −10% no
            equivale a +10%, porque el segundo cambio se aplica sobre el valor ya modificado.
          </p>
        </div>
      }
      instrucciones="Ajusta el valor inicial y los dos cambios porcentuales sucesivos."
    />
  );
}
