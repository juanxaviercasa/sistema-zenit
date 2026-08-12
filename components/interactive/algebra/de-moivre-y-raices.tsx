"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

export function DeMoivreYRaices() {
  const [r, setR] = useState(2);
  const [thetaDeg, setThetaDeg] = useState(60);
  const [n, setN] = useState(3);

  const thetaRad = (thetaDeg * Math.PI) / 180;

  const potenciaR = r ** n;
  const potenciaThetaDeg = (thetaDeg * n) % 360;
  const potenciaA = potenciaR * Math.cos((potenciaThetaDeg * Math.PI) / 180);
  const potenciaB = potenciaR * Math.sin((potenciaThetaDeg * Math.PI) / 180);

  const raizR = r ** (1 / n);
  const raices = Array.from({ length: n }, (_, k) => {
    const anguloDeg = (thetaDeg + 360 * k) / n;
    const anguloRad = (anguloDeg * Math.PI) / 180;
    return { x: raizR * Math.cos(anguloRad), y: raizR * Math.sin(anguloRad) };
  });

  return (
    <FiguraInteractiva
      titulo="Fórmula de De Moivre y raíces enésimas"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">
            z = {r}(cos {thetaDeg}° + i sen {thetaDeg}°)
          </p>
          <p className="text-center font-mono text-lg text-slate-900">
            z^{n} = {potenciaR.toFixed(2)}(cos {potenciaThetaDeg.toFixed(1)}° + i sen{" "}
            {potenciaThetaDeg.toFixed(1)}°) ≈ {potenciaA.toFixed(2)} {potenciaB >= 0 ? "+" : "−"}{" "}
            {Math.abs(potenciaB).toFixed(2)}i
          </p>

          <PlanoCartesiano
            funciones={[]}
            puntos={[
              { x: r * Math.cos(thetaRad), y: r * Math.sin(thetaRad), color: "#3b82f6" },
              ...raices.map((p) => ({ ...p, color: "#059669" })),
            ]}
            xMin={-6}
            xMax={6}
            yMin={-6}
            yMax={6}
          />

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="r" valor={r} min={1} max={4} onChange={setR} />
            <ControlDeslizante etiqueta="θ (°)" valor={thetaDeg} min={0} max={360} step={15} onChange={setThetaDeg} />
            <ControlDeslizante etiqueta="n" valor={n} min={2} max={6} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="z" valor={`${r}(cos ${thetaDeg}° + i sen ${thetaDeg}°)`} />
          <EstadisticaFila label={`z^${n}`} valor={`${potenciaR.toFixed(2)}(cos ${potenciaThetaDeg.toFixed(1)}°...)`} />
          <EstadisticaFila label={`Módulo de las raíces n-ésimas`} valor={raizR.toFixed(3)} />
          <EstadisticaFila label="Cantidad de raíces n-ésimas" valor={n} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Las n raíces (verde) están todas a la misma distancia del origen (√[n]{"{r}"}) y
            equiespaciadas por 360°/n — forman los vértices de un polígono regular.
          </p>
        </div>
      }
      instrucciones="Ajusta r, θ y n para ver z elevado a la n (De Moivre) y las n raíces enésimas de z, equiespaciadas en un círculo."
    />
  );
}
