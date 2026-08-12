"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function VerificadorDeCriterios() {
  const [n, setN] = useState(4356);

  const cifras = String(n).split("").map(Number);
  const sumaCifras = cifras.reduce((s, c) => s + c, 0);
  const sumaAlternada = cifras
    .slice()
    .reverse()
    .reduce((s, c, i) => s + (i % 2 === 0 ? c : -c), 0);

  const filas = [
    { criterio: "Divisible por 3", condicion: sumaCifras % 3 === 0, detalle: `suma de cifras = ${sumaCifras}` },
    { criterio: "Divisible por 9", condicion: sumaCifras % 9 === 0, detalle: `suma de cifras = ${sumaCifras}` },
    { criterio: "Divisible por 11", condicion: sumaAlternada % 11 === 0, detalle: `suma alternada = ${sumaAlternada}` },
    { criterio: "Divisible por 4", condicion: n % 4 === 0, detalle: "últimas 2 cifras ÷ 4 exacto" },
    { criterio: "Divisible por 5", condicion: n % 5 === 0, detalle: "última cifra 0 o 5" },
  ];

  return (
    <FiguraInteractiva
      titulo="Verificador de criterios de divisibilidad"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-3xl text-slate-900">{n}</p>
          <div className="space-y-2">
            {filas.map((f) => (
              <div
                key={f.criterio}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${f.condicion ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400"}`}
              >
                <span className="font-medium">{f.criterio}</span>
                <span className="font-mono text-xs">{f.condicion ? "✓" : "✗"} {f.detalle}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={0} max={99999} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Suma de cifras" valor={sumaCifras} />
          <EstadisticaFila label="Suma alternada (der. a izq.)" valor={sumaAlternada} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El criterio del 9 usa la suma de cifras porque 10 ≡ 1 (mod 9); el del 11
            usa la suma alternada porque 10 ≡ −1 (mod 11).
          </p>
        </div>
      }
      instrucciones="Ajusta N y observa qué criterios de divisibilidad cumple."
    />
  );
}
