"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

type Modo = "multiplicacion" | "adicion" | "factorial";

export function PrincipiosDeConteo() {
  const [modo, setModo] = useState<Modo>("multiplicacion");
  const [platos, setPlatos] = useState(3);
  const [bebidas, setBebidas] = useState(4);
  const [opcionesA, setOpcionesA] = useState(5);
  const [opcionesB, setOpcionesB] = useState(3);
  const [n, setN] = useState(5);

  const botones: { id: Modo; etiqueta: string }[] = [
    { id: "multiplicacion", etiqueta: "Multiplicación" },
    { id: "adicion", etiqueta: "Adición" },
    { id: "factorial", etiqueta: "Factorial" },
  ];

  return (
    <FiguraInteractiva
      titulo="Principios de conteo"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {botones.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setModo(b.id)}
                className={`rounded-full px-3 py-1.5 transition-colors ${modo === b.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                {b.etiqueta}
              </button>
            ))}
          </div>

          {modo === "multiplicacion" && (
            <>
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${bebidas}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: platos * bebidas }, (_, i) => (
                  <span key={i} className="aspect-square rounded bg-blue-600" />
                ))}
              </div>
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <ControlDeslizante etiqueta="Platos" valor={platos} min={1} max={8} onChange={setPlatos} />
                <ControlDeslizante etiqueta="Bebidas" valor={bebidas} min={1} max={8} onChange={setBebidas} />
              </div>
            </>
          )}

          {modo === "adicion" && (
            <>
              <div className="flex gap-4">
                <div
                  className="grid flex-1 grid-cols-3 gap-1"
                >
                  {Array.from({ length: opcionesA }, (_, i) => (
                    <span key={i} className="aspect-square rounded bg-blue-600" />
                  ))}
                </div>
                <div className="grid flex-1 grid-cols-3 gap-1">
                  {Array.from({ length: opcionesB }, (_, i) => (
                    <span key={i} className="aspect-square rounded bg-amber-500" />
                  ))}
                </div>
              </div>
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <ControlDeslizante etiqueta="Opciones del grupo A" valor={opcionesA} min={1} max={10} onChange={setOpcionesA} />
                <ControlDeslizante etiqueta="Opciones del grupo B" valor={opcionesB} min={1} max={10} onChange={setOpcionesB} />
              </div>
            </>
          )}

          {modo === "factorial" && (
            <>
              <div className="flex flex-wrap gap-2 text-xs">
                {Array.from({ length: n + 1 }, (_, i) => (
                  <span key={i} className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono">
                    {i}! = {factorial(i).toLocaleString("es-PE")}
                  </span>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4">
                <ControlDeslizante etiqueta="n" valor={n} min={0} max={10} onChange={setN} />
              </div>
            </>
          )}
        </div>
      }
      panel={
        <div>
          {modo === "multiplicacion" && (
            <>
              <EstadisticaFila label="Platos × Bebidas" valor={`${platos} × ${bebidas}`} />
              <EstadisticaFila label="Total de combinaciones" valor={platos * bebidas} />
              <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
                Principio de multiplicación: si una elección tiene m formas y otra
                independiente tiene n formas, hacer ambas tiene m×n formas.
              </p>
            </>
          )}
          {modo === "adicion" && (
            <>
              <EstadisticaFila label="Opciones A + Opciones B" valor={`${opcionesA} + ${opcionesB}`} />
              <EstadisticaFila label="Total de formas (elegir una u otra)" valor={opcionesA + opcionesB} />
              <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
                Principio de adición: si dos grupos de opciones son mutuamente
                excluyentes, el total de formas de elegir una es la suma.
              </p>
            </>
          )}
          {modo === "factorial" && (
            <>
              <EstadisticaFila label={`${n}!`} valor={factorial(n).toLocaleString("es-PE")} />
              <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
                n! cuenta las formas de ordenar n objetos distintos. Crece
                extremadamente rápido: 10! ya supera los 3 millones.
              </p>
            </>
          )}
        </div>
      }
      instrucciones="Cambia de modo y ajusta los valores para ver cómo se combinan las opciones."
    />
  );
}
