"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

export function VariacionDirectaEInversa() {
  const [k, setK] = useState(4);
  const [modoDirecta, setModoDirecta] = useState(1);
  const [x, setX] = useState(2);

  const esDirecta = modoDirecta === 1;
  const y = esDirecta ? k * x : x === 0 ? NaN : k / x;
  const constanteVerificada = esDirecta ? (x === 0 ? NaN : y / x) : x * y;

  const filas = [1, 2, 4, 8].map((xi) => {
    const yi = esDirecta ? k * xi : k / xi;
    return { xi, yi, cte: esDirecta ? yi / xi : xi * yi };
  });

  return (
    <FiguraInteractiva
      titulo={esDirecta ? "Variación directa: y = kx" : "Variación inversa: y = k/x"}
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {esDirecta ? `y = ${k}x` : `y = ${k}/x`}
          </p>

          <PlanoCartesiano
            funciones={[
              {
                fn: (t) => (esDirecta ? k * t : t === 0 ? null : k / t),
                color: "#3b82f6",
                discontinua: !esDirecta,
              },
            ]}
          />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="px-2 py-1 text-left font-normal">x</th>
                  <th className="px-2 py-1 text-left font-normal">y</th>
                  <th className="px-2 py-1 text-left font-normal">{esDirecta ? "y/x" : "x·y"}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {filas.map((f) => (
                  <tr key={f.xi} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-2 py-1">{f.xi}</td>
                    <td className="px-2 py-1">{f.yi.toFixed(2)}</td>
                    <td className="px-2 py-1 text-emerald-600">{f.cte.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="k" valor={k} min={1} max={10} onChange={setK} />
            <ControlDeslizante etiqueta="x" valor={x} min={-8} max={8} onChange={setX} />
            <ControlDeslizante
              etiqueta="Tipo"
              valor={modoDirecta}
              min={0}
              max={1}
              onChange={setModoDirecta}
              formato={() => (esDirecta ? "Directa" : "Inversa")}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Constante k" valor={k} />
          <EstadisticaFila label="y en x" valor={Number.isNaN(y) ? "no definido" : y.toFixed(2)} />
          <EstadisticaFila
            label={esDirecta ? "y/x (debe ser k)" : "x·y (debe ser k)"}
            valor={Number.isNaN(constanteVerificada) ? "—" : constanteVerificada.toFixed(2)}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En variación directa, y/x es constante (=k). En variación inversa, x·y es constante
            (=k).
          </p>
        </div>
      }
      instrucciones="Ajusta k, x y el tipo de variación para ver cómo se mantiene constante y/x (directa) o x·y (inversa)."
    />
  );
}
