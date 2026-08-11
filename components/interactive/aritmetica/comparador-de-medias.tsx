"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function ComparadorDeMedias() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(16);

  const am = (a + b) / 2;
  const gm = Math.sqrt(a * b);
  const hm = (2 * a * b) / (a + b);

  const max = Math.max(a, b) * 1.1;
  const pos = (v: number) => `${(v / max) * 100}%`;

  const marcadores = [
    { valor: a, etiqueta: "a", color: "bg-slate-400" },
    { valor: hm, etiqueta: "HM", color: "bg-red-500" },
    { valor: gm, etiqueta: "GM", color: "bg-amber-500" },
    { valor: am, etiqueta: "AM", color: "bg-blue-600" },
    { valor: b, etiqueta: "b", color: "bg-slate-400" },
  ].sort((m1, m2) => m1.valor - m2.valor);

  return (
    <FiguraInteractiva
      titulo="Medias de dos cantidades"
      board={
        <div className="flex flex-col gap-8 px-2 py-8">
          <div className="relative h-16">
            <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200" />
            {marcadores.map((m) => (
              <div
                key={m.etiqueta}
                className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: pos(m.valor) }}
              >
                <span className={`size-3 rounded-full ${m.color} ring-2 ring-white`} />
                <span className="mt-1 whitespace-nowrap text-[0.65rem] font-semibold text-slate-500">
                  {m.etiqueta}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={30} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={30} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Media aritmética (a+b)/2" valor={am.toFixed(2)} />
          <EstadisticaFila label="Media geométrica √(ab)" valor={gm.toFixed(2)} />
          <EstadisticaFila label="Media armónica 2ab/(a+b)" valor={hm.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Para dos cantidades positivas distintas, siempre se cumple
            HM ≤ GM ≤ AM — con igualdad solo cuando a = b.
          </p>
        </div>
      }
      instrucciones="Arrastra a y b y observa cómo las tres medias se ordenan siempre igual sobre la recta."
    />
  );
}
