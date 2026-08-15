"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

export function GraficadorExponencial() {
  const [a, setA] = useState(2);

  const creciente = a > 1;
  const f = (x: number) => Math.pow(a, x);

  return (
    <FiguraInteractiva
      titulo="Función exponencial f(x) = aˣ"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            f(x) = {a.toFixed(1)}ˣ
          </p>

          <PlanoCartesiano
            funciones={[{ fn: f, color: "#3b82f6" }]}
            puntos={[
              { x: 0, y: 1, color: "#059669" },
              { x: 1, y: a, color: "#dc2626" },
            ]}
            xMin={-4}
            xMax={4}
            yMin={-1}
            yMax={10}
          />

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>f(0) = {a.toFixed(1)}⁰ = 1 (siempre pasa por (0,1))</p>
            <p>f(1) = {a.toFixed(1)}¹ = {a.toFixed(1)}</p>
            <p>Asíntota horizontal: y = 0 (el eje x)</p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Base a"
              valor={a}
              min={0.2}
              max={4}
              step={0.1}
              onChange={setA}
              formato={(v) => v.toFixed(1)}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Base a" valor={a.toFixed(1)} />
          <EstadisticaFila label="Dominio" valor="ℝ" />
          <EstadisticaFila label="Rango" valor="(0, +∞)" />
          <EstadisticaFila label="Monotonía" valor={creciente ? "Creciente" : "Decreciente"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Con a &gt; 1 la función crece; con 0 &lt; a &lt; 1 decrece. En ambos casos es
            estrictamente monótona (por lo tanto inyectiva) y nunca toca el eje x.
          </p>
        </div>
      }
      instrucciones="Ajusta la base a y observa cómo cambia el crecimiento, siempre pasando por (0,1)."
    />
  );
}
