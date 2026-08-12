"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

type Fn = { nombre: string; fn: (x: number) => number };

const FUNCIONES: Fn[] = [
  { nombre: "f(x) = x + 1", fn: (x) => x + 1 },
  { nombre: "g(x) = 2x", fn: (x) => 2 * x },
  { nombre: "h(x) = x²", fn: (x) => x * x },
  { nombre: "j(x) = x − 3", fn: (x) => x - 3 },
];

const OPERACIONES = ["f+g", "f−g", "f×g", "f/g", "f∘g", "g∘f"] as const;

export function OperacionesYComposicion() {
  const [indF, setIndF] = useState(0);
  const [indG, setIndG] = useState(1);
  const [opIndice, setOpIndice] = useState(4);
  const [x, setX] = useState(2);

  const f = FUNCIONES[indF];
  const g = FUNCIONES[indG];
  const op = OPERACIONES[opIndice];

  const fx = f.fn(x);
  const gx = g.fn(x);

  let resultado: number;
  let formula: string;
  switch (op) {
    case "f+g":
      resultado = fx + gx;
      formula = `(f+g)(x) = f(x) + g(x)`;
      break;
    case "f−g":
      resultado = fx - gx;
      formula = `(f−g)(x) = f(x) − g(x)`;
      break;
    case "f×g":
      resultado = fx * gx;
      formula = `(f×g)(x) = f(x) × g(x)`;
      break;
    case "f/g":
      resultado = gx === 0 ? NaN : fx / gx;
      formula = `(f/g)(x) = f(x) / g(x)`;
      break;
    case "f∘g":
      resultado = f.fn(gx);
      formula = `(f∘g)(x) = f(g(x))`;
      break;
    default:
      resultado = g.fn(fx);
      formula = `(g∘f)(x) = g(f(x))`;
  }

  return (
    <FiguraInteractiva
      titulo="Operaciones y composición de funciones"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">
            {f.nombre}, {g.nombre}
          </p>
          <p className="text-center font-mono text-lg text-slate-900">{formula}</p>

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              f({x}) = {fx}, g({x}) = {gx}
            </p>
            <p className="mt-1">
              Resultado en x={x}: {Number.isNaN(resultado) ? "no definido (división entre 0)" : resultado}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="f"
              valor={indF}
              min={0}
              max={FUNCIONES.length - 1}
              onChange={setIndF}
              formato={() => FUNCIONES[indF].nombre}
            />
            <ControlDeslizante
              etiqueta="g"
              valor={indG}
              min={0}
              max={FUNCIONES.length - 1}
              onChange={setIndG}
              formato={() => FUNCIONES[indG].nombre}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ControlDeslizante
              etiqueta="Operación"
              valor={opIndice}
              min={0}
              max={OPERACIONES.length - 1}
              onChange={setOpIndice}
              formato={() => op}
            />
            <ControlDeslizante etiqueta="x" valor={x} min={-5} max={5} onChange={setX} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="f∘g en x" valor={f.fn(g.fn(x))} />
          <EstadisticaFila label="g∘f en x" valor={g.fn(f.fn(x))} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En general (f∘g)(x) ≠ (g∘f)(x): la composición de funciones no es conmutativa.
          </p>
        </div>
      }
      instrucciones="Elige f, g, la operación y un valor de x para ver el resultado paso a paso."
    />
  );
}
