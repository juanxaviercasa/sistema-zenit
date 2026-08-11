"use client";

import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraDemostracion } from "@/components/interactive/figura-demostracion";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";
const GOLD_STROKE = "var(--color-gold-600)";

function triangulo(board: import("jsxgraph").Board, A: unknown, B: unknown, C: unknown) {
  createEl(board, "polygon", [A, B, C], {
    fillColor: NAVY,
    fillOpacity: 0.06,
    borders: { strokeColor: NAVY, strokeWidth: 2 },
  });
}

export function DiagramaSumaAngulos() {
  return (
    <FiguraDemostracion
      caption="ℓ pasa por C y es paralela a AB: los ángulos que forma con CA y CB son alternos internos de Â y B̂."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -2.5]}
          onMount={(board) => {
            const A = board.create("point", [-2.5, -1.5], { name: "A", size: 3 });
            const B = board.create("point", [2, -1.5], { name: "B", size: 3 });
            const C = board.create("point", [0, 2], { name: "C", size: 3 });
            triangulo(board, A, B, C);

            const Cp = board.create(
              "point",
              [() => C.X() + (B.X() - A.X()), () => C.Y() + (B.Y() - A.Y())],
              { visible: false }
            );
            createEl(board, "line", [C, Cp], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
          }}
        />
      }
    />
  );
}

export function DiagramaAnguloExterno() {
  return (
    <FiguraDemostracion
      caption="D prolonga BC más allá de C: el ángulo ∠ACD es el ángulo externo en C."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 5, -2.5]}
          onMount={(board) => {
            const A = board.create("point", [-2.5, -1.5], { name: "A", size: 3 });
            const B = board.create("point", [2, -1.5], { name: "B", size: 3 });
            const C = board.create("point", [0.3, 2], { name: "C", size: 3 });
            triangulo(board, A, B, C);

            const D = board.create(
              "point",
              [
                () => C.X() + (C.X() - B.X()) * 0.6,
                () => C.Y() + (C.Y() - B.Y()) * 0.6,
              ],
              { name: "D", size: 2, fixed: true, fillColor: GOLD, strokeColor: GOLD_STROKE }
            );
            createEl(board, "segment", [C, D], {
              strokeColor: "var(--color-foreground)",
              strokeWidth: 1.5,
              dash: 2,
            });
          }}
        />
      }
    />
  );
}

export function DiagramaCorrespondenciaAnguloLado() {
  return (
    <FiguraDemostracion
      caption="D está sobre CB con CD = CA: el triángulo ACD es isósceles, y ∠CDA es externo al triángulo ABD."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -2.5]}
          onMount={(board) => {
            const A = board.create("point", [-2.7, -1.5], { name: "A", size: 3 });
            const B = board.create("point", [2.3, -1.5], { name: "B", size: 3 });
            const C = board.create("point", [1.3, 2.2], { name: "C", size: 3 });
            triangulo(board, A, B, C);

            const D = board.create(
              "point",
              [
                () => {
                  const ux = B.X() - C.X();
                  const uy = B.Y() - C.Y();
                  const len = Math.hypot(ux, uy) || 1;
                  const target = C.Dist(A);
                  return C.X() + (ux / len) * target;
                },
                () => {
                  const ux = B.X() - C.X();
                  const uy = B.Y() - C.Y();
                  const len = Math.hypot(ux, uy) || 1;
                  const target = C.Dist(A);
                  return C.Y() + (uy / len) * target;
                },
              ],
              { name: "D", size: 2, fixed: true, fillColor: GOLD, strokeColor: GOLD_STROKE }
            );
            createEl(board, "segment", [A, D], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
          }}
        />
      }
    />
  );
}

export function DiagramaDesigualdadTriangular() {
  return (
    <FiguraDemostracion
      caption="D prolonga CA más allá de A con AD = AB: el triángulo DBC compara ∠DBC con ∠BDC."
      board={
        <JSXGraphBoard
          boundingBox={[-5, 3.5, 4.5, -2.5]}
          onMount={(board) => {
            const A = board.create("point", [-1.5, -1.5], { name: "A", size: 3 });
            const B = board.create("point", [2.3, -1.5], { name: "B", size: 3 });
            const C = board.create("point", [0.2, 2.2], { name: "C", size: 3 });
            triangulo(board, A, B, C);

            const D = board.create(
              "point",
              [
                () => {
                  const ux = A.X() - C.X();
                  const uy = A.Y() - C.Y();
                  const len = Math.hypot(ux, uy) || 1;
                  const target = A.Dist(B);
                  return A.X() + (ux / len) * target;
                },
                () => {
                  const ux = A.X() - C.X();
                  const uy = A.Y() - C.Y();
                  const len = Math.hypot(ux, uy) || 1;
                  const target = A.Dist(B);
                  return A.Y() + (uy / len) * target;
                },
              ],
              { name: "D", size: 2, fixed: true, fillColor: GOLD, strokeColor: GOLD_STROKE }
            );
            createEl(board, "segment", [A, D], {
              strokeColor: "var(--color-foreground)",
              strokeWidth: 1.5,
              dash: 2,
            });
            createEl(board, "segment", [B, D], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
            });
          }}
        />
      }
    />
  );
}
