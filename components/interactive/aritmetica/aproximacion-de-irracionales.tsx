"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const IRRACIONALES = [
  { nombre: "√2", valor: Math.sqrt(2) },
  { nombre: "√3", valor: Math.sqrt(3) },
  { nombre: "√5", valor: Math.sqrt(5) },
  { nombre: "π", valor: Math.PI },
];

export function AproximacionDeIrracionales() {
  const [indice, setIndice] = useState(0);
  const [cifras, setCifras] = useState(4);

  const { nombre, valor } = IRRACIONALES[indice];
  const potencia = 10 ** cifras;
  const numeradorAprox = Math.floor(valor * potencia);
  const truncado = numeradorAprox / potencia;
  const error = valor - truncado;
  const cota = 1 / potencia;

  return (
    <FiguraInteractiva
      titulo="Aproximación de un irracional por racionales"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-3xl text-slate-900">
            {nombre} ≈ {truncado.toFixed(cifras)}
          </p>
          <p className="text-center text-xs text-slate-500">
            (usando {cifras} cifra{cifras !== 1 ? "s" : ""} decimal{cifras !== 1 ? "es" : ""})
          </p>

          <div className="rounded-xl bg-slate-50 px-4 py-3 text-center font-mono text-sm text-slate-700">
            {nombre} ≈ {numeradorAprox}/{potencia}
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-600">
            <p>
              Error = |{nombre} − aproximación| ={" "}
              <span className="text-slate-900">{error.toExponential(3)}</span>
            </p>
            <p>
              Cota 10<sup>−{cifras}</sup> = <span className="text-slate-900">{cota.toExponential(3)}</span>
            </p>
            <p className={error < cota ? "text-emerald-600" : "text-red-500"}>
              {error < cota ? "✓ el error es menor que la cota" : "✗ inesperado"}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Número"
              valor={indice}
              min={0}
              max={IRRACIONALES.length - 1}
              onChange={setIndice}
              formato={() => nombre}
            />
          </div>
          <ControlDeslizante
            etiqueta="Cifras decimales"
            valor={cifras}
            min={1}
            max={10}
            onChange={setCifras}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Irracional" valor={nombre} />
          <EstadisticaFila label="Aproximación racional" valor={truncado.toFixed(cifras)} />
          <EstadisticaFila label="Error" valor={error.toExponential(3)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Truncar la expresión decimal de un irracional en la cifra n produce una fracción con
            denominador 10ⁿ cuyo error es siempre menor que 10⁻ⁿ — se puede aproximar tanto como
            se quiera, pero nunca alcanzar exactamente.
          </p>
        </div>
      }
      instrucciones="Elige un irracional y cuántas cifras decimales usar para aproximarlo por un racional."
    />
  );
}
