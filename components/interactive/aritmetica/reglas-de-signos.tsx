"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const COMBINACIONES: { signoA: string; signoB: string; resultado: string }[] = [
  { signoA: "+", signoB: "+", resultado: "+" },
  { signoA: "+", signoB: "−", resultado: "−" },
  { signoA: "−", signoB: "+", resultado: "−" },
  { signoA: "−", signoB: "−", resultado: "+" },
];

export function ReglasDeSignos() {
  const [magnitudA, setMagnitudA] = useState(4);
  const [magnitudB, setMagnitudB] = useState(3);
  const [signoA, setSignoA] = useState<"+" | "−">("+");
  const [signoB, setSignoB] = useState<"+" | "−">("−");

  const a = signoA === "+" ? magnitudA : -magnitudA;
  const b = signoB === "+" ? magnitudB : -magnitudB;
  const producto = a * b;

  return (
    <FiguraInteractiva
      titulo="Reglas de signos en la multiplicación"
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="grid grid-cols-2 gap-2">
            {COMBINACIONES.map((c) => {
              const activo = c.signoA === signoA && c.signoB === signoB;
              return (
                <div
                  key={`${c.signoA}${c.signoB}`}
                  className={`rounded-lg border p-2.5 text-center font-mono text-sm ${activo ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500"}`}
                >
                  ({c.signoA}) × ({c.signoB}) = {c.resultado}
                </div>
              );
            })}
          </div>

          <p className="text-center font-mono text-2xl text-slate-900">
            ({a}) × ({b}) = {producto}
          </p>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <div className="flex gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSignoA("+")}
                className={`rounded-full px-3 py-1.5 ${signoA === "+" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                a positivo
              </button>
              <button
                type="button"
                onClick={() => setSignoA("−")}
                className={`rounded-full px-3 py-1.5 ${signoA === "−" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                a negativo
              </button>
            </div>
            <ControlDeslizante etiqueta="|a|" valor={magnitudA} min={1} max={10} onChange={setMagnitudA} />

            <div className="flex gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSignoB("+")}
                className={`rounded-full px-3 py-1.5 ${signoB === "+" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                b positivo
              </button>
              <button
                type="button"
                onClick={() => setSignoB("−")}
                className={`rounded-full px-3 py-1.5 ${signoB === "−" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                b negativo
              </button>
            </div>
            <ControlDeslizante etiqueta="|b|" valor={magnitudB} min={1} max={10} onChange={setMagnitudB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="a" valor={a} />
          <EstadisticaFila label="b" valor={b} />
          <EstadisticaFila label="a × b" valor={producto} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Signos iguales dan producto positivo; signos distintos dan producto
            negativo — la fila resaltada en la tabla es la combinación activa.
          </p>
        </div>
      }
      instrucciones="Cambia los signos y las magnitudes de a y b para explorar las cuatro combinaciones posibles."
    />
  );
}
