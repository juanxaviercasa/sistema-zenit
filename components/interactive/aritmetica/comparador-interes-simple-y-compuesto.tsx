"use client";

import { useState } from "react";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";
import { ControlDeslizante } from "./controles";

const GOLD_STROKE = "var(--color-gold-600)";
const BLUE = "#2563eb";
const RED = "#dc2626";

export function ComparadorInteresSimpleYCompuesto() {
  const [capital, setCapital] = useState(1000);
  const [tasa, setTasa] = useState(10);
  const [tiempo, setTiempo] = useState(8);

  const i = tasa / 100;
  const mSimple = capital * (1 + i * tiempo);
  const mCompuesto = capital * Math.pow(1 + i, tiempo);
  const mContinuo = capital * Math.exp(i * tiempo);

  const maxY = mContinuo * 1.15;

  return (
    <FiguraInteractiva
      titulo="Simple vs. compuesto vs. capitalización continua"
      board={
        <div className="flex flex-col gap-4 px-2 py-4">
          <JSXGraphBoard
            key={`${capital}-${tasa}`}
            axis
            boundingBox={[-0.5, maxY, 10.5, 0]}
            onMount={(board) => {
              createEl(board, "functiongraph", [(t: number) => capital * (1 + i * t), 0, 10], {
                strokeColor: BLUE,
                strokeWidth: 2,
              });
              createEl(
                board,
                "functiongraph",
                [(t: number) => capital * Math.pow(1 + i, t), 0, 10],
                { strokeColor: GOLD_STROKE, strokeWidth: 2 }
              );
              createEl(
                board,
                "functiongraph",
                [(t: number) => capital * Math.exp(i * t), 0, 10],
                { strokeColor: RED, strokeWidth: 2, dash: 2 }
              );
            }}
          />
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: BLUE }} /> Simple
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: GOLD_STROKE }} /> Compuesto
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: RED }} /> Continuo
            </span>
          </div>
          <div className="space-y-4">
            <ControlDeslizante etiqueta="Capital (C)" valor={capital} min={100} max={5000} step={100} onChange={setCapital} />
            <ControlDeslizante etiqueta="Tasa anual (%)" valor={tasa} min={1} max={30} onChange={setTasa} />
            <ControlDeslizante etiqueta="Tiempo (años)" valor={tiempo} min={0} max={10} step={0.5} onChange={setTiempo} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Monto simple" valor={mSimple.toFixed(2)} />
          <EstadisticaFila label="Monto compuesto" valor={mCompuesto.toFixed(2)} />
          <EstadisticaFila label="Monto continuo" valor={mContinuo.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El interés compuesto siempre supera al simple para t &gt; 1, porque reinvierte
            el interés generado. La capitalización continua es el límite del compuesto
            cuando el número de capitalizaciones por año tiende a infinito.
          </p>
        </div>
      }
      instrucciones="Ajusta capital, tasa y tiempo, y observa cómo se separan las tres curvas."
    />
  );
}
