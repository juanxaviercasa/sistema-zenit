import { ArrowLeft, BookOpenCheck, Info } from "lucide-react";
import Link from "next/link";
import { SceneSpecPlayer } from "@/components/experiences/scenespec-player";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Normalización paso a paso | Sistema Zenit",
  description: "Experiencia interactiva para construir una ecuación cuadrática microstep a microstep.",
};

export default function NormalizacionExperiencePage() {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <Link href="/matematica" className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground">
          <ArrowLeft className="size-4" /> Volver a Matemática
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-foreground">
            <BookOpenCheck className="size-3.5" /> SceneSpec v2 · Piloto
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">Normalizar una ecuación cuadrática sin saltarnos ningún paso.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/70">
            Observa cómo cada transformación se construye sobre la anterior. Puedes escuchar cada microstep, avanzar manualmente o intentar completar el siguiente estado antes de revelarlo.
          </p>
        </header>

        <div className="mt-8 flex gap-3 rounded-2xl border border-border bg-surface-muted p-4 text-sm leading-6 text-foreground/70">
          <Info className="mt-0.5 size-5 shrink-0 text-teal-600" />
          <p>Esta experiencia prueba una nueva unidad de explicación: una narración breve, una transformación visible, una pausa y una comprobación. El historial permanece para que puedas comparar.</p>
        </div>

        <div className="mt-10">
          <SceneSpecPlayer />
        </div>
      </Container>
    </main>
  );
}
