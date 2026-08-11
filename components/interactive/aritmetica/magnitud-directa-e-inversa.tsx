"use client";

import { useState } from "react";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";
import { ControlDeslizante } from "./controles";

const NAVY = "var(--color-navy-900)";
const GOLD_STROKE = "var(--color-gold-600)";

export function MagnitudDirectaEInversa() {
  const [inversa, setInversa] = useState(false);
  const [k, setK] = useState(4);
  const [x, setX] = useState(4);

  const y = inversa ? k / x : k * x;

  return (
    <FiguraInteractiva
      titulo="Interpretación gráfica: DP vs. IP"
      board={
        <div className="flex flex-col gap-4 px-2 py-4">
          <div className="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInversa(false)}
              className={`rounded-full px-3 py-1.5 transition-colors ${!inversa ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Directamente proporcionales
            </button>
            <button
              type="button"
              onClick={() => setInversa(true)}
              className={`rounded-full px-3 py-1.5 transition-colors ${inversa ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Inversamente proporcionales
            </button>
          </div>

          <JSXGraphBoard
            key={`${inversa}-${k}`}
            axis
            boundingBox={[-1, 22, 12, -2]}
            onMount={(board) => {
              createEl(
                board,
                "functiongraph",
                [inversa ? (t: number) => k / t : (t: number) => k * t, inversa ? 0.3 : 0, 11],
                { strokeColor: GOLD_STROKE, strokeWidth: 2.5 }
              );
              const P = board.create("point", [x, y], {
                name: "",
                size: 3,
                fillColor: NAVY,
                strokeColor: NAVY,
                fixed: true,
              });
              createEl(board, "segment", [[x, 0], P], {
                strokeColor: "#94a3b8",
                dash: 2,
                strokeWidth: 1,
              });
              createEl(board, "segment", [[0, y], P], {
                strokeColor: "#94a3b8",
                dash: 2,
                strokeWidth: 1,
              });
            }}
          />

          <div className="space-y-4">
            <ControlDeslizante
              etiqueta="k (constante de proporcionalidad)"
              valor={k}
              min={1}
              max={10}
              onChange={setK}
            />
            <ControlDeslizante etiqueta="x" valor={x} min={0.5} max={10} step={0.5} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila
            label={inversa ? "y = k / x" : "y = k · x"}
            valor={inversa ? `y = ${k} / x` : `y = ${k}x`}
          />
          <EstadisticaFila label={`Valor de y cuando x = ${x}`} valor={y.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            {inversa
              ? "En una relación inversamente proporcional, la gráfica es una curva (hipérbola): al crecer x, y decrece."
              : "En una relación directamente proporcional, la gráfica es una recta que pasa por el origen."}
          </p>
        </div>
      }
      instrucciones="Cambia entre DP e IP, ajusta k y x, y observa cómo cambia la forma de la gráfica."
    />
  );
}
