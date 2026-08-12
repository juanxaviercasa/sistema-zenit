"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const POLIS = [
  { nombre: "x² + 3x − 2", coefs: [1, 3, -2] },
  { nombre: "2x − 5", coefs: [2, -5] },
  { nombre: "x³ − x + 4", coefs: [1, 0, -1, 4] },
  { nombre: "3x² − x + 1", coefs: [3, -1, 1] },
];

const OPERACIONES = ["Suma", "Resta", "Multiplicación"] as const;

function padLeft(a: number[], n: number): number[] {
  return Array(n - a.length).fill(0).concat(a);
}

function suma(a: number[], b: number[]): number[] {
  const n = Math.max(a.length, b.length);
  const A = padLeft(a, n);
  const B = padLeft(b, n);
  return A.map((v, i) => v + B[i]);
}

function resta(a: number[], b: number[]): number[] {
  const n = Math.max(a.length, b.length);
  const A = padLeft(a, n);
  const B = padLeft(b, n);
  return A.map((v, i) => v - B[i]);
}

function mult(a: number[], b: number[]): number[] {
  const res = Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      res[i + j] += a[i] * b[j];
    }
  }
  return res;
}

function aTexto(coefs: number[]): string {
  const grado = coefs.length - 1;
  const partes: string[] = [];
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const exp = grado - i;
    const abs = Math.abs(c);
    const signo = c < 0 ? "−" : partes.length === 0 ? "" : "+";
    const num = exp === 0 ? `${abs}` : abs === 1 ? "" : `${abs}`;
    const variable = exp === 0 ? "" : exp === 1 ? "x" : `x^${exp}`;
    partes.push(`${signo}${signo && signo !== "−" ? " " : ""}${num}${variable}`.trim());
  });
  return partes.length === 0 ? "0" : partes.join(" ");
}

export function OperacionesConPolinomios() {
  const [indA, setIndA] = useState(0);
  const [indB, setIndB] = useState(1);
  const [opIndice, setOpIndice] = useState(0);

  const A = POLIS[indA];
  const B = POLIS[indB];
  const op = OPERACIONES[opIndice];

  const resultado =
    op === "Suma" ? suma(A.coefs, B.coefs) : op === "Resta" ? resta(A.coefs, B.coefs) : mult(A.coefs, B.coefs);

  return (
    <FiguraInteractiva
      titulo="Operaciones con polinomios"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">
            A(x) = {A.nombre}, B(x) = {B.nombre}
          </p>
          <p className="text-center font-mono text-lg text-slate-900">
            {op} = {aTexto(resultado)}
          </p>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="A(x)"
              valor={indA}
              min={0}
              max={POLIS.length - 1}
              onChange={setIndA}
              formato={() => POLIS[indA].nombre}
            />
            <ControlDeslizante
              etiqueta="B(x)"
              valor={indB}
              min={0}
              max={POLIS.length - 1}
              onChange={setIndB}
              formato={() => POLIS[indB].nombre}
            />
          </div>
          <ControlDeslizante
            etiqueta="Operación"
            valor={opIndice}
            min={0}
            max={OPERACIONES.length - 1}
            onChange={setOpIndice}
            formato={() => op}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="A(x)" valor={A.nombre} />
          <EstadisticaFila label="B(x)" valor={B.nombre} />
          <EstadisticaFila label="Resultado" valor={aTexto(resultado)} />
          <EstadisticaFila label="Grado del resultado" valor={resultado.length - 1} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            En la multiplicación, el grado del producto es la suma de los grados de A y B.
          </p>
        </div>
      }
      instrucciones="Elige dos polinomios y una operación para ver el resultado."
    />
  );
}
