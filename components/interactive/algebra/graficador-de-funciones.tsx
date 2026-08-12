"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

type Entrada = {
  nombre: string;
  usaA: boolean;
  usaB: boolean;
  formula: (a: number, b: number) => string;
  fn: (x: number, a: number, b: number) => number;
  dominio: string;
  rango: (a: number, b: number) => string;
  discontinua?: boolean;
};

const FUNCIONES: Entrada[] = [
  {
    nombre: "Constante",
    usaA: false,
    usaB: true,
    formula: (_a, b) => `f(x) = ${b}`,
    fn: (_x, _a, b) => b,
    dominio: "R",
    rango: (_a, b) => `{${b}}`,
  },
  {
    nombre: "Identidad",
    usaA: false,
    usaB: false,
    formula: () => `f(x) = x`,
    fn: (x) => x,
    dominio: "R",
    rango: () => "R",
  },
  {
    nombre: "Lineal",
    usaA: true,
    usaB: false,
    formula: (a) => `f(x) = ${a}x`,
    fn: (x, a) => a * x,
    dominio: "R",
    rango: (a) => (a === 0 ? "{0}" : "R"),
  },
  {
    nombre: "Afín",
    usaA: true,
    usaB: true,
    formula: (a, b) => `f(x) = ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)}`,
    fn: (x, a, b) => a * x + b,
    dominio: "R",
    rango: () => "R",
  },
  {
    nombre: "Cuadrática",
    usaA: true,
    usaB: true,
    formula: (a, b) => `f(x) = ${a}x² ${b >= 0 ? "+" : "−"} ${Math.abs(b)}`,
    fn: (x, a, b) => a * x * x + b,
    dominio: "R",
    rango: (a, b) => (a > 0 ? `[${b}, +∞)` : a < 0 ? `(−∞, ${b}]` : `{${b}}`),
  },
  {
    nombre: "Cúbica",
    usaA: true,
    usaB: true,
    formula: (a, b) => `f(x) = ${a}x³ ${b >= 0 ? "+" : "−"} ${Math.abs(b)}`,
    fn: (x, a, b) => a * x ** 3 + b,
    dominio: "R",
    rango: () => "R",
  },
  {
    nombre: "Valor absoluto",
    usaA: false,
    usaB: true,
    formula: (_a, b) => `f(x) = |x| ${b >= 0 ? "+" : "−"} ${Math.abs(b)}`,
    fn: (x, _a, b) => Math.abs(x) + b,
    dominio: "R",
    rango: (_a, b) => `[${b}, +∞)`,
  },
  {
    nombre: "Máximo entero",
    usaA: false,
    usaB: true,
    formula: (_a, b) => `f(x) = ⌊x⌋ ${b >= 0 ? "+" : "−"} ${Math.abs(b)}`,
    fn: (x, _a, b) => Math.floor(x) + b,
    dominio: "R",
    rango: () => "Z (los enteros)",
    discontinua: true,
  },
];

export function GraficadorDeFunciones() {
  const [indice, setIndice] = useState(4);
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const entrada = FUNCIONES[indice];

  return (
    <FiguraInteractiva
      titulo="Graficador de funciones elementales"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">{entrada.formula(a, b)}</p>

          <PlanoCartesiano
            funciones={[
              { fn: (x) => entrada.fn(x, a, b), color: "#3b82f6", discontinua: entrada.discontinua },
            ]}
          />

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Función"
              valor={indice}
              min={0}
              max={FUNCIONES.length - 1}
              onChange={setIndice}
              formato={() => entrada.nombre}
            />
            <div />
            {entrada.usaA && (
              <ControlDeslizante etiqueta="a" valor={a} min={-3} max={3} onChange={setA} />
            )}
            {entrada.usaB && (
              <ControlDeslizante etiqueta="b" valor={b} min={-5} max={5} onChange={setB} />
            )}
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Función" valor={entrada.nombre} />
          <EstadisticaFila label="Dominio" valor={entrada.dominio} />
          <EstadisticaFila label="Rango" valor={entrada.rango(a, b)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El dominio es el conjunto de entradas válidas; el rango es el conjunto de todos los
            valores que realmente toma f(x).
          </p>
        </div>
      }
      instrucciones="Elige una función elemental y ajusta sus parámetros para ver su gráfica, dominio y rango."
    />
  );
}
