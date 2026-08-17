"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Headphones, PauseCircle, Play, RotateCcw, Sparkles } from "lucide-react";
import { MathText } from "@/components/pedagogy/math-text";
import { Button } from "@/components/ui/button";

type Mode = "guided" | "controlled" | "practice";

type MicroStep = {
  id: string;
  from_state: string;
  to_state: string;
  operation: string;
  reason: string;
  spoken_text: string;
  audio: { file: string; duration: number };
  pause_after: number;
  checkpoint?: { prompt: string; required_before_continue: boolean };
};

type SceneData = {
  title: string;
  learning_objective: string;
  chapters: Array<{ title: string; beats: Array<{ title: string; microsteps: MicroStep[] }> }>;
};

const stateLabels: Record<string, string> = {
  "a*x^2 + b*x + c = 0": "$a x^2 + b x + c = 0$",
  "(a*x^2 + b*x + c)/a = 0/a": "$\\frac{a x^2 + b x + c}{a}=\\frac{0}{a}$",
  "x^2 + (b/a)*x + c/a = 0": "$x^2+\\frac{b}{a}x+\\frac{c}{a}=0$",
  "x^2 + (b/a)*x = -c/a": "$x^2+\\frac{b}{a}x=-\\frac{c}{a}$",
};

function formula(state: string) {
  return stateLabels[state] ?? `$${state.replaceAll("*", " ")} $`;
}

function audioUrl(path: string) {
  return `/${path.replace(/^audio\//, "media/zenit/")}`;
}

export function SceneSpecPlayer() {
  const [scene, setScene] = useState<SceneData | null>(null);
  const [mode, setMode] = useState<Mode>("guided");
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/scenespec/normalizacion_v2.json")
      .then((response) => response.json())
      .then((data: SceneData) => setScene(data))
      .catch(() => setScene(null));
  }, []);

  const steps = useMemo(() => scene?.chapters.flatMap((chapter) => chapter.beats.flatMap((beat) => beat.microsteps)) ?? [], [scene]);
  const current = steps[activeIndex];
  const visibleSteps = steps.slice(0, activeIndex + 1);

  const changeMode = (nextMode: Mode) => {
    stopAudio();
    setMode(nextMode);
    setRevealed(nextMode !== "practice");
  };

  const playCurrent = () => {
    if (!current) return;
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.pause();
    audioRef.current.src = audioUrl(current.audio.file);
    audioRef.current.currentTime = 0;
    audioRef.current.onended = () => setPlaying(false);
    void audioRef.current.play();
    setPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const next = () => {
    if (!current) return;
    if (mode === "practice" && !revealed) {
      setRevealed(true);
      return;
    }
    stopAudio();
    setActiveIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const previous = () => {
    stopAudio();
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const reset = () => {
    stopAudio();
    setActiveIndex(0);
    setRevealed(mode !== "practice");
  };

  if (!scene || !current) {
    return <div className="rounded-3xl border border-border bg-surface p-8 text-sm text-foreground/70">Cargando la experiencia paso a paso…</div>;
  }

  return (
    <section className="space-y-6" aria-label="Reproductor de explicación matemática paso a paso">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">Modo de aprendizaje</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["guided", "controlled", "practice"] as Mode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeMode(item)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${mode === item ? "bg-navy-900 text-navy-foreground" : "bg-surface-muted text-foreground/70 hover:text-foreground"}`}
              >
                {item === "guided" ? "Tutor guiado" : item === "controlled" ? "Avance controlado" : "Práctica"}
              </button>
            ))}
          </div>
        </div>
        <div className="text-right text-sm text-foreground/60">
          <p>Microstep {activeIndex + 1} de {steps.length}</p>
          <div className="mt-2 h-2 w-44 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full rounded-full bg-gold-500 transition-all" style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-navy-950 p-5 text-navy-foreground shadow-xl sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{scene.title}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">{current.operation === "show_context" ? "Observamos la forma general" : current.operation === "label_terms" ? "Nombramos cada coeficiente" : current.operation === "divide_both_sides" ? "Aplicamos la misma operación" : current.operation === "simplify_each_term" ? "Simplificamos término por término" : "Construimos el siguiente estado"}</h2>
          </div>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/65">{mode === "practice" ? "Intenta anticipar el paso" : "Construcción acumulativa"}</span>
        </div>

        <div className="mt-8 space-y-3" aria-live="polite">
          {visibleSteps.map((step, index) => {
            const isCurrent = index === activeIndex;
            const isHidden = mode === "practice" && isCurrent && !revealed;
            return (
              <div key={step.id} className={`rounded-2xl border px-4 py-4 transition ${isCurrent ? "border-gold-300/70 bg-white/10" : "border-white/10 bg-white/[0.03]"}`}>
                <div className="mb-2 flex items-center justify-between gap-3 text-xs text-white/45">
                  <span>{index === activeIndex ? "Ahora" : "Estado anterior"}</span>
                  {index < activeIndex && <Check className="size-4 text-emerald-300" />}
                </div>
                <div className={`${isCurrent ? "text-2xl text-white" : "text-lg text-white/40"} overflow-x-auto py-1`}>
                  {isHidden ? <span className="font-mono text-base text-gold-200">Completa el siguiente estado y luego pulsa “Revelar”.</span> : <MathText text={formula(step.to_state)} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 rounded-2xl border border-teal-300/20 bg-teal-300/10 p-4">
          <div className="flex items-start gap-3">
            <Headphones className="mt-0.5 size-5 shrink-0 text-teal-200" />
            <p className="text-sm leading-6 text-teal-50">{current.spoken_text}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">Por qué hacemos esto</p>
          <p className="mt-3 leading-7 text-foreground/75">{current.reason}</p>
          {current.checkpoint && (
            <div className="mt-5 rounded-xl bg-gold-50 p-4 text-sm text-gold-foreground">
              <p className="font-semibold">Pausa de observación</p>
              <p className="mt-1">{current.checkpoint.prompt}</p>
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">Controles</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={previous} disabled={activeIndex === 0}><ChevronLeft className="size-4" />Anterior</Button>
            <Button variant="gold" size="sm" onClick={playCurrent}>{playing ? <PauseCircle className="size-4" /> : <Play className="size-4" />}{playing ? "Reproduciendo" : "Escuchar paso"}</Button>
            {mode === "practice" && !revealed ? <Button variant="primary" size="sm" onClick={() => setRevealed(true)}>Revelar</Button> : <Button variant="primary" size="sm" onClick={next} disabled={activeIndex === steps.length - 1}>Siguiente<ChevronRight className="size-4" /></Button>}
            <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="size-4" />Reiniciar</Button>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-foreground/55"><Sparkles className="size-3.5 text-gold-500" />Cada línea permanece para que puedas comparar la transformación.</div>
        </div>
      </div>
    </section>
  );
}
