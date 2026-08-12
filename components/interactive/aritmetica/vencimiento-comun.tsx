"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function VencimientoComun() {
  const [n1, setN1] = useState(2000);
  const [t1, setT1] = useState(30);
  const [n2, setN2] = useState(3000);
  const [t2, setT2] = useState(60);
  const [n3, setN3] = useState(1000);
  const [t3, setT3] = useState(90);

  const sumaN = n1 + n2 + n3;
  const vencimientoComun = (n1 * t1 + n2 * t2 + n3 * t3) / sumaN;

  const maxDias = Math.max(t1, t2, t3, vencimientoComun) * 1.1;

  return (
    <FiguraInteractiva
      titulo="Vencimiento común de varias letras"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {[
            { etiqueta: "Letra 1", dias: t1, color: "bg-slate-400" },
            { etiqueta: "Letra 2", dias: t2, color: "bg-slate-400" },
            { etiqueta: "Letra 3", dias: t3, color: "bg-slate-400" },
            { etiqueta: "Vencimiento común", dias: vencimientoComun, color: "bg-blue-600" },
          ].map((fila) => (
            <div key={fila.etiqueta} className="space-y-1">
              <p className="text-xs text-slate-500">
                {fila.etiqueta}: <span className="font-mono font-semibold">{fila.dias.toFixed(1)} días</span>
              </p>
              <div className={`h-6 rounded ${fila.color}`} style={{ width: `${(fila.dias / maxDias) * 100}%` }} />
            </div>
          ))}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Letra 1 — valor nominal" valor={n1} min={500} max={6000} step={100} onChange={setN1} />
            <ControlDeslizante etiqueta="Letra 1 — plazo (días)" valor={t1} min={10} max={180} onChange={setT1} />
            <ControlDeslizante etiqueta="Letra 2 — valor nominal" valor={n2} min={500} max={6000} step={100} onChange={setN2} />
            <ControlDeslizante etiqueta="Letra 2 — plazo (días)" valor={t2} min={10} max={180} onChange={setT2} />
            <ControlDeslizante etiqueta="Letra 3 — valor nominal" valor={n3} min={500} max={6000} step={100} onChange={setN3} />
            <ControlDeslizante etiqueta="Letra 3 — plazo (días)" valor={t3} min={10} max={180} onChange={setT3} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Suma de valores nominales" valor={sumaN} />
          <EstadisticaFila label="Vencimiento común (días)" valor={vencimientoComun.toFixed(1)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El vencimiento común es el promedio de los plazos, ponderado por el valor
            nominal de cada letra: las letras más grandes &quot;pesan&quot; más en la
            fecha final.
          </p>
        </div>
      }
      instrucciones="Ajusta el valor nominal y el plazo de cada letra para ver cómo se desplaza el vencimiento común."
    />
  );
}
