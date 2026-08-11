"use client";

import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraDemostracion } from "@/components/interactive/figura-demostracion";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";
const GOLD_STROKE = "var(--color-gold-600)";

export function DiagramaBisectriz() {
  return (
    <FiguraDemostracion
      caption="P está sobre la bisectriz de Â; M y N son los pies de las perpendiculares a cada lado."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2, -1.2], { name: "A", size: 3 });
            const B = board.create("point", [2.5, -1.8], { name: "B", size: 3 });
            const C = board.create("point", [1.3, 2.3], { name: "C", size: 3 });
            createEl(board, "segment", [A, B], { strokeColor: NAVY, strokeWidth: 2 });
            createEl(board, "segment", [A, C], { strokeColor: NAVY, strokeWidth: 2 });

            const D = board.create(
              "point",
              [
                () => {
                  const ux1 = B.X() - A.X(), uy1 = B.Y() - A.Y();
                  const l1 = Math.hypot(ux1, uy1) || 1;
                  const ux2 = C.X() - A.X(), uy2 = C.Y() - A.Y();
                  const l2 = Math.hypot(ux2, uy2) || 1;
                  return A.X() + ux1 / l1 + ux2 / l2;
                },
                () => {
                  const ux1 = B.X() - A.X(), uy1 = B.Y() - A.Y();
                  const l1 = Math.hypot(ux1, uy1) || 1;
                  const ux2 = C.X() - A.X(), uy2 = C.Y() - A.Y();
                  const l2 = Math.hypot(ux2, uy2) || 1;
                  return A.Y() + uy1 / l1 + uy2 / l2;
                },
              ],
              { visible: false }
            );
            const bisectriz = createEl<JXG.Line>(board, "line", [A, D], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
            const P = createEl<JXG.Point>(board, "glider", [1, 0.4, bisectriz], {
              name: "P",
              size: 3,
              fillColor: GOLD,
              strokeColor: GOLD_STROKE,
            });

            const pie = (ref: JXG.Point) => [
              () => {
                const ux = ref.X() - A.X(), uy = ref.Y() - A.Y();
                const l = Math.hypot(ux, uy) || 1;
                const uxn = ux / l, uyn = uy / l;
                const t = (P.X() - A.X()) * uxn + (P.Y() - A.Y()) * uyn;
                return A.X() + uxn * t;
              },
              () => {
                const ux = ref.X() - A.X(), uy = ref.Y() - A.Y();
                const l = Math.hypot(ux, uy) || 1;
                const uxn = ux / l, uyn = uy / l;
                const t = (P.X() - A.X()) * uxn + (P.Y() - A.Y()) * uyn;
                return A.Y() + uyn * t;
              },
            ];
            const M = board.create("point", pie(B), {
              name: "M",
              size: 2,
              fixed: true,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            const N = board.create("point", pie(C), {
              name: "N",
              size: 2,
              fixed: true,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            createEl(board, "segment", [P, M], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
            createEl(board, "segment", [P, N], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
          }}
        />
      }
    />
  );
}

export function DiagramaMediatriz() {
  return (
    <FiguraDemostracion
      caption="M es punto medio de AB; P está sobre la mediatriz, perpendicular a AB por M."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2.5, -1], { name: "A", size: 3 });
            const B = board.create("point", [2, -1], { name: "B", size: 3 });
            createEl(board, "segment", [A, B], { strokeColor: NAVY, strokeWidth: 2 });

            const M = createEl<JXG.Point>(board, "midpoint", [A, B], {
              name: "M",
              size: 2,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            const Dm = board.create(
              "point",
              [() => M.X() - (B.Y() - A.Y()), () => M.Y() + (B.X() - A.X())],
              { visible: false }
            );
            const mediatriz = createEl<JXG.Line>(board, "line", [M, Dm], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
            const P = createEl<JXG.Point>(board, "glider", [0, 2, mediatriz], {
              name: "P",
              size: 3,
              fillColor: GOLD,
              strokeColor: GOLD_STROKE,
            });
            createEl(board, "segment", [P, A], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
            createEl(board, "segment", [P, B], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
          }}
        />
      }
    />
  );
}

export function DiagramaBaseMedia() {
  return (
    <FiguraDemostracion
      caption="D prolonga MN de modo que N sea también punto medio de MD — así aparece el paralelogramo auxiliar."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 5.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [0, 2], { name: "A", size: 3 });
            const B = board.create("point", [-3, -1.5], { name: "B", size: 3 });
            const C = board.create("point", [3, -1.5], { name: "C", size: 3 });
            createEl(board, "polygon", [A, B, C], {
              fillColor: NAVY,
              fillOpacity: 0.06,
              borders: { strokeColor: NAVY, strokeWidth: 2 },
            });

            const M = createEl<JXG.Point>(board, "midpoint", [A, B], {
              name: "M",
              size: 2,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            const N = createEl<JXG.Point>(board, "midpoint", [A, C], {
              name: "N",
              size: 2,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            const D = board.create(
              "point",
              [() => 2 * N.X() - M.X(), () => 2 * N.Y() - M.Y()],
              { name: "D", size: 2, fixed: true, fillColor: GOLD, strokeColor: GOLD_STROKE }
            );
            createEl(board, "segment", [M, D], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
            createEl(board, "segment", [C, D], {
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

export function DiagramaMedianaHipotenusa() {
  return (
    <FiguraDemostracion
      caption="N es punto medio de AB; por el teorema de la base media, MN ∥ AC, así que MN ⊥ AB también."
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2, -1.5], { name: "A", size: 3 });
            const B = board.create("point", [1.6, -1.5], { name: "B", size: 3 });

            const H = board.create(
              "point",
              [() => A.X() - (B.Y() - A.Y()), () => A.Y() + (B.X() - A.X())],
              { visible: false }
            );
            const eje = createEl<JXG.Line>(board, "line", [A, H], { visible: false });
            const C = createEl<JXG.Point>(board, "glider", [-2, 1.8, eje], {
              name: "C",
              size: 3,
            });
            createEl(board, "polygon", [A, B, C], {
              fillColor: NAVY,
              fillOpacity: 0.06,
              borders: { strokeColor: NAVY, strokeWidth: 2 },
            });

            const M = createEl<JXG.Point>(board, "midpoint", [B, C], {
              name: "M",
              size: 2,
              fillColor: GOLD,
              strokeColor: GOLD_STROKE,
            });
            const N = createEl<JXG.Point>(board, "midpoint", [A, B], {
              name: "N",
              size: 2,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            createEl(board, "segment", [M, N], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
            createEl(board, "segment", [A, M], { strokeColor: GOLD_STROKE, strokeWidth: 1.5 });
          }}
        />
      }
    />
  );
}
