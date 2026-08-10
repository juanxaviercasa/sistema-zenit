"use client";

import { useEffect, useRef, useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva } from "@/components/interactive/figura-interactiva";
import { createEl, type PolygonLike } from "@/components/interactive/jsxgraph-utils";
import { cn } from "@/lib/utils";

type Criterio = "LLL" | "LAL" | "ALA";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";
const INFO = "var(--color-info)";

const CONFIG: Record<Criterio, { bordes: number[]; vertices: number[]; texto: string }> = {
  LLL: {
    bordes: [0, 1, 2],
    vertices: [],
    texto:
      "Postulado LLL: los 3 pares de lados correspondientes son iguales — AB≅A'B', BC≅B'C', CA≅C'A'.",
  },
  LAL: {
    bordes: [0, 2],
    vertices: [0],
    texto:
      "Postulado LAL: 2 lados y el ángulo comprendido entre ellos son iguales — AB≅A'B', CA≅C'A', y ∠A≅∠A'.",
  },
  ALA: {
    bordes: [0],
    vertices: [0, 1],
    texto:
      "Postulado ALA: 2 ángulos y el lado comprendido entre ellos son iguales — ∠A≅∠A', ∠B≅∠B', y AB≅A'B'.",
  },
};

export function CongruenciaTriangulos() {
  const [criterio, setCriterio] = useState<Criterio>("LLL");
  const refs = useRef<{ poly1: PolygonLike; poly2: PolygonLike } | null>(null);

  const aplicarEstilo = (c: Criterio) => {
    const r = refs.current;
    if (!r) return;
    const { bordes, vertices } = CONFIG[c];
    [0, 1, 2].forEach((i) => {
      const activo = bordes.includes(i);
      r.poly1.borders[i]?.setAttribute({
        strokeColor: activo ? INFO : NAVY,
        strokeWidth: activo ? 4 : 2,
      });
      r.poly2.borders[i]?.setAttribute({
        strokeColor: activo ? INFO : GOLD,
        strokeWidth: activo ? 4 : 2,
      });
    });
    [0, 1, 2].forEach((i) => {
      const activo = vertices.includes(i);
      r.poly1.vertices[i]?.setAttribute({ size: activo ? 6 : 4 });
      r.poly2.vertices[i]?.setAttribute({ size: activo ? 6 : 4 });
    });
  };

  useEffect(() => {
    aplicarEstilo(criterio);
  }, [criterio]);

  return (
    <FiguraInteractiva
      titulo="LLL · LAL · ALA"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 8, -3]}
          onMount={(board) => {
            const A = board.create("point", [-3, -1.5], { name: "A", size: 4 });
            const B = board.create("point", [-0.2, -1.5], { name: "B", size: 4 });
            const C = board.create("point", [-1.8, 1.4], { name: "C", size: 4 });

            // A'B'C' es una copia rígida de ABC (rotación fija + traslación),
            // por lo que su congruencia con ABC se conserva sin importar cómo se arrastre.
            const theta = (18 * Math.PI) / 180;
            const dx = 5.6;
            const dy = 0.3;
            const cos = Math.cos(theta);
            const sin = Math.sin(theta);
            const cx = () => (A.X() + B.X() + C.X()) / 3;
            const cy = () => (A.Y() + B.Y() + C.Y()) / 3;

            const transformar = (P: JXG.Point, nombre: string) =>
              board.create(
                "point",
                [
                  () => cx() + (P.X() - cx()) * cos - (P.Y() - cy()) * sin + dx,
                  () => cy() + (P.X() - cx()) * sin + (P.Y() - cy()) * cos + dy,
                ],
                {
                  name: nombre,
                  size: 4,
                  fixed: true,
                  fillColor: GOLD,
                  strokeColor: "var(--color-gold-600)",
                }
              );

            const A2 = transformar(A, "A'");
            const B2 = transformar(B, "B'");
            const C2 = transformar(C, "C'");

            const poly1 = createEl<PolygonLike>(board, "polygon", [A, B, C], {
              fillColor: NAVY,
              fillOpacity: 0.08,
              borders: { strokeColor: NAVY, strokeWidth: 2 },
            });
            const poly2 = createEl<PolygonLike>(board, "polygon", [A2, B2, C2], {
              fillColor: GOLD,
              fillOpacity: 0.12,
              borders: { strokeColor: GOLD, strokeWidth: 2 },
            });

            refs.current = { poly1, poly2 };
            aplicarEstilo(criterio);
          }}
        />
      }
      panel={
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            Postulado de congruencia
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {(["LLL", "LAL", "ALA"] as Criterio[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCriterio(c)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  criterio === c
                    ? "border-info bg-info/10 text-info"
                    : "border-border text-foreground/70 hover:bg-surface-muted"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">
            {CONFIG[criterio].texto}
          </p>
          <p className="mt-4 border-t border-border pt-3 text-xs text-foreground/50">
            A&apos;B&apos;C&apos; es una copia rígida (rotada y trasladada) de ABC — por
            construcción, siempre es congruente con él, sin importar cómo arrastres los
            vértices.
          </p>
        </div>
      }
      instrucciones="Arrastra A, B o C: A'B'C' se mueve como copia rígida. Elige un postulado para ver qué partes garantizan la congruencia."
    />
  );
}
