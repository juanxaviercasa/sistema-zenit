"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function ConstructorDeNumero() {
  const [base, setBase] = useState(8);
  const [cifras, setCifras] = useState([3, 5, 2]);

  const cambiarBase = (b: number) => {
    setBase(b);
    setCifras((prev) => prev.map((c) => Math.min(c, b - 1)));
  };

  const actualizarCifra = (i: number, v: number) => {
    setCifras((prev) => prev.map((c, j) => (j === i ? Math.min(v, base - 1) : c)));
  };

  const valorDecimal = cifras.reduce((s, c, i) => {
    const exp = cifras.length - 1 - i;
    return s + c * base ** exp;
  }, 0);

  const numeroEnBase = cifras.join("");

  return (
    <FiguraInteractiva
      titulo="Representación polinómica de un número"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">
            {numeroEnBase}
            <span className="text-sm text-slate-400">({base})</span>
          </p>
          <p className="text-center text-sm text-slate-500">
            {cifras.map((c, i) => {
              const exp = cifras.length - 1 - i;
              return (
                <span key={i}>
                  {i > 0 && " + "}
                  {c}×{base}
                  <sup>{exp}</sup>
                </span>
              );
            })}
          </p>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Base" valor={base} min={2} max={16} onChange={cambiarBase} />
            {cifras.map((c, i) => (
              <ControlDeslizante
                key={i}
                etiqueta={`Cifra ${cifras.length - i} (posición ${cifras.length - 1 - i})`}
                valor={c}
                min={0}
                max={base - 1}
                onChange={(v) => actualizarCifra(i, v)}
              />
            ))}
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label={`Número en base ${base}`} valor={numeroEnBase} />
          <EstadisticaFila label="Valor en base 10" valor={valorDecimal} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada cifra debe ser estrictamente menor que la base — por eso el máximo de
            cada slider es (base − 1).
          </p>
        </div>
      }
      instrucciones="Cambia la base y ajusta cada cifra para ver la descomposición polinómica y el valor en base 10."
    />
  );
}
