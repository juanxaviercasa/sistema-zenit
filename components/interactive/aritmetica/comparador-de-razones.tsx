"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante, mcd } from "./controles";

export function ComparadorDeRazones() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(8);

  const maxBarra = 20;
  const d = mcd(a, b);

  return (
    <FiguraInteractiva
      titulo="Razón entre dos cantidades"
      board={
        <div className="flex flex-col justify-center gap-6 px-2 py-6">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500">a = {a}</p>
            <div className="h-8 rounded-md bg-blue-600" style={{ width: `${(a / maxBarra) * 100}%` }} />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500">b = {b}</p>
            <div className="h-8 rounded-md bg-amber-500" style={{ width: `${(b / maxBarra) * 100}%` }} />
          </div>
          <div className="mt-2 space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={maxBarra} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={maxBarra} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Razón aritmética (a − b)" valor={a - b} />
          <EstadisticaFila label="Razón geométrica (a ÷ b)" valor={(a / b).toFixed(2)} />
          <EstadisticaFila label="a : b en términos mínimos" valor={`${a / d} : ${b / d}`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La razón aritmética mide cuánto más tiene a que b (una diferencia). La razón
            geométrica mide cuántas veces contiene a a b (un cociente).
          </p>
        </div>
      }
      instrucciones="Arrastra los sliders para cambiar a y b, y observa cómo cambian ambas razones."
    />
  );
}
