"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function AlgoritmoDeEuclides() {
  const [a, setA] = useState(252);
  const [b, setB] = useState(105);

  const pasos: { dividendo: number; divisor: number; cociente: number; residuo: number }[] = [];
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  while (y !== 0) {
    const cociente = Math.floor(x / y);
    const residuo = x % y;
    pasos.push({ dividendo: x, divisor: y, cociente, residuo });
    x = y;
    y = residuo;
  }
  const mcd = x;
  const mcm = (a * b) / mcd;

  return (
    <FiguraInteractiva
      titulo="Algoritmo de Euclides"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-1.5 font-semibold">División</th>
                <th className="pb-1.5 font-semibold">Cociente</th>
                <th className="pb-1.5 font-semibold">Residuo</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums text-slate-900">
              {pasos.map((p, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-1">{p.dividendo} ÷ {p.divisor}</td>
                  <td className="py-1">{p.cociente}</td>
                  <td className={`py-1 font-semibold ${p.residuo === 0 ? "text-blue-600" : ""}`}>
                    {p.residuo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={500} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={500} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="MCD(a, b)" valor={mcd} />
          <EstadisticaFila label="MCM(a, b)" valor={mcm} />
          <EstadisticaFila label="MCD × MCM" valor={mcd * mcm} />
          <EstadisticaFila label="a × b" valor={a * b} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El MCD es el último residuo no nulo de la cadena de divisiones. Nota que
            MCD × MCM siempre coincide con a × b.
          </p>
        </div>
      }
      instrucciones="Ajusta a y b para ver cada división del algoritmo de Euclides hasta llegar al MCD."
    />
  );
}
