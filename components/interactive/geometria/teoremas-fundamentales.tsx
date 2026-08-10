"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl, angleDeg, type PolygonLike } from "@/components/interactive/jsxgraph-utils";

interface Desigualdad {
  etiqueta: string;
  suma: number;
  lado: number;
  cumple: boolean;
}

interface Estado {
  angulos: [number, number, number];
  anguloExterior: number;
  lados: [number, number, number];
  desigualdades: Desigualdad[];
  verticeMayor: "A" | "B" | "C";
}

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";

function calcular(A: JXG.Point, B: JXG.Point, C: JXG.Point, D: JXG.Point): Estado {
  const angA = angleDeg(A, B, C);
  const angB = angleDeg(B, A, C);
  const angC = 180 - angA - angB;
  const anguloExterior = angleDeg(C, D, A);

  const a = B.Dist(C);
  const b = A.Dist(C);
  const c = A.Dist(B);
  const eps = 1e-2 * (a + b + c);

  const desigualdades: Desigualdad[] = [
    { etiqueta: "a + b > c", suma: a + b, lado: c, cumple: a + b - c > eps },
    { etiqueta: "b + c > a", suma: b + c, lado: a, cumple: b + c - a > eps },
    { etiqueta: "a + c > b", suma: a + c, lado: b, cumple: a + c - b > eps },
  ];

  const maxAng = Math.max(angA, angB, angC);
  const verticeMayor = maxAng === angA ? "A" : maxAng === angB ? "B" : "C";

  return {
    angulos: [angA, angB, angC],
    anguloExterior,
    lados: [a, b, c],
    desigualdades,
    verticeMayor,
  };
}

export function TeoremasFundamentales() {
  const [estado, setEstado] = useState<Estado>(() => ({
    angulos: [58, 51, 71],
    anguloExterior: 129,
    lados: [4.15, 3.6, 4.5],
    desigualdades: [
      { etiqueta: "a + b > c", suma: 7.75, lado: 4.5, cumple: true },
      { etiqueta: "b + c > a", suma: 8.1, lado: 4.15, cumple: true },
      { etiqueta: "a + c > b", suma: 8.65, lado: 3.6, cumple: true },
    ],
    verticeMayor: "C",
  }));

  return (
    <FiguraInteractiva
      titulo="Suma angular · ángulo externo · desigualdad triangular"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 4, 5.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2, -1.5], { name: "A", size: 4 });
            const B = board.create("point", [2.5, -1.5], { name: "B", size: 4 });
            const C = board.create("point", [0.3, 2], { name: "C", size: 4 });

            // D prolonga el lado BC más allá de C, para mostrar el ángulo externo en C.
            const D = board.create(
              "point",
              [() => C.X() + (C.X() - B.X()) * 0.6, () => C.Y() + (C.Y() - B.Y()) * 0.6],
              {
                name: "D",
                size: 2,
                fixed: true,
                fillColor: "var(--color-foreground)",
                strokeColor: "var(--color-foreground)",
              }
            );

            const poly = createEl<PolygonLike>(board, "polygon", [A, B, C], {
              fillColor: GOLD,
              fillOpacity: 0.1,
              borders: { strokeColor: NAVY, strokeWidth: 2 },
            });

            createEl<JXG.Line>(board, "segment", [C, D], {
              dash: 2,
              strokeColor: "var(--color-foreground)",
              strokeWidth: 1.5,
            });

            const actualizar = () => {
              const nuevo = calcular(A, B, C, D);
              setEstado(nuevo);

              const bordePorVertice: Record<"A" | "B" | "C", number> = {
                A: 1, // lado a = B–C
                B: 2, // lado b = C–A
                C: 0, // lado c = A–B
              };
              [0, 1, 2].forEach((i) =>
                poly.borders[i]?.setAttribute({ strokeColor: NAVY, strokeWidth: 2 })
              );
              poly.borders[bordePorVertice[nuevo.verticeMayor]]?.setAttribute({
                strokeColor: GOLD,
                strokeWidth: 4,
              });
            };

            A.on("drag", actualizar);
            B.on("drag", actualizar);
            C.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            Suma de ángulos internos
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-navy-900">
            {(estado.angulos[0] + estado.angulos[1] + estado.angulos[2]).toFixed(1)}°
          </p>

          <div className="mt-3 border-t border-border pt-3">
            <EstadisticaFila label="Ángulo A" valor={`${estado.angulos[0].toFixed(1)}°`} />
            <EstadisticaFila label="Ángulo B" valor={`${estado.angulos[1].toFixed(1)}°`} />
            <EstadisticaFila label="Ángulo C" valor={`${estado.angulos[2].toFixed(1)}°`} />
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <EstadisticaFila
              label="Externo en C"
              valor={`${estado.anguloExterior.toFixed(1)}°`}
            />
            <EstadisticaFila
              label="A + B (no adyacentes)"
              valor={`${(estado.angulos[0] + estado.angulos[1]).toFixed(1)}°`}
            />
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs text-foreground/50">
              Lado opuesto al ángulo más grande ({estado.verticeMayor}):{" "}
              <span className="font-medium text-gold-600">resaltado en dorado</span>
            </p>
          </div>

          <div className="mt-4 space-y-1 border-t border-border pt-3">
            {estado.desigualdades.map((d) => (
              <div key={d.etiqueta} className="flex items-center justify-between text-sm">
                <span className="font-mono text-foreground/70">{d.etiqueta}</span>
                <span
                  className={d.cumple ? "text-success" : "text-danger"}
                  title={`${d.suma.toFixed(2)} vs ${d.lado.toFixed(2)}`}
                >
                  {d.cumple ? "✓" : "✗"}
                </span>
              </div>
            ))}
          </div>
        </div>
      }
      instrucciones="Arrastra A, B o C. La suma interior siempre da 180°; D prolonga BC para mostrar el ángulo externo en C."
    />
  );
}
