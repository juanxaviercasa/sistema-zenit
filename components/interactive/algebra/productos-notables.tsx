"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const IDENTIDADES = [
  {
    nombre: "(a+b)² = a² + 2ab + b²",
    izq: (a: number, b: number) => (a + b) ** 2,
    der: (a: number, b: number) => a * a + 2 * a * b + b * b,
  },
  {
    nombre: "(a−b)² = a² − 2ab + b²",
    izq: (a: number, b: number) => (a - b) ** 2,
    der: (a: number, b: number) => a * a - 2 * a * b + b * b,
  },
  {
    nombre: "(a+b)(a−b) = a² − b²",
    izq: (a: number, b: number) => (a + b) * (a - b),
    der: (a: number, b: number) => a * a - b * b,
  },
  {
    nombre: "(a+b)³ = a³ + 3a²b + 3ab² + b³",
    izq: (a: number, b: number) => (a + b) ** 3,
    der: (a: number, b: number) => a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3,
  },
  {
    nombre: "(a−b)³ = a³ − 3a²b + 3ab² − b³",
    izq: (a: number, b: number) => (a - b) ** 3,
    der: (a: number, b: number) => a ** 3 - 3 * a * a * b + 3 * a * b * b - b ** 3,
  },
];

export function ProductosNotables() {
  const [indice, setIndice] = useState(0);
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const identidad = IDENTIDADES[indice];

  const izq = identidad.izq(a, b);
  const der = identidad.der(a, b);

  return (
    <FiguraInteractiva
      titulo="Productos notables"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">{identidad.nombre}</p>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            <p>
              Con a={a}, b={b}: lado izquierdo = {izq}, lado derecho = {der}
            </p>
            <p className={izq === der ? "text-emerald-600" : "text-red-500"}>
              {izq === der ? "✓ coinciden" : "✗ no coinciden"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-5} max={5} onChange={setB} />
          </div>
          <ControlDeslizante
            etiqueta="Identidad"
            valor={indice}
            min={0}
            max={IDENTIDADES.length - 1}
            onChange={setIndice}
            formato={() => `${indice + 1}/${IDENTIDADES.length}`}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Identidad" valor={identidad.nombre} />
          <EstadisticaFila label="Lado izquierdo" valor={izq} />
          <EstadisticaFila label="Lado derecho" valor={der} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Estas identidades valen para cualesquiera a, b — pruébalo con distintos valores,
            incluso negativos.
          </p>
        </div>
      }
      instrucciones="Elige una identidad y ajusta a, b para verificar que ambos lados siempre coinciden."
    />
  );
}
