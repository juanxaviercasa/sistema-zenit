"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const N_TERMINOS = 8;

export function TablaDeRestosPotenciales() {
  const [a, setA] = useState(2);
  const [m, setM] = useState(7);

  const restos: number[] = [];
  let actual = 1;
  for (let i = 1; i <= N_TERMINOS; i++) {
    actual = (actual * a) % m;
    restos.push(actual);
  }

  let periodo = N_TERMINOS;
  for (let p = 1; p < N_TERMINOS; p++) {
    if (restos[p] === restos[0]) {
      periodo = p;
      break;
    }
  }

  return (
    <FiguraInteractiva
      titulo="Restos potenciales de a módulo m"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex flex-wrap gap-2">
            {restos.map((r, i) => (
              <div
                key={i}
                className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs ${i < periodo ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-400"}`}
              >
                <span className="font-mono text-[0.65rem] text-slate-400">
                  {a}<sup>{i + 1}</sup>
                </span>
                <span className="font-mono font-semibold">{r}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a (base de la potencia)" valor={a} min={2} max={15} onChange={setA} />
            <ControlDeslizante etiqueta="m (módulo)" valor={m} min={2} max={13} onChange={setM} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Longitud del período detectado" valor={periodo} />
          <EstadisticaFila label={`Resto de ${a}¹ ÷ ${m}`} valor={restos[0]} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Los restos de las potencias de a al dividir entre m se repiten
            periódicamente (hay como máximo m restos distintos posibles). Encontrar el
            período permite calcular el resto de una potencia enorme sin elevarla
            realmente.
          </p>
        </div>
      }
      instrucciones="Cambia a y m para ver cómo cambia la secuencia de restos y dónde empieza a repetirse."
    />
  );
}
