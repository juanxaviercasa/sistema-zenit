"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function factorizar(n: number): { primo: number; exponente: number }[] {
  const factores: { primo: number; exponente: number }[] = [];
  let resto = n;
  for (let p = 2; p * p <= resto; p++) {
    if (resto % p === 0) {
      let exp = 0;
      while (resto % p === 0) {
        resto /= p;
        exp++;
      }
      factores.push({ primo: p, exponente: exp });
    }
  }
  if (resto > 1) factores.push({ primo: resto, exponente: 1 });
  return factores;
}

export function DescomposicionCanonica() {
  const [n, setN] = useState(360);

  const factores = factorizar(n);
  const cd = factores.reduce((prod, f) => prod * (f.exponente + 1), 1);
  const sd = factores.reduce((prod, f) => prod * ((f.primo ** (f.exponente + 1) - 1) / (f.primo - 1)), 1);
  const pd = Math.pow(n, cd / 2);
  const sumaInversas = sd / n;

  return (
    <FiguraInteractiva
      titulo="Descomposición canónica y estudio de divisores"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">{n}</p>
          <p className="text-center font-mono text-lg text-blue-600">
            {factores.map((f, i) => (
              <span key={f.primo}>
                {i > 0 && " × "}
                {f.primo}
                {f.exponente > 1 && <sup>{f.exponente}</sup>}
              </span>
            ))}
          </p>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={2} max={2000} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Cantidad de divisores CD(N)" valor={cd} />
          <EstadisticaFila label="Suma de divisores SD(N)" valor={sd} />
          <EstadisticaFila label="Producto de divisores PD(N)" valor={pd.toExponential(3)} />
          <EstadisticaFila label="Suma de inversas de divisores" valor={sumaInversas.toFixed(4)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Todas estas cantidades se calculan directamente a partir de los exponentes
            de la descomposición canónica, sin necesidad de listar los divisores uno
            por uno.
          </p>
        </div>
      }
      instrucciones="Ajusta N y observa su descomposición en factores primos y las fórmulas de sus divisores."
    />
  );
}
