"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

type Operacion = "+" | "−" | "×" | "÷";

export function ExploradorDeCerradura({
  conjunto,
  simbolo,
  min,
  max,
}: {
  conjunto: string;
  simbolo: string;
  min: number;
  max: number;
}) {
  const [a, setA] = useState(Math.min(6, max));
  const [b, setB] = useState(Math.min(4, max));
  const [operacion, setOperacion] = useState<Operacion>("+");

  const operaciones: Operacion[] = ["+", "−", "×", "÷"];

  let resultado: number | null = null;
  if (operacion === "+") resultado = a + b;
  else if (operacion === "−") resultado = a - b;
  else if (operacion === "×") resultado = a * b;
  else resultado = b !== 0 ? a / b : null;

  const esEntero = resultado !== null && Number.isInteger(resultado);
  const cumpleRango = resultado !== null && resultado >= min;
  const perteneceAlConjunto = resultado !== null && esEntero && cumpleRango;

  return (
    <FiguraInteractiva
      titulo={`¿Es ${conjunto} cerrado bajo esta operación?`}
      board={
        <div className="flex flex-col gap-6 px-2 py-6">
          <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold">
            {operaciones.map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperacion(op)}
                className={`size-10 rounded-full transition-colors ${operacion === op ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                {op}
              </button>
            ))}
          </div>

          <p className="text-center font-mono text-2xl text-slate-900">
            {a} {operacion} {b} = {resultado === null ? "indefinido" : resultado}
          </p>

          <div
            className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${perteneceAlConjunto ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
          >
            {perteneceAlConjunto
              ? `✓ El resultado pertenece a ${simbolo}`
              : `✗ El resultado NO pertenece a ${simbolo}`}
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={min} max={max} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={min} max={max} onChange={setB} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Conjunto explorado" valor={simbolo} />
          <EstadisticaFila label="Operación" valor={operacion} />
          <EstadisticaFila label="Resultado" valor={resultado === null ? "indefinido" : resultado} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Un conjunto es <strong>cerrado</strong> bajo una operación si el resultado de
            aplicarla a dos elementos del conjunto siempre queda dentro del mismo
            conjunto. Busca una combinación donde el resultado se salga de {simbolo}.
          </p>
        </div>
      }
      instrucciones="Cambia la operación y ajusta a y b para probar si el resultado se queda dentro del conjunto."
    />
  );
}
