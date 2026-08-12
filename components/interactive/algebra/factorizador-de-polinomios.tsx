"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const ENTRADAS = [
  {
    expandido: "x² − 9",
    factorizado: "(x−3)(x+3)",
    metodo: "Diferencia de cuadrados",
    fExp: (x: number) => x * x - 9,
    fFac: (x: number) => (x - 3) * (x + 3),
  },
  {
    expandido: "x² + 5x + 6",
    factorizado: "(x+2)(x+3)",
    metodo: "Aspa simple",
    fExp: (x: number) => x * x + 5 * x + 6,
    fFac: (x: number) => (x + 2) * (x + 3),
  },
  {
    expandido: "x³ − 8",
    factorizado: "(x−2)(x²+2x+4)",
    metodo: "Diferencia de cubos",
    fExp: (x: number) => x ** 3 - 8,
    fFac: (x: number) => (x - 2) * (x * x + 2 * x + 4),
  },
  {
    expandido: "2x² − x − 1",
    factorizado: "(2x+1)(x−1)",
    metodo: "Aspa simple (coeficiente líder ≠ 1)",
    fExp: (x: number) => 2 * x * x - x - 1,
    fFac: (x: number) => (2 * x + 1) * (x - 1),
  },
];

export function FactorizadorDePolinomios() {
  const [indice, setIndice] = useState(0);
  const [x, setX] = useState(4);
  const entrada = ENTRADAS[indice];

  const vExp = entrada.fExp(x);
  const vFac = entrada.fFac(x);

  return (
    <FiguraInteractiva
      titulo="Factorización de polinomios"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {entrada.expandido} = {entrada.factorizado}
          </p>
          <p className="text-center text-xs text-slate-400">{entrada.metodo}</p>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            <p>
              En x={x}: forma expandida = {vExp}, forma factorizada = {vFac}
            </p>
            <p className={vExp === vFac ? "text-emerald-600" : "text-red-500"}>
              {vExp === vFac ? "✓ coinciden" : "✗ no coinciden"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Polinomio"
              valor={indice}
              min={0}
              max={ENTRADAS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${ENTRADAS.length}`}
            />
            <ControlDeslizante etiqueta="x de prueba" valor={x} min={-5} max={5} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Expandido" valor={entrada.expandido} />
          <EstadisticaFila label="Factorizado" valor={entrada.factorizado} />
          <EstadisticaFila label="Método" valor={entrada.metodo} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La factorización es correcta si ambas formas coinciden para todo x, no solo el
            valor de prueba — pero un desacuerdo en un solo punto ya bastaría para refutarla.
          </p>
        </div>
      }
      instrucciones="Elige un polinomio y un x de prueba para verificar su factorización."
    />
  );
}
