"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const RACIONALIZACIONES = [
  { nombre: "1/√2", valor: 1 / Math.sqrt(2), racionalizado: "√2 / 2", valorR: Math.sqrt(2) / 2 },
  { nombre: "1/√5", valor: 1 / Math.sqrt(5), racionalizado: "√5 / 5", valorR: Math.sqrt(5) / 5 },
  {
    nombre: "1/(√3+1)",
    valor: 1 / (Math.sqrt(3) + 1),
    racionalizado: "(√3 − 1) / 2",
    valorR: (Math.sqrt(3) - 1) / 2,
  },
  {
    nombre: "1/(√5−√2)",
    valor: 1 / (Math.sqrt(5) - Math.sqrt(2)),
    racionalizado: "(√5 + √2) / 3",
    valorR: (Math.sqrt(5) + Math.sqrt(2)) / 3,
  },
];

const TRINOMIOS = [
  { nombre: "x² + 6x + 9", raiz: "x + 3", a: 1, b: 6, c: 9 },
  { nombre: "x² − 10x + 25", raiz: "x − 5", a: 1, b: -10, c: 25 },
  { nombre: "4x² + 12x + 9", raiz: "2x + 3", a: 4, b: 12, c: 9 },
];

export function RaizYRacionalizacion() {
  const [modo, setModo] = useState(0);
  const [indiceR, setIndiceR] = useState(0);
  const [indiceT, setIndiceT] = useState(0);
  const [x, setX] = useState(2);

  const esRacionalizacion = modo === 0;
  const r = RACIONALIZACIONES[indiceR];
  const t = TRINOMIOS[indiceT];
  const valorTrinomio = t.a * x * x + t.b * x + t.c;
  const raizTrinomio = Math.sqrt(Math.max(0, valorTrinomio));

  return (
    <FiguraInteractiva
      titulo={esRacionalizacion ? "Racionalización de denominadores" : "Raíz cuadrada de un trinomio cuadrado perfecto"}
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          {esRacionalizacion ? (
            <>
              <p className="text-center font-mono text-lg text-slate-900">
                {r.nombre} = {r.racionalizado}
              </p>
              <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
                <p>
                  Original ≈ {r.valor.toFixed(6)}, racionalizado ≈ {r.valorR.toFixed(6)}
                </p>
                <p className={Math.abs(r.valor - r.valorR) < 1e-9 ? "text-emerald-600" : "text-red-500"}>
                  {Math.abs(r.valor - r.valorR) < 1e-9 ? "✓ coinciden" : "✗ no coinciden"}
                </p>
              </div>
              <ControlDeslizante
                etiqueta="Expresión"
                valor={indiceR}
                min={0}
                max={RACIONALIZACIONES.length - 1}
                onChange={setIndiceR}
                formato={() => `${indiceR + 1}/${RACIONALIZACIONES.length}`}
              />
            </>
          ) : (
            <>
              <p className="text-center font-mono text-lg text-slate-900">
                √({t.nombre}) = {t.raiz}
              </p>
              <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
                <p>
                  En x={x}: trinomio = {valorTrinomio}, √trinomio = {raizTrinomio.toFixed(3)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ControlDeslizante
                  etiqueta="Trinomio"
                  valor={indiceT}
                  min={0}
                  max={TRINOMIOS.length - 1}
                  onChange={setIndiceT}
                  formato={() => `${indiceT + 1}/${TRINOMIOS.length}`}
                />
                <ControlDeslizante etiqueta="x" valor={x} min={-5} max={5} onChange={setX} />
              </div>
            </>
          )}

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Modo"
              valor={modo}
              min={0}
              max={1}
              onChange={setModo}
              formato={() => (esRacionalizacion ? "Racionalización" : "Raíz de trinomio")}
            />
          </div>
        </div>
      }
      panel={
        <div>
          {esRacionalizacion ? (
            <>
              <EstadisticaFila label="Expresión original" valor={r.nombre} />
              <EstadisticaFila label="Forma racionalizada" valor={r.racionalizado} />
            </>
          ) : (
            <>
              <EstadisticaFila label="Trinomio" valor={t.nombre} />
              <EstadisticaFila label="Raíz cuadrada" valor={t.raiz} />
            </>
          )}
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Racionalizar multiplica por una forma de 1 (el conjugado) para eliminar la raíz del
            denominador. La raíz de un trinomio cuadrado perfecto es el binomio que, al
            elevarlo al cuadrado, lo reproduce.
          </p>
        </div>
      }
      instrucciones="Elige el modo (racionalización o raíz de un trinomio) y explora los ejemplos."
    />
  );
}
