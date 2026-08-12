"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function digitosEnBase(n: number, base: number): number[] {
  if (n === 0) return [0];
  const digitos: number[] = [];
  let actual = n;
  while (actual > 0) {
    digitos.unshift(actual % base);
    actual = Math.floor(actual / base);
  }
  return digitos;
}

export function CriteriosEnBaseB() {
  const [base, setBase] = useState(7);
  const [n, setN] = useState(240);

  const digitos = digitosEnBase(n, base);
  const suma = digitos.reduce((s, d) => s + d, 0);
  const sumaAlternada = digitos
    .slice()
    .reverse()
    .reduce((s, d, i) => s + (i % 2 === 0 ? d : -d), 0);

  return (
    <FiguraInteractiva
      titulo="Criterios de divisibilidad generalizados a base b"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">
            {digitos.join("")}
            <span className="text-sm text-slate-400">({base})</span>
          </p>

          <div className="space-y-2">
            <div
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${suma % (base - 1) === 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400"}`}
            >
              <span className="font-medium">Divisible por {base - 1} (= b−1)</span>
              <span className="font-mono text-xs">suma de cifras = {suma}</span>
            </div>
            <div
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${((sumaAlternada % (base + 1)) + (base + 1)) % (base + 1) === 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400"}`}
            >
              <span className="font-medium">Divisible por {base + 1} (= b+1)</span>
              <span className="font-mono text-xs">suma alternada = {sumaAlternada}</span>
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Base b" valor={base} min={3} max={16} onChange={setBase} />
            <ControlDeslizante etiqueta="N (en base 10)" valor={n} min={0} max={2000} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Cifras en base b" valor={digitos.join(", ")} />
          <EstadisticaFila label="Suma de cifras" valor={suma} />
          <EstadisticaFila label="Suma alternada" valor={sumaAlternada} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En base 10, esto da los criterios ya conocidos del 9 (b−1) y del 11
            (b+1) — son el caso particular b=10 de esta misma regla general.
          </p>
        </div>
      }
      instrucciones="Cambia la base y N para ver cómo se generalizan los criterios del 9 y del 11."
    />
  );
}
