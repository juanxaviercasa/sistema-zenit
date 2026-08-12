"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function mcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function factoresPrimosDistintos(n: number): number[] {
  const primos: number[] = [];
  let resto = n;
  for (let p = 2; p * p <= resto; p++) {
    if (resto % p === 0) {
      primos.push(p);
      while (resto % p === 0) resto /= p;
    }
  }
  if (resto > 1) primos.push(resto);
  return primos;
}

export function FuncionDeEuler() {
  const [n, setN] = useState(36);

  const primos = factoresPrimosDistintos(n);
  const phi = primos.reduce((acc, p) => (acc * (p - 1)) / p, n);

  return (
    <FiguraInteractiva
      titulo="Función de Euler φ(N)"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">N = {n}</p>
          <p className="text-center text-sm text-slate-500">
            Primos distintos que dividen a N: {primos.join(", ")}
          </p>

          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: Math.min(n, 60) }, (_, i) => i + 1).map((k) => (
              <span
                key={k}
                className={`flex aspect-square items-center justify-center rounded text-[0.6rem] font-mono ${mcd(k, n) === 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {k}
              </span>
            ))}
          </div>
          {n > 60 && (
            <p className="text-center text-xs text-slate-400">
              (cuadrícula limitada a los primeros 60 números)
            </p>
          )}

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={2} max={100} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="φ(N)" valor={phi.toFixed(0)} />
          <EstadisticaFila
            label="Fórmula"
            valor={`${n} × ${primos.map((p) => `(1−1/${p})`).join(" × ")}`}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Las celdas azules son los números del 1 a N que son coprimos con N (mcd=1)
            — φ(N) los cuenta.
          </p>
        </div>
      }
      instrucciones="Ajusta N y observa cuáles números son coprimos con él (celdas azules)."
    />
  );
}
