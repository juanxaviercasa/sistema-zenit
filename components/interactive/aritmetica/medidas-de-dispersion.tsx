"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function MedidasDeDispersion() {
  const [datos, setDatos] = useState([5, 8, 8, 11, 14, 17, 20]);

  const actualizar = (i: number, v: number) => {
    setDatos((prev) => prev.map((d, j) => (j === i ? v : d)));
  };

  const n = datos.length;
  const media = datos.reduce((s, d) => s + d, 0) / n;
  const varianza = datos.reduce((s, d) => s + (d - media) ** 2, 0) / n;
  const desviacion = Math.sqrt(varianza);

  const max = Math.max(...datos, media) * 1.1;
  const pos = (v: number) => `${(v / max) * 100}%`;

  return (
    <FiguraInteractiva
      titulo="Varianza y desviación estándar"
      board={
        <div className="flex flex-col gap-8 px-2 py-8">
          <div className="relative h-24">
            <div
              className="absolute top-1/2 h-full w-0.5 -translate-x-1/2 bg-blue-200"
              style={{ left: pos(media) }}
            />
            {datos.map((d, i) => (
              <div
                key={`dev-${i}`}
                className="absolute h-0.5 -translate-y-1/2 bg-amber-400"
                style={{
                  top: `${20 + i * 8}%`,
                  left: pos(Math.min(d, media)),
                  width: `${(Math.abs(d - media) / max) * 100}%`,
                }}
              />
            ))}
            {datos.map((d, i) => (
              <div
                key={`punto-${i}`}
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500 ring-2 ring-white"
                style={{ top: `${20 + i * 8}%`, left: pos(d) }}
              />
            ))}
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: pos(media) }}
            >
              <span className="size-3 rounded-full bg-blue-600 ring-2 ring-white" />
              <span className="mt-1 text-[0.65rem] font-semibold text-blue-600">media</span>
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
          <EstadisticaFila label="Media" valor={media.toFixed(2)} />
          <EstadisticaFila label="Varianza (σ²)" valor={varianza.toFixed(2)} />
          <EstadisticaFila label="Desviación estándar (σ)" valor={desviacion.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Las barras naranjas muestran la desviación de cada dato respecto a la media.
            La varianza es el promedio de esas desviaciones al cuadrado; la desviación
            estándar es su raíz cuadrada (en las mismas unidades que los datos).
          </p>
        </div>
      }
      instrucciones="Ajusta los datos y observa cómo crecen las barras de desviación cuando los puntos se alejan de la media."
    />
  );
}
