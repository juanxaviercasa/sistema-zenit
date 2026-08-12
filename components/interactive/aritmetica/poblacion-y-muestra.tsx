"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const N_POBLACION = 100;

function nuevaMuestra(n: number): Set<number> {
  const indices = Array.from({ length: N_POBLACION }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return new Set(indices.slice(0, n));
}

export function PoblacionYMuestra() {
  const [n, setN] = useState(15);
  const [muestra, setMuestra] = useState<Set<number>>(() => nuevaMuestra(15));

  const actualizarN = (valor: number) => {
    setN(valor);
    setMuestra(nuevaMuestra(valor));
  };

  return (
    <FiguraInteractiva
      titulo="Población y muestra"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: N_POBLACION }, (_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-full ${muestra.has(i) ? "bg-blue-600" : "bg-slate-200"}`}
              />
            ))}
          </div>
          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Tamaño de la muestra (n)"
              valor={n}
              min={1}
              max={N_POBLACION}
              onChange={actualizarN}
            />
            <button
              type="button"
              onClick={() => setMuestra(nuevaMuestra(n))}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Elegir nueva muestra aleatoria
            </button>
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Tamaño de la población (N)" valor={N_POBLACION} />
          <EstadisticaFila label="Tamaño de la muestra (n)" valor={n} />
          <EstadisticaFila label="Fracción muestreada (n/N)" valor={`${((n / N_POBLACION) * 100).toFixed(1)}%`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada punto azul es un elemento elegido al azar de la población (los 100
            puntos) para formar la muestra. Una muestra representativa no necesita ser
            grande — necesita ser aleatoria.
          </p>
        </div>
      }
      instrucciones="Ajusta el tamaño de la muestra y genera selecciones aleatorias nuevas."
    />
  );
}
