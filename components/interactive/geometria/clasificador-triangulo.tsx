"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import {
  FiguraInteractiva,
  EstadisticaFila,
  PanelEtiqueta,
  PanelValor,
} from "@/components/interactive/figura-interactiva";
import { createEl, angleDeg, type PolygonLike } from "@/components/interactive/jsxgraph-utils";

interface Estado {
  lados: [number, number, number];
  angulos: [number, number, number];
  porLados: string;
  porAngulos: string;
}

function calcular(A: JXG.Point, B: JXG.Point, C: JXG.Point): Estado {
  const a = B.Dist(C);
  const b = A.Dist(C);
  const c = A.Dist(B);
  const angA = angleDeg(A, B, C);
  const angB = angleDeg(B, A, C);
  const angC = 180 - angA - angB;

  const epsLado = 0.05 * Math.max(a, b, c);
  let porLados = "Escaleno";
  if (Math.abs(a - b) < epsLado && Math.abs(b - c) < epsLado) porLados = "Equilátero";
  else if (Math.abs(a - b) < epsLado || Math.abs(b - c) < epsLado || Math.abs(a - c) < epsLado)
    porLados = "Isósceles";

  const epsAngulo = 1.5;
  const maxAngulo = Math.max(angA, angB, angC);
  let porAngulos = "Acutángulo";
  if (Math.abs(maxAngulo - 90) < epsAngulo) porAngulos = "Rectángulo";
  else if (maxAngulo > 90) porAngulos = "Obtusángulo";

  return { lados: [a, b, c], angulos: [angA, angB, angC], porLados, porAngulos };
}

export function ClasificadorTriangulo() {
  const [estado, setEstado] = useState<Estado>({
    lados: [4.15, 3.6, 4.5],
    angulos: [58, 51, 71],
    porLados: "Escaleno",
    porAngulos: "Acutángulo",
  });

  return (
    <FiguraInteractiva
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2, -1.5], { name: "A", size: 4 });
            const B = board.create("point", [2.5, -1.5], { name: "B", size: 4 });
            const C = board.create("point", [0.3, 2], { name: "C", size: 4 });

            const poly = createEl<PolygonLike>(board, "polygon", [A, B, C], {
              fillColor: "var(--color-gold-500)",
              fillOpacity: 0.1,
              borders: { strokeColor: "var(--color-navy-900)", strokeWidth: 2 },
            });
            void poly;

            const actualizar = () => setEstado(calcular(A, B, C));
            A.on("drag", actualizar);
            B.on("drag", actualizar);
            C.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <PanelEtiqueta>Por sus lados</PanelEtiqueta>
          <PanelValor>{estado.porLados}</PanelValor>

          <div className="mt-5">
            <PanelEtiqueta>Por sus ángulos</PanelEtiqueta>
            <PanelValor>{estado.porAngulos}</PanelValor>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-1">
            <EstadisticaFila label="Lado BC (a)" valor={estado.lados[0].toFixed(2)} />
            <EstadisticaFila label="Lado CA (b)" valor={estado.lados[1].toFixed(2)} />
            <EstadisticaFila label="Lado AB (c)" valor={estado.lados[2].toFixed(2)} />
            <EstadisticaFila label="Ángulo A" valor={`${estado.angulos[0].toFixed(1)}°`} />
            <EstadisticaFila label="Ángulo B" valor={`${estado.angulos[1].toFixed(1)}°`} />
            <EstadisticaFila label="Ángulo C" valor={`${estado.angulos[2].toFixed(1)}°`} />
          </div>
        </div>
      }
      instrucciones="Arrastra los vértices A, B y C. La clasificación se recalcula en tiempo real."
    />
  );
}
