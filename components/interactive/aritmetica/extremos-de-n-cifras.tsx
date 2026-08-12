"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function ExtremosDeNCifras() {
  const [base, setBase] = useState(10);
  const [n, setN] = useState(3);

  const menor = base ** (n - 1);
  const mayor = base ** n - 1;
  const cantidad = mayor - menor + 1;

  const menorEnBase = "1" + "0".repeat(n - 1);
  const mayorEnBase = String(base - 1).repeat(n);

  return (
    <FiguraInteractiva
      titulo="Menor y mayor número de n cifras en base b"
      board={
        <div className="flex flex-col gap-6 px-2 py-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Menor</p>
              <p className="mt-1 font-mono text-xl text-blue-600">{menorEnBase}</p>
              <p className="mt-1 text-xs text-slate-500">= {menor} en base 10</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mayor</p>
              <p className="mt-1 font-mono text-xl text-blue-600">{mayorEnBase}</p>
              <p className="mt-1 text-xs text-slate-500">= {mayor} en base 10</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Base" valor={base} min={2} max={16} onChange={setBase} />
            <ControlDeslizante etiqueta="Número de cifras (n)" valor={n} min={1} max={6} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Menor número de n cifras (base 10)" valor={menor} />
          <EstadisticaFila label="Mayor número de n cifras (base 10)" valor={mayor} />
          <EstadisticaFila label="Cantidad de números de n cifras" valor={cantidad} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El menor siempre es 1 seguido de (n−1) ceros; el mayor siempre es la cifra
            máxima (base−1) repetida n veces.
          </p>
        </div>
      }
      instrucciones="Cambia la base y el número de cifras para ver cómo se forman los extremos."
    />
  );
}
