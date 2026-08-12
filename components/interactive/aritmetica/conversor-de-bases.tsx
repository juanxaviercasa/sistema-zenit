"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function convertir(n: number, base: number): { pasos: { cociente: number; residuo: number }[]; resultado: string } {
  if (n === 0) return { pasos: [{ cociente: 0, residuo: 0 }], resultado: "0" };
  const pasos: { cociente: number; residuo: number }[] = [];
  let actual = n;
  while (actual > 0) {
    const cociente = Math.floor(actual / base);
    const residuo = actual % base;
    pasos.push({ cociente, residuo });
    actual = cociente;
  }
  const resultado = pasos
    .map((p) => p.residuo)
    .reverse()
    .join("");
  return { pasos, resultado };
}

export function ConversorDeBases() {
  const [n, setN] = useState(180);
  const [base, setBase] = useState(7);

  const { pasos, resultado } = convertir(n, base);

  return (
    <FiguraInteractiva
      titulo="Conversor de base 10 a base b (divisiones sucesivas)"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-1.5 font-semibold">División</th>
                <th className="pb-1.5 font-semibold">Cociente</th>
                <th className="pb-1.5 font-semibold">Residuo</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums text-slate-900">
              {pasos.map((p, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-1">{i === 0 ? n : pasos[i - 1].cociente} ÷ {base}</td>
                  <td className="py-1">{p.cociente}</td>
                  <td className="py-1 font-semibold text-blue-600">{p.residuo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Número en base 10" valor={n} min={0} max={2000} onChange={setN} />
            <ControlDeslizante etiqueta="Base destino" valor={base} min={2} max={16} onChange={setBase} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label={`${n} en base ${base}`} valor={resultado} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El número en la nueva base se lee de abajo hacia arriba: el último residuo
            es la cifra de mayor peso, el primero es la cifra de las unidades.
          </p>
        </div>
      }
      instrucciones="Ajusta el número y la base destino; la tabla muestra el algoritmo de divisiones sucesivas paso a paso."
    />
  );
}
