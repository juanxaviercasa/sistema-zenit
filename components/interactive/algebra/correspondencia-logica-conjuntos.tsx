"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

type Tipo = "inclusion" | "igualdad" | "shading";

type Correspondencia = {
  conjuntos: string;
  logica: string;
  tipo: Tipo;
  mascaras?: string[];
  evaluar: (p: boolean, q: boolean) => boolean;
};

const CORRESPONDENCIAS: Correspondencia[] = [
  {
    conjuntos: "A ⊆ B",
    logica: "p → q",
    tipo: "inclusion",
    evaluar: (p, q) => !p || q,
  },
  {
    conjuntos: "A = B",
    logica: "p ↔ q",
    tipo: "igualdad",
    evaluar: (p, q) => p === q,
  },
  {
    conjuntos: "A' (complemento)",
    logica: "¬p",
    tipo: "shading",
    mascaras: ["maskNotA"],
    evaluar: (p) => !p,
  },
  {
    conjuntos: "A ∩ B",
    logica: "p ∧ q",
    tipo: "shading",
    mascaras: ["maskAyB"],
    evaluar: (p, q) => p && q,
  },
  {
    conjuntos: "A ∪ B",
    logica: "p ∨ q",
    tipo: "shading",
    mascaras: ["maskA", "maskB"],
    evaluar: (p, q) => p || q,
  },
  {
    conjuntos: "A − B",
    logica: "p ∧ ¬q",
    tipo: "shading",
    mascaras: ["maskAmenosB"],
    evaluar: (p, q) => p && !q,
  },
  {
    conjuntos: "A Δ B",
    logica: "p ⊕ q",
    tipo: "shading",
    mascaras: ["maskAmenosB", "maskBmenosA"],
    evaluar: (p, q) => p !== q,
  },
];

function vf(b: boolean) {
  return b ? "V" : "F";
}

export function CorrespondenciaLogicaConjuntos() {
  const [indice, setIndice] = useState(3);
  const c = CORRESPONDENCIAS[indice];

  const filas = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false },
  ].map((f) => ({ ...f, r: c.evaluar(f.p, f.q) }));

  return (
    <FiguraInteractiva
      titulo="Correspondencia entre proposiciones y conjuntos"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <svg viewBox="0 0 400 260" className="w-full">
            <defs>
              <mask id="maskA">
                <rect x="0" y="0" width="400" height="260" fill="black" />
                <circle cx="160" cy="130" r="90" fill="white" />
              </mask>
              <mask id="maskB">
                <rect x="0" y="0" width="400" height="260" fill="black" />
                <circle cx="240" cy="130" r="90" fill="white" />
              </mask>
              <mask id="maskNotA">
                <rect x="20" y="20" width="360" height="220" fill="white" />
                <circle cx="160" cy="130" r="90" fill="black" />
              </mask>
              <mask id="maskNotB">
                <rect x="20" y="20" width="360" height="220" fill="white" />
                <circle cx="240" cy="130" r="90" fill="black" />
              </mask>
              <mask id="maskAyB">
                <g mask="url(#maskA)">
                  <rect x="0" y="0" width="400" height="260" fill="white" mask="url(#maskB)" />
                </g>
              </mask>
              <mask id="maskAmenosB">
                <g mask="url(#maskA)">
                  <rect x="0" y="0" width="400" height="260" fill="white" mask="url(#maskNotB)" />
                </g>
              </mask>
              <mask id="maskBmenosA">
                <g mask="url(#maskB)">
                  <rect x="0" y="0" width="400" height="260" fill="white" mask="url(#maskNotA)" />
                </g>
              </mask>
            </defs>

            <rect x="20" y="20" width="360" height="220" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />

            {c.tipo === "inclusion" && (
              <>
                <circle cx="200" cy="130" r="90" fill="#3b82f6" fillOpacity="0.12" stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="200" cy="130" r="45" fill="#3b82f6" fillOpacity="0.55" stroke="#1e293b" strokeWidth="1.5" />
                <text x="192" y="100" className="fill-slate-700 text-[16px] font-semibold">A</text>
                <text x="270" y="60" className="fill-slate-700 text-[16px] font-semibold">B</text>
              </>
            )}

            {c.tipo === "igualdad" && (
              <>
                <circle cx="200" cy="130" r="80" fill="#3b82f6" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
                <text x="185" y="135" className="fill-slate-700 text-[16px] font-semibold">A = B</text>
              </>
            )}

            {c.tipo === "shading" && (
              <>
                {c.mascaras!.map((m) => (
                  <rect key={m} x="0" y="0" width="400" height="260" fill="#3b82f6" fillOpacity="0.55" mask={`url(#${m})`} />
                ))}
                <circle cx="160" cy="130" r="90" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="240" cy="130" r="90" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                <text x="105" y="80" className="fill-slate-700 text-[16px] font-semibold">A</text>
                <text x="285" y="80" className="fill-slate-700 text-[16px] font-semibold">B</text>
              </>
            )}
          </svg>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-center font-mono text-sm">
            <p className="text-slate-700">{c.conjuntos}</p>
            <p className="text-slate-700">{c.logica}</p>
          </div>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400">
                <th className="px-3 py-1.5 text-left font-normal">p</th>
                <th className="px-3 py-1.5 text-left font-normal">q</th>
                <th className="px-3 py-1.5 text-left font-normal">{c.logica}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-slate-700">
              {filas.map((f, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-1.5">{vf(f.p)}</td>
                  <td className="px-3 py-1.5">{vf(f.q)}</td>
                  <td className={`px-3 py-1.5 font-semibold ${f.r ? "text-emerald-600" : "text-red-500"}`}>
                    {vf(f.r)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Correspondencia"
              valor={indice}
              min={0}
              max={CORRESPONDENCIAS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${CORRESPONDENCIAS.length}`}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Conjuntos" valor={c.conjuntos} />
          <EstadisticaFila label="Lógica" valor={c.logica} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada operación entre conjuntos tiene una operación lógica análoga: &quot;pertenecer a la
            región sombreada&quot; equivale exactamente a que la fórmula lógica sea verdadera.
          </p>
        </div>
      }
      instrucciones="Elige una correspondencia para ver el diagrama de Venn y la tabla de verdad análoga, lado a lado."
    />
  );
}
