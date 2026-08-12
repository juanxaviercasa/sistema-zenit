"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

type Entrada = {
  nombre: string;
  fn: (x: number) => number;
  par: boolean;
  impar: boolean;
  inyectiva: boolean;
  sobreyectivaEnR: boolean;
  monotona: string;
  acotada: string;
};

const FUNCIONES: Entrada[] = [
  {
    nombre: "f(x) = x²",
    fn: (x) => x * x,
    par: true,
    impar: false,
    inyectiva: false,
    sobreyectivaEnR: false,
    monotona: "No (decrece en x<0, crece en x>0)",
    acotada: "Acotada inferiormente (f(x) ≥ 0)",
  },
  {
    nombre: "f(x) = x³",
    fn: (x) => x ** 3,
    par: false,
    impar: true,
    inyectiva: true,
    sobreyectivaEnR: true,
    monotona: "Sí, estrictamente creciente",
    acotada: "No acotada",
  },
  {
    nombre: "f(x) = |x|",
    fn: (x) => Math.abs(x),
    par: true,
    impar: false,
    inyectiva: false,
    sobreyectivaEnR: false,
    monotona: "No (decrece en x<0, crece en x>0)",
    acotada: "Acotada inferiormente (f(x) ≥ 0)",
  },
  {
    nombre: "f(x) = 2x + 1",
    fn: (x) => 2 * x + 1,
    par: false,
    impar: false,
    inyectiva: true,
    sobreyectivaEnR: true,
    monotona: "Sí, estrictamente creciente",
    acotada: "No acotada",
  },
  {
    nombre: "f(x) = x³ − x",
    fn: (x) => x ** 3 - x,
    par: false,
    impar: true,
    inyectiva: false,
    sobreyectivaEnR: true,
    monotona: "No (tiene tramos crecientes y decrecientes)",
    acotada: "No acotada",
  },
];

export function ClasificadorDeFunciones() {
  const [indice, setIndice] = useState(0);
  const [x, setX] = useState(2);
  const entrada = FUNCIONES[indice];

  const fx = entrada.fn(x);
  const fMenosX = entrada.fn(-x);
  const menosFx = -fx;
  const esParAqui = Math.abs(fMenosX - fx) < 1e-9;
  const esImparAqui = Math.abs(fMenosX - menosFx) < 1e-9;

  return (
    <FiguraInteractiva
      titulo="Clasificador de funciones"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">{entrada.nombre}</p>

          <PlanoCartesiano funciones={[{ fn: entrada.fn, color: "#3b82f6" }]} />

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              f({x}) = {fx.toFixed(2)}, f(−{x}) = {fMenosX.toFixed(2)}, −f({x}) = {menosFx.toFixed(2)}
            </p>
            <p className={esParAqui ? "text-emerald-600" : "text-slate-400"}>
              {esParAqui ? "✓" : "✗"} f(−x) = f(x) en este punto (par, si vale para todo x)
            </p>
            <p className={esImparAqui ? "text-emerald-600" : "text-slate-400"}>
              {esImparAqui ? "✓" : "✗"} f(−x) = −f(x) en este punto (impar, si vale para todo x)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Función"
              valor={indice}
              min={0}
              max={FUNCIONES.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${FUNCIONES.length}`}
            />
            <ControlDeslizante etiqueta="x de prueba" valor={x} min={-5} max={5} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Par" valor={entrada.par ? "Sí" : "No"} />
          <EstadisticaFila label="Impar" valor={entrada.impar ? "Sí" : "No"} />
          <EstadisticaFila label="Inyectiva" valor={entrada.inyectiva ? "Sí" : "No"} />
          <EstadisticaFila label="Sobreyectiva en R" valor={entrada.sobreyectivaEnR ? "Sí" : "No"} />
          <EstadisticaFila label="Monótona" valor={entrada.monotona} />
          <EstadisticaFila label="Acotada" valor={entrada.acotada} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Un solo punto de prueba puede refutar &quot;par&quot; o &quot;impar&quot; (basta un contraejemplo), pero
            nunca puede confirmarlas por sí solo — hace falta la demostración general.
          </p>
        </div>
      }
      instrucciones="Elige una función y un x de prueba para explorar sus propiedades de clasificación."
    />
  );
}
