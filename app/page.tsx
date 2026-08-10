import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardLink } from "@/components/ui/card";
import { pruebas } from "@/lib/curriculum";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-navy-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, var(--color-navy-700) 0%, transparent 70%)",
          }}
        />
        <Container className="relative py-24 sm:py-32">
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-300">
            Preparación de admisión UNI
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
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
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
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
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Cada tema, con el mismo rigor
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                titulo: "Marco teórico completo",
                texto:
                  "Definiciones, teoremas y demostraciones al nivel que exige el examen — nunca un resumen superficial.",
              },
              {
                titulo: "Visualización interactiva",
                texto:
                  "Manipula el objeto matemático: arrastra un vértice, ajusta un parámetro, y observa el teorema cumplirse.",
              },
              {
                titulo: "Práctica de nivel UNI",
                texto:
                  "Ejemplos resueltos paso a paso, problemas por niveles y autoevaluación con retroalimentación inmediata.",
              },
            ].map((item) => (
              <div key={item.titulo}>
                <h3 className="font-serif text-lg font-semibold">{item.titulo}</h3>
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
    <CardLink href={`/${prueba.slug}`} className="flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="font-serif text-xl font-semibold">{prueba.nombre}</h3>
        {prueba.disponible ? (
          <Badge variant="gold">Disponible</Badge>
        ) : (
          <Badge variant="neutral">Próximamente</Badge>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm text-foreground/70">{prueba.descripcion}</p>
      <p className="mt-4 text-xs font-medium text-foreground/50">
        {prueba.disponible
          ? `${prueba.areas.length} áreas · ${totalTemas} temas`
          : "Estructura lista, contenido en camino"}
      </p>
    </CardLink>
  );
}
