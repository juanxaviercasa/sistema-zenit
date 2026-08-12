"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const CONJUNTOS = [
  {
    nombre: "A",
    comprension: "{x ∈ N : x es par, 2 ≤ x ≤ 10}",
    extension: [2, 4, 6, 8, 10],
    tipo: "Finito",
  },
  {
    nombre: "B",
    comprension: "{x ∈ N : x < 0}",
    extension: [] as number[],
    tipo: "Vacío (∅)",
  },
  {
    nombre: "C",
    comprension: "{x ∈ N : x + 2 = 5}",
    extension: [3],
    tipo: "Unitario",
  },
  {
    nombre: "D",
    comprension: "{x ∈ N : x ≤ 10} — universo relativo de este ejemplo",
    extension: Array.from({ length: 11 }, (_, i) => i),
    tipo: "Universal (relativo)",
  },
];

export function DeterminacionDeConjuntos() {
  const [indice, setIndice] = useState(0);
  const [x, setX] = useState(4);
  const conjunto = CONJUNTOS[indice];
  const pertenece = conjunto.extension.includes(x);

  return (
    <FiguraInteractiva
      titulo="Determinación de conjuntos y pertenencia"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              {conjunto.nombre} = {conjunto.comprension} <span className="text-slate-400">(por comprensión)</span>
            </p>
            <p className="mt-1">
              {conjunto.nombre} = {"{"}
              {conjunto.extension.join(", ")}
              {"}"} <span className="text-slate-400">(por extensión)</span>
            </p>
          </div>

          <svg viewBox="0 0 400 180" className="w-full">
            <rect x="20" y="10" width="360" height="160" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="30" y="28" className="fill-slate-400 text-[12px]">N</text>
            <circle cx="200" cy="95" r="70" fill="#3b82f6" fillOpacity="0.12" stroke="#1e293b" strokeWidth="1.5" />
            <text x="192" y="35" className="fill-slate-700 text-[14px] font-semibold">
              {conjunto.nombre}
            </text>
            {conjunto.extension.slice(0, 12).map((n, i) => {
              const angulo = (i / Math.max(conjunto.extension.length, 1)) * 2 * Math.PI;
              const cx = 200 + 40 * Math.cos(angulo);
              const cy = 95 + 40 * Math.sin(angulo);
              return (
                <text key={n} x={cx} y={cy} textAnchor="middle" className="fill-slate-600 text-[11px]">
                  {n}
                </text>
              );
            })}
            <circle
              cx={pertenece ? 200 : 330}
              cy={pertenece ? 95 : 95}
              r="6"
              fill={pertenece ? "#059669" : "#ef4444"}
            />
            <text
              x={pertenece ? 200 : 330}
              y={pertenece ? 75 : 75}
              textAnchor="middle"
              className="fill-slate-700 text-[12px] font-semibold"
            >
              x={x}
            </text>
          </svg>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Conjunto"
              valor={indice}
              min={0}
              max={CONJUNTOS.length - 1}
              onChange={setIndice}
              formato={() => conjunto.nombre}
            />
            <ControlDeslizante etiqueta="x a probar" valor={x} min={0} max={12} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Conjunto" valor={conjunto.nombre} />
          <EstadisticaFila label="Clasificación" valor={conjunto.tipo} />
          <EstadisticaFila label="Cardinal" valor={conjunto.extension.length} />
          <EstadisticaFila
            label={`¿${x} ∈ ${conjunto.nombre}?`}
            valor={pertenece ? "Sí" : "No"}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Todo conjunto se puede describir por extensión (listando sus elementos) o por
            comprensión (una propiedad que los caracteriza).
          </p>
        </div>
      }
      instrucciones="Elige un conjunto y un valor de x para probar su pertenencia, y observa su clasificación."
    />
  );
}
