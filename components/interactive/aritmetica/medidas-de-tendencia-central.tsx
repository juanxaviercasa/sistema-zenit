"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function calcularModa(datos: number[]): string {
  const conteo = new Map<number, number>();
  for (const d of datos) conteo.set(d, (conteo.get(d) ?? 0) + 1);
  const maxRepeticiones = Math.max(...conteo.values());
  if (maxRepeticiones === 1) return "no hay (todos los valores son distintos)";
  const modas = [...conteo.entries()].filter(([, c]) => c === maxRepeticiones).map(([v]) => v);
  return modas.sort((a, b) => a - b).join(", ");
}

export function MedidasDeTendenciaCentral() {
  const [datos, setDatos] = useState([4, 7, 7, 9, 12, 15, 18]);

  const actualizar = (i: number, v: number) => {
    setDatos((prev) => prev.map((d, j) => (j === i ? v : d)));
  };

  const n = datos.length;
  const media = datos.reduce((s, d) => s + d, 0) / n;
  const ordenados = [...datos].sort((a, b) => a - b);
  const mediana =
    n % 2 === 1
      ? ordenados[(n - 1) / 2]
      : (ordenados[n / 2 - 1] + ordenados[n / 2]) / 2;
  const moda = calcularModa(datos);

  const max = Math.max(...datos, media) * 1.1;
  const pos = (v: number) => `${(v / max) * 100}%`;

  return (
    <FiguraInteractiva
      titulo="Media, mediana y moda de un conjunto de datos"
      board={
        <div className="flex flex-col gap-8 px-2 py-8">
          <div className="relative h-16">
            <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200" />
            {datos.map((d, i) => (
              <div
                key={`dato-${i}`}
                className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 ring-2 ring-white"
                style={{ left: pos(d) }}
              />
            ))}
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: pos(media) }}
            >
              <span className="size-3 rounded-full bg-blue-600 ring-2 ring-white" />
              <span className="mt-1 text-[0.65rem] font-semibold text-blue-600">media</span>
            </div>
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: pos(typeof mediana === "number" ? mediana : 0), bottom: "1.5rem" }}
            >
              <span className="size-3 rounded-full bg-amber-500 ring-2 ring-white" />
              <span className="mt-1 text-[0.65rem] font-semibold text-amber-600">mediana</span>
            </div>
          </div>
          <div className="space-y-3 border-t border-slate-200 pt-4">
            {datos.map((d, i) => (
              <ControlDeslizante
                key={i}
                etiqueta={`Dato ${i + 1}`}
                valor={d}
                min={0}
                max={20}
                onChange={(v) => actualizar(i, v)}
              />
            ))}
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Media (promedio)" valor={media.toFixed(2)} />
          <EstadisticaFila label="Mediana" valor={mediana} />
          <EstadisticaFila label="Moda" valor={moda} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La media usa todos los valores; la mediana solo depende del orden (es más
            resistente a valores extremos); la moda es el valor más frecuente y puede
            no existir o no ser única.
          </p>
        </div>
      }
      instrucciones="Ajusta los 7 datos y observa cómo se mueven la media y la mediana de forma distinta."
    />
  );
}
