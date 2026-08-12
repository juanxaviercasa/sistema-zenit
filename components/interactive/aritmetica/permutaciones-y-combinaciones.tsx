"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function PermutacionesYCombinaciones() {
  const [n, setN] = useState(6);
  const [r, setR] = useState(3);

  const rEfectivo = Math.min(r, n);
  const variaciones = factorial(n) / factorial(n - rEfectivo);
  const combinaciones = variaciones / factorial(rEfectivo);

  return (
    <FiguraInteractiva
      titulo="Variaciones (permutaciones) y combinaciones"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: n }, (_, i) => (
              <span
                key={i}
                className={`flex aspect-square items-center justify-center rounded-md text-xs font-semibold ${i < rEfectivo ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500">
            {rEfectivo} de {n} elementos resaltados — se eligen sin repetir
          </p>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="n (total de elementos)" valor={n} min={1} max={12} onChange={setN} />
            <ControlDeslizante etiqueta="r (elementos a elegir)" valor={r} min={0} max={12} onChange={setR} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Variaciones V(n,r) = n!/(n-r)!" valor={variaciones.toLocaleString("es-PE")} />
          <EstadisticaFila label="Combinaciones C(n,r) = V(n,r)/r!" valor={combinaciones.toLocaleString("es-PE")} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En variaciones, el orden importa (AB ≠ BA); en combinaciones no (AB = BA
            cuenta una sola vez) — por eso las combinaciones son siempre menores o
            iguales que las variaciones.
          </p>
        </div>
      }
      instrucciones="Ajusta n y r y compara cuántas variaciones hay frente a cuántas combinaciones."
    />
  );
}
