import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CardLink } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAreaStyle } from "@/components/ui/area-style";
import { getPrueba } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Matemática",
  description:
    "Aritmética, Álgebra, Geometría y Trigonometría — el temario oficial de Matemática del examen de admisión UNI.",
};

export default function MatematicaPage() {
  const prueba = getPrueba("matematica");
  if (!prueba) notFound();

  const totalTemas = prueba.areas.reduce((n, a) => n + a.temas.length, 0);

  return (
    <Container className="py-16">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
        Matemática
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold">
        Las 4 áreas del temario UNI
      </h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        {totalTemas} temas repartidos en Aritmética, Álgebra, Geometría y Trigonometría,
        cubiertos con teoría rigurosa, visualización interactiva y práctica de nivel de
        examen.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {prueba.areas.map((area) => {
          const { icon: Icon, color, tint } = getAreaStyle(area.slug);
          const completos = area.temas.filter((t) => t.subtemas.length > 0).length;
          return (
            <CardLink key={area.slug} href={`/matematica/${area.slug}`} accent={color}>
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex size-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: tint, color }}
                >
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <Badge variant="neutral">
                  {completos > 0 ? `${completos}/${area.temas.length} listos` : `${area.temas.length} temas`}
                </Badge>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold">{area.nombre}</h2>
              <p className="mt-2 text-sm text-foreground/70">{area.descripcion}</p>
            </CardLink>
          );
        })}
      </div>
    </Container>
  );
}
