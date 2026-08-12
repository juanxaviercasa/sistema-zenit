"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

const ENTRADAS = [
  {
    nombre: "x² + 1",
    grado: 2,
    raices: [
      { x: 0, y: 1, texto: "i" },
      { x: 0, y: -1, texto: "−i" },
    ],
  },
  {
    nombre: "x² − 2x + 5",
    grado: 2,
    raices: [
      { x: 1, y: 2, texto: "1+2i" },
      { x: 1, y: -2, texto: "1−2i" },
    ],
  },
  {
    nombre: "x³ − 1",
    grado: 3,
    raices: [
      { x: 1, y: 0, texto: "1" },
      { x: -0.5, y: Math.sqrt(3) / 2, texto: "−½+(√3/2)i" },
      { x: -0.5, y: -Math.sqrt(3) / 2, texto: "−½−(√3/2)i" },
    ],
  },
  {
    nombre: "x⁴ − 1",
    grado: 4,
    raices: [
      { x: 1, y: 0, texto: "1" },
      { x: -1, y: 0, texto: "−1" },
      { x: 0, y: 1, texto: "i" },
      { x: 0, y: -1, texto: "−i" },
    ],
  },
];

export function RaicesEnElPlanoComplejo() {
  const [indice, setIndice] = useState(2);
  const entrada = ENTRADAS[indice];

  return (
    <FiguraInteractiva
      titulo="Raíces complejas de un polinomio (teorema fundamental del álgebra)"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">P(x) = {entrada.nombre}</p>

          <PlanoCartesiano
            funciones={[]}
            puntos={entrada.raices.map((r) => ({ x: r.x, y: r.y, color: "#3b82f6" }))}
            xMin={-3}
            xMax={3}
            yMin={-3}
            yMax={3}
          />

          <div className="flex flex-wrap justify-center gap-1.5">
            {entrada.raices.map((r, i) => (
              <span key={i} className="rounded-lg bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700">
                {r.texto}
              </span>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Polinomio"
              valor={indice}
              min={0}
              max={ENTRADAS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${ENTRADAS.length}`}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="P(x)" valor={entrada.nombre} />
          <EstadisticaFila label="Grado" valor={entrada.grado} />
          <EstadisticaFila label="Cantidad de raíces complejas" valor={entrada.raices.length} />
          <EstadisticaFila
            label="¿Coinciden grado y cantidad de raíces?"
            valor={entrada.grado === entrada.raices.length ? "Sí" : "No"}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El teorema fundamental del álgebra garantiza que todo polinomio de grado n tiene
            exactamente n raíces complejas (contadas con multiplicidad) — reales o no.
          </p>
        </div>
      }
      instrucciones="Elige un polinomio para ver sus raíces complejas ubicadas en el plano y verificar que su cantidad coincide con el grado."
    />
  );
}
