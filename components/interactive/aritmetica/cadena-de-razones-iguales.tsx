"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function CadenaDeRazonesIguales() {
  const [k, setK] = useState(1.5);
  const [b1, setB1] = useState(4);
  const [b2, setB2] = useState(6);
  const [b3, setB3] = useState(8);

  const a1 = k * b1;
  const a2 = k * b2;
  const a3 = k * b3;
  const sumaA = a1 + a2 + a3;
  const sumaB = b1 + b2 + b3;

  const maxBarra = Math.max(a1, a2, a3) * 1.05;

  const filas = [
    { a: a1, b: b1 },
    { a: a2, b: b2 },
    { a: a3, b: b3 },
  ];

  return (
    <FiguraInteractiva
      titulo="Serie de razones geométricas iguales"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {filas.map((fila, i) => (
            <div key={i} className="space-y-1">
              <div
                className="h-5 rounded bg-blue-600"
                style={{ width: `${(fila.a / maxBarra) * 100}%` }}
              />
              <div
                className="h-5 rounded bg-amber-500"
                style={{ width: `${(fila.b / maxBarra) * 100}%` }}
              />
            </div>
          ))}
          <div className="mt-1 space-y-1 border-t border-slate-200 pt-3">
            <div
              className="h-5 rounded bg-blue-800"
              style={{ width: `${(sumaA / maxBarra) * 100}%` }}
            />
            <div
              className="h-5 rounded bg-amber-700"
              style={{ width: `${(sumaB / maxBarra) * 100}%` }}
            />
          </div>
          <div className="mt-2 space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="k (razón común)"
              valor={k}
              min={0.5}
              max={3}
              step={0.1}
              formato={(v) => v.toFixed(1)}
              onChange={setK}
            />
            <ControlDeslizante etiqueta="b₁" valor={b1} min={1} max={15} onChange={setB1} />
            <ControlDeslizante etiqueta="b₂" valor={b2} min={1} max={15} onChange={setB2} />
            <ControlDeslizante etiqueta="b₃" valor={b3} min={1} max={15} onChange={setB3} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="a₁/b₁ = a₂/b₂ = a₃/b₃" valor={k.toFixed(2)} />
          <EstadisticaFila label="Suma de antecedentes (Σa)" valor={sumaA.toFixed(2)} />
          <EstadisticaFila label="Suma de consecuentes (Σb)" valor={sumaB.toFixed(2)} />
          <EstadisticaFila label="Σa ÷ Σb" valor={(sumaA / sumaB).toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Si varias razones son iguales a k, la razón entre la suma de todos los
            antecedentes y la suma de todos los consecuentes también es igual a k.
          </p>
        </div>
      }
      instrucciones="Cambia k y los consecuentes b₁, b₂, b₃ — los antecedentes se ajustan solos para mantener la razón común."
    />
  );
}
