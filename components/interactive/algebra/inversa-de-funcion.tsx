"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

type Entrada = {
  nombre: string;
  fn: (x: number) => number;
  inversaNombre: string;
  inversa: (x: number) => number;
};

const FUNCIONES: Entrada[] = [
  {
    nombre: "f(x) = 2x + 3",
    fn: (x) => 2 * x + 3,
    inversaNombre: "f⁻¹(x) = (x−3)/2",
    inversa: (x) => (x - 3) / 2,
  },
  {
    nombre: "f(x) = x³",
    fn: (x) => x ** 3,
    inversaNombre: "f⁻¹(x) = ∛x",
    inversa: (x) => Math.cbrt(x),
  },
  {
    nombre: "f(x) = x/2 − 1",
    fn: (x) => x / 2 - 1,
    inversaNombre: "f⁻¹(x) = 2x + 2",
    inversa: (x) => 2 * x + 2,
  },
];

export function InversaDeFuncion() {
  const [indice, setIndice] = useState(0);
  const [x, setX] = useState(2);
  const entrada = FUNCIONES[indice];

  const fx = entrada.fn(x);
  const fInvDeF = entrada.inversa(fx);

  return (
    <FiguraInteractiva
      titulo="Función inversa"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {entrada.nombre} — {entrada.inversaNombre}
          </p>

          <PlanoCartesiano
            funciones={[
              { fn: entrada.fn, color: "#3b82f6" },
              { fn: entrada.inversa, color: "#059669" },
              { fn: (t) => t, color: "#cbd5e1" },
            ]}
          />

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              f({x}) = {fx.toFixed(3)}
            </p>
            <p>
              f⁻¹(f({x})) = f⁻¹({fx.toFixed(3)}) = {fInvDeF.toFixed(3)}
            </p>
            <p className={Math.abs(fInvDeF - x) < 1e-6 ? "text-emerald-600" : "text-red-500"}>
              {Math.abs(fInvDeF - x) < 1e-6 ? "✓" : "✗"} f⁻¹(f(x)) = x
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Función"
              valor={indice}
              min={0}
              max={FUNCIONES.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${FUNCIONES.length}`}
            />
            <ControlDeslizante etiqueta="x" valor={x} min={-4} max={4} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="f" valor={entrada.nombre} />
          <EstadisticaFila label="f⁻¹" valor={entrada.inversaNombre} />
          <EstadisticaFila label="f(x)" valor={fx.toFixed(3)} />
          <EstadisticaFila label="f⁻¹(f(x))" valor={fInvDeF.toFixed(3)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La gráfica de f⁻¹ (verde) es exactamente el reflejo de f (azul) respecto a la recta
            y=x (gris).
          </p>
        </div>
      }
      instrucciones="Elige una función biyectiva y un valor de x para verificar que f⁻¹(f(x))=x, y observa la simetría de las gráficas respecto a y=x."
    />
  );
}
