"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

type Formula = {
  etiqueta: string;
  evaluar: (p: boolean, q: boolean) => boolean;
};

const FORMULAS: Formula[] = [
  { etiqueta: "p ∧ q", evaluar: (p, q) => p && q },
  { etiqueta: "p ∨ q", evaluar: (p, q) => p || q },
  { etiqueta: "p ⊕ q (disyunción exclusiva)", evaluar: (p, q) => p !== q },
  { etiqueta: "p → q (condicional)", evaluar: (p, q) => !p || q },
  { etiqueta: "p ↔ q (bicondicional)", evaluar: (p, q) => p === q },
  { etiqueta: "¬p", evaluar: (p) => !p },
  { etiqueta: "p ∨ ¬p", evaluar: (p) => p || !p },
  { etiqueta: "p ∧ ¬p", evaluar: (p) => p && !p },
  { etiqueta: "(p → q) ↔ (¬p ∨ q)", evaluar: (p, q) => (!p || q) === (!p || q) },
  { etiqueta: "¬(p ∧ q) ↔ (¬p ∨ ¬q)", evaluar: (p, q) => !(p && q) === (!p || !q) },
];

function vf(b: boolean) {
  return b ? "V" : "F";
}

export function EvaluadorDeFormulas() {
  const [indice, setIndice] = useState(3);
  const formula = FORMULAS[indice];

  const filas = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false },
  ].map((f) => ({ ...f, r: formula.evaluar(f.p, f.q) }));

  const todasVerdaderas = filas.every((f) => f.r);
  const todasFalsas = filas.every((f) => !f.r);
  const clasificacion = todasVerdaderas
    ? "Tautología"
    : todasFalsas
      ? "Contradicción"
      : "Contingencia";

  return (
    <FiguraInteractiva
      titulo="Evaluador de fórmulas lógicas"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-xl text-slate-900">{formula.etiqueta}</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="px-3 py-1.5 text-left font-normal">p</th>
                  <th className="px-3 py-1.5 text-left font-normal">q</th>
                  <th className="px-3 py-1.5 text-left font-normal">{formula.etiqueta}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {filas.map((f, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-3 py-1.5">{vf(f.p)}</td>
                    <td className="px-3 py-1.5">{vf(f.q)}</td>
                    <td
                      className={`px-3 py-1.5 font-semibold ${f.r ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {vf(f.r)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Fórmula"
              valor={indice}
              min={0}
              max={FORMULAS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${FORMULAS.length}`}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Fórmula" valor={formula.etiqueta} />
          <EstadisticaFila label="Filas verdaderas" valor={filas.filter((f) => f.r).length} />
          <EstadisticaFila label="Clasificación" valor={clasificacion} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Tautología: verdadera en las 4 filas. Contradicción: falsa en las 4 filas.
            Contingencia: verdadera en algunas y falsa en otras.
          </p>
        </div>
      }
      instrucciones="Elige una fórmula para ver su tabla de verdad completa y su clasificación."
    />
  );
}
