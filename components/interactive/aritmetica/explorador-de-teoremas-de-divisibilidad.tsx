"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function ExploradorDeTeoremasDeDivisibilidad() {
  const [a, setA] = useState(6);
  const [k1, setK1] = useState(4);
  const [k2, setK2] = useState(7);

  const b = a * k1;
  const c = a * k2;
  const suma = b + c;
  const resta = Math.abs(b - c);

  return (
    <FiguraInteractiva
      titulo="Si a divide a b y a c, también divide a b±c"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-center font-mono text-sm">
            <p>
              {a} | {b} <span className="text-slate-400">(porque {b} = {a}×{k1})</span>
            </p>
            <p>
              {a} | {c} <span className="text-slate-400">(porque {c} = {a}×{k2})</span>
            </p>
            <div className="my-2 border-t border-slate-200" />
            <p className="text-blue-600">
              {a} | {suma} <span className="text-slate-400">({b}+{c} = {a}×{k1 + k2})</span>
            </p>
            <p className="text-blue-600">
              {a} | {resta} <span className="text-slate-400">(|{b}−{c}| = {a}×{Math.abs(k1 - k2)})</span>
            </p>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Divisor a" valor={a} min={2} max={12} onChange={setA} />
            <ControlDeslizante etiqueta="k1 (b = a×k1)" valor={k1} min={1} max={15} onChange={setK1} />
            <ControlDeslizante etiqueta="k2 (c = a×k2)" valor={k2} min={1} max={15} onChange={setK2} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="b" valor={b} />
          <EstadisticaFila label="c" valor={c} />
          <EstadisticaFila label="b + c" valor={suma} />
          <EstadisticaFila label="|b − c|" valor={resta} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Sin importar qué valores elijas, mientras a divida a b y a c, también
            dividirá exactamente a su suma y a su diferencia.
          </p>
        </div>
      }
      instrucciones="Ajusta el divisor a y los múltiplos k1, k2 para comprobar el teorema con distintos valores."
    />
  );
}
