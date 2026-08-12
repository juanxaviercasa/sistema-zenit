"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const LETRAS = ["a", "b", "c", "d", "e"];

function subconjuntos(elementos: string[]): string[][] {
  let resultado: string[][] = [[]];
  for (const el of elementos) {
    resultado = resultado.concat(resultado.map((s) => [...s, el]));
  }
  return resultado;
}

export function ConjuntoPotencia() {
  const [n, setN] = useState(3);
  const elementos = LETRAS.slice(0, n);
  const partes = subconjuntos(elementos).sort((a, b) => a.length - b.length);

  return (
    <FiguraInteractiva
      titulo="Conjunto potencia"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            A = {"{"}
            {elementos.join(", ")}
            {"}"}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {partes.map((s, i) => (
              <span
                key={i}
                className="rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-xs text-slate-700"
              >
                {"{"}
                {s.join(", ")}
                {"}"}
              </span>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Cantidad de elementos de A"
              valor={n}
              min={0}
              max={5}
              onChange={setN}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="|A|" valor={n} />
          <EstadisticaFila label="Subconjuntos listados" valor={partes.length} />
          <EstadisticaFila label="|P(A)| = 2^|A|" valor={2 ** n} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada elemento de A puede estar o no estar en un subconjunto dado: 2 posibilidades
            por elemento, multiplicadas por el principio de multiplicación.
          </p>
        </div>
      }
      instrucciones="Ajusta el tamaño de A para ver todos sus subconjuntos, incluido el vacío y el propio A."
    />
  );
}
