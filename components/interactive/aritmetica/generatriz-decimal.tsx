"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante, mcd } from "./controles";

export function GeneratrizDecimal() {
  const [cifrasNoPeriodicas, setCifrasNoPeriodicas] = useState(1);
  const [valorNoPeriodico, setValorNoPeriodico] = useState(3);
  const [cifrasPeriodicas, setCifrasPeriodicas] = useState(2);
  const [valorPeriodico, setValorPeriodico] = useState(45);

  const m = cifrasNoPeriodicas;
  const k = cifrasPeriodicas;
  const maxNoPeriodico = 10 ** m - 1;
  const maxPeriodico = 10 ** k - 1;
  const nVal = Math.min(valorNoPeriodico, maxNoPeriodico);
  const pVal = Math.min(valorPeriodico, maxPeriodico);

  const nDigitos = m > 0 ? nVal.toString().padStart(m, "0") : "";
  const pDigitos = pVal.toString().padStart(k, "0");

  const nCompleto = nVal * 10 ** k + pVal;
  const numerador = nCompleto - nVal;
  const denominador = (10 ** k - 1) * 10 ** m;
  const g = numerador === 0 ? denominador : mcd(numerador, denominador);
  const numRed = numerador / g;
  const denRed = denominador / g;

  const decimalTexto = `0.${nDigitos}${pDigitos}...`;
  const valorAproximado = numRed / denRed;

  return (
    <FiguraInteractiva
      titulo="Generatriz de una expresión decimal periódica"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-2xl text-slate-900">
            0.{nDigitos}
            <span className="text-blue-600 underline decoration-2 underline-offset-4">
              {pDigitos}
            </span>
            …
          </p>

          <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-600">
            <p>
              Número formado por todas las cifras (no periódicas + un período):{" "}
              <span className="text-slate-900">{nCompleto}</span>
            </p>
            <p>
              Número formado solo por las cifras no periódicas:{" "}
              <span className="text-slate-900">{m > 0 ? nVal : 0}</span>
            </p>
            <p>
              Numerador = {nCompleto} − {m > 0 ? nVal : 0} = <span className="text-slate-900">{numerador}</span>
            </p>
            <p>
              Denominador = ({k} nueve{k > 1 ? "s" : ""}){m > 0 ? ` seguido de ${m} cero${m > 1 ? "s" : ""}` : ""} ={" "}
              <span className="text-slate-900">{denominador}</span>
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-center font-mono text-lg text-slate-900">
            {numerador}/{denominador} = {numRed}/{denRed}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Cifras no periódicas"
              valor={cifrasNoPeriodicas}
              min={0}
              max={3}
              onChange={(v) => {
                setCifrasNoPeriodicas(v);
                setValorNoPeriodico((prev) => Math.min(prev, 10 ** v - 1));
              }}
            />
            <ControlDeslizante
              etiqueta="Valor no periódico"
              valor={nVal}
              min={0}
              max={maxNoPeriodico}
              onChange={setValorNoPeriodico}
            />
            <ControlDeslizante
              etiqueta="Cifras periódicas"
              valor={cifrasPeriodicas}
              min={1}
              max={3}
              onChange={(v) => {
                setCifrasPeriodicas(v);
                setValorPeriodico((prev) => Math.min(prev, 10 ** v - 1));
              }}
            />
            <ControlDeslizante
              etiqueta="Valor periódico"
              valor={pVal}
              min={0}
              max={maxPeriodico}
              onChange={setValorPeriodico}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Decimal" valor={decimalTexto} />
          <EstadisticaFila label="Fracción generatriz" valor={`${numRed}/${denRed}`} />
          <EstadisticaFila label="Verificación (decimal ≈)" valor={valorAproximado.toFixed(6)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La fórmula funciona multiplicando por potencias de 10 para alinear los períodos y
            restar la parte no periódica, dejando un número entero como numerador.
          </p>
        </div>
      }
      instrucciones="Ajusta la parte no periódica y el período para construir su fracción generatriz."
    />
  );
}
