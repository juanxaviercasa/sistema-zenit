"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function VerificadorDeProporciones() {
  const [continua, setContinua] = useState(false);
  const [a, setA] = useState(4);
  const [b, setB] = useState(6);
  const [c, setC] = useState(6);
  const [d, setD] = useState(9);

  const cReal = continua ? b : c;
  const productoExtremos = a * d;
  const productoMedios = b * cReal;
  const esProporcion = productoExtremos === productoMedios;

  const mediaProporcional = Math.sqrt(a * d);

  return (
    <FiguraInteractiva
      titulo="Verificador de proporciones"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setContinua(false)}
              className={`rounded-full px-3 py-1.5 transition-colors ${!continua ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Discreta
            </button>
            <button
              type="button"
              onClick={() => setContinua(true)}
              className={`rounded-full px-3 py-1.5 transition-colors ${continua ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Continua
            </button>
          </div>

          <p className="text-center font-mono text-lg text-slate-900">
            {a} : {b} <span className="text-slate-400">::</span> {cReal} : {d}
          </p>

          <div className="space-y-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={20} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={20} onChange={setB} />
            {!continua && (
              <ControlDeslizante etiqueta="c" valor={c} min={1} max={20} onChange={setC} />
            )}
            <ControlDeslizante etiqueta="d" valor={d} min={1} max={20} onChange={setD} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Producto de extremos (a · d)" valor={productoExtremos} />
          <EstadisticaFila label="Producto de medios (b · c)" valor={productoMedios} />
          <div className="my-3 rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-semibold">
            <span className={esProporcion ? "text-green-600" : "text-red-500"}>
              {esProporcion ? "✓ Es una proporción" : "✕ No es una proporción"}
            </span>
          </div>
          {continua && (
            <EstadisticaFila
              label="Media proporcional (√(a·d))"
              valor={mediaProporcional.toFixed(2)}
            />
          )}
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En toda proporción, el producto de los extremos (a·d) es igual al producto de
            los medios (b·c). En la proporción continua, b = c: el término del medio es la
            media proporcional entre a y d.
          </p>
        </div>
      }
      instrucciones="Ajusta a, b, c y d. En modo continua, c se fija igual a b automáticamente."
    />
  );
}
