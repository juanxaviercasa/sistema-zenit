"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function raizCuadradaEntera(n: number): number {
  let k = Math.floor(Math.sqrt(n));
  while ((k + 1) * (k + 1) <= n) k++;
  while (k * k > n) k--;
  return k;
}

function raizCubicaEntera(n: number): number {
  let k = Math.floor(Math.cbrt(n));
  while ((k + 1) ** 3 <= n) k++;
  while (k ** 3 > n) k--;
  return k;
}

export function RaizConResiduo() {
  const [n, setN] = useState(150);
  const [tipo, setTipo] = useState(0);

  const esCuadrada = tipo === 0;
  const k = esCuadrada ? raizCuadradaEntera(n) : raizCubicaEntera(n);
  const potencia = esCuadrada ? k * k : k ** 3;
  const residuo = n - potencia;
  const cota = esCuadrada ? 2 * k : 3 * k * k + 3 * k;

  return (
    <FiguraInteractiva
      titulo="Raíz entera y residuo"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">
            {esCuadrada ? `⌊√${n}⌋` : `⌊∛${n}⌋`} = {k}
          </p>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-center font-mono text-sm text-slate-700">
            {n} = {k}{esCuadrada ? "²" : "³"} + {residuo} = {potencia} + {residuo}
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-600">
            <p>
              Cota del residuo: {esCuadrada ? "2k" : "3k²+3k"} = <span className="text-slate-900">{cota}</span>
            </p>
            <p className={residuo >= 0 && residuo <= cota ? "text-emerald-600" : "text-red-500"}>
              {residuo >= 0 && residuo <= cota
                ? `✓ 0 ≤ ${residuo} ≤ ${cota}`
                : "✗ fuera de cota (no debería pasar)"}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Tipo de raíz"
              valor={tipo}
              min={0}
              max={1}
              onChange={setTipo}
              formato={() => (tipo === 0 ? "Cuadrada" : "Cúbica")}
            />
          </div>
          <ControlDeslizante etiqueta="N" valor={n} min={1} max={300} onChange={setN} />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="N" valor={n} />
          <EstadisticaFila label={esCuadrada ? "Raíz cuadrada entera" : "Raíz cúbica entera"} valor={k} />
          <EstadisticaFila label="Residuo" valor={residuo} />
          <EstadisticaFila label="Cota máxima del residuo" valor={cota} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El residuo de la raíz cuadrada entera nunca supera 2k, porque (k+1)²−k²=2k+1. El de
            la raíz cúbica nunca supera 3k²+3k, porque (k+1)³−k³=3k²+3k+1.
          </p>
        </div>
      }
      instrucciones="Ajusta N y el tipo de raíz para ver la raíz entera, el residuo y su cota."
    />
  );
}
