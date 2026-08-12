"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

type Termino = { coef: number; ex: number; ey: number };
type Entrada = { nombre: string; terminos: Termino[]; univariante: boolean };

function texto(t: Termino, univariante: boolean): string {
  const partes: string[] = [];
  if (t.ex > 0) partes.push(t.ex === 1 ? "x" : `x${sup(t.ex)}`);
  if (!univariante && t.ey > 0) partes.push(t.ey === 1 ? "y" : `y${sup(t.ey)}`);
  const base = partes.join("");
  if (base === "") return `${t.coef}`;
  return `${t.coef === 1 ? "" : t.coef === -1 ? "−" : t.coef}${base}`;
}

function sup(n: number): string {
  const map: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵" };
  return String(n).split("").map((c) => map[c] || c).join("");
}

const POLINOMIOS: Entrada[] = [
  {
    nombre: "x³ − 2x² + 5x − 7",
    univariante: true,
    terminos: [
      { coef: 1, ex: 3, ey: 0 },
      { coef: -2, ex: 2, ey: 0 },
      { coef: 5, ex: 1, ey: 0 },
      { coef: -7, ex: 0, ey: 0 },
    ],
  },
  {
    nombre: "x²y + xy²",
    univariante: false,
    terminos: [
      { coef: 1, ex: 2, ey: 1 },
      { coef: 1, ex: 1, ey: 2 },
    ],
  },
  {
    nombre: "x⁴ − 3x + 1",
    univariante: true,
    terminos: [
      { coef: 1, ex: 4, ey: 0 },
      { coef: -3, ex: 1, ey: 0 },
      { coef: 1, ex: 0, ey: 0 },
    ],
  },
  {
    nombre: "3x²y³ − 5xy + 2",
    univariante: false,
    terminos: [
      { coef: 3, ex: 2, ey: 3 },
      { coef: -5, ex: 1, ey: 1 },
      { coef: 2, ex: 0, ey: 0 },
    ],
  },
];

export function ClasificadorDePolinomios() {
  const [indice, setIndice] = useState(0);
  const p = POLINOMIOS[indice];

  const gradoAbsoluto = Math.max(...p.terminos.map((t) => t.ex + t.ey));
  const gradoRelativoX = Math.max(...p.terminos.map((t) => t.ex));
  const gradoRelativoY = p.univariante ? null : Math.max(...p.terminos.map((t) => t.ey));

  const homogeneo = p.terminos.every((t) => t.ex + t.ey === gradoAbsoluto);

  const exponentesX = p.terminos.map((t) => t.ex);
  let ordenado = true;
  for (let i = 1; i < exponentesX.length; i++) {
    if (exponentesX[i] > exponentesX[i - 1]) ordenado = false;
  }

  const completo =
    p.univariante &&
    Array.from({ length: gradoAbsoluto + 1 }, (_, i) => i).every((e) => exponentesX.includes(e));

  return (
    <FiguraInteractiva
      titulo="Clasificador de polinomios"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            P{p.univariante ? "(x)" : "(x,y)"} = {p.nombre}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {p.terminos.map((t, i) => (
              <span key={i} className="rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-xs text-slate-700">
                {texto(t, p.univariante)}
              </span>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Polinomio"
              valor={indice}
              min={0}
              max={POLINOMIOS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${POLINOMIOS.length}`}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Grado absoluto" valor={gradoAbsoluto} />
          <EstadisticaFila label="Grado relativo en x" valor={gradoRelativoX} />
          {!p.univariante && <EstadisticaFila label="Grado relativo en y" valor={gradoRelativoY!} />}
          <EstadisticaFila label="Homogéneo" valor={homogeneo ? "Sí" : "No"} />
          {p.univariante && <EstadisticaFila label="Completo" valor={completo ? "Sí" : "No"} />}
          <EstadisticaFila label="Ordenado (en x, descendente)" valor={ordenado ? "Sí" : "No"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Homogéneo: todos los términos tienen el mismo grado absoluto. Completo: aparecen
            todos los exponentes consecutivos desde el mayor hasta 0.
          </p>
        </div>
      }
      instrucciones="Elige un polinomio para analizar su grado y clasificarlo."
    />
  );
}
