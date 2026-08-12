"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const DIVIDENDOS = [
  { nombre: "x³ − 6x² + 11x − 6", coefs: [1, -6, 11, -6] },
  { nombre: "2x³ + 3x² − 8x + 3", coefs: [2, 3, -8, 3] },
  { nombre: "x⁴ − 5x² + 4", coefs: [1, 0, -5, 0, 4] },
];

function cocienteTexto(coefs: number[]): string {
  const grado = coefs.length - 1;
  if (grado < 0) return "0";
  const partes: string[] = [];
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const exp = grado - i;
    const abs = Math.abs(c);
    const signo = c < 0 ? "−" : partes.length === 0 ? "" : "+ ";
    const num = abs === 1 && exp !== 0 ? "" : `${abs}`;
    const variable = exp === 0 ? "" : exp === 1 ? "x" : `x^${exp}`;
    partes.push(`${signo}${num}${variable}`);
  });
  return partes.length === 0 ? "0" : partes.join(" ");
}

export function DivisionDePolinomios() {
  const [indice, setIndice] = useState(0);
  const [r, setR] = useState(1);
  const dividendo = DIVIDENDOS[indice];

  const b: number[] = [dividendo.coefs[0]];
  for (let i = 1; i < dividendo.coefs.length; i++) {
    b.push(dividendo.coefs[i] + r * b[i - 1]);
  }
  const residuo = b[b.length - 1];
  const cociente = b.slice(0, -1);

  return (
    <FiguraInteractiva
      titulo="División de polinomios (Ruffini)"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            ({dividendo.nombre}) ÷ (x − {r})
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  {dividendo.coefs.map((_, i) => (
                    <th key={i} className="px-2 py-1 text-left font-normal">
                      {i === 0 ? "coef." : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                <tr className="border-b border-slate-100">
                  {dividendo.coefs.map((c, i) => (
                    <td key={i} className="px-2 py-1">
                      {c}
                    </td>
                  ))}
                </tr>
                <tr>
                  {b.map((v, i) => (
                    <td key={i} className={`px-2 py-1 ${i === b.length - 1 ? "font-semibold text-blue-600" : ""}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            <p>Cociente: {cocienteTexto(cociente)}</p>
            <p>Residuo: {residuo}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Dividendo"
              valor={indice}
              min={0}
              max={DIVIDENDOS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${DIVIDENDOS.length}`}
            />
            <ControlDeslizante etiqueta="r (divisor x−r)" valor={r} min={-5} max={5} onChange={setR} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Dividendo" valor={dividendo.nombre} />
          <EstadisticaFila label="Divisor" valor={`x − ${r}`} />
          <EstadisticaFila label="Cociente" valor={cocienteTexto(cociente)} />
          <EstadisticaFila label="Residuo" valor={residuo} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El residuo de dividir P(x) entre (x−r) es siempre igual a P(r) — es el teorema del
            resto, del siguiente subtema.
          </p>
        </div>
      }
      instrucciones="Elige un dividendo y el valor r del divisor (x−r) para ver la división sintética paso a paso."
    />
  );
}
