"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";

export function SimuladorDeLanzamientos() {
  const [caras, setCaras] = useState(6);
  const [conteos, setConteos] = useState<number[]>(Array(6).fill(0));

  const cambiarCaras = (n: number) => {
    setCaras(n);
    setConteos(Array(n).fill(0));
  };

  const lanzar = (veces: number) => {
    setConteos((prev) => {
      const nuevo = [...prev];
      for (let i = 0; i < veces; i++) {
        const resultado = Math.floor(Math.random() * caras);
        nuevo[resultado] += 1;
      }
      return nuevo;
    });
  };

  const total = conteos.reduce((s, c) => s + c, 0);
  const teorica = 1 / caras;
  const maxAltura = Math.max(...conteos.map((c) => (total > 0 ? c / total : 0)), teorica) * 1.15;

  return (
    <FiguraInteractiva
      titulo="Frecuencia relativa vs. probabilidad teórica"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => cambiarCaras(2)}
              className={`rounded-full px-3 py-1.5 transition-colors ${caras === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Moneda (2 caras)
            </button>
            <button
              type="button"
              onClick={() => cambiarCaras(6)}
              className={`rounded-full px-3 py-1.5 transition-colors ${caras === 6 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Dado (6 caras)
            </button>
          </div>

          <div className="relative flex h-40 items-end gap-2">
            <div
              className="absolute right-0 left-0 border-t-2 border-dashed border-amber-500"
              style={{ bottom: `${(teorica / maxAltura) * 100}%` }}
            />
            {conteos.map((c, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-blue-600"
                  style={{ height: `${((total > 0 ? c / total : 0) / maxAltura) * 100}%` }}
                />
                <span className="text-[0.65rem] text-slate-500">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[0.65rem] text-amber-600">
            — — línea punteada: probabilidad teórica ({(teorica * 100).toFixed(1)}%)
          </p>

          <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => lanzar(1)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 hover:bg-slate-200"
            >
              Lanzar 1
            </button>
            <button
              type="button"
              onClick={() => lanzar(10)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 hover:bg-slate-200"
            >
              Lanzar 10
            </button>
            <button
              type="button"
              onClick={() => lanzar(100)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 hover:bg-slate-200"
            >
              Lanzar 100
            </button>
            <button
              type="button"
              onClick={() => setConteos(Array(caras).fill(0))}
              className="rounded-full bg-red-50 px-3 py-1.5 text-red-500 hover:bg-red-100"
            >
              Reiniciar
            </button>
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Lanzamientos totales" valor={total} />
          <EstadisticaFila label="Probabilidad teórica de cada cara" valor={`${(teorica * 100).toFixed(2)}%`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La frecuencia relativa (barras azules) se acerca cada vez más a la
            probabilidad teórica (línea punteada) a medida que aumentan los
            lanzamientos — es la Ley de los Grandes Números.
          </p>
        </div>
      }
      instrucciones="Lanza la moneda o el dado muchas veces y observa cómo las barras se acercan a la línea teórica."
    />
  );
}
