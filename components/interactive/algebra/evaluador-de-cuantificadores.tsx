"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const PREDICADOS = [
  { etiqueta: "x es par", cumple: (x: number) => x % 2 === 0 },
  { etiqueta: "x es primo", cumple: (x: number) => esPrimo(x) },
  { etiqueta: "x > 5", cumple: (x: number) => x > 5 },
  { etiqueta: "x² < 50", cumple: (x: number) => x * x < 50 },
  { etiqueta: "x es múltiplo de 3", cumple: (x: number) => x % 3 === 0 },
];

function esPrimo(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

export function EvaluadorDeCuantificadores() {
  const [n, setN] = useState(10);
  const [indice, setIndice] = useState(0);

  const predicado = PREDICADOS[indice];
  const dominio = Array.from({ length: n }, (_, i) => i + 1);
  const evaluaciones = dominio.map((x) => ({ x, cumple: predicado.cumple(x) }));

  const paraTodo = evaluaciones.every((e) => e.cumple);
  const existe = evaluaciones.some((e) => e.cumple);
  const contraejemplo = evaluaciones.find((e) => !e.cumple)?.x;
  const testigo = evaluaciones.find((e) => e.cumple)?.x;

  return (
    <FiguraInteractiva
      titulo="Cuantificadores sobre un dominio finito"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            P(x): {predicado.etiqueta}, con x ∈ {"{1,...,"}
            {n}
            {"}"}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {evaluaciones.map((e) => (
              <span
                key={e.x}
                className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm ${
                  e.cumple ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-500"
                }`}
              >
                {e.x}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              ∀x P(x) ={" "}
              <span className={paraTodo ? "text-emerald-600" : "text-red-500"}>
                {paraTodo ? "V" : "F"}
              </span>
              {!paraTodo && ` (contraejemplo: x=${contraejemplo})`}
            </p>
            <p>
              ∃x P(x) ={" "}
              <span className={existe ? "text-emerald-600" : "text-red-500"}>
                {existe ? "V" : "F"}
              </span>
              {existe && ` (testigo: x=${testigo})`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Tamaño del dominio" valor={n} min={3} max={20} onChange={setN} />
            <ControlDeslizante
              etiqueta="Predicado"
              valor={indice}
              min={0}
              max={PREDICADOS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${PREDICADOS.length}`}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Predicado" valor={predicado.etiqueta} />
          <EstadisticaFila label="∀x P(x)" valor={paraTodo ? "V" : "F"} />
          <EstadisticaFila label="∃x P(x)" valor={existe ? "V" : "F"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Para refutar ∀x P(x) basta un contraejemplo. Para confirmar ∃x P(x) basta un
            testigo.
          </p>
        </div>
      }
      instrucciones="Ajusta el dominio y el predicado para ver cuándo ∀x P(x) y ∃x P(x) son verdaderos."
    />
  );
}
