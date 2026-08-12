"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function AproximacionDeRaizPorNewton() {
  const [n, setN] = useState(10);
  const [iteraciones, setIteraciones] = useState(4);

  const raizExacta = Math.sqrt(n);
  const xs: number[] = [n];
  for (let i = 0; i < iteraciones; i++) {
    const xi = xs[xs.length - 1];
    xs.push((xi + n / xi) / 2);
  }

  return (
    <FiguraInteractiva
      titulo="Aproximación de una raíz cuadrada por el método de Newton"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">
            x<sub>i+1</sub> = (x<sub>i</sub> + N/x<sub>i</sub>) / 2, con x₀ = N
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="px-2 py-1 text-left font-normal">i</th>
                  <th className="px-2 py-1 text-left font-normal">xᵢ</th>
                  <th className="px-2 py-1 text-left font-normal">Error |xᵢ − √N|</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {xs.map((x, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-2 py-1">{i}</td>
                    <td className="px-2 py-1">{x.toFixed(8)}</td>
                    <td className="px-2 py-1">{Math.abs(x - raizExacta).toExponential(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={2} max={50} onChange={setN} />
            <ControlDeslizante
              etiqueta="Iteraciones"
              valor={iteraciones}
              min={0}
              max={6}
              onChange={setIteraciones}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="N" valor={n} />
          <EstadisticaFila label="√N (referencia)" valor={raizExacta.toFixed(8)} />
          <EstadisticaFila label="Última aproximación" valor={xs[xs.length - 1].toFixed(8)} />
          <EstadisticaFila
            label="Error final"
            valor={Math.abs(xs[xs.length - 1] - raizExacta).toExponential(3)}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El error se eleva al cuadrado en cada paso (eᵢ₊₁ = eᵢ²/2xᵢ): el número de cifras
            correctas se duplica aproximadamente en cada iteración.
          </p>
        </div>
      }
      instrucciones="Ajusta N y el número de iteraciones para ver cómo converge la aproximación de √N."
    />
  );
}
