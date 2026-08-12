"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function fmt(x: number): string {
  return Number.isInteger(x) ? x.toString() : x.toFixed(3);
}

export function ResolvedorConRadicales() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(-1);

  const A = 1;
  const B = 2 * b - 1;
  const C = b * b - a;
  const disc = B * B - 4 * A * C;

  const candidatos: number[] = [];
  if (disc >= 0) {
    candidatos.push((-B + Math.sqrt(disc)) / (2 * A));
    if (disc > 0) candidatos.push((-B - Math.sqrt(disc)) / (2 * A));
  }

  const evaluados = candidatos.map((x) => {
    const dominio = x + a >= 0 && x + b >= 0;
    const izq = Math.sqrt(Math.max(0, x + a));
    const der = x + b;
    const valido = dominio && Math.abs(izq - der) < 1e-6;
    return { x, izq, der, valido };
  });

  return (
    <FiguraInteractiva
      titulo="Ecuación con radicales: √(x+a) = x+b"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            √(x{a >= 0 ? "+" : "−"}{Math.abs(a)}) = x{b >= 0 ? "+" : "−"}{Math.abs(b)}
          </p>
          <p className="text-center font-mono text-sm text-slate-500">
            Al elevar al cuadrado: x² + ({fmt(B)})x + ({fmt(C)}) = 0
          </p>

          <div className="flex flex-col gap-2">
            {evaluados.length === 0 && (
              <p className="text-center text-sm text-slate-400">
                La ecuación cuadrática resultante no tiene soluciones reales.
              </p>
            )}
            {evaluados.map((e, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 font-mono text-sm ${e.valido ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-500"}`}
              >
                x = {fmt(e.x)}: √(x+a) = {fmt(e.izq)}, x+b = {fmt(e.der)} —{" "}
                {e.valido ? "✓ válida" : "✗ extraña (no cumple la ecuación original)"}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-5} max={5} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Candidatos (tras elevar al cuadrado)" valor={candidatos.length} />
          <EstadisticaFila
            label="Soluciones válidas"
            valor={evaluados.filter((e) => e.valido).length}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Elevar al cuadrado puede introducir raíces extrañas (porque (−k)²=k² también),
            así que cada candidato debe verificarse en la ecuación original con radical.
          </p>
        </div>
      }
      instrucciones="Ajusta a y b para ver cómo algunos candidatos resultan ser raíces extrañas al verificarlos."
    />
  );
}
