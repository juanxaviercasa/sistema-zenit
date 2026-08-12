"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const CIFRAS_CUADRADO_POSIBLES = new Set([0, 1, 4, 5, 6, 9]);

function tablaCifras() {
  const filas: { d: number; cuadrado: number; cubo: number }[] = [];
  for (let d = 0; d <= 9; d++) {
    filas.push({ d, cuadrado: (d * d) % 10, cubo: (d * d * d) % 10 });
  }
  return filas;
}

export function CriterioDeCuadradosYCubos() {
  const [n, setN] = useState(17);
  const [cifraBuscada, setCifraBuscada] = useState(7);

  const cuadrado = n * n;
  const cubo = n * n * n;
  const cifraN = n % 10;
  const filas = tablaCifras();

  const cuadradoPosible = CIFRAS_CUADRADO_POSIBLES.has(cifraBuscada);
  const baseParaCubo = filas.find((f) => f.cubo === cifraBuscada)?.d;

  return (
    <FiguraInteractiva
      titulo="Criterio de la última cifra: cuadrados y cubos perfectos"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="grid grid-cols-2 gap-3 text-center font-mono text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">N²</p>
              <p className="text-xl text-slate-900">
                {cuadrado.toString().slice(0, -1)}
                <span className="text-blue-600 underline decoration-2 underline-offset-4">
                  {cuadrado.toString().slice(-1)}
                </span>
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">N³</p>
              <p className="text-xl text-slate-900">
                {cubo.toString().slice(0, -1)}
                <span className="text-blue-600 underline decoration-2 underline-offset-4">
                  {cubo.toString().slice(-1)}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="px-2 py-1 text-left font-normal">Última cifra de N</th>
                  <th className="px-2 py-1 text-left font-normal">Última cifra de N²</th>
                  <th className="px-2 py-1 text-left font-normal">Última cifra de N³</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {filas.map((f) => (
                  <tr
                    key={f.d}
                    className={`border-b border-slate-100 last:border-b-0 ${
                      f.d === cifraN ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-2 py-1">{f.d}</td>
                    <td className="px-2 py-1">{f.cuadrado}</td>
                    <td className="px-2 py-1">{f.cubo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N" valor={n} min={0} max={99} onChange={setN} />
            <ControlDeslizante
              etiqueta="Cifra a verificar"
              valor={cifraBuscada}
              min={0}
              max={9}
              onChange={setCifraBuscada}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="N" valor={n} />
          <EstadisticaFila label="N²" valor={cuadrado} />
          <EstadisticaFila label="N³" valor={cubo} />
          <EstadisticaFila
            label={`¿Un cuadrado puede terminar en ${cifraBuscada}?`}
            valor={cuadradoPosible ? "Sí" : "No"}
          />
          <EstadisticaFila
            label={`¿Un cubo puede terminar en ${cifraBuscada}?`}
            valor={`Sí (base termina en ${baseParaCubo})`}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Los cuadrados solo pueden terminar en 0,1,4,5,6,9. Los cubos, en cambio, pueden
            terminar en cualquier cifra — la correspondencia es biunívoca.
          </p>
        </div>
      }
      instrucciones="Ajusta N para ver las últimas cifras de N² y N³, y verifica qué cifras finales son posibles."
    />
  );
}
