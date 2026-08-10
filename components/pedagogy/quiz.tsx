"use client";

import { useState } from "react";
import { ClipboardCheck, CircleCheck, CircleX, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PreguntaQuiz {
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export function Quiz({
  titulo = "Autoevaluación",
  preguntas,
}: {
  titulo?: string;
  preguntas: PreguntaQuiz[];
}) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});

  const respondidas = Object.keys(respuestas).length;
  const correctas = Object.entries(respuestas).filter(
    ([i, opcion]) => preguntas[Number(i)].correcta === opcion
  ).length;

  return (
    <div
      className="my-8 rounded-2xl border border-navy-900/15 p-6 text-navy-foreground sm:p-8"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, var(--color-navy-800) 0%, var(--color-navy-950) 60%)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-gold-300/15 text-gold-300">
            <ClipboardCheck className="size-4" strokeWidth={2.25} />
          </span>
          <h3 className="font-display text-xl font-semibold">{titulo}</h3>
        </div>
        <span className="whitespace-nowrap rounded-full bg-navy-foreground/10 px-3 py-1 text-sm font-medium text-gold-300">
          {correctas}/{preguntas.length} correctas
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {preguntas.map((pregunta, i) => {
          const elegida = respuestas[i];
          const respondida = elegida !== undefined;

          return (
            <div
              key={i}
              className="border-t border-navy-foreground/10 pt-6 first:border-t-0 first:pt-0"
            >
              <p className="font-medium">
                {i + 1}. {pregunta.enunciado}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {pregunta.opciones.map((opcion, j) => {
                  const esCorrecta = j === pregunta.correcta;
                  const esElegida = j === elegida;
                  const Icono = !respondida
                    ? Circle
                    : esCorrecta
                      ? CircleCheck
                      : esElegida
                        ? CircleX
                        : Circle;

                  return (
                    <button
                      key={j}
                      type="button"
                      disabled={respondida}
                      onClick={() =>
                        setRespuestas((prev) => ({ ...prev, [i]: j }))
                      }
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors",
                        !respondida &&
                          "border-navy-foreground/20 hover:border-gold-300 hover:bg-navy-foreground/5",
                        respondida &&
                          esCorrecta &&
                          "border-success bg-success/15 text-navy-foreground",
                        respondida &&
                          esElegida &&
                          !esCorrecta &&
                          "border-danger bg-danger/15 text-navy-foreground",
                        respondida &&
                          !esElegida &&
                          !esCorrecta &&
                          "border-navy-foreground/10 text-navy-foreground/40"
                      )}
                    >
                      <Icono
                        className={cn(
                          "size-4 shrink-0",
                          respondida && esCorrecta && "text-success",
                          respondida && esElegida && !esCorrecta && "text-danger"
                        )}
                        strokeWidth={2.25}
                      />
                      {opcion}
                    </button>
                  );
                })}
              </div>
              {respondida && (
                <p className="mt-3 text-sm text-navy-foreground/70">
                  <span
                    className={cn(
                      "font-semibold",
                      elegida === pregunta.correcta ? "text-success" : "text-danger"
                    )}
                  >
                    {elegida === pregunta.correcta ? "Correcto. " : "Incorrecto. "}
                  </span>
                  {pregunta.explicacion}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {respondidas === preguntas.length && (
        <p className="mt-6 rounded-lg bg-navy-foreground/10 px-4 py-3 text-center text-sm text-gold-300">
          Terminaste el quiz: {correctas} de {preguntas.length} correctas.
        </p>
      )}
    </div>
  );
}
