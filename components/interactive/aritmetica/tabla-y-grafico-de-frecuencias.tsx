"use client";

import { useState } from "react";
import { FiguraInteractiva } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const INTERVALOS = ["[0-10)", "[10-20)", "[20-30)", "[30-40)", "[40-50]"];

export function TablaYGraficoDeFrecuencias() {
  const [frecuencias, setFrecuencias] = useState([4, 9, 14, 8, 5]);

  const actualizar = (i: number, v: number) => {
    setFrecuencias((prev) => prev.map((f, j) => (j === i ? v : f)));
  };

  const n = frecuencias.reduce((s, f) => s + f, 0);
  const maxF = Math.max(...frecuencias, 1);

  const filas = frecuencias.reduce<
    { intervalo: string; fi: number; hi: number; Fi: number; Hi: number }[]
  >((acc, fi, i) => {
    const Fi = (acc[i - 1]?.Fi ?? 0) + fi;
    acc.push({
      intervalo: INTERVALOS[i],
      fi,
      hi: n > 0 ? (fi / n) * 100 : 0,
      Fi,
      Hi: n > 0 ? (Fi / n) * 100 : 0,
    });
    return acc;
  }, []);

  return (
    <FiguraInteractiva
      titulo="Tabla y gráfico de frecuencias"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex h-40 items-end gap-2">
            {frecuencias.map((fi, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-blue-600"
                  style={{ height: `${(fi / maxF) * 100}%` }}
                />
                <span className="text-[0.65rem] text-slate-500">{INTERVALOS[i]}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-slate-200 pt-4">
            {frecuencias.map((fi, i) => (
              <ControlDeslizante
                key={i}
                etiqueta={`f${i + 1} — ${INTERVALOS[i]}`}
                valor={fi}
                min={0}
                max={30}
                onChange={(v) => actualizar(i, v)}
              />
            ))}
          </div>
        </div>
      }
      panel={
        <div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-1.5 font-semibold">Intervalo</th>
                <th className="pb-1.5 font-semibold">fi</th>
                <th className="pb-1.5 font-semibold">hi%</th>
                <th className="pb-1.5 font-semibold">Fi</th>
                <th className="pb-1.5 font-semibold">Hi%</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums text-slate-900">
              {filas.map((fila) => (
                <tr key={fila.intervalo} className="border-t border-slate-100">
                  <td className="py-1 font-sans">{fila.intervalo}</td>
                  <td className="py-1">{fila.fi}</td>
                  <td className="py-1">{fila.hi.toFixed(1)}</td>
                  <td className="py-1">{fila.Fi}</td>
                  <td className="py-1">{fila.Hi.toFixed(1)}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-200 font-semibold">
                <td className="py-1 font-sans">Total</td>
                <td className="py-1">{n}</td>
                <td className="py-1">100.0</td>
                <td className="py-1">—</td>
                <td className="py-1">—</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            fi = frecuencia absoluta, hi = frecuencia relativa (%), Fi = frecuencia
            acumulada, Hi = frecuencia acumulada relativa (%).
          </p>
        </div>
      }
      instrucciones="Ajusta la frecuencia de cada intervalo y observa cómo cambian el histograma y la tabla."
    />
  );
}
