"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const VALORES = [1, 2, 3, 4, 5, 6];

export function VariableAleatoriaYEsperanza() {
  const [pesos, setPesos] = useState([1, 1, 1, 1, 1, 1]);

  const actualizar = (i: number, v: number) => {
    setPesos((prev) => prev.map((p, j) => (j === i ? v : p)));
  };

  const sumaPesos = pesos.reduce((s, p) => s + p, 0);
  const probabilidades = pesos.map((p) => p / sumaPesos);
  const esperanza = VALORES.reduce((s, x, i) => s + x * probabilidades[i], 0);

  const maxProb = Math.max(...probabilidades, 1 / 6) * 1.15;
  const pos = (v: number) => `${((v - 0.5) / 6) * 100}%`;

  return (
    <FiguraInteractiva
      titulo="Variable aleatoria discreta: un dado cargado"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="flex h-32 items-end gap-2">
            {probabilidades.map((p, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-blue-600"
                  style={{ height: `${(p / maxProb) * 100}%` }}
                />
                <span className="text-[0.65rem] text-slate-500">{VALORES[i]}</span>
              </div>
            ))}
          </div>

          <div className="relative h-8">
            <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200" />
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: pos(esperanza) }}
            >
              <span className="size-3 rounded-full bg-amber-500 ring-2 ring-white" />
              <span className="mt-1 text-[0.65rem] font-semibold text-amber-600">E(X)</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-200 pt-4">
            {VALORES.map((x, i) => (
              <ControlDeslizante
                key={x}
                etiqueta={`Peso de la cara ${x}`}
                valor={pesos[i]}
                min={1}
                max={10}
                onChange={(v) => actualizar(i, v)}
              />
            ))}
          </div>
        </div>
      }
      panel={
        <div>
          {VALORES.map((x, i) => (
            <EstadisticaFila
              key={x}
              label={`P(X = ${x})`}
              valor={probabilidades[i].toFixed(3)}
            />
          ))}
          <EstadisticaFila label="Esperanza E(X)" valor={esperanza.toFixed(3)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Con pesos iguales, el dado es justo y E(X) = 3,5. Aumenta el peso de una
            cara para &quot;cargar&quot; el dado y observa cómo se desplaza la esperanza.
          </p>
        </div>
      }
      instrucciones="Ajusta el peso relativo de cada cara — las probabilidades se recalculan automáticamente para sumar 1."
    />
  );
}
