"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante, mcd } from "./controles";

type Tipo = "exacta" | "periodica-pura" | "periodica-mixta";

function analizar(numerador: number, denominador: number) {
  const g = mcd(numerador, denominador);
  const n = numerador / g;
  const d = denominador / g;

  let d2 = d;
  let m2 = 0;
  let m5 = 0;
  while (d2 % 2 === 0) {
    d2 /= 2;
    m2++;
  }
  while (d2 % 5 === 0) {
    d2 /= 5;
    m5++;
  }
  const k = d2;
  const tipo: Tipo = k === 1 ? "exacta" : m2 === 0 && m5 === 0 ? "periodica-pura" : "periodica-mixta";

  const entero = Math.floor(n / d);
  let resto = n % d;

  const MAX = 40;
  const pasos: { resto: number; digito: number }[] = [];
  const vistos = new Map<number, number>();
  let inicioPeriodo = -1;

  while (resto !== 0 && pasos.length < MAX) {
    if (vistos.has(resto)) {
      inicioPeriodo = vistos.get(resto)!;
      break;
    }
    vistos.set(resto, pasos.length);
    const restoPorDiez = resto * 10;
    const digito = Math.floor(restoPorDiez / d);
    pasos.push({ resto, digito });
    resto = restoPorDiez % d;
  }

  return { n, d, m2, m5, k, tipo, entero, pasos, inicioPeriodo };
}

const NOMBRES_TIPO: Record<Tipo, string> = {
  exacta: "Decimal exacta",
  "periodica-pura": "Periódica pura",
  "periodica-mixta": "Periódica mixta",
};

export function ConversorFraccionADecimal() {
  const [numerador, setNumerador] = useState(7);
  const [denominador, setDenominador] = useState(12);

  const { n, d, m2, m5, k, tipo, entero, pasos, inicioPeriodo } = analizar(numerador, denominador);
  const digitos = pasos.map((p) => p.digito);

  const factorizacion = [
    m2 > 0 ? `2${m2 > 1 ? `^${m2}` : ""}` : null,
    m5 > 0 ? `5${m5 > 1 ? `^${m5}` : ""}` : null,
    k > 1 ? `${k}` : null,
  ]
    .filter(Boolean)
    .join(" × ");

  return (
    <FiguraInteractiva
      titulo="Conversor de fracción a decimal (división larga)"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">
            {n}/{d} = {entero}.
            {digitos.map((dg, i) => (
              <span
                key={i}
                className={
                  inicioPeriodo !== -1 && i >= inicioPeriodo
                    ? "text-blue-600 underline decoration-2 underline-offset-4"
                    : "text-slate-900"
                }
              >
                {dg}
              </span>
            ))}
            {inicioPeriodo !== -1 ? "…" : ""}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="px-2 py-1 text-left font-normal">Resto</th>
                  <th className="px-2 py-1 text-left font-normal">Resto × 10</th>
                  <th className="px-2 py-1 text-left font-normal">Dígito</th>
                </tr>
              </thead>
              <tbody className="font-mono text-slate-700">
                {pasos.slice(0, 16).map((p, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 last:border-b-0 ${
                      inicioPeriodo !== -1 && i === inicioPeriodo ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-2 py-1">{p.resto}</td>
                    <td className="px-2 py-1">{p.resto * 10}</td>
                    <td className="px-2 py-1">{p.digito}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pasos.length > 16 && (
              <p className="px-2 py-1 text-xs text-slate-400">
                … ({pasos.length - 16} filas más, hasta repetir un resto)
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Numerador"
              valor={numerador}
              min={1}
              max={60}
              onChange={setNumerador}
            />
            <ControlDeslizante
              etiqueta="Denominador"
              valor={denominador}
              min={2}
              max={30}
              onChange={setDenominador}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Fracción reducida" valor={`${n}/${d}`} />
          <EstadisticaFila label="Denominador factorizado" valor={factorizacion || "1"} />
          <EstadisticaFila label="Tipo de decimal" valor={NOMBRES_TIPO[tipo]} />
          {inicioPeriodo !== -1 && (
            <>
              <EstadisticaFila label="Cifras no periódicas" valor={inicioPeriodo} />
              <EstadisticaFila label="Longitud del período" valor={digitos.length - inicioPeriodo} />
            </>
          )}
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Si el denominador reducido solo tiene los primos 2 y 5, la decimal es exacta. Si
            queda algún otro primo, la decimal se repite para siempre.
          </p>
        </div>
      }
      instrucciones="Ajusta numerador y denominador para ver la división larga y clasificar la decimal resultante."
    />
  );
}
