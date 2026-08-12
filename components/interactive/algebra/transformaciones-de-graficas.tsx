"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

const BASES = [
  { nombre: "f(x) = x²", fn: (x: number) => x * x },
  { nombre: "f(x) = x³", fn: (x: number) => x ** 3 },
  { nombre: "f(x) = x³ − 4x", fn: (x: number) => x ** 3 - 4 * x },
];

const MODOS = ["y = a·f(sx+c)+d", "y = f(|x|)", "y = |f(x)|"] as const;

export function TransformacionesDeGraficas() {
  const [indiceBase, setIndiceBase] = useState(2);
  const [modoIndice, setModoIndice] = useState(0);
  const [a, setA] = useState(1);
  const [s, setS] = useState(1);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const base = BASES[indiceBase];
  const modo = MODOS[modoIndice];

  let transformada: (x: number) => number;
  let etiqueta: string;
  if (modo === "y = f(|x|)") {
    transformada = (x) => base.fn(Math.abs(x));
    etiqueta = "y = f(|x|)";
  } else if (modo === "y = |f(x)|") {
    transformada = (x) => Math.abs(base.fn(x));
    etiqueta = "y = |f(x)|";
  } else {
    transformada = (x) => a * base.fn(s * x + c) + d;
    etiqueta = `y = ${a}·f(${s}x${c >= 0 ? "+" : ""}${c})${d >= 0 ? "+" : ""}${d}`;
  }

  return (
    <FiguraInteractiva
      titulo="Transformaciones de gráficas"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">{base.nombre}</p>
          <p className="text-center font-mono text-lg text-slate-900">{etiqueta}</p>

          <PlanoCartesiano
            funciones={[
              { fn: base.fn, color: "#cbd5e1" },
              { fn: transformada, color: "#3b82f6" },
            ]}
          />

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Función base"
              valor={indiceBase}
              min={0}
              max={BASES.length - 1}
              onChange={setIndiceBase}
              formato={() => base.nombre}
            />
            <ControlDeslizante
              etiqueta="Modo"
              valor={modoIndice}
              min={0}
              max={MODOS.length - 1}
              onChange={setModoIndice}
              formato={() => modo}
            />
          </div>
          {modo === "y = a·f(sx+c)+d" && (
            <div className="grid grid-cols-4 gap-3">
              <ControlDeslizante etiqueta="a" valor={a} min={-2} max={2} onChange={setA} />
              <ControlDeslizante etiqueta="s" valor={s} min={-1} max={1} step={2} onChange={setS} />
              <ControlDeslizante etiqueta="c" valor={c} min={-5} max={5} onChange={setC} />
              <ControlDeslizante etiqueta="d" valor={d} min={-5} max={5} onChange={setD} />
            </div>
          )}
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Base (gris)" valor={base.nombre} />
          <EstadisticaFila label="Transformada (azul)" valor={etiqueta} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            a refleja verticalmente si es negativo; s refleja horizontalmente si es −1; c
            desplaza horizontalmente; d desplaza verticalmente. f(|x|) copia la mitad x≥0 al
            lado izquierdo; |f(x)| refleja hacia arriba la parte negativa de f.
          </p>
        </div>
      }
      instrucciones="Elige la función base y el modo de transformación para ver el efecto sobre la gráfica."
    />
  );
}
