"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "./jsxgraph-board";
import { Card } from "@/components/ui/card";

/**
 * Prueba de la tubería de interactividad: un punto arrastrable en el plano
 * cuyas coordenadas se leen en tiempo real. Sirve de plantilla base para las
 * visualizaciones de Geometría y Trigonometría (JSXGraph).
 */
export function PuntoArrastrableDemo() {
  const [coords, setCoords] = useState<[number, number]>([2, 1]);

  return (
    <Card>
      <JSXGraphBoard
        onMount={(board: JXG.Board) => {
          const p = board.create("point", coords, {
            name: "P",
            size: 4,
            face: "o",
            fillColor: "var(--color-gold-500)",
            strokeColor: "var(--color-navy-900)",
            highlightFillColor: "var(--color-gold-600)",
          });

          p.on("drag", () => {
            setCoords([Number(p.X().toFixed(2)), Number(p.Y().toFixed(2))]);
          });
        }}
      />
      <p className="mt-4 text-center font-mono text-sm text-foreground/70">
        P = ({coords[0]}, {coords[1]})
      </p>
    </Card>
  );
}
