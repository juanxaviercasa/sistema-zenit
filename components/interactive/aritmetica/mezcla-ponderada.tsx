"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

interface Componente {
  nombre: string;
  cantidad: number;
  valor: number;
}

/**
 * Widget genérico para el "método de la mezcla" (promedio ponderado): se
 * reusa tal cual en los 4 subtemas de Mezcla y aleación — solo cambian las
 * etiquetas/unidades (precio, concentración, densidad, ley) porque la
 * matemática detrás es exactamente la misma operación en los cuatro casos.
 */
export function MezclaPonderada({
  titulo,
  nombres,
  etiquetaCantidad,
  etiquetaValor,
  etiquetaResultado,
  cantidadMin,
  cantidadMax,
  cantidadPaso = 1,
  valorMin,
  valorMax,
  valorPaso = 1,
  iniciales,
  nota,
}: {
  titulo: string;
  nombres: [string, string, string];
  etiquetaCantidad: string;
  etiquetaValor: string;
  etiquetaResultado: string;
  cantidadMin: number;
  cantidadMax: number;
  cantidadPaso?: number;
  valorMin: number;
  valorMax: number;
  valorPaso?: number;
  iniciales: [Omit<Componente, "nombre">, Omit<Componente, "nombre">, Omit<Componente, "nombre">];
  nota: string;
}) {
  const [componentes, setComponentes] = useState<Componente[]>(
    iniciales.map((c, i) => ({ ...c, nombre: nombres[i] }))
  );

  const actualizar = (i: number, campo: "cantidad" | "valor", v: number) => {
    setComponentes((prev) => prev.map((c, j) => (j === i ? { ...c, [campo]: v } : c)));
  };

  const sumaCantidad = componentes.reduce((s, c) => s + c.cantidad, 0);
  const sumaProducto = componentes.reduce((s, c) => s + c.cantidad * c.valor, 0);
  const resultado = sumaCantidad > 0 ? sumaProducto / sumaCantidad : 0;

  const maxBarra = Math.max(...componentes.map((c) => c.cantidad), 1) * 1.1;

  return (
    <FiguraInteractiva
      titulo={titulo}
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {componentes.map((c) => (
            <div key={c.nombre} className="space-y-1">
              <p className="text-xs text-slate-500">
                {c.nombre}: <span className="font-mono font-semibold">{c.cantidad}</span>
              </p>
              <div className="h-5 rounded bg-blue-600" style={{ width: `${(c.cantidad / maxBarra) * 100}%` }} />
            </div>
          ))}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            {componentes.map((c, i) => (
              <div key={c.nombre} className="space-y-2 rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {c.nombre}
                </p>
                <ControlDeslizante
                  etiqueta={etiquetaCantidad}
                  valor={c.cantidad}
                  min={cantidadMin}
                  max={cantidadMax}
                  step={cantidadPaso}
                  onChange={(v) => actualizar(i, "cantidad", v)}
                />
                <ControlDeslizante
                  etiqueta={etiquetaValor}
                  valor={c.valor}
                  min={valorMin}
                  max={valorMax}
                  step={valorPaso}
                  onChange={(v) => actualizar(i, "valor", v)}
                />
              </div>
            ))}
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Cantidad total" valor={sumaCantidad.toFixed(2)} />
          <EstadisticaFila label={etiquetaResultado} valor={resultado.toFixed(3)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">{nota}</p>
        </div>
      }
      instrucciones="Ajusta la cantidad y el valor de cada componente para ver cómo cambia el resultado ponderado."
    />
  );
}
