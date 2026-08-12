"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const OPERACIONES = [
  { etiqueta: "A ∪ B (unión)", notacion: "A ∪ B", masks: ["maskA", "maskB"] },
  { etiqueta: "A ∩ B (intersección)", notacion: "A ∩ B", masks: ["maskAyB"] },
  { etiqueta: "A − B (diferencia)", notacion: "A − B", masks: ["maskAmenosB"] },
  { etiqueta: "B − A (diferencia)", notacion: "B − A", masks: ["maskBmenosA"] },
  { etiqueta: "A Δ B (diferencia simétrica)", notacion: "A Δ B", masks: ["maskAmenosB", "maskBmenosA"] },
  { etiqueta: "A' (complemento de A)", notacion: "A'", masks: ["maskNotA"] },
];

export function DiagramaDeVenn() {
  const [indice, setIndice] = useState(1);
  const op = OPERACIONES[indice];

  return (
    <FiguraInteractiva
      titulo="Diagrama de Venn: operaciones entre conjuntos"
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
            <text x="30" y="40" className="fill-slate-400 text-[13px]">U</text>

            {op.masks.map((m) => (
              <rect key={m} x="0" y="0" width="400" height="260" fill="#3b82f6" fillOpacity="0.55" mask={`url(#${m})`} />
            ))}

            <circle cx="160" cy="130" r="90" fill="none" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="240" cy="130" r="90" fill="none" stroke="#1e293b" strokeWidth="1.5" />
            <text x="105" y="80" className="fill-slate-700 text-[16px] font-semibold">A</text>
            <text x="285" y="80" className="fill-slate-700 text-[16px] font-semibold">B</text>
          </svg>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Operación"
              valor={indice}
              min={0}
              max={OPERACIONES.length - 1}
              onChange={setIndice}
              formato={() => op.etiqueta}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Operación" valor={op.notacion} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La región sombreada en azul es exactamente el conjunto resultante de la operación
            elegida. El rectángulo representa el conjunto universal U.
          </p>
        </div>
      }
      instrucciones="Elige una operación para ver qué región del diagrama de Venn representa."
    />
  );
}
