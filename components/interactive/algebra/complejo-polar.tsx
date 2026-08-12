"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

export function ComplejoPolar() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);

  const r = Math.sqrt(a * a + b * b);
  const thetaRad = Math.atan2(b, a);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  return (
    <FiguraInteractiva
      titulo="Forma polar y exponencial de un número complejo"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            z = {a} {b >= 0 ? "+" : "−"} {Math.abs(b)}i
          </p>

          <PlanoCartesiano
            funciones={[]}
            puntos={[{ x: a, y: b, color: "#3b82f6" }]}
            xMin={-8}
            xMax={8}
            yMin={-8}
            yMax={8}
          />

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>Módulo: r = √(a²+b²) = {r.toFixed(3)}</p>
            <p>Argumento: θ = arctan(b/a) = {thetaDeg.toFixed(2)}°</p>
            <p className="mt-2">
              Forma polar: z = {r.toFixed(3)}(cos {thetaDeg.toFixed(1)}° + i sen {thetaDeg.toFixed(1)}°)
            </p>
            <p>
              Forma exponencial: z = {r.toFixed(3)}·e^({thetaRad.toFixed(3)}i)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a (Re z)" valor={a} min={-6} max={6} onChange={setA} />
            <ControlDeslizante etiqueta="b (Im z)" valor={b} min={-6} max={6} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="z (rectangular)" valor={`${a} ${b >= 0 ? "+" : "−"} ${Math.abs(b)}i`} />
          <EstadisticaFila label="Módulo r" valor={r.toFixed(3)} />
          <EstadisticaFila label="Argumento θ" valor={`${thetaDeg.toFixed(2)}°`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El módulo es la distancia de z al origen; el argumento es el ángulo que forma z con
            el eje real positivo.
          </p>
        </div>
      }
      instrucciones="Ajusta a y b para ver el módulo, el argumento, y las formas polar y exponencial de z."
    />
  );
}
