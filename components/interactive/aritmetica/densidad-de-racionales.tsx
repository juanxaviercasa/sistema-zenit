"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante, mcd } from "./controles";

function fraccionReducida(num: number, den: number): [number, number] {
  if (num === 0) return [0, 1];
  const g = mcd(num, den);
  return [num / g, den / g];
}

export function DensidadDeRacionales() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(4);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(2);
  const [profundidad, setProfundidad] = useState(4);

  const r = a1 / b1;
  const s = a2 / b2;
  const distintos = r !== s;
  const rEsMenor = r <= s;

  const [loNum, loDen] = fraccionReducida(rEsMenor ? a1 : a2, rEsMenor ? b1 : b2);
  const [hiNum, hiDen] = fraccionReducida(rEsMenor ? a2 : a1, rEsMenor ? b2 : b1);
  const lo = Math.min(r, s);
  const hi = Math.max(r, s);

  const puntos: number[] = [lo];
  for (let i = 0; i < profundidad; i++) {
    puntos.push((puntos[puntos.length - 1] + hi) / 2);
  }

  return (
    <FiguraInteractiva
      titulo="Densidad de los números racionales"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {!distintos ? (
            <p className="text-center text-sm text-slate-500">
              Elige dos fracciones distintas para ver el proceso de bisección.
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-20 shrink-0 text-slate-400">extremo</span>
                <span className="text-slate-900">{lo.toFixed(6)}</span>
              </div>
              {puntos.slice(1).map((p, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-20 shrink-0 text-slate-400">medio {i + 1}</span>
                  <span className="text-blue-600">{p.toFixed(6)}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-20 shrink-0 text-slate-400">extremo</span>
                <span className="text-slate-900">{hi.toFixed(6)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Numerador 1" valor={a1} min={0} max={20} onChange={setA1} />
            <ControlDeslizante etiqueta="Denominador 1" valor={b1} min={1} max={12} onChange={setB1} />
            <ControlDeslizante etiqueta="Numerador 2" valor={a2} min={0} max={20} onChange={setA2} />
            <ControlDeslizante etiqueta="Denominador 2" valor={b2} min={1} max={12} onChange={setB2} />
          </div>
          <ControlDeslizante
            etiqueta="Profundidad de bisección"
            valor={profundidad}
            min={1}
            max={8}
            onChange={setProfundidad}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Extremo menor" valor={`${loNum}/${loDen}`} />
          <EstadisticaFila label="Extremo mayor" valor={`${hiNum}/${hiDen}`} />
          <EstadisticaFila label="Puntos medios generados" valor={profundidad} />
          <EstadisticaFila
            label="Distancia al extremo mayor"
            valor={distintos ? (hi - puntos[puntos.length - 1]).toExponential(2) : "—"}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada punto medio es el promedio de dos racionales, así que también es racional, y
            queda estrictamente entre el anterior y el extremo mayor. El proceso nunca termina:
            siempre cabe otro racional más cerca.
          </p>
        </div>
      }
      instrucciones="Ajusta las dos fracciones y la profundidad para ver cómo la bisección genera racionales cada vez más cercanos, sin fin."
    />
  );
}
