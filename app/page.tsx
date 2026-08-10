import { Sparkles, BookOpenText, MousePointerClick, GraduationCap, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardLink } from "@/components/ui/card";
import { getAreaStyle } from "@/components/ui/area-style";
import { pruebas } from "@/lib/curriculum";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-navy-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 55% at 15% 0%, var(--color-geometria) 0%, transparent 60%)," +
              "radial-gradient(45% 50% at 85% 10%, var(--color-algebra) 0%, transparent 60%)," +
              "radial-gradient(55% 60% at 50% 100%, var(--color-aritmetica) 0%, transparent 65%)",
            opacity: 0.16,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(60% 60% at 50% 0%, var(--color-navy-700) 0%, transparent 70%)",
            opacity: 0.5,
          }}
        />
        <Container className="relative py-24 sm:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Sparkles className="size-3.5" />
            Preparación de admisión UNI
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Llega al <span className="text-gold-300">punto más alto</span> de tu preparación.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-foreground/75">
            Sistema Zenit es la plataforma de estudio para el examen de admisión a la
            Universidad Nacional de Ingeniería: teoría con el rigor que exige la UNI,
            visualizaciones interactivas y práctica al nivel real del examen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/matematica" variant="gold" size="lg">
              Empezar con Matemática
              <ArrowRight className="size-4" />
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            El examen tiene 3 pruebas. Elige la tuya.
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            El desarrollo empieza y se concentra en Matemática. Ciencias y Aptitud
            Académica ya tienen su lugar en la plataforma — su contenido llega después.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pruebas.map((prueba) => (
              <PruebaCard key={prueba.slug} prueba={prueba} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Cada tema, con el mismo rigor
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                icono: BookOpenText,
                color: "var(--color-geometria)",
                titulo: "Marco teórico completo",
                texto:
                  "Definiciones, teoremas y demostraciones al nivel que exige el examen — nunca un resumen superficial.",
              },
              {
                icono: MousePointerClick,
                color: "var(--color-aritmetica)",
                titulo: "Visualización interactiva",
                texto:
                  "Manipula el objeto matemático: arrastra un vértice, ajusta un parámetro, y observa el teorema cumplirse.",
              },
              {
                icono: GraduationCap,
                color: "var(--color-trigonometria)",
                titulo: "Práctica de nivel UNI",
                texto:
                  "Ejemplos resueltos paso a paso, problemas por niveles y autoevaluación con retroalimentación inmediata.",
              },
            ].map((item) => (
              <div key={item.titulo}>
                <span
                  className="inline-flex size-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${item.color} 14%, transparent)`, color: item.color }}
                >
                  <item.icono className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-sm text-foreground/70">{item.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function PruebaCard({ prueba }: { prueba: (typeof pruebas)[number] }) {
  const totalTemas = prueba.areas.reduce((n, a) => n + a.temas.length, 0);

  return (
    <CardLink href={`/${prueba.slug}`} className="flex flex-col" accent="var(--color-gold-500)">
      <div className="flex items-start justify-between">
        <h3 className="font-display text-xl font-semibold">{prueba.nombre}</h3>
        {prueba.disponible ? (
          <Badge variant="gold">Disponible</Badge>
        ) : (
          <Badge variant="neutral">Próximamente</Badge>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm text-foreground/70">{prueba.descripcion}</p>

      {prueba.disponible && prueba.areas.length > 0 && (
        <div className="mt-4 flex gap-1.5">
          {prueba.areas.map((area) => {
            const { icon: Icon, color, tint } = getAreaStyle(area.slug);
            return (
              <span
                key={area.slug}
                title={area.nombre}
                className="inline-flex size-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: tint, color }}
              >
                <Icon className="size-3.5" strokeWidth={2.25} />
              </span>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs font-medium text-foreground/50">
        {prueba.disponible
          ? `${prueba.areas.length} áreas · ${totalTemas} temas`
          : "Estructura lista, contenido en camino"}
      </p>
    </CardLink>
  );
}
