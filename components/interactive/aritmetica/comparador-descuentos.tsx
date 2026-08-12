"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function ComparadorDescuentos() {
  const [vn, setVn] = useState(5000);
  const [d, setD] = useState(4);
  const [t, setT] = useState(3);

  const tasa = d / 100;
  const dc = vn * tasa * t;
  const vaComercial = vn - dc;

  const dr = (vn * tasa * t) / (1 + tasa * t);
  const vaRacional = vn - dr;

  const maxBarra = vn * 1.05;

  return (
    <FiguraInteractiva
      titulo="Descuento comercial vs. racional"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {[
            { etiqueta: "Valor nominal (Vn)", valor: vn, color: "bg-slate-400" },
            { etiqueta: "Valor actual comercial (Vn − Dc)", valor: vaComercial, color: "bg-blue-600" },
            { etiqueta: "Valor actual racional (Vn − Dr)", valor: vaRacional, color: "bg-amber-500" },
          ].map((fila) => (
            <div key={fila.etiqueta} className="space-y-1">
              <p className="text-xs text-slate-500">
                {fila.etiqueta}: <span className="font-mono font-semibold">{fila.valor.toFixed(2)}</span>
              </p>
              <div className={`h-6 rounded ${fila.color}`} style={{ width: `${(fila.valor / maxBarra) * 100}%` }} />
            </div>
          ))}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Valor nominal (Vn)" valor={vn} min={500} max={10000} step={100} onChange={setVn} />
            <ControlDeslizante etiqueta="Tasa de descuento anual (%)" valor={d} min={1} max={20} onChange={setD} />
            <ControlDeslizante etiqueta="Tiempo (años)" valor={t} min={0.5} max={5} step={0.5} onChange={setT} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Descuento comercial (Dc)" valor={dc.toFixed(2)} />
          <EstadisticaFila label="Descuento racional (Dr)" valor={dr.toFixed(2)} />
          <EstadisticaFila label="Diferencia Dc − Dr" valor={(dc - dr).toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El descuento comercial se calcula sobre el valor nominal (más grande); el
            racional, sobre el valor actual (más chico). Por eso Dc siempre es mayor o
            igual que Dr — el comercial es más costoso para quien descuenta la letra.
          </p>
        </div>
      }
      instrucciones="Ajusta el valor nominal, la tasa y el tiempo, y compara ambos descuentos."
    />
  );
}
