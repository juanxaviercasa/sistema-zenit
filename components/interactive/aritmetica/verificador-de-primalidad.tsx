"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function VerificadorDePrimalidad() {
  const [n, setN] = useState(97);

  const raiz = Math.sqrt(n);
  const pruebas: { d: number; divide: boolean }[] = [];
  for (let d = 2; d <= Math.floor(raiz); d++) {
    pruebas.push({ d, divide: n % d === 0 });
  }
  const esPrimo = n > 1 && pruebas.every((p) => !p.divide);
  const primerDivisor = pruebas.find((p) => p.divide)?.d;

  return (
    <FiguraInteractiva
      titulo="Verificador de primalidad (división hasta √N)"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <p className="text-center font-mono text-3xl text-slate-900">{n}</p>
          <p className="text-center text-xs text-slate-500">
            √{n} ≈ {raiz.toFixed(2)} — solo hace falta probar divisores hasta aquí
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {pruebas.length === 0 && (
              <span className="text-xs text-slate-400">
                (N muy pequeño: no hace falta probar ningún divisor)
              </span>
            )}
            {pruebas.map((p) => (
              <span
                key={p.d}
                className={`rounded-lg px-2.5 py-1.5 font-mono text-xs ${p.divide ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"}`}
              >
                {n} ÷ {p.d} {p.divide ? "✓ exacto" : "✗"}
              </span>
            ))}
          </div>

          <div
            className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${esPrimo ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
          >
            {n <= 1
              ? `${n} no es primo ni compuesto`
              : esPrimo
                ? `✓ ${n} es primo`
                : `✗ ${n} es compuesto (divisible entre ${primerDivisor})`}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={1} max={400} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="N" valor={n} />
          <EstadisticaFila label="√N (redondeado)" valor={Math.floor(raiz)} />
          <EstadisticaFila label="Divisores probados" valor={pruebas.length} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Si ningún primo hasta √N divide a N, ya no hace falta seguir probando —
            N tiene que ser primo.
          </p>
        </div>
      }
      instrucciones="Ajusta N y observa qué divisores se prueban hasta √N para determinar si es primo."
    />
  );
}
