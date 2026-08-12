"use client";

import { useState } from "react";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";
import { ControlDeslizante } from "./controles";

const NAVY = "var(--color-navy-900)";
const GOLD_STROKE = "var(--color-gold-600)";

export function CrecimientoInteresSimple() {
  const [capital, setCapital] = useState(1000);
  const [tasa, setTasa] = useState(8);
  const [tiempo, setTiempo] = useState(5);

  const i = tasa / 100;
  const interes = capital * i * tiempo;
  const monto = capital + interes;

  return (
    <FiguraInteractiva
      titulo="Crecimiento del monto a interés simple"
      board={
        <div className="flex flex-col gap-4 px-2 py-4">
          <JSXGraphBoard
            key={`${capital}-${tasa}`}
            axis
            boundingBox={[-0.5, capital * (1 + i * 10) * 1.1, 10.5, 0]}
            onMount={(board) => {
              createEl(board, "functiongraph", [(t: number) => capital * (1 + i * t), 0, 10], {
                strokeColor: GOLD_STROKE,
                strokeWidth: 2.5,
              });
              const P = board.create("point", [tiempo, monto], {
                name: "",
                size: 3,
                fillColor: NAVY,
                strokeColor: NAVY,
                fixed: true,
              });
              createEl(board, "segment", [[tiempo, 0], P], {
                strokeColor: "#94a3b8",
                dash: 2,
                strokeWidth: 1,
              });
            }}
          />
          <div className="space-y-4">
            <ControlDeslizante etiqueta="Capital (C)" valor={capital} min={100} max={5000} step={100} onChange={setCapital} />
            <ControlDeslizante etiqueta="Tasa anual (%)" valor={tasa} min={1} max={30} onChange={setTasa} />
            <ControlDeslizante etiqueta="Tiempo (años)" valor={tiempo} min={0} max={10} step={0.5} onChange={setTiempo} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Interés generado (I = C·i·t)" valor={interes.toFixed(2)} />
          <EstadisticaFila label="Monto (M = C + I)" valor={monto.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En interés simple, el monto crece de forma lineal con el tiempo: la gráfica de
            M(t) es una recta.
          </p>
        </div>
      }
      instrucciones="Ajusta capital, tasa y tiempo. El punto marcado muestra el monto exacto en el instante elegido."
    />
  );
}
