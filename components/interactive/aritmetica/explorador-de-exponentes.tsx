"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function formatear(x: number): string {
  if (Number.isInteger(x)) return x.toString();
  return x.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}

export function ExploradorDeExponentes() {
  const [a, setA] = useState(2);
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);

  const am = Math.pow(a, m);
  const an = Math.pow(a, n);
  const producto = am * an;
  const sumaExp = Math.pow(a, m + n);
  const potenciaDePotencia = Math.pow(am, n);
  const productoExp = Math.pow(a, m * n);

  return (
    <FiguraInteractiva
      titulo="Explorador de las leyes de exponentes"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              {a}^{m} × {a}^{n} = {formatear(am)} × {formatear(an)} ={" "}
              <span className="font-semibold text-blue-600">{formatear(producto)}</span>
            </p>
            <p>
              {a}^({m}+{n}) = {a}^{m + n} ={" "}
              <span className="font-semibold text-blue-600">{formatear(sumaExp)}</span>
            </p>
            <p className={producto === sumaExp ? "text-emerald-600" : "text-red-500"}>
              {producto === sumaExp ? "✓ coinciden" : "✗ no coinciden"}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              ({a}^{m})^{n} = {formatear(am)}^{n} ={" "}
              <span className="font-semibold text-blue-600">{formatear(potenciaDePotencia)}</span>
            </p>
            <p>
              {a}^({m}×{n}) = {a}^{m * n} ={" "}
              <span className="font-semibold text-blue-600">{formatear(productoExp)}</span>
            </p>
            <p
              className={
                Math.abs(potenciaDePotencia - productoExp) < 1e-6
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            >
              {Math.abs(potenciaDePotencia - productoExp) < 1e-6 ? "✓ coinciden" : "✗ no coinciden"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Base a" valor={a} min={2} max={9} onChange={setA} />
            <ControlDeslizante etiqueta="Exponente m" valor={m} min={-4} max={4} onChange={setM} />
            <ControlDeslizante etiqueta="Exponente n" valor={n} min={-4} max={4} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label={`${a}^${m}`} valor={formatear(am)} />
          <EstadisticaFila label={`${a}^${n}`} valor={formatear(an)} />
          <EstadisticaFila label={`${a}^${m + n}`} valor={formatear(sumaExp)} />
          <EstadisticaFila label={`${a}^${m * n}`} valor={formatear(productoExp)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cambia la base y los exponentes (incluso negativos) para ver que las leyes
            aᵐ·aⁿ=aᵐ⁺ⁿ y (aᵐ)ⁿ=aᵐⁿ se cumplen siempre.
          </p>
        </div>
      }
      instrucciones="Ajusta la base y los exponentes para verificar las leyes de la potenciación."
    />
  );
}
