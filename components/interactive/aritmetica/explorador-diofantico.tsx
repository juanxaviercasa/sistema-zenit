"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function mcd(x: number, y: number): number {
  let a = Math.abs(x);
  let b = Math.abs(y);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function hallarSolucionParticular(a: number, b: number, c: number): { x: number; y: number } | null {
  for (let x = -100; x <= 100; x++) {
    const resto = c - a * x;
    if (resto % b === 0) {
      return { x, y: resto / b };
    }
  }
  return null;
}

export function ExploradorDiofantico() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(6);
  const [c, setC] = useState(10);

  const d = mcd(a, b);
  const tieneSolucion = c % d === 0;
  const particular = tieneSolucion ? hallarSolucionParticular(a, b, c) : null;

  return (
    <FiguraInteractiva
      titulo="Ecuación diofántica ax + by = c"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-xl text-slate-900">
            {a}x + {b}y = {c}
          </p>

          <div
            className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${tieneSolucion ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
          >
            {tieneSolucion
              ? `✓ Tiene solución entera: mcd(${a},${b})=${d} divide a ${c}`
              : `✗ No tiene solución entera: mcd(${a},${b})=${d} no divide a ${c}`}
          </div>

          {particular && (
            <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
              <p>Solución particular: x₀={particular.x}, y₀={particular.y}</p>
              <p className="mt-2 text-xs text-slate-500">
                Solución general: x = {particular.x} + {b / d}t, &nbsp; y = {particular.y} − {a / d}t, &nbsp; t ∈ ℤ
              </p>
            </div>
          )}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={30} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={30} onChange={setB} />
            <ControlDeslizante etiqueta="c" valor={c} min={0} max={60} onChange={setC} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="mcd(a, b)" valor={d} />
          <EstadisticaFila label="¿Tiene solución entera?" valor={tieneSolucion ? "Sí" : "No"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            ax+by=c tiene solución entera si y solo si mcd(a,b) divide a c. Si existe
            una solución, existen infinitas — todas generadas por la fórmula general.
          </p>
        </div>
      }
      instrucciones="Ajusta a, b y c para ver si la ecuación tiene solución entera y cuál es."
    />
  );
}
